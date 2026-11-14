import{n as e}from"./rolldown-runtime-COiEfhsA.js";import{N as t,P as n}from"./index-UKN8g-gV.js";import{At as r,Cr as i,Fn as a,G as o,Gn as s,Hn as c,Mn as l,Sr as u,x as d}from"./engine-DnmWRFcc.js";import{a as f,f as p,p as m,s as h}from"./i18n-C8yVFACU.js";import{l as g,m as _,v}from"./products-DwcfKeJV.js";import{c as y,i as b,l as x}from"./families-Dmqk7KBG.js";function S(e,t,n){let r=n.normalize(`NFC`).replace(/[:\r\n]+/g,` `).replace(/\s+/g,` `).trim().slice(0,60),i=`VITRUM:${e}:${t.map(e=>e.join(`.`)).join(`,`)}:${r}`,a=2166136261;for(let e=0;e<i.length;e++)a=Math.imul(a^i.charCodeAt(e),16777619);return`${i}:${((a>>>0)%1679616).toString(36).padStart(4,`0`)}`}var C=/VITRUM:([0-9a-z]{4,12}):(\d+\.\d+\.\d+(?:,\d+\.\d+\.\d+)*):([^:\r\n]*):([0-9a-z]{4})/g;function w(e){let t=e.normalize(`NFC`),n=[],r=0;for(let e of t.matchAll(C)){r++;let t=e[2].split(`,`).map(e=>e.split(`.`).map(Number)),i=t.some(([e,t])=>!e&&!t),a=t.filter(([e,t])=>e||t);S(e[1],t,e[3])!==e[0]||a.some(([e,t,n])=>!e||!t||!n)||n.push({gallery:e[1],name:e[3].trim(),lines:a,code:e[0],retake:i})}return{codes:n,broken:(t.match(/VITRUM:/g)?.length??0)-r+(r-n.length)}}var T=`//---------------------------------------------------------------------
//
// QR Code Generator for JavaScript
//
// Copyright (c) 2009 Kazuhiko Arase
//
// URL: http://www.d-project.com/
//
// Licensed under the MIT license:
//  http://www.opensource.org/licenses/mit-license.php
//
// The word 'QR Code' is registered trademark of
// DENSO WAVE INCORPORATED
//  http://www.denso-wave.com/qrcode/faqpatent-e.html
//
//---------------------------------------------------------------------

var qrcode = function() {

  //---------------------------------------------------------------------
  // qrcode
  //---------------------------------------------------------------------

  /**
   * qrcode
   * @param typeNumber 1 to 40
   * @param errorCorrectionLevel 'L','M','Q','H'
   */
  var qrcode = function(typeNumber, errorCorrectionLevel) {

    var PAD0 = 0xEC;
    var PAD1 = 0x11;

    var _typeNumber = typeNumber;
    var _errorCorrectionLevel = QRErrorCorrectionLevel[errorCorrectionLevel];
    var _modules = null;
    var _moduleCount = 0;
    var _dataCache = null;
    var _dataList = [];

    var _this = {};

    var makeImpl = function(test, maskPattern) {

      _moduleCount = _typeNumber * 4 + 17;
      _modules = function(moduleCount) {
        var modules = new Array(moduleCount);
        for (var row = 0; row < moduleCount; row += 1) {
          modules[row] = new Array(moduleCount);
          for (var col = 0; col < moduleCount; col += 1) {
            modules[row][col] = null;
          }
        }
        return modules;
      }(_moduleCount);

      setupPositionProbePattern(0, 0);
      setupPositionProbePattern(_moduleCount - 7, 0);
      setupPositionProbePattern(0, _moduleCount - 7);
      setupPositionAdjustPattern();
      setupTimingPattern();
      setupTypeInfo(test, maskPattern);

      if (_typeNumber >= 7) {
        setupTypeNumber(test);
      }

      if (_dataCache == null) {
        _dataCache = createData(_typeNumber, _errorCorrectionLevel, _dataList);
      }

      mapData(_dataCache, maskPattern);
    };

    var setupPositionProbePattern = function(row, col) {

      for (var r = -1; r <= 7; r += 1) {

        if (row + r <= -1 || _moduleCount <= row + r) continue;

        for (var c = -1; c <= 7; c += 1) {

          if (col + c <= -1 || _moduleCount <= col + c) continue;

          if ( (0 <= r && r <= 6 && (c == 0 || c == 6) )
              || (0 <= c && c <= 6 && (r == 0 || r == 6) )
              || (2 <= r && r <= 4 && 2 <= c && c <= 4) ) {
            _modules[row + r][col + c] = true;
          } else {
            _modules[row + r][col + c] = false;
          }
        }
      }
    };

    var getBestMaskPattern = function() {

      var minLostPoint = 0;
      var pattern = 0;

      for (var i = 0; i < 8; i += 1) {

        makeImpl(true, i);

        var lostPoint = QRUtil.getLostPoint(_this);

        if (i == 0 || minLostPoint > lostPoint) {
          minLostPoint = lostPoint;
          pattern = i;
        }
      }

      return pattern;
    };

    var setupTimingPattern = function() {

      for (var r = 8; r < _moduleCount - 8; r += 1) {
        if (_modules[r][6] != null) {
          continue;
        }
        _modules[r][6] = (r % 2 == 0);
      }

      for (var c = 8; c < _moduleCount - 8; c += 1) {
        if (_modules[6][c] != null) {
          continue;
        }
        _modules[6][c] = (c % 2 == 0);
      }
    };

    var setupPositionAdjustPattern = function() {

      var pos = QRUtil.getPatternPosition(_typeNumber);

      for (var i = 0; i < pos.length; i += 1) {

        for (var j = 0; j < pos.length; j += 1) {

          var row = pos[i];
          var col = pos[j];

          if (_modules[row][col] != null) {
            continue;
          }

          for (var r = -2; r <= 2; r += 1) {

            for (var c = -2; c <= 2; c += 1) {

              if (r == -2 || r == 2 || c == -2 || c == 2
                  || (r == 0 && c == 0) ) {
                _modules[row + r][col + c] = true;
              } else {
                _modules[row + r][col + c] = false;
              }
            }
          }
        }
      }
    };

    var setupTypeNumber = function(test) {

      var bits = QRUtil.getBCHTypeNumber(_typeNumber);

      for (var i = 0; i < 18; i += 1) {
        var mod = (!test && ( (bits >> i) & 1) == 1);
        _modules[Math.floor(i / 3)][i % 3 + _moduleCount - 8 - 3] = mod;
      }

      for (var i = 0; i < 18; i += 1) {
        var mod = (!test && ( (bits >> i) & 1) == 1);
        _modules[i % 3 + _moduleCount - 8 - 3][Math.floor(i / 3)] = mod;
      }
    };

    var setupTypeInfo = function(test, maskPattern) {

      var data = (_errorCorrectionLevel << 3) | maskPattern;
      var bits = QRUtil.getBCHTypeInfo(data);

      // vertical
      for (var i = 0; i < 15; i += 1) {

        var mod = (!test && ( (bits >> i) & 1) == 1);

        if (i < 6) {
          _modules[i][8] = mod;
        } else if (i < 8) {
          _modules[i + 1][8] = mod;
        } else {
          _modules[_moduleCount - 15 + i][8] = mod;
        }
      }

      // horizontal
      for (var i = 0; i < 15; i += 1) {

        var mod = (!test && ( (bits >> i) & 1) == 1);

        if (i < 8) {
          _modules[8][_moduleCount - i - 1] = mod;
        } else if (i < 9) {
          _modules[8][15 - i - 1 + 1] = mod;
        } else {
          _modules[8][15 - i - 1] = mod;
        }
      }

      // fixed module
      _modules[_moduleCount - 8][8] = (!test);
    };

    var mapData = function(data, maskPattern) {

      var inc = -1;
      var row = _moduleCount - 1;
      var bitIndex = 7;
      var byteIndex = 0;
      var maskFunc = QRUtil.getMaskFunction(maskPattern);

      for (var col = _moduleCount - 1; col > 0; col -= 2) {

        if (col == 6) col -= 1;

        while (true) {

          for (var c = 0; c < 2; c += 1) {

            if (_modules[row][col - c] == null) {

              var dark = false;

              if (byteIndex < data.length) {
                dark = ( ( (data[byteIndex] >>> bitIndex) & 1) == 1);
              }

              var mask = maskFunc(row, col - c);

              if (mask) {
                dark = !dark;
              }

              _modules[row][col - c] = dark;
              bitIndex -= 1;

              if (bitIndex == -1) {
                byteIndex += 1;
                bitIndex = 7;
              }
            }
          }

          row += inc;

          if (row < 0 || _moduleCount <= row) {
            row -= inc;
            inc = -inc;
            break;
          }
        }
      }
    };

    var createBytes = function(buffer, rsBlocks) {

      var offset = 0;

      var maxDcCount = 0;
      var maxEcCount = 0;

      var dcdata = new Array(rsBlocks.length);
      var ecdata = new Array(rsBlocks.length);

      for (var r = 0; r < rsBlocks.length; r += 1) {

        var dcCount = rsBlocks[r].dataCount;
        var ecCount = rsBlocks[r].totalCount - dcCount;

        maxDcCount = Math.max(maxDcCount, dcCount);
        maxEcCount = Math.max(maxEcCount, ecCount);

        dcdata[r] = new Array(dcCount);

        for (var i = 0; i < dcdata[r].length; i += 1) {
          dcdata[r][i] = 0xff & buffer.getBuffer()[i + offset];
        }
        offset += dcCount;

        var rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
        var rawPoly = qrPolynomial(dcdata[r], rsPoly.getLength() - 1);

        var modPoly = rawPoly.mod(rsPoly);
        ecdata[r] = new Array(rsPoly.getLength() - 1);
        for (var i = 0; i < ecdata[r].length; i += 1) {
          var modIndex = i + modPoly.getLength() - ecdata[r].length;
          ecdata[r][i] = (modIndex >= 0)? modPoly.getAt(modIndex) : 0;
        }
      }

      var totalCodeCount = 0;
      for (var i = 0; i < rsBlocks.length; i += 1) {
        totalCodeCount += rsBlocks[i].totalCount;
      }

      var data = new Array(totalCodeCount);
      var index = 0;

      for (var i = 0; i < maxDcCount; i += 1) {
        for (var r = 0; r < rsBlocks.length; r += 1) {
          if (i < dcdata[r].length) {
            data[index] = dcdata[r][i];
            index += 1;
          }
        }
      }

      for (var i = 0; i < maxEcCount; i += 1) {
        for (var r = 0; r < rsBlocks.length; r += 1) {
          if (i < ecdata[r].length) {
            data[index] = ecdata[r][i];
            index += 1;
          }
        }
      }

      return data;
    };

    var createData = function(typeNumber, errorCorrectionLevel, dataList) {

      var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, errorCorrectionLevel);

      var buffer = qrBitBuffer();

      for (var i = 0; i < dataList.length; i += 1) {
        var data = dataList[i];
        buffer.put(data.getMode(), 4);
        buffer.put(data.getLength(), QRUtil.getLengthInBits(data.getMode(), typeNumber) );
        data.write(buffer);
      }

      // calc num max data.
      var totalDataCount = 0;
      for (var i = 0; i < rsBlocks.length; i += 1) {
        totalDataCount += rsBlocks[i].dataCount;
      }

      if (buffer.getLengthInBits() > totalDataCount * 8) {
        throw 'code length overflow. ('
          + buffer.getLengthInBits()
          + '>'
          + totalDataCount * 8
          + ')';
      }

      // end code
      if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {
        buffer.put(0, 4);
      }

      // padding
      while (buffer.getLengthInBits() % 8 != 0) {
        buffer.putBit(false);
      }

      // padding
      while (true) {

        if (buffer.getLengthInBits() >= totalDataCount * 8) {
          break;
        }
        buffer.put(PAD0, 8);

        if (buffer.getLengthInBits() >= totalDataCount * 8) {
          break;
        }
        buffer.put(PAD1, 8);
      }

      return createBytes(buffer, rsBlocks);
    };

    _this.addData = function(data, mode) {

      mode = mode || 'Byte';

      var newData = null;

      switch(mode) {
      case 'Numeric' :
        newData = qrNumber(data);
        break;
      case 'Alphanumeric' :
        newData = qrAlphaNum(data);
        break;
      case 'Byte' :
        newData = qr8BitByte(data);
        break;
      case 'Kanji' :
        newData = qrKanji(data);
        break;
      default :
        throw 'mode:' + mode;
      }

      _dataList.push(newData);
      _dataCache = null;
    };

    _this.isDark = function(row, col) {
      if (row < 0 || _moduleCount <= row || col < 0 || _moduleCount <= col) {
        throw row + ',' + col;
      }
      return _modules[row][col];
    };

    _this.getModuleCount = function() {
      return _moduleCount;
    };

    _this.make = function() {
      if (_typeNumber < 1) {
        var typeNumber = 1;

        for (; typeNumber < 40; typeNumber++) {
          var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, _errorCorrectionLevel);
          var buffer = qrBitBuffer();

          for (var i = 0; i < _dataList.length; i++) {
            var data = _dataList[i];
            buffer.put(data.getMode(), 4);
            buffer.put(data.getLength(), QRUtil.getLengthInBits(data.getMode(), typeNumber) );
            data.write(buffer);
          }

          var totalDataCount = 0;
          for (var i = 0; i < rsBlocks.length; i++) {
            totalDataCount += rsBlocks[i].dataCount;
          }

          if (buffer.getLengthInBits() <= totalDataCount * 8) {
            break;
          }
        }

        _typeNumber = typeNumber;
      }

      makeImpl(false, getBestMaskPattern() );
    };

    _this.createTableTag = function(cellSize, margin) {

      cellSize = cellSize || 2;
      margin = (typeof margin == 'undefined')? cellSize * 4 : margin;

      var qrHtml = '';

      qrHtml += '<table style="';
      qrHtml += ' border-width: 0px; border-style: none;';
      qrHtml += ' border-collapse: collapse;';
      qrHtml += ' padding: 0px; margin: ' + margin + 'px;';
      qrHtml += '">';
      qrHtml += '<tbody>';

      for (var r = 0; r < _this.getModuleCount(); r += 1) {

        qrHtml += '<tr>';

        for (var c = 0; c < _this.getModuleCount(); c += 1) {
          qrHtml += '<td style="';
          qrHtml += ' border-width: 0px; border-style: none;';
          qrHtml += ' border-collapse: collapse;';
          qrHtml += ' padding: 0px; margin: 0px;';
          qrHtml += ' width: ' + cellSize + 'px;';
          qrHtml += ' height: ' + cellSize + 'px;';
          qrHtml += ' background-color: ';
          qrHtml += _this.isDark(r, c)? '#000000' : '#ffffff';
          qrHtml += ';';
          qrHtml += '"/>';
        }

        qrHtml += '</tr>';
      }

      qrHtml += '</tbody>';
      qrHtml += '</table>';

      return qrHtml;
    };

    _this.createSvgTag = function(cellSize, margin, alt, title) {

      var opts = {};
      if (typeof arguments[0] == 'object') {
        // Called by options.
        opts = arguments[0];
        // overwrite cellSize and margin.
        cellSize = opts.cellSize;
        margin = opts.margin;
        alt = opts.alt;
        title = opts.title;
      }

      cellSize = cellSize || 2;
      margin = (typeof margin == 'undefined')? cellSize * 4 : margin;

      // Compose alt property surrogate
      alt = (typeof alt === 'string') ? {text: alt} : alt || {};
      alt.text = alt.text || null;
      alt.id = (alt.text) ? alt.id || 'qrcode-description' : null;

      // Compose title property surrogate
      title = (typeof title === 'string') ? {text: title} : title || {};
      title.text = title.text || null;
      title.id = (title.text) ? title.id || 'qrcode-title' : null;

      var size = _this.getModuleCount() * cellSize + margin * 2;
      var c, mc, r, mr, qrSvg='', rect;

      rect = 'l' + cellSize + ',0 0,' + cellSize +
        ' -' + cellSize + ',0 0,-' + cellSize + 'z ';

      qrSvg += '<svg version="1.1" xmlns="http://www.w3.org/2000/svg"';
      qrSvg += !opts.scalable ? ' width="' + size + 'px" height="' + size + 'px"' : '';
      qrSvg += ' viewBox="0 0 ' + size + ' ' + size + '" ';
      qrSvg += ' preserveAspectRatio="xMinYMin meet"';
      qrSvg += (title.text || alt.text) ? ' role="img" aria-labelledby="' +
          escapeXml([title.id, alt.id].join(' ').trim() ) + '"' : '';
      qrSvg += '>';
      qrSvg += (title.text) ? '<title id="' + escapeXml(title.id) + '">' +
          escapeXml(title.text) + '</title>' : '';
      qrSvg += (alt.text) ? '<description id="' + escapeXml(alt.id) + '">' +
          escapeXml(alt.text) + '</description>' : '';
      qrSvg += '<rect width="100%" height="100%" fill="white" cx="0" cy="0"/>';
      qrSvg += '<path d="';

      for (r = 0; r < _this.getModuleCount(); r += 1) {
        mr = r * cellSize + margin;
        for (c = 0; c < _this.getModuleCount(); c += 1) {
          if (_this.isDark(r, c) ) {
            mc = c*cellSize+margin;
            qrSvg += 'M' + mc + ',' + mr + rect;
          }
        }
      }

      qrSvg += '" stroke="transparent" fill="black"/>';
      qrSvg += '</svg>';

      return qrSvg;
    };

    _this.createDataURL = function(cellSize, margin) {

      cellSize = cellSize || 2;
      margin = (typeof margin == 'undefined')? cellSize * 4 : margin;

      var size = _this.getModuleCount() * cellSize + margin * 2;
      var min = margin;
      var max = size - margin;

      return createDataURL(size, size, function(x, y) {
        if (min <= x && x < max && min <= y && y < max) {
          var c = Math.floor( (x - min) / cellSize);
          var r = Math.floor( (y - min) / cellSize);
          return _this.isDark(r, c)? 0 : 1;
        } else {
          return 1;
        }
      } );
    };

    _this.createImgTag = function(cellSize, margin, alt) {

      cellSize = cellSize || 2;
      margin = (typeof margin == 'undefined')? cellSize * 4 : margin;

      var size = _this.getModuleCount() * cellSize + margin * 2;

      var img = '';
      img += '<img';
      img += '\\u0020src="';
      img += _this.createDataURL(cellSize, margin);
      img += '"';
      img += '\\u0020width="';
      img += size;
      img += '"';
      img += '\\u0020height="';
      img += size;
      img += '"';
      if (alt) {
        img += '\\u0020alt="';
        img += escapeXml(alt);
        img += '"';
      }
      img += '/>';

      return img;
    };

    var escapeXml = function(s) {
      var escaped = '';
      for (var i = 0; i < s.length; i += 1) {
        var c = s.charAt(i);
        switch(c) {
        case '<': escaped += '&lt;'; break;
        case '>': escaped += '&gt;'; break;
        case '&': escaped += '&amp;'; break;
        case '"': escaped += '&quot;'; break;
        default : escaped += c; break;
        }
      }
      return escaped;
    };

    var _createHalfASCII = function(margin) {
      var cellSize = 1;
      margin = (typeof margin == 'undefined')? cellSize * 2 : margin;

      var size = _this.getModuleCount() * cellSize + margin * 2;
      var min = margin;
      var max = size - margin;

      var y, x, r1, r2, p;

      var blocks = {
        '██': '█',
        '█ ': '▀',
        ' █': '▄',
        '  ': ' '
      };

      var blocksLastLineNoMargin = {
        '██': '▀',
        '█ ': '▀',
        ' █': ' ',
        '  ': ' '
      };

      var ascii = '';
      for (y = 0; y < size; y += 2) {
        r1 = Math.floor((y - min) / cellSize);
        r2 = Math.floor((y + 1 - min) / cellSize);
        for (x = 0; x < size; x += 1) {
          p = '█';

          if (min <= x && x < max && min <= y && y < max && _this.isDark(r1, Math.floor((x - min) / cellSize))) {
            p = ' ';
          }

          if (min <= x && x < max && min <= y+1 && y+1 < max && _this.isDark(r2, Math.floor((x - min) / cellSize))) {
            p += ' ';
          }
          else {
            p += '█';
          }

          // Output 2 characters per pixel, to create full square. 1 character per pixels gives only half width of square.
          ascii += (margin < 1 && y+1 >= max) ? blocksLastLineNoMargin[p] : blocks[p];
        }

        ascii += '\\n';
      }

      if (size % 2 && margin > 0) {
        return ascii.substring(0, ascii.length - size - 1) + Array(size+1).join('▀');
      }

      return ascii.substring(0, ascii.length-1);
    };

    _this.createASCII = function(cellSize, margin) {
      cellSize = cellSize || 1;

      if (cellSize < 2) {
        return _createHalfASCII(margin);
      }

      cellSize -= 1;
      margin = (typeof margin == 'undefined')? cellSize * 2 : margin;

      var size = _this.getModuleCount() * cellSize + margin * 2;
      var min = margin;
      var max = size - margin;

      var y, x, r, p;

      var white = Array(cellSize+1).join('██');
      var black = Array(cellSize+1).join('  ');

      var ascii = '';
      var line = '';
      for (y = 0; y < size; y += 1) {
        r = Math.floor( (y - min) / cellSize);
        line = '';
        for (x = 0; x < size; x += 1) {
          p = 1;

          if (min <= x && x < max && min <= y && y < max && _this.isDark(r, Math.floor((x - min) / cellSize))) {
            p = 0;
          }

          // Output 2 characters per pixel, to create full square. 1 character per pixels gives only half width of square.
          line += p ? white : black;
        }

        for (r = 0; r < cellSize; r += 1) {
          ascii += line + '\\n';
        }
      }

      return ascii.substring(0, ascii.length-1);
    };

    _this.renderTo2dContext = function(context, cellSize) {
      cellSize = cellSize || 2;
      var length = _this.getModuleCount();
      for (var row = 0; row < length; row++) {
        for (var col = 0; col < length; col++) {
          context.fillStyle = _this.isDark(row, col) ? 'black' : 'white';
          context.fillRect(row * cellSize, col * cellSize, cellSize, cellSize);
        }
      }
    }

    return _this;
  };

  //---------------------------------------------------------------------
  // qrcode.stringToBytes
  //---------------------------------------------------------------------

  qrcode.stringToBytesFuncs = {
    'default' : function(s) {
      var bytes = [];
      for (var i = 0; i < s.length; i += 1) {
        var c = s.charCodeAt(i);
        bytes.push(c & 0xff);
      }
      return bytes;
    }
  };

  qrcode.stringToBytes = qrcode.stringToBytesFuncs['default'];

  //---------------------------------------------------------------------
  // qrcode.createStringToBytes
  //---------------------------------------------------------------------

  /**
   * @param unicodeData base64 string of byte array.
   * [16bit Unicode],[16bit Bytes], ...
   * @param numChars
   */
  qrcode.createStringToBytes = function(unicodeData, numChars) {

    // create conversion map.

    var unicodeMap = function() {

      var bin = base64DecodeInputStream(unicodeData);
      var read = function() {
        var b = bin.read();
        if (b == -1) throw 'eof';
        return b;
      };

      var count = 0;
      var unicodeMap = {};
      while (true) {
        var b0 = bin.read();
        if (b0 == -1) break;
        var b1 = read();
        var b2 = read();
        var b3 = read();
        var k = String.fromCharCode( (b0 << 8) | b1);
        var v = (b2 << 8) | b3;
        unicodeMap[k] = v;
        count += 1;
      }
      if (count != numChars) {
        throw count + ' != ' + numChars;
      }

      return unicodeMap;
    }();

    var unknownChar = '?'.charCodeAt(0);

    return function(s) {
      var bytes = [];
      for (var i = 0; i < s.length; i += 1) {
        var c = s.charCodeAt(i);
        if (c < 128) {
          bytes.push(c);
        } else {
          var b = unicodeMap[s.charAt(i)];
          if (typeof b == 'number') {
            if ( (b & 0xff) == b) {
              // 1byte
              bytes.push(b);
            } else {
              // 2bytes
              bytes.push(b >>> 8);
              bytes.push(b & 0xff);
            }
          } else {
            bytes.push(unknownChar);
          }
        }
      }
      return bytes;
    };
  };

  //---------------------------------------------------------------------
  // QRMode
  //---------------------------------------------------------------------

  var QRMode = {
    MODE_NUMBER :    1 << 0,
    MODE_ALPHA_NUM : 1 << 1,
    MODE_8BIT_BYTE : 1 << 2,
    MODE_KANJI :     1 << 3
  };

  //---------------------------------------------------------------------
  // QRErrorCorrectionLevel
  //---------------------------------------------------------------------

  var QRErrorCorrectionLevel = {
    L : 1,
    M : 0,
    Q : 3,
    H : 2
  };

  //---------------------------------------------------------------------
  // QRMaskPattern
  //---------------------------------------------------------------------

  var QRMaskPattern = {
    PATTERN000 : 0,
    PATTERN001 : 1,
    PATTERN010 : 2,
    PATTERN011 : 3,
    PATTERN100 : 4,
    PATTERN101 : 5,
    PATTERN110 : 6,
    PATTERN111 : 7
  };

  //---------------------------------------------------------------------
  // QRUtil
  //---------------------------------------------------------------------

  var QRUtil = function() {

    var PATTERN_POSITION_TABLE = [
      [],
      [6, 18],
      [6, 22],
      [6, 26],
      [6, 30],
      [6, 34],
      [6, 22, 38],
      [6, 24, 42],
      [6, 26, 46],
      [6, 28, 50],
      [6, 30, 54],
      [6, 32, 58],
      [6, 34, 62],
      [6, 26, 46, 66],
      [6, 26, 48, 70],
      [6, 26, 50, 74],
      [6, 30, 54, 78],
      [6, 30, 56, 82],
      [6, 30, 58, 86],
      [6, 34, 62, 90],
      [6, 28, 50, 72, 94],
      [6, 26, 50, 74, 98],
      [6, 30, 54, 78, 102],
      [6, 28, 54, 80, 106],
      [6, 32, 58, 84, 110],
      [6, 30, 58, 86, 114],
      [6, 34, 62, 90, 118],
      [6, 26, 50, 74, 98, 122],
      [6, 30, 54, 78, 102, 126],
      [6, 26, 52, 78, 104, 130],
      [6, 30, 56, 82, 108, 134],
      [6, 34, 60, 86, 112, 138],
      [6, 30, 58, 86, 114, 142],
      [6, 34, 62, 90, 118, 146],
      [6, 30, 54, 78, 102, 126, 150],
      [6, 24, 50, 76, 102, 128, 154],
      [6, 28, 54, 80, 106, 132, 158],
      [6, 32, 58, 84, 110, 136, 162],
      [6, 26, 54, 82, 110, 138, 166],
      [6, 30, 58, 86, 114, 142, 170]
    ];
    var G15 = (1 << 10) | (1 << 8) | (1 << 5) | (1 << 4) | (1 << 2) | (1 << 1) | (1 << 0);
    var G18 = (1 << 12) | (1 << 11) | (1 << 10) | (1 << 9) | (1 << 8) | (1 << 5) | (1 << 2) | (1 << 0);
    var G15_MASK = (1 << 14) | (1 << 12) | (1 << 10) | (1 << 4) | (1 << 1);

    var _this = {};

    var getBCHDigit = function(data) {
      var digit = 0;
      while (data != 0) {
        digit += 1;
        data >>>= 1;
      }
      return digit;
    };

    _this.getBCHTypeInfo = function(data) {
      var d = data << 10;
      while (getBCHDigit(d) - getBCHDigit(G15) >= 0) {
        d ^= (G15 << (getBCHDigit(d) - getBCHDigit(G15) ) );
      }
      return ( (data << 10) | d) ^ G15_MASK;
    };

    _this.getBCHTypeNumber = function(data) {
      var d = data << 12;
      while (getBCHDigit(d) - getBCHDigit(G18) >= 0) {
        d ^= (G18 << (getBCHDigit(d) - getBCHDigit(G18) ) );
      }
      return (data << 12) | d;
    };

    _this.getPatternPosition = function(typeNumber) {
      return PATTERN_POSITION_TABLE[typeNumber - 1];
    };

    _this.getMaskFunction = function(maskPattern) {

      switch (maskPattern) {

      case QRMaskPattern.PATTERN000 :
        return function(i, j) { return (i + j) % 2 == 0; };
      case QRMaskPattern.PATTERN001 :
        return function(i, j) { return i % 2 == 0; };
      case QRMaskPattern.PATTERN010 :
        return function(i, j) { return j % 3 == 0; };
      case QRMaskPattern.PATTERN011 :
        return function(i, j) { return (i + j) % 3 == 0; };
      case QRMaskPattern.PATTERN100 :
        return function(i, j) { return (Math.floor(i / 2) + Math.floor(j / 3) ) % 2 == 0; };
      case QRMaskPattern.PATTERN101 :
        return function(i, j) { return (i * j) % 2 + (i * j) % 3 == 0; };
      case QRMaskPattern.PATTERN110 :
        return function(i, j) { return ( (i * j) % 2 + (i * j) % 3) % 2 == 0; };
      case QRMaskPattern.PATTERN111 :
        return function(i, j) { return ( (i * j) % 3 + (i + j) % 2) % 2 == 0; };

      default :
        throw 'bad maskPattern:' + maskPattern;
      }
    };

    _this.getErrorCorrectPolynomial = function(errorCorrectLength) {
      var a = qrPolynomial([1], 0);
      for (var i = 0; i < errorCorrectLength; i += 1) {
        a = a.multiply(qrPolynomial([1, QRMath.gexp(i)], 0) );
      }
      return a;
    };

    _this.getLengthInBits = function(mode, type) {

      if (1 <= type && type < 10) {

        // 1 - 9

        switch(mode) {
        case QRMode.MODE_NUMBER    : return 10;
        case QRMode.MODE_ALPHA_NUM : return 9;
        case QRMode.MODE_8BIT_BYTE : return 8;
        case QRMode.MODE_KANJI     : return 8;
        default :
          throw 'mode:' + mode;
        }

      } else if (type < 27) {

        // 10 - 26

        switch(mode) {
        case QRMode.MODE_NUMBER    : return 12;
        case QRMode.MODE_ALPHA_NUM : return 11;
        case QRMode.MODE_8BIT_BYTE : return 16;
        case QRMode.MODE_KANJI     : return 10;
        default :
          throw 'mode:' + mode;
        }

      } else if (type < 41) {

        // 27 - 40

        switch(mode) {
        case QRMode.MODE_NUMBER    : return 14;
        case QRMode.MODE_ALPHA_NUM : return 13;
        case QRMode.MODE_8BIT_BYTE : return 16;
        case QRMode.MODE_KANJI     : return 12;
        default :
          throw 'mode:' + mode;
        }

      } else {
        throw 'type:' + type;
      }
    };

    _this.getLostPoint = function(qrcode) {

      var moduleCount = qrcode.getModuleCount();

      var lostPoint = 0;

      // LEVEL1

      for (var row = 0; row < moduleCount; row += 1) {
        for (var col = 0; col < moduleCount; col += 1) {

          var sameCount = 0;
          var dark = qrcode.isDark(row, col);

          for (var r = -1; r <= 1; r += 1) {

            if (row + r < 0 || moduleCount <= row + r) {
              continue;
            }

            for (var c = -1; c <= 1; c += 1) {

              if (col + c < 0 || moduleCount <= col + c) {
                continue;
              }

              if (r == 0 && c == 0) {
                continue;
              }

              if (dark == qrcode.isDark(row + r, col + c) ) {
                sameCount += 1;
              }
            }
          }

          if (sameCount > 5) {
            lostPoint += (3 + sameCount - 5);
          }
        }
      };

      // LEVEL2

      for (var row = 0; row < moduleCount - 1; row += 1) {
        for (var col = 0; col < moduleCount - 1; col += 1) {
          var count = 0;
          if (qrcode.isDark(row, col) ) count += 1;
          if (qrcode.isDark(row + 1, col) ) count += 1;
          if (qrcode.isDark(row, col + 1) ) count += 1;
          if (qrcode.isDark(row + 1, col + 1) ) count += 1;
          if (count == 0 || count == 4) {
            lostPoint += 3;
          }
        }
      }

      // LEVEL3

      for (var row = 0; row < moduleCount; row += 1) {
        for (var col = 0; col < moduleCount - 6; col += 1) {
          if (qrcode.isDark(row, col)
              && !qrcode.isDark(row, col + 1)
              &&  qrcode.isDark(row, col + 2)
              &&  qrcode.isDark(row, col + 3)
              &&  qrcode.isDark(row, col + 4)
              && !qrcode.isDark(row, col + 5)
              &&  qrcode.isDark(row, col + 6) ) {
            lostPoint += 40;
          }
        }
      }

      for (var col = 0; col < moduleCount; col += 1) {
        for (var row = 0; row < moduleCount - 6; row += 1) {
          if (qrcode.isDark(row, col)
              && !qrcode.isDark(row + 1, col)
              &&  qrcode.isDark(row + 2, col)
              &&  qrcode.isDark(row + 3, col)
              &&  qrcode.isDark(row + 4, col)
              && !qrcode.isDark(row + 5, col)
              &&  qrcode.isDark(row + 6, col) ) {
            lostPoint += 40;
          }
        }
      }

      // LEVEL4

      var darkCount = 0;

      for (var col = 0; col < moduleCount; col += 1) {
        for (var row = 0; row < moduleCount; row += 1) {
          if (qrcode.isDark(row, col) ) {
            darkCount += 1;
          }
        }
      }

      var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
      lostPoint += ratio * 10;

      return lostPoint;
    };

    return _this;
  }();

  //---------------------------------------------------------------------
  // QRMath
  //---------------------------------------------------------------------

  var QRMath = function() {

    var EXP_TABLE = new Array(256);
    var LOG_TABLE = new Array(256);

    // initialize tables
    for (var i = 0; i < 8; i += 1) {
      EXP_TABLE[i] = 1 << i;
    }
    for (var i = 8; i < 256; i += 1) {
      EXP_TABLE[i] = EXP_TABLE[i - 4]
        ^ EXP_TABLE[i - 5]
        ^ EXP_TABLE[i - 6]
        ^ EXP_TABLE[i - 8];
    }
    for (var i = 0; i < 255; i += 1) {
      LOG_TABLE[EXP_TABLE[i] ] = i;
    }

    var _this = {};

    _this.glog = function(n) {

      if (n < 1) {
        throw 'glog(' + n + ')';
      }

      return LOG_TABLE[n];
    };

    _this.gexp = function(n) {

      while (n < 0) {
        n += 255;
      }

      while (n >= 256) {
        n -= 255;
      }

      return EXP_TABLE[n];
    };

    return _this;
  }();

  //---------------------------------------------------------------------
  // qrPolynomial
  //---------------------------------------------------------------------

  function qrPolynomial(num, shift) {

    if (typeof num.length == 'undefined') {
      throw num.length + '/' + shift;
    }

    var _num = function() {
      var offset = 0;
      while (offset < num.length && num[offset] == 0) {
        offset += 1;
      }
      var _num = new Array(num.length - offset + shift);
      for (var i = 0; i < num.length - offset; i += 1) {
        _num[i] = num[i + offset];
      }
      return _num;
    }();

    var _this = {};

    _this.getAt = function(index) {
      return _num[index];
    };

    _this.getLength = function() {
      return _num.length;
    };

    _this.multiply = function(e) {

      var num = new Array(_this.getLength() + e.getLength() - 1);

      for (var i = 0; i < _this.getLength(); i += 1) {
        for (var j = 0; j < e.getLength(); j += 1) {
          num[i + j] ^= QRMath.gexp(QRMath.glog(_this.getAt(i) ) + QRMath.glog(e.getAt(j) ) );
        }
      }

      return qrPolynomial(num, 0);
    };

    _this.mod = function(e) {

      if (_this.getLength() - e.getLength() < 0) {
        return _this;
      }

      var ratio = QRMath.glog(_this.getAt(0) ) - QRMath.glog(e.getAt(0) );

      var num = new Array(_this.getLength() );
      for (var i = 0; i < _this.getLength(); i += 1) {
        num[i] = _this.getAt(i);
      }

      for (var i = 0; i < e.getLength(); i += 1) {
        num[i] ^= QRMath.gexp(QRMath.glog(e.getAt(i) ) + ratio);
      }

      // recursive call
      return qrPolynomial(num, 0).mod(e);
    };

    return _this;
  };

  //---------------------------------------------------------------------
  // QRRSBlock
  //---------------------------------------------------------------------

  var QRRSBlock = function() {

    var RS_BLOCK_TABLE = [

      // L
      // M
      // Q
      // H

      // 1
      [1, 26, 19],
      [1, 26, 16],
      [1, 26, 13],
      [1, 26, 9],

      // 2
      [1, 44, 34],
      [1, 44, 28],
      [1, 44, 22],
      [1, 44, 16],

      // 3
      [1, 70, 55],
      [1, 70, 44],
      [2, 35, 17],
      [2, 35, 13],

      // 4
      [1, 100, 80],
      [2, 50, 32],
      [2, 50, 24],
      [4, 25, 9],

      // 5
      [1, 134, 108],
      [2, 67, 43],
      [2, 33, 15, 2, 34, 16],
      [2, 33, 11, 2, 34, 12],

      // 6
      [2, 86, 68],
      [4, 43, 27],
      [4, 43, 19],
      [4, 43, 15],

      // 7
      [2, 98, 78],
      [4, 49, 31],
      [2, 32, 14, 4, 33, 15],
      [4, 39, 13, 1, 40, 14],

      // 8
      [2, 121, 97],
      [2, 60, 38, 2, 61, 39],
      [4, 40, 18, 2, 41, 19],
      [4, 40, 14, 2, 41, 15],

      // 9
      [2, 146, 116],
      [3, 58, 36, 2, 59, 37],
      [4, 36, 16, 4, 37, 17],
      [4, 36, 12, 4, 37, 13],

      // 10
      [2, 86, 68, 2, 87, 69],
      [4, 69, 43, 1, 70, 44],
      [6, 43, 19, 2, 44, 20],
      [6, 43, 15, 2, 44, 16],

      // 11
      [4, 101, 81],
      [1, 80, 50, 4, 81, 51],
      [4, 50, 22, 4, 51, 23],
      [3, 36, 12, 8, 37, 13],

      // 12
      [2, 116, 92, 2, 117, 93],
      [6, 58, 36, 2, 59, 37],
      [4, 46, 20, 6, 47, 21],
      [7, 42, 14, 4, 43, 15],

      // 13
      [4, 133, 107],
      [8, 59, 37, 1, 60, 38],
      [8, 44, 20, 4, 45, 21],
      [12, 33, 11, 4, 34, 12],

      // 14
      [3, 145, 115, 1, 146, 116],
      [4, 64, 40, 5, 65, 41],
      [11, 36, 16, 5, 37, 17],
      [11, 36, 12, 5, 37, 13],

      // 15
      [5, 109, 87, 1, 110, 88],
      [5, 65, 41, 5, 66, 42],
      [5, 54, 24, 7, 55, 25],
      [11, 36, 12, 7, 37, 13],

      // 16
      [5, 122, 98, 1, 123, 99],
      [7, 73, 45, 3, 74, 46],
      [15, 43, 19, 2, 44, 20],
      [3, 45, 15, 13, 46, 16],

      // 17
      [1, 135, 107, 5, 136, 108],
      [10, 74, 46, 1, 75, 47],
      [1, 50, 22, 15, 51, 23],
      [2, 42, 14, 17, 43, 15],

      // 18
      [5, 150, 120, 1, 151, 121],
      [9, 69, 43, 4, 70, 44],
      [17, 50, 22, 1, 51, 23],
      [2, 42, 14, 19, 43, 15],

      // 19
      [3, 141, 113, 4, 142, 114],
      [3, 70, 44, 11, 71, 45],
      [17, 47, 21, 4, 48, 22],
      [9, 39, 13, 16, 40, 14],

      // 20
      [3, 135, 107, 5, 136, 108],
      [3, 67, 41, 13, 68, 42],
      [15, 54, 24, 5, 55, 25],
      [15, 43, 15, 10, 44, 16],

      // 21
      [4, 144, 116, 4, 145, 117],
      [17, 68, 42],
      [17, 50, 22, 6, 51, 23],
      [19, 46, 16, 6, 47, 17],

      // 22
      [2, 139, 111, 7, 140, 112],
      [17, 74, 46],
      [7, 54, 24, 16, 55, 25],
      [34, 37, 13],

      // 23
      [4, 151, 121, 5, 152, 122],
      [4, 75, 47, 14, 76, 48],
      [11, 54, 24, 14, 55, 25],
      [16, 45, 15, 14, 46, 16],

      // 24
      [6, 147, 117, 4, 148, 118],
      [6, 73, 45, 14, 74, 46],
      [11, 54, 24, 16, 55, 25],
      [30, 46, 16, 2, 47, 17],

      // 25
      [8, 132, 106, 4, 133, 107],
      [8, 75, 47, 13, 76, 48],
      [7, 54, 24, 22, 55, 25],
      [22, 45, 15, 13, 46, 16],

      // 26
      [10, 142, 114, 2, 143, 115],
      [19, 74, 46, 4, 75, 47],
      [28, 50, 22, 6, 51, 23],
      [33, 46, 16, 4, 47, 17],

      // 27
      [8, 152, 122, 4, 153, 123],
      [22, 73, 45, 3, 74, 46],
      [8, 53, 23, 26, 54, 24],
      [12, 45, 15, 28, 46, 16],

      // 28
      [3, 147, 117, 10, 148, 118],
      [3, 73, 45, 23, 74, 46],
      [4, 54, 24, 31, 55, 25],
      [11, 45, 15, 31, 46, 16],

      // 29
      [7, 146, 116, 7, 147, 117],
      [21, 73, 45, 7, 74, 46],
      [1, 53, 23, 37, 54, 24],
      [19, 45, 15, 26, 46, 16],

      // 30
      [5, 145, 115, 10, 146, 116],
      [19, 75, 47, 10, 76, 48],
      [15, 54, 24, 25, 55, 25],
      [23, 45, 15, 25, 46, 16],

      // 31
      [13, 145, 115, 3, 146, 116],
      [2, 74, 46, 29, 75, 47],
      [42, 54, 24, 1, 55, 25],
      [23, 45, 15, 28, 46, 16],

      // 32
      [17, 145, 115],
      [10, 74, 46, 23, 75, 47],
      [10, 54, 24, 35, 55, 25],
      [19, 45, 15, 35, 46, 16],

      // 33
      [17, 145, 115, 1, 146, 116],
      [14, 74, 46, 21, 75, 47],
      [29, 54, 24, 19, 55, 25],
      [11, 45, 15, 46, 46, 16],

      // 34
      [13, 145, 115, 6, 146, 116],
      [14, 74, 46, 23, 75, 47],
      [44, 54, 24, 7, 55, 25],
      [59, 46, 16, 1, 47, 17],

      // 35
      [12, 151, 121, 7, 152, 122],
      [12, 75, 47, 26, 76, 48],
      [39, 54, 24, 14, 55, 25],
      [22, 45, 15, 41, 46, 16],

      // 36
      [6, 151, 121, 14, 152, 122],
      [6, 75, 47, 34, 76, 48],
      [46, 54, 24, 10, 55, 25],
      [2, 45, 15, 64, 46, 16],

      // 37
      [17, 152, 122, 4, 153, 123],
      [29, 74, 46, 14, 75, 47],
      [49, 54, 24, 10, 55, 25],
      [24, 45, 15, 46, 46, 16],

      // 38
      [4, 152, 122, 18, 153, 123],
      [13, 74, 46, 32, 75, 47],
      [48, 54, 24, 14, 55, 25],
      [42, 45, 15, 32, 46, 16],

      // 39
      [20, 147, 117, 4, 148, 118],
      [40, 75, 47, 7, 76, 48],
      [43, 54, 24, 22, 55, 25],
      [10, 45, 15, 67, 46, 16],

      // 40
      [19, 148, 118, 6, 149, 119],
      [18, 75, 47, 31, 76, 48],
      [34, 54, 24, 34, 55, 25],
      [20, 45, 15, 61, 46, 16]
    ];

    var qrRSBlock = function(totalCount, dataCount) {
      var _this = {};
      _this.totalCount = totalCount;
      _this.dataCount = dataCount;
      return _this;
    };

    var _this = {};

    var getRsBlockTable = function(typeNumber, errorCorrectionLevel) {

      switch(errorCorrectionLevel) {
      case QRErrorCorrectionLevel.L :
        return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];
      case QRErrorCorrectionLevel.M :
        return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];
      case QRErrorCorrectionLevel.Q :
        return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];
      case QRErrorCorrectionLevel.H :
        return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];
      default :
        return undefined;
      }
    };

    _this.getRSBlocks = function(typeNumber, errorCorrectionLevel) {

      var rsBlock = getRsBlockTable(typeNumber, errorCorrectionLevel);

      if (typeof rsBlock == 'undefined') {
        throw 'bad rs block @ typeNumber:' + typeNumber +
            '/errorCorrectionLevel:' + errorCorrectionLevel;
      }

      var length = rsBlock.length / 3;

      var list = [];

      for (var i = 0; i < length; i += 1) {

        var count = rsBlock[i * 3 + 0];
        var totalCount = rsBlock[i * 3 + 1];
        var dataCount = rsBlock[i * 3 + 2];

        for (var j = 0; j < count; j += 1) {
          list.push(qrRSBlock(totalCount, dataCount) );
        }
      }

      return list;
    };

    return _this;
  }();

  //---------------------------------------------------------------------
  // qrBitBuffer
  //---------------------------------------------------------------------

  var qrBitBuffer = function() {

    var _buffer = [];
    var _length = 0;

    var _this = {};

    _this.getBuffer = function() {
      return _buffer;
    };

    _this.getAt = function(index) {
      var bufIndex = Math.floor(index / 8);
      return ( (_buffer[bufIndex] >>> (7 - index % 8) ) & 1) == 1;
    };

    _this.put = function(num, length) {
      for (var i = 0; i < length; i += 1) {
        _this.putBit( ( (num >>> (length - i - 1) ) & 1) == 1);
      }
    };

    _this.getLengthInBits = function() {
      return _length;
    };

    _this.putBit = function(bit) {

      var bufIndex = Math.floor(_length / 8);
      if (_buffer.length <= bufIndex) {
        _buffer.push(0);
      }

      if (bit) {
        _buffer[bufIndex] |= (0x80 >>> (_length % 8) );
      }

      _length += 1;
    };

    return _this;
  };

  //---------------------------------------------------------------------
  // qrNumber
  //---------------------------------------------------------------------

  var qrNumber = function(data) {

    var _mode = QRMode.MODE_NUMBER;
    var _data = data;

    var _this = {};

    _this.getMode = function() {
      return _mode;
    };

    _this.getLength = function(buffer) {
      return _data.length;
    };

    _this.write = function(buffer) {

      var data = _data;

      var i = 0;

      while (i + 2 < data.length) {
        buffer.put(strToNum(data.substring(i, i + 3) ), 10);
        i += 3;
      }

      if (i < data.length) {
        if (data.length - i == 1) {
          buffer.put(strToNum(data.substring(i, i + 1) ), 4);
        } else if (data.length - i == 2) {
          buffer.put(strToNum(data.substring(i, i + 2) ), 7);
        }
      }
    };

    var strToNum = function(s) {
      var num = 0;
      for (var i = 0; i < s.length; i += 1) {
        num = num * 10 + chatToNum(s.charAt(i) );
      }
      return num;
    };

    var chatToNum = function(c) {
      if ('0' <= c && c <= '9') {
        return c.charCodeAt(0) - '0'.charCodeAt(0);
      }
      throw 'illegal char :' + c;
    };

    return _this;
  };

  //---------------------------------------------------------------------
  // qrAlphaNum
  //---------------------------------------------------------------------

  var qrAlphaNum = function(data) {

    var _mode = QRMode.MODE_ALPHA_NUM;
    var _data = data;

    var _this = {};

    _this.getMode = function() {
      return _mode;
    };

    _this.getLength = function(buffer) {
      return _data.length;
    };

    _this.write = function(buffer) {

      var s = _data;

      var i = 0;

      while (i + 1 < s.length) {
        buffer.put(
          getCode(s.charAt(i) ) * 45 +
          getCode(s.charAt(i + 1) ), 11);
        i += 2;
      }

      if (i < s.length) {
        buffer.put(getCode(s.charAt(i) ), 6);
      }
    };

    var getCode = function(c) {

      if ('0' <= c && c <= '9') {
        return c.charCodeAt(0) - '0'.charCodeAt(0);
      } else if ('A' <= c && c <= 'Z') {
        return c.charCodeAt(0) - 'A'.charCodeAt(0) + 10;
      } else {
        switch (c) {
        case ' ' : return 36;
        case '$' : return 37;
        case '%' : return 38;
        case '*' : return 39;
        case '+' : return 40;
        case '-' : return 41;
        case '.' : return 42;
        case '/' : return 43;
        case ':' : return 44;
        default :
          throw 'illegal char :' + c;
        }
      }
    };

    return _this;
  };

  //---------------------------------------------------------------------
  // qr8BitByte
  //---------------------------------------------------------------------

  var qr8BitByte = function(data) {

    var _mode = QRMode.MODE_8BIT_BYTE;
    var _data = data;
    var _bytes = qrcode.stringToBytes(data);

    var _this = {};

    _this.getMode = function() {
      return _mode;
    };

    _this.getLength = function(buffer) {
      return _bytes.length;
    };

    _this.write = function(buffer) {
      for (var i = 0; i < _bytes.length; i += 1) {
        buffer.put(_bytes[i], 8);
      }
    };

    return _this;
  };

  //---------------------------------------------------------------------
  // qrKanji
  //---------------------------------------------------------------------

  var qrKanji = function(data) {

    var _mode = QRMode.MODE_KANJI;
    var _data = data;

    var stringToBytes = qrcode.stringToBytesFuncs['SJIS'];
    if (!stringToBytes) {
      throw 'sjis not supported.';
    }
    !function(c, code) {
      // self test for sjis support.
      var test = stringToBytes(c);
      if (test.length != 2 || ( (test[0] << 8) | test[1]) != code) {
        throw 'sjis not supported.';
      }
    }('\\u53cb', 0x9746);

    var _bytes = stringToBytes(data);

    var _this = {};

    _this.getMode = function() {
      return _mode;
    };

    _this.getLength = function(buffer) {
      return ~~(_bytes.length / 2);
    };

    _this.write = function(buffer) {

      var data = _bytes;

      var i = 0;

      while (i + 1 < data.length) {

        var c = ( (0xff & data[i]) << 8) | (0xff & data[i + 1]);

        if (0x8140 <= c && c <= 0x9FFC) {
          c -= 0x8140;
        } else if (0xE040 <= c && c <= 0xEBBF) {
          c -= 0xC140;
        } else {
          throw 'illegal char at ' + (i + 1) + '/' + c;
        }

        c = ( (c >>> 8) & 0xff) * 0xC0 + (c & 0xff);

        buffer.put(c, 13);

        i += 2;
      }

      if (i < data.length) {
        throw 'illegal char at ' + (i + 1);
      }
    };

    return _this;
  };

  //=====================================================================
  // GIF Support etc.
  //

  //---------------------------------------------------------------------
  // byteArrayOutputStream
  //---------------------------------------------------------------------

  var byteArrayOutputStream = function() {

    var _bytes = [];

    var _this = {};

    _this.writeByte = function(b) {
      _bytes.push(b & 0xff);
    };

    _this.writeShort = function(i) {
      _this.writeByte(i);
      _this.writeByte(i >>> 8);
    };

    _this.writeBytes = function(b, off, len) {
      off = off || 0;
      len = len || b.length;
      for (var i = 0; i < len; i += 1) {
        _this.writeByte(b[i + off]);
      }
    };

    _this.writeString = function(s) {
      for (var i = 0; i < s.length; i += 1) {
        _this.writeByte(s.charCodeAt(i) );
      }
    };

    _this.toByteArray = function() {
      return _bytes;
    };

    _this.toString = function() {
      var s = '';
      s += '[';
      for (var i = 0; i < _bytes.length; i += 1) {
        if (i > 0) {
          s += ',';
        }
        s += _bytes[i];
      }
      s += ']';
      return s;
    };

    return _this;
  };

  //---------------------------------------------------------------------
  // base64EncodeOutputStream
  //---------------------------------------------------------------------

  var base64EncodeOutputStream = function() {

    var _buffer = 0;
    var _buflen = 0;
    var _length = 0;
    var _base64 = '';

    var _this = {};

    var writeEncoded = function(b) {
      _base64 += String.fromCharCode(encode(b & 0x3f) );
    };

    var encode = function(n) {
      if (n < 0) {
        // error.
      } else if (n < 26) {
        return 0x41 + n;
      } else if (n < 52) {
        return 0x61 + (n - 26);
      } else if (n < 62) {
        return 0x30 + (n - 52);
      } else if (n == 62) {
        return 0x2b;
      } else if (n == 63) {
        return 0x2f;
      }
      throw 'n:' + n;
    };

    _this.writeByte = function(n) {

      _buffer = (_buffer << 8) | (n & 0xff);
      _buflen += 8;
      _length += 1;

      while (_buflen >= 6) {
        writeEncoded(_buffer >>> (_buflen - 6) );
        _buflen -= 6;
      }
    };

    _this.flush = function() {

      if (_buflen > 0) {
        writeEncoded(_buffer << (6 - _buflen) );
        _buffer = 0;
        _buflen = 0;
      }

      if (_length % 3 != 0) {
        // padding
        var padlen = 3 - _length % 3;
        for (var i = 0; i < padlen; i += 1) {
          _base64 += '=';
        }
      }
    };

    _this.toString = function() {
      return _base64;
    };

    return _this;
  };

  //---------------------------------------------------------------------
  // base64DecodeInputStream
  //---------------------------------------------------------------------

  var base64DecodeInputStream = function(str) {

    var _str = str;
    var _pos = 0;
    var _buffer = 0;
    var _buflen = 0;

    var _this = {};

    _this.read = function() {

      while (_buflen < 8) {

        if (_pos >= _str.length) {
          if (_buflen == 0) {
            return -1;
          }
          throw 'unexpected end of file./' + _buflen;
        }

        var c = _str.charAt(_pos);
        _pos += 1;

        if (c == '=') {
          _buflen = 0;
          return -1;
        } else if (c.match(/^\\s$/) ) {
          // ignore if whitespace.
          continue;
        }

        _buffer = (_buffer << 6) | decode(c.charCodeAt(0) );
        _buflen += 6;
      }

      var n = (_buffer >>> (_buflen - 8) ) & 0xff;
      _buflen -= 8;
      return n;
    };

    var decode = function(c) {
      if (0x41 <= c && c <= 0x5a) {
        return c - 0x41;
      } else if (0x61 <= c && c <= 0x7a) {
        return c - 0x61 + 26;
      } else if (0x30 <= c && c <= 0x39) {
        return c - 0x30 + 52;
      } else if (c == 0x2b) {
        return 62;
      } else if (c == 0x2f) {
        return 63;
      } else {
        throw 'c:' + c;
      }
    };

    return _this;
  };

  //---------------------------------------------------------------------
  // gifImage (B/W)
  //---------------------------------------------------------------------

  var gifImage = function(width, height) {

    var _width = width;
    var _height = height;
    var _data = new Array(width * height);

    var _this = {};

    _this.setPixel = function(x, y, pixel) {
      _data[y * _width + x] = pixel;
    };

    _this.write = function(out) {

      //---------------------------------
      // GIF Signature

      out.writeString('GIF87a');

      //---------------------------------
      // Screen Descriptor

      out.writeShort(_width);
      out.writeShort(_height);

      out.writeByte(0x80); // 2bit
      out.writeByte(0);
      out.writeByte(0);

      //---------------------------------
      // Global Color Map

      // black
      out.writeByte(0x00);
      out.writeByte(0x00);
      out.writeByte(0x00);

      // white
      out.writeByte(0xff);
      out.writeByte(0xff);
      out.writeByte(0xff);

      //---------------------------------
      // Image Descriptor

      out.writeString(',');
      out.writeShort(0);
      out.writeShort(0);
      out.writeShort(_width);
      out.writeShort(_height);
      out.writeByte(0);

      //---------------------------------
      // Local Color Map

      //---------------------------------
      // Raster Data

      var lzwMinCodeSize = 2;
      var raster = getLZWRaster(lzwMinCodeSize);

      out.writeByte(lzwMinCodeSize);

      var offset = 0;

      while (raster.length - offset > 255) {
        out.writeByte(255);
        out.writeBytes(raster, offset, 255);
        offset += 255;
      }

      out.writeByte(raster.length - offset);
      out.writeBytes(raster, offset, raster.length - offset);
      out.writeByte(0x00);

      //---------------------------------
      // GIF Terminator
      out.writeString(';');
    };

    var bitOutputStream = function(out) {

      var _out = out;
      var _bitLength = 0;
      var _bitBuffer = 0;

      var _this = {};

      _this.write = function(data, length) {

        if ( (data >>> length) != 0) {
          throw 'length over';
        }

        while (_bitLength + length >= 8) {
          _out.writeByte(0xff & ( (data << _bitLength) | _bitBuffer) );
          length -= (8 - _bitLength);
          data >>>= (8 - _bitLength);
          _bitBuffer = 0;
          _bitLength = 0;
        }

        _bitBuffer = (data << _bitLength) | _bitBuffer;
        _bitLength = _bitLength + length;
      };

      _this.flush = function() {
        if (_bitLength > 0) {
          _out.writeByte(_bitBuffer);
        }
      };

      return _this;
    };

    var getLZWRaster = function(lzwMinCodeSize) {

      var clearCode = 1 << lzwMinCodeSize;
      var endCode = (1 << lzwMinCodeSize) + 1;
      var bitLength = lzwMinCodeSize + 1;

      // Setup LZWTable
      var table = lzwTable();

      for (var i = 0; i < clearCode; i += 1) {
        table.add(String.fromCharCode(i) );
      }
      table.add(String.fromCharCode(clearCode) );
      table.add(String.fromCharCode(endCode) );

      var byteOut = byteArrayOutputStream();
      var bitOut = bitOutputStream(byteOut);

      // clear code
      bitOut.write(clearCode, bitLength);

      var dataIndex = 0;

      var s = String.fromCharCode(_data[dataIndex]);
      dataIndex += 1;

      while (dataIndex < _data.length) {

        var c = String.fromCharCode(_data[dataIndex]);
        dataIndex += 1;

        if (table.contains(s + c) ) {

          s = s + c;

        } else {

          bitOut.write(table.indexOf(s), bitLength);

          if (table.size() < 0xfff) {

            if (table.size() == (1 << bitLength) ) {
              bitLength += 1;
            }

            table.add(s + c);
          }

          s = c;
        }
      }

      bitOut.write(table.indexOf(s), bitLength);

      // end code
      bitOut.write(endCode, bitLength);

      bitOut.flush();

      return byteOut.toByteArray();
    };

    var lzwTable = function() {

      var _map = {};
      var _size = 0;

      var _this = {};

      _this.add = function(key) {
        if (_this.contains(key) ) {
          throw 'dup key:' + key;
        }
        _map[key] = _size;
        _size += 1;
      };

      _this.size = function() {
        return _size;
      };

      _this.indexOf = function(key) {
        return _map[key];
      };

      _this.contains = function(key) {
        return typeof _map[key] != 'undefined';
      };

      return _this;
    };

    return _this;
  };

  var createDataURL = function(width, height, getPixel) {
    var gif = gifImage(width, height);
    for (var y = 0; y < height; y += 1) {
      for (var x = 0; x < width; x += 1) {
        gif.setPixel(x, y, getPixel(x, y) );
      }
    }

    var b = byteArrayOutputStream();
    gif.write(b);

    var base64 = base64EncodeOutputStream();
    var bytes = b.toByteArray();
    for (var i = 0; i < bytes.length; i += 1) {
      base64.writeByte(bytes[i]);
    }
    base64.flush();

    return 'data:image/gif;base64,' + base64;
  };

  //---------------------------------------------------------------------
  // returns qrcode function.

  return qrcode;
}();

// multibyte support
!function() {

  qrcode.stringToBytesFuncs['UTF-8'] = function(s) {
    // http://stackoverflow.com/questions/18729405/how-to-convert-utf8-string-to-byte-array
    function toUTF8Array(str) {
      var utf8 = [];
      for (var i=0; i < str.length; i++) {
        var charcode = str.charCodeAt(i);
        if (charcode < 0x80) utf8.push(charcode);
        else if (charcode < 0x800) {
          utf8.push(0xc0 | (charcode >> 6),
              0x80 | (charcode & 0x3f));
        }
        else if (charcode < 0xd800 || charcode >= 0xe000) {
          utf8.push(0xe0 | (charcode >> 12),
              0x80 | ((charcode>>6) & 0x3f),
              0x80 | (charcode & 0x3f));
        }
        // surrogate pair
        else {
          i++;
          // UTF-16 encodes 0x10000-0x10FFFF by
          // subtracting 0x10000 and splitting the
          // 20 bits of 0x0-0xFFFFF into two halves
          charcode = 0x10000 + (((charcode & 0x3ff)<<10)
            | (str.charCodeAt(i) & 0x3ff));
          utf8.push(0xf0 | (charcode >>18),
              0x80 | ((charcode>>12) & 0x3f),
              0x80 | ((charcode>>6) & 0x3f),
              0x80 | (charcode & 0x3f));
        }
      }
      return utf8;
    }
    return toUTF8Array(s);
  };

}();

(function (factory) {
  if (typeof define === 'function' && define.amd) {
      define([], factory);
  } else if (typeof exports === 'object') {
      module.exports = factory();
  }
}(function () {
    return qrcode;
}));
`,E={bg:{photoN:`Снимка {n}`,at:`{n} от {all}`,for:`За {name}`,until:`Поръчки до {date}`,step1:`Докоснете снимка`,step2:`Изберете какво и колко`,step3:`Изпратете поръчката`,prices:`Цени`,hint:`Докоснете снимка, за да поръчате от нея`,piece:`{n} бр.`,pieces:`{n} бр.`,fromPhoto:`от {n} сн.`,fromPhotos:`от {n} сн.`,order:`Поръчай`,yourOrder:`Вашата поръчка`,edit:`Промени`,done:`Готово`,close:`Затвори`,prev:`Предишна`,next:`Следваща`,more:`Още: {item}`,less:`По-малко: {item}`,name:`Име на детето или на семейството`,note:`Бележка (по желание)`,needName:`Напишете име, за да знае фотографът чия е поръчката.`,total:`Общо`,send:`Изпратете това съобщение{to}`,toWho:` до {to}`,share:`Изпрати`,copy:`Копирай`,mail:`Имейл`,sms:`SMS`,copied:`Копирано. Поставете го в съобщение до фотографа.`,shared:`Изпратено. Благодарим!`,codeNote:`Кодът в края казва на фотографа точно какво сте избрали. Не го променяйте.`,orderOf:`Поръчка: {title}`,from:`От`,noteWord:`Бележка`,ordersTo:`Поръчки: {to}`,nojs:`Ако бутоните не работят, отворете файла в браузър (Chrome или Safari). Или напишете номерата на снимките и колко от всяко искате в съобщение{to}.`,chosen:`{n} избрани`,retake:`Моля, снимайте детето отново`,askRetake:`Нито една не е сполучлива? Помолете за нова снимка`,retakeLine:`Молим за нова снимка.`,moreOff:`Всяко следващо копие от същото: −{p}%`,lateUp:`След {date}: +{p}%`,payBank:`Платете с банков превод`,payQr:`Сканирайте кода с банковото си приложение или въведете данните:`,payLine:`{name} · IBAN {iban} · основание {ref}`},en:{photoN:`Photo {n}`,at:`{n} of {all}`,for:`For {name}`,until:`Orders by {date}`,step1:`Tap a photo`,step2:`Choose what and how many`,step3:`Send the order`,prices:`Prices`,hint:`Tap a photo to order from it`,piece:`{n} piece`,pieces:`{n} pieces`,fromPhoto:`from {n} photo`,fromPhotos:`from {n} photos`,order:`Order`,yourOrder:`Your order`,edit:`Change`,done:`Done`,close:`Close`,prev:`Previous`,next:`Next`,more:`More: {item}`,less:`Fewer: {item}`,name:`Child's or family name`,note:`Note (optional)`,needName:`Write a name so the photographer knows whose order it is.`,total:`Total`,send:`Send this message{to}`,toWho:` to {to}`,share:`Send`,copy:`Copy`,mail:`E-mail`,sms:`Text`,copied:`Copied. Paste it into a message to the photographer.`,shared:`Sent. Thank you!`,codeNote:`The code at the end tells the photographer exactly what you chose. Please leave it as it is.`,orderOf:`Order: {title}`,from:`From`,noteWord:`Note`,ordersTo:`Orders: {to}`,nojs:`If the buttons do not work, open the file in a browser (Chrome or Safari). Or write the photo numbers and how many of each you want in a message{to}.`,chosen:`{n} chosen`,retake:`Please photograph the child again`,askRetake:`None of them right? Ask for a new photo`,retakeLine:`We would like a new photo.`,moreOff:`Each further piece of the same: −{p}%`,lateUp:`After {date}: +{p}%`,payBank:`Pay by bank transfer`,payQr:`Scan the code with your bank app, or type the details in:`,payLine:`{name} · IBAN {iban} · reference {ref}`}},D=e=>e.replace(/[&<>"']/g,e=>`&#${e.charCodeAt(0)};`),O=(e,t)=>e.replace(/\{(\w+)\}/g,(e,n)=>String(t[n]??``)),k=e=>JSON.stringify(e).replace(/</g,`\\u003c`).replace(/\u2028/g,`\\u2028`).replace(/\u2029/g,`\\u2029`),A=(e,t=22)=>`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`,j={left:A(`<path d="M15 5l-7 7 7 7"/>`,26),right:A(`<path d="M9 5l7 7-7 7"/>`,26),close:A(`<path d="M6 6l12 12M18 6L6 18"/>`),share:A(`<path d="M12 3v12M7 8l5-5 5 5"/><path d="M5 13v6a2 2 0 002 2h10a2 2 0 002-2v-6"/>`,18),copy:A(`<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2h2"/>`,18),mail:A(`<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>`,18),sms:A(`<path d="M4 5h16v11H9l-5 4z"/>`,18)},M=`
:root{--bg:#f4f1eb;--card:#fffdf8;--ink:#1c1a17;--muted:#6b655c;--line:#e2dcd1;--gold:#a5793c;--btn:#1c1a17;--btn-ink:#fffdf8;--err:#a8261b;--h:150px;color-scheme:light dark}
@media (prefers-color-scheme:dark){:root{--bg:#121110;--card:#1c1b19;--ink:#f2eee7;--muted:#a49e94;--line:#302d29;--gold:#d4a868;--btn:#f2eee7;--btn-ink:#121110;--err:#f2b8b5}}
@media (min-width:720px){:root{--h:220px}}
*{box-sizing:border-box}
html{-webkit-text-size-adjust:100%}
body{margin:0;background:var(--bg);color:var(--ink);font:16px/1.5 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;padding-bottom:calc(96px + env(safe-area-inset-bottom))}
.serif,h1,h2{font-family:"Iowan Old Style","Palatino Linotype",Palatino,"Book Antiqua",Georgia,serif;font-weight:500}
.top{max-width:760px;margin:0 auto;padding:clamp(44px,10vw,84px) 20px 8px;text-align:center}
.by{margin:0 0 16px;font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:var(--muted)}
h1{margin:0;font-size:clamp(32px,8vw,52px);line-height:1.06;letter-spacing:-.01em;text-wrap:balance}
.rule{display:block;width:40px;height:1px;background:var(--gold);margin:22px auto}
.for{margin:0;font-style:italic;font-size:21px;line-height:1.3}
.msg{margin:12px auto 0;max-width:32em;color:var(--muted);text-wrap:pretty;white-space:pre-line}
.due{display:inline-block;margin-top:18px;padding:5px 15px;border:1px solid var(--line);border-radius:99px;font-size:14px}
.steps{display:flex;justify-content:center;gap:clamp(14px,4vw,40px);list-style:none;margin:30px auto 30px;padding:0 16px;font-size:13px;line-height:1.3;color:var(--muted);counter-reset:s}
.steps li{display:flex;align-items:center;gap:9px;max-width:10.5em;text-align:left;counter-increment:s}
.steps li::before{content:counter(s);display:grid;place-items:center;flex:none;width:24px;height:24px;border-radius:50%;border:1px solid var(--line);color:var(--ink);font-size:12px}
.grid{display:flex;flex-wrap:wrap;align-items:flex-start;gap:6px;max-width:1440px;margin:0 auto;padding:0 10px}
.grid::after{content:"";flex:999 1 0}
.tile{position:relative;flex:var(--r) 1 calc(var(--r) * var(--h));aspect-ratio:var(--r);margin:0;padding:0;border:0;border-radius:6px;overflow:hidden;background:var(--line);cursor:pointer;color:inherit;-webkit-tap-highlight-color:transparent}
.tile img{display:block;width:100%;height:100%;object-fit:cover;transition:transform .6s cubic-bezier(.2,.7,.2,1)}
.tile::after{content:"";position:absolute;inset:0;border-radius:inherit;box-shadow:inset 0 0 0 0 var(--gold);transition:box-shadow .2s}
.tile.on::after{box-shadow:inset 0 0 0 3px var(--gold)}
@media (hover:hover){.tile:hover img{transform:scale(1.03)}}
.tile:focus-visible{outline:2px solid var(--gold);outline-offset:3px}
.no{position:absolute;left:7px;bottom:7px;min-width:24px;padding:2px 8px;border-radius:99px;background:rgba(15,14,12,.55);color:#fff;font-size:12px;font-weight:600;line-height:18px;font-variant-numeric:tabular-nums}
.got{position:absolute;right:7px;top:7px;min-width:26px;padding:3px 9px;border-radius:99px;background:var(--gold);color:#fff;font-size:13px;font-weight:700;line-height:18px;font-variant-numeric:tabular-nums}
.prices{max-width:560px;margin:48px auto 0;padding:0 20px}
.prices h2{margin:0 0 14px;font-size:24px;text-align:center}
.prices ul{list-style:none;margin:0;padding:0;border-top:1px solid var(--line)}
.prices li{display:flex;justify-content:space-between;gap:16px;padding:12px 0;border-bottom:1px solid var(--line)}
.rule-note{margin:10px 0 0;color:var(--muted);font-size:14px;text-align:center}
.prices b{font-weight:600;white-space:nowrap;font-variant-numeric:tabular-nums}
.foot,.nojs{max-width:560px;margin:22px auto 0;padding:0 20px;text-align:center;font-size:14px;color:var(--muted)}
.nojs{color:var(--ink)}
.bar{position:fixed;left:0;right:0;bottom:0;display:flex;align-items:center;gap:14px;padding:12px max(16px,env(safe-area-inset-right)) calc(12px + env(safe-area-inset-bottom)) max(16px,env(safe-area-inset-left));background:var(--card);border-top:1px solid var(--line);box-shadow:0 -10px 30px rgba(0,0,0,.06)}
.bar .sum{flex:1;min-width:0;line-height:1.3}
.bar .sum b{display:block;font-size:16px;font-variant-numeric:tabular-nums}
.bar .sum small{color:var(--muted);font-size:13px}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;appearance:none;border:0;border-radius:99px;min-height:46px;padding:0 22px;background:var(--btn);color:var(--btn-ink);font:600 15px/1 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;cursor:pointer;transition:transform .1s,opacity .2s;-webkit-tap-highlight-color:transparent}
.btn:active{transform:scale(.97)}
.btn:disabled{opacity:.35;cursor:default;transform:none}
.btn.ghost{background:transparent;color:var(--ink);box-shadow:inset 0 0 0 1px var(--line)}
dialog{border:0;padding:0;background:var(--card);color:var(--ink);max-width:none;max-height:none;overflow:hidden}
dialog::backdrop{background:rgba(12,11,10,.74)}
dialog[open]{animation:rise .28s cubic-bezier(.2,.8,.2,1)}
@keyframes rise{from{opacity:0;transform:translateY(14px)}}
@media (prefers-reduced-motion:reduce){dialog[open]{animation:none}.tile img{transition:none}}
#view[open]{display:flex;flex-direction:column;width:100vw;height:100dvh;margin:0}
@media (min-width:880px){#view[open]{flex-direction:row;width:min(1200px,94vw);height:min(840px,92dvh);margin:auto;border-radius:14px;box-shadow:0 0 0 1px rgba(255,255,255,.08),0 30px 90px rgba(0,0,0,.55)}}
.stage{position:relative;flex:1 1 auto;min-height:0;background:#0e0d0c;touch-action:pan-y;user-select:none;-webkit-user-select:none}
.stage img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain}
.round{position:absolute;display:grid;place-items:center;width:44px;height:44px;border:0;border-radius:50%;background:rgba(0,0,0,.42);color:#fff;cursor:pointer}
.round.x{top:max(12px,env(safe-area-inset-top));right:12px}
.round.l{left:10px;top:50%;margin-top:-22px}.round.r{right:10px;top:50%;margin-top:-22px}
.side{flex:none;display:flex;flex-direction:column;max-height:54dvh;overflow:auto;padding:18px 20px calc(16px + env(safe-area-inset-bottom))}
@media (min-width:880px){.side{width:370px;max-height:none;padding:30px 28px}}
.side h2{margin:0;font-size:26px;line-height:1.1}
.side .at{margin:2px 0 10px;color:var(--muted);font-size:14px}
.rows{list-style:none;margin:0 0 16px;padding:0}
.rows li{display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid var(--line)}
.rows .what{flex:1;min-width:0;line-height:1.3}
.rows .what small{display:block;color:var(--muted);font-size:14px;font-variant-numeric:tabular-nums}
.rows li.on .what span{font-weight:600}
.step{display:flex;align-items:center;gap:2px}
.step button{display:grid;place-items:center;width:42px;height:42px;border:1px solid var(--line);border-radius:50%;background:transparent;color:var(--ink);font:400 22px/1 system-ui,sans-serif;cursor:pointer}
.step button:disabled{opacity:.3;cursor:default}
.step output{min-width:30px;text-align:center;font-weight:700;font-variant-numeric:tabular-nums}
.side .btn{margin-top:auto}
#order[open]{display:flex;flex-direction:column;width:min(580px,100vw);max-height:94dvh;margin:auto auto 0;border-radius:18px 18px 0 0}
@media (min-width:620px){#order[open]{margin:auto;border-radius:18px;max-height:90dvh}}
.head{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:20px 22px 6px}
.head h2{margin:0;font-size:26px}
.head .round{position:static;background:transparent;color:var(--ink)}
.body{overflow:auto;padding:4px 22px calc(22px + env(safe-area-inset-bottom))}
.lines{list-style:none;margin:0;padding:0}
.lines li{display:grid;grid-template-columns:52px 1fr auto;gap:14px;align-items:center;padding:9px 0;border-bottom:1px solid var(--line);line-height:1.3}
.lines img{width:52px;height:52px;object-fit:cover;border-radius:6px;display:block}
.lines small{display:block;color:var(--muted);font-size:14px}
.lines b{font-weight:600;font-variant-numeric:tabular-nums;white-space:nowrap}
.total{display:flex;justify-content:space-between;gap:12px;padding:14px 0 4px;font-size:17px;font-weight:700;font-variant-numeric:tabular-nums}
.f{display:block;margin-top:16px;font-size:14px;color:var(--muted)}
.f input,.f textarea{display:block;width:100%;margin-top:6px;padding:12px 14px;border:1px solid var(--line);border-radius:10px;background:var(--bg);color:var(--ink);font:inherit;font-size:16px;resize:vertical}
.f input:focus,.f textarea:focus{outline:2px solid var(--gold);outline-offset:1px;border-color:transparent}
.chk{display:flex;gap:10px;align-items:center;margin-top:14px;font-size:15px}.chk input{width:20px;height:20px;accent-color:var(--gold)}
.link{border:0;background:none;color:var(--muted);font:inherit;text-decoration:underline;text-underline-offset:3px;cursor:pointer;padding:6px}
.err{margin:8px 0 0;color:var(--err);font-size:14px}
.send{margin:22px 0 8px;font-weight:600}
.msgbox{margin:0;padding:12px 14px;border-radius:10px;background:var(--bg);color:var(--muted);font:13px/1.5 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;white-space:pre-wrap;overflow-wrap:anywhere}
.small{margin:8px 0 0;color:var(--muted);font-size:13px}
.acts{display:flex;flex-wrap:wrap;gap:10px;margin-top:18px}
.acts .btn{flex:1 1 130px}
.pay{margin-top:18px;text-align:center}.pay .qr svg{display:block;width:180px;height:180px;margin:10px auto;border-radius:8px}.pay .small{overflow-wrap:anywhere}
.ok{min-height:1.5em;margin:12px 0 0;color:var(--muted);font-size:14px;text-align:center}
[hidden]{display:none!important}
`;function N(e){let t=E[e.lang],n=e.deadline?new Date(`${e.deadline}T12:00`).toLocaleDateString(e.lang===`bg`?`bg-BG`:`en-GB`,{day:`numeric`,month:`long`}):``,r=e.to.trim(),i=r?O(t.toWho,{to:r}):``,a=e.photos.map((e,n)=>`<button type="button" class="tile" style="--r:${(e.w/e.h).toFixed(4)}" aria-label="${D(O(t.photoN,{n:n+1}))}"><img src="${e.src}" alt="${D(O(t.photoN,{n:n+1}))}" decoding="async"><span class="no">${n+1}</span><span class="got" hidden></span></button>`).join(``),o=e.items.map(e=>`<li><span>${D(e.name)}</span><b>${D(e.price)}</b></li>`).join(``),s={id:e.id,lang:e.lang,title:e.title,child:e.child,to:r,w:t,photos:e.photos.map(e=>({n:e.n})),items:e.items,bank:e.bank,more:e.rules?.more??0,late:e.deadline&&e.rules?.late?{day:e.deadline,by:e.rules.late}:null};return`<!doctype html>
<html lang="${e.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="color-scheme" content="light dark">
<title>${D(e.child?`${e.title}: ${e.child}`:e.title)}</title>
<style>${M}</style>
</head>
<body>
<header class="top">
${e.by?`<p class="by">${D(e.by)}</p>`:``}
<h1>${D(e.title)}</h1>
<span class="rule"></span>
${e.child?`<p class="for serif">${D(O(t.for,{name:e.child}))}</p>`:``}
${e.message?`<p class="msg">${D(e.message)}</p>`:``}
${n?`<p class="due">${D(O(t.until,{date:n}))}</p>`:``}
</header>
<ol class="steps" aria-hidden="true"><li>${t.step1}</li><li>${t.step2}</li><li>${t.step3}</li></ol>
<main class="grid">${a}</main>
${o?`<section class="prices"><h2>${t.prices}</h2><ul>${o}</ul>${[e.rules?.more?O(t.moreOff,{p:e.rules.more}):``,n&&e.rules?.late?O(t.lateUp,{date:n,p:e.rules.late}):``].filter(Boolean).map(e=>`<p class="rule-note">${D(e)}</p>`).join(``)}</section>`:``}
${r?`<p class="foot">${D(O(t.ordersTo,{to:r}))}</p>`:``}
<p class="foot"><button type="button" class="link ask">${t.askRetake}</button></p>
<noscript><p class="nojs">${D(O(t.nojs,{to:i}))}</p></noscript>
<div class="bar" hidden><div class="sum" aria-live="polite"></div><button type="button" class="btn go">${t.order}</button></div>
<dialog id="view" aria-label="${D(e.title)}">
<div class="stage"><img alt=""><button type="button" class="round l" aria-label="${t.prev}">${j.left}</button><button type="button" class="round r" aria-label="${t.next}">${j.right}</button><button type="button" class="round x" aria-label="${t.close}">${j.close}</button></div>
<div class="side"><h2 class="name"></h2><p class="at"></p><ul class="rows"></ul><button type="button" class="btn done">${t.done}</button></div>
</dialog>
<dialog id="order" aria-labelledby="order-h">
<div class="head"><h2 id="order-h">${t.yourOrder}</h2><button type="button" class="round x" aria-label="${t.close}">${j.close}</button></div>
<div class="body">
<ul class="lines"></ul>
<div class="total"></div>
<div class="pay" hidden><p class="send">${t.payBank}</p><p class="small">${t.payQr}</p><div class="qr"></div><p class="small bankline"></p></div>
<label class="f">${t.name}<input name="name" autocomplete="name" maxlength="60" required></label>
<p class="err" hidden>${t.needName}</p>
<label class="f">${t.note}<textarea name="note" rows="2" maxlength="300"></textarea></label>
<label class="chk"><input type="checkbox" name="retake"> ${t.retake}</label>
<p class="send">${D(O(t.send,{to:i}))}</p>
<pre class="msgbox"></pre>
<p class="small">${t.codeNote}</p>
<div class="acts"><button type="button" class="btn share">${j.share}${t.share}</button><button type="button" class="btn ghost copy">${j.copy}${t.copy}</button><button type="button" class="btn ghost mail" hidden>${j.mail}${t.mail}</button><button type="button" class="btn ghost sms" hidden>${j.sms}${t.sms}</button></div>
<p class="ok" aria-live="polite"></p>
<button type="button" class="btn ghost edit" style="width:100%;margin-top:6px">${t.edit}</button>
</div>
</dialog>
${e.bank?`<script>${T.replace(/<\/script/gi,`<\\/script`)}<\/script>`:``}
<script>(${String(P)})(${k(s)}, ${String(S)}, ${String(v)});<\/script>
</body>
</html>`}function P(e,t,n){let r=e.w,i=e=>document.querySelector(e),a=(e,t)=>e.replace(/\{(\w+)\}/g,(e,n)=>String(t[n]??``)),o=(e,t,...n)=>{let r=document.createElement(e);return t&&(r.className=t),r.append(...n),r},s=`vitrum-gallery:${e.id}:${e.child}`,c={c:{},name:e.child,note:``};try{let e=JSON.parse(localStorage.getItem(s)||`null`);e&&typeof e==`object`&&e.c&&(c={...c,...e})}catch{}let l=()=>{try{localStorage.setItem(s,JSON.stringify(c))}catch{}},u=[...document.querySelectorAll(`.tile`)],d=e=>u[e].querySelector(`img`).src,f=e=>{let t=/\d+(?:[.,]\d+)?/.exec(e);return t?parseFloat(t[0].replace(`,`,`.`)):null},p=e.items.find(e=>f(e.price)!==null)?.price??``,m=e.lang===`bg`||/\d,\d/.test(p),h=/\d[.,]\d/.test(p),g=e=>p.replace(/\d+(?:[.,]\d+)?/,()=>{let t=e.toFixed(h||e%1?2:0);return m?t.replace(`.`,`,`):t}),_=e=>a(e===1?r.piece:r.pieces,{n:e}),v=(e,t)=>`${e}.${t}`,y=()=>Object.entries(c.c).map(([e,t])=>{let[n,r]=e.split(`.`).map(Number);return{i:n,j:r,n:t}}).filter(t=>t.n>0&&u[t.i]&&e.items[t.j]).sort((e,t)=>e.i-t.i||e.j-t.j),b=!!e.late&&Date.now()>new Date(`${e.late.day}T23:59:59`).getTime(),x=()=>{let t=y(),n=0,r=0,i=!!p,a=new Map;for(let e of t)n+=e.n,a.set(e.j,(a.get(e.j)??0)+e.n);for(let[t,n]of a){let a=f(e.items[t].price);a===null?i=!1:r+=a*(1+(n-1)*(1-e.more/100))}return b&&(r*=1+e.late.by/100),r=Math.round(r*100)/100,{lines:t,count:n,money:r,priced:i,photos:new Set(t.map(e=>e.i)).size}},S=i(`.bar`),C=i(`.bar .sum`),w=i(`.bar .go`);S.hidden=!1;function T(){u.forEach((t,n)=>{let i=e.items.reduce((e,t,r)=>e+(c.c[v(n,r)]||0),0),o=t.querySelector(`.got`);t.classList.toggle(`on`,i>0),o.hidden=!i,o.textContent=String(i),t.setAttribute(`aria-label`,a(r.photoN,{n:n+1})+(i?`, ${_(i)}`:``))});let t=x();C.replaceChildren(...t.count?[o(`b`,``,_(t.count)+(t.priced?` · ${g(t.money)}`:``)),o(`small`,``,a(t.photos===1?r.fromPhoto:r.fromPhotos,{n:t.photos}))]:[o(`small`,``,r.hint)]),w.disabled=!t.count,l()}let E=i(`#view`),D=i(`#view .stage img`),O=i(`#view .rows`),k=0;function A(t){k=(t+u.length)%u.length,D.src=d(k),D.alt=a(r.photoN,{n:k+1}),i(`#view .name`).textContent=a(r.photoN,{n:k+1}),i(`#view .at`).textContent=u.length>1?a(r.at,{n:k+1,all:u.length}):``,O.replaceChildren(...e.items.map((e,t)=>{let n=c.c[v(k,t)]||0,i=e=>()=>{let r=Math.max(0,Math.min(99,n+e));r?c.c[v(k,t)]=r:delete c.c[v(k,t)],A(k),T()},s=o(`button`,``,`−`),l=o(`button`,``,`+`);return s.setAttribute(`aria-label`,a(r.less,{item:e.name})),l.setAttribute(`aria-label`,a(r.more,{item:e.name})),s.disabled=!n,s.onclick=i(-1),l.onclick=i(1),o(`li`,n?`on`:``,o(`div`,`what`,o(`span`,``,e.name),o(`small`,``,e.price)),o(`div`,`step`,s,o(`output`,``,String(n)),l))}))}u.forEach((e,t)=>{e.onclick=()=>{A(t),E.showModal()}}),i(`#view .l`).onclick=()=>A(k-1),i(`#view .r`).onclick=()=>A(k+1),i(`#view .x`).onclick=i(`#view .done`).onclick=()=>E.close(),u.length<2&&(i(`#view .l`).hidden=!0,i(`#view .r`).hidden=!0),E.addEventListener(`click`,e=>{e.target===E&&E.close()}),E.addEventListener(`keydown`,e=>{e.key===`ArrowLeft`&&A(k-1),e.key===`ArrowRight`&&A(k+1)});let j=null,M=i(`#view .stage`);M.addEventListener(`pointerdown`,e=>{j=e.clientX}),M.addEventListener(`pointerup`,e=>{j!==null&&Math.abs(e.clientX-j)>50&&A(k+(e.clientX<j?1:-1)),j=null});let N=i(`#order`),P=i(`#order [name=name]`),F=i(`#order [name=note]`),I=i(`#order .err`),L=i(`#order .msgbox`),R=i(`#order .ok`),z=/[^\s@,;]+@[^\s@,;]+\.[^\s@,;]+/.exec(e.to)?.[0]??``,B=/\+?\d[\d\s()-]{6,}\d/.exec(e.to)?.[0].replace(/[\s()-]/g,``)??``,V=i(`#order .mail`),H=i(`#order .sms`),U=i(`#order .share`);V.hidden=!z,H.hidden=!B,U.hidden=!navigator.share,navigator.share||i(`#order .copy`).classList.remove(`ghost`);function W(){let n=x(),i=P.value.trim(),o=F.value.trim();return[a(r.orderOf,{title:e.title}),`${r.from}: ${i||`…`}`,...n.lines.map(t=>{let n=f(e.items[t.j].price);return`• ${a(r.photoN,{n:t.i+1})}: ${e.items[t.j].name}, ${_(t.n)}${n!==null&&p?` (${g(n*t.n)})`:``}`}),`${r.total}: ${_(n.count)}${n.priced?`, ${g(n.money)}`:``}`,...o?[`${r.noteWord}: ${o}`]:[],...c.retake?[r.retakeLine]:[],``,t(e.id,[...n.lines.map(t=>[e.photos[t.i].n,t.j+1,t.n]),...c.retake?[[0,0,1]]:[]],i||`?`)].join(`
`)}let G=globalThis.qrcode;function K(){let t=x(),o=i(`#order .pay`),s=P.value.trim()||e.child;if(o.hidden=!(e.bank&&G&&t.priced&&t.money>0&&s),o.hidden||!e.bank||!G)return;let c=n(s),l=[`BCD`,`002`,`1`,`SCT`,``,e.bank.name.slice(0,70),e.bank.iban,`EUR${t.money.toFixed(2)}`,``,``,`${e.title} ${s} ${c}`.slice(0,140)].join(`
`),u=G(0,`M`);u.addData(unescape(encodeURIComponent(l))),u.make();let d=u.getModuleCount(),f=``;for(let e=0;e<d;e++)for(let t=0;t<d;t++)u.isDark(e,t)&&(f+=`M${t+4} ${e+4}h1v1h-1z`);i(`#order .pay .qr`).innerHTML=`<svg viewBox="0 0 ${d+8} ${d+8}" role="img" aria-label="QR"><rect width="100%" height="100%" fill="#fff"/><path d="${f}" fill="#000"/></svg>`,i(`#order .bankline`).textContent=a(r.payLine,{name:e.bank.name,iban:e.bank.iban,ref:c})}let q=i(`#order [name=retake]`);function J(){c.name=P.value,c.note=F.value,c.retake=q.checked,l(),L.textContent=W(),P.value.trim()&&(I.hidden=!0),K()}P.oninput=F.oninput=q.onchange=J,i(`.ask`).onclick=()=>{c.retake=!0,Y()},w.onclick=()=>Y();function Y(){let t=x();i(`#order .lines`).replaceChildren(...t.lines.map(t=>{let n=document.createElement(`img`),i=f(e.items[t.j].price);return n.src=d(t.i),n.alt=``,o(`li`,``,n,o(`div`,``,o(`span`,``,e.items[t.j].name),o(`small`,``,`${a(r.photoN,{n:t.i+1})} · ${_(t.n)}`)),o(`b`,``,i!==null&&p?g(i*t.n):``))})),i(`#order .total`).replaceChildren(o(`span`,``,r.total),o(`span`,``,_(t.count)+(t.priced?` · ${g(t.money)}`:``))),P.value=c.name,F.value=c.note,q.checked=!!c.retake,R.textContent=``,I.hidden=!0,J(),N.showModal()}let X=()=>P.value.trim()?!0:(I.hidden=!1,P.focus(),!1);async function Z(){if(X()){try{await navigator.clipboard.writeText(W())}catch{let e=document.createRange();e.selectNodeContents(L),getSelection()?.removeAllRanges(),getSelection()?.addRange(e),document.execCommand(`copy`)}R.textContent=r.copied}}i(`#order .copy`).onclick=()=>void Z(),U.onclick=async()=>{if(X())try{await navigator.share({text:W()}),R.textContent=r.shared}catch(e){e.name!==`AbortError`&&Z()}},V.onclick=()=>{X()&&(location.href=`mailto:${z}?subject=${encodeURIComponent(a(r.orderOf,{title:e.title}))}&body=${encodeURIComponent(W())}`)},H.onclick=()=>{X()&&(location.href=`sms:${B}?&body=${encodeURIComponent(W())}`)},i(`#order .x`).onclick=i(`#order .edit`).onclick=()=>N.close(),N.addEventListener(`click`,e=>{e.target===N&&N.close()}),T()}var F=e({openGallery:()=>L});function I(e){let t=new Set(e.selected.length?e.selected:e.currentId?[e.currentId]:[]);return r(e).filter(e=>t.has(e.id)&&!e.pending)}function L(e){let t=c.get().print,n=g(t.product);c.set({selected:e,currentId:e.includes(c.get().currentId??``)?c.get().currentId:e[0]??null}),!n.pricing&&!n.ordering&&a({product:`order-form`,page:0}),m.set(`sec:print-gallery`,!0),l(`print`),requestAnimationFrame(()=>document.getElementById(`gallery-out`)?.scrollIntoView({block:`start`,behavior:`smooth`}))}function R(e,t,n){if(!t)return[{child:``,photos:e}];let r=e.filter(e=>n.includes(e.name)),i=new Map;for(let t of e)n.includes(t.name)||i.set(t.name,[...i.get(t.name)??[],t]);return[...i].sort(([e],[t])=>e.localeCompare(t,void 0,{numeric:!0})).map(([e,t])=>({child:e,photos:[...t,...r]}))}var z=e=>e.trim().replace(/\s*[\\/:*?"<>|]+\s*/g,` `).trim()||`gallery`,B=e=>new Promise((t,n)=>{let r=new FileReader;r.onload=()=>t(r.result),r.onerror=()=>n(r.error),r.readAsDataURL(e)}),V=e=>`${(e/1048576).toLocaleString(c.get().lang,{maximumFractionDigits:+(e<10485760)})} MB`;async function H(e){let r=c.get(),o=r.print.gallery,l=r.print.lang,m=r.print.items.filter(e=>e.name.trim()),g=new Set(Object.keys(r.bench.consent).filter(e=>r.bench.consent[e]?.solo===!1).flatMap(e=>t(e).map(e=>e.id))),v=I(r),b=v.filter(e=>r.bench.consent[e.name]?.solo!==!1&&!g.has(e.id)),S=v.length-b.length;if(!b.length||!m.length){e?.close(),s(b.length?h(`Put at least one item on the price list first`):h(`Select the photos for the gallery first`));return}if(!await n(b)){e?.close();return}let C=R(b,o.each,o.shared).slice(0,e?1:void 0),w=c.get().print.bank,T=w?_(w.iban):``,E=y(m.find(e=>x(e.price)!==null)?.price??``),D=T&&w?.name.trim()&&(!E||/€|eur/i.test(E))?{iban:T,name:w.name.trim()}:void 0,O=[...new Set(C.flatMap(e=>e.photos))],k=e?`preview`:Math.random().toString(36).slice(2,8).padEnd(6,`0`),A=o.title.trim()||(l===`bg`?`Снимки`:`Photos`),j=new Map(b.map((e,t)=>[e.id,t+1])),M=new Map,P=0;try{for(let[e,t]of O.entries()){c.set({busy:h(`Gallery: photo {n} of {all}`,{n:e+1,all:O.length})});try{let e=await d(t,{type:`image/jpeg`,quality:.8,longEdge:1200,mark:o.mark.trim()||void 0,markAt:`tiled`}),n=await createImageBitmap(e);M.set(t.id,{w:n.width,h:n.height,src:await B(e)}),n.close()}catch{P++}}let t=C.filter(e=>e.photos.some(e=>M.has(e.id))).map(e=>({child:e.child,html:N({id:k,lang:l,title:A,message:o.message.trim(),deadline:o.deadline,by:o.by.trim(),to:o.to.trim(),child:e.child,photos:e.photos.filter(e=>M.has(e.id)).map(e=>({n:j.get(e.id),...M.get(e.id)})),items:m.map(e=>({name:e.name.trim(),price:e.price.trim()})),bank:D,rules:c.get().print.rules})}));if(!t.length){e?.close(),s(h(`None of the photos could be read: is their folder still open?`));return}let n={id:k,made:Date.now(),title:A,deadline:o.deadline||void 0,photos:b.map(e=>({id:e.id,path:e.path,size:e.size})),items:m.map(e=>e.id)};a({galleries:[n,...c.get().print.galleries.filter(e=>e.id!==k)].slice(0,40)});let r=`${P?` ${h(`{n} could not be read and were left out.`,{n:P})}`:``}${S?` ${h(`{n} left out: no consent to portraits.`,{n:S})}`:``}`;if(e){e.location.href=URL.createObjectURL(new Blob([t[0].html],{type:`text/html`})),P&&s(r.trim());return}if(t.length===1){let e=new Blob([t[0].html],{type:`text/html`});p(e,`${z(t[0].child?`${A} ${t[0].child}`:A)}.html`),s(`${h(`Gallery saved: {photos}, {size}. Send the file to the families.`,{photos:f(M.size,`photo`),size:V(e.size)})}${r}`)}else{let e=i(),n=[],a=new Set;for(let r of t){let t=new TextEncoder().encode(r.html);n.push(e.entry(u(`${z(r.child)}.html`,a),t),new Blob([t]))}n.push(e.end());let o=new Blob(n,{type:`application/zip`});p(o,`${z(A)}.zip`),s(`${h(`{n} galleries saved, one a child, in one zip ({size}). Send each family its own file.`,{n:t.length,size:V(o.size)})}${r}`)}}finally{c.set({busy:null})}}function U(e,t=c.get()){let n=t.print.galleries.find(t=>t.id===e.gallery);if(!n)return null;let r=[];for(let[i,a,o]of e.lines){let e=n.photos[i-1],s=n.items[a-1],c=e&&(t.photos.find(t=>t.id===e.id)??t.photos.find(t=>t.path===e.path&&t.size===e.size));c&&s&&t.print.items.some(e=>e.id===s)&&r.push([c.id,s,o])}return{lines:r,lost:e.lines.length-r.length}}var W=e=>`${e.gallery}:${e.name.toLocaleLowerCase()}`,G=e=>e.length>3?h(`{names} and {n} more`,{names:e.slice(0,3).join(`, `),n:e.length-3}):e.join(`, `);function K(e){let{codes:t,broken:n}=w(e),r=c.get(),i={},l=[...r.print.taken],u=0,d=0,f=0,p=0,m=[],g=(e,t)=>{for(let[n,r,a]of e)(i[n]??={})[r]=(i[n][r]??0)+t*a};for(let e of t){let t=W(e),n=l.find(e=>e.key===t);if(n?.code===e.code){u++;continue}let i=U(e,r);if(!i)d++;else{if(n){let e=w(n.code).codes[0],t=e&&U(e,r);t&&g(t.lines,-1),l=l.filter(e=>e!==n),f++}g(i.lines,1),p+=i.lost,l.push({key:t,code:e.code,name:e.name,at:Date.now()}),m.push(e.name)}}Object.keys(i).length&&o(i),m.length&&a({taken:l});let _=[...new Set(t.filter(e=>e.retake).map(e=>e.name))];if(_.length){let e={...c.get().print.families};for(let t of _)e[t]={...e[t],retake:b()};a({families:e})}let v=[m.length&&h(`Orders added: {names}`,{names:G(m)}),_.length&&h(`Asked for a retake: {names}`,{names:G(_)}),f&&h(`Replaced an earlier order from the same family: {n}`,{n:f}),u&&h(`Already taken in: {n}`,{n:u}),d&&h(`From a gallery not made in this browser: {n}`,{n:d}),n&&h(`Damaged, ask the family to send them again: {n}`,{n}),p&&h(`Lines for photos or items no longer here: {n}`,{n:p})].filter(Boolean);return s(v.length?v.join(`. `):h(`No order code in this text. A code starts with VITRUM:`)),m.length>0}function q(e){let t=c.get(),n=w(e.code).codes[0],r=n&&U(n,t);if(r){let e={};for(let[t,n,i]of r.lines)(e[t]??={})[n]=(e[t][n]??0)-i;o(e)}a({taken:t.print.taken.filter(t=>t!==e)}),s(h(`Removed the order of {name}`,{name:e.name}),{label:h(`Undo`),run:()=>void K(e.code)})}var J=e=>w(e.code).codes[0]?.lines.reduce((e,t)=>e+t[2],0)??0;export{I as a,R as i,H as n,J as o,F as r,K as s,q as t};