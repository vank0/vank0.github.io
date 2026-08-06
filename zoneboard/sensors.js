// Web Bluetooth heart-rate strap manager. Chromium only, HTTPS/localhost only.
// Emits via assignable callbacks: onSample(id,bpm,ts), onStatus(id,connected), onBattery(id,pct).
import { parseHR } from './hr.js';

const HR_SERVICE = 'heart_rate';
const HR_CHAR = 'heart_rate_measurement';
const BAT_SERVICE = 'battery_service';
const BAT_CHAR = 'battery_level';

export const bluetoothSupported = () =>
  typeof navigator !== 'undefined' && !!navigator.bluetooth;

class SensorManager {
  constructor() {
    this.devices = new Map();      // id -> { device, char, backoff, timer, wanted }
    this.onSample = () => {};
    this.onStatus = () => {};
    this.onBattery = () => {};
    this.onAdded = () => {};       // (id, name)
  }

  // Must be called from a user gesture (click). Opens the browser device picker.
  async add() {
    const device = await navigator.bluetooth.requestDevice({
      filters: [{ services: [HR_SERVICE] }],
      optionalServices: [BAT_SERVICE],
    });
    await this._register(device);
    return { id: device.id, name: device.name || 'HR strap' };
  }

  // Reconnect straps already permitted for this origin (Chrome persists grants).
  async reconnectKnown(ids) {
    if (!navigator.bluetooth.getDevices) return [];
    const known = await navigator.bluetooth.getDevices();
    const out = [];
    for (const device of known) {
      if (ids && !ids.includes(device.id)) continue;
      await this._register(device).catch(() => {});
      out.push({ id: device.id, name: device.name || 'HR strap' });
    }
    return out;
  }

  async _register(device) {
    if (!this.devices.has(device.id)) {
      const entry = { device, char: null, backoff: 1000, timer: null, wanted: true };
      this.devices.set(device.id, entry);
      device.addEventListener('gattserverdisconnected', () => this._onDrop(device.id));
      this.onAdded(device.id, device.name || 'HR strap');
    }
    this.devices.get(device.id).wanted = true;
    await this._connect(device.id);
  }

  async _connect(id) {
    const entry = this.devices.get(id);
    if (!entry) return;
    const { device } = entry;
    const server = await device.gatt.connect();
    const service = await server.getPrimaryService(HR_SERVICE);
    const char = await service.getCharacteristic(HR_CHAR);
    await char.startNotifications();
    char.addEventListener('characteristicvaluechanged', (e) => {
      this.onSample(id, parseHR(e.target.value), Date.now());
    });
    entry.char = char;
    entry.backoff = 1000;
    this.onStatus(id, true);
    this._readBattery(id, server).catch(() => {});
  }

  async _readBattery(id, server) {
    const svc = await server.getPrimaryService(BAT_SERVICE);
    const ch = await svc.getCharacteristic(BAT_CHAR);
    const v = await ch.readValue();
    this.onBattery(id, v.getUint8(0));
  }

  _onDrop(id) {
    const entry = this.devices.get(id);
    if (!entry) return;
    entry.char = null;
    this.onStatus(id, false);
    if (!entry.wanted) return;
    clearTimeout(entry.timer);
    entry.timer = setTimeout(() => {
      this._connect(id).catch(() => this._onDrop(id));
    }, entry.backoff);
    entry.backoff = Math.min(8000, entry.backoff * 2);   // capped exponential backoff
  }

  remove(id) {
    const entry = this.devices.get(id);
    if (!entry) return;
    entry.wanted = false;
    clearTimeout(entry.timer);
    try { entry.device.gatt?.disconnect(); } catch {}
    this.devices.delete(id);
  }
}

export const sensors = new SensorManager();
