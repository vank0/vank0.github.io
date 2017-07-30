var Nativa = function (customMessages) {
    var self = this;
    var forms = document.getElementsByTagName('form');
    var requiredFields = document.querySelectorAll('[required]');
    var messages = {
        valueMissing: 'Моля попълнете това поле!',
        noMatch: 'Стойността на полето трябва да съвпада със стойността на поле с ID: $matchElement',
        badInput: 'Невалидни данни!',
        patternMismatch: 'Полето не отговаря на изискванията: $title',
        rangeOverflow: 'Максималната стойност е: $max',
        rangeUnderflow: 'Максималната стойност е: $min',
        stepMismatch: 'Позволен размер на стъпка: $step',
        tooLong: 'Максимален брой символи: $maxlength . По настоящем използвате $currentlength',
        tooShort: 'Минимален брой символи: $minlength.',
        typeMismatch: 'Въведените данни не отговарят на поле от тип: $type',
    }
    if (customMessages) {
        for (var attrname in customMessages) {
            messages[attrname] = customMessages[attrname];
        }
    }

    this.init = function() {
        forms = document.getElementsByTagName('form');
        requiredFields = document.querySelectorAll('[required]');
        return this;
    }

    this.recaptcha = function(key) {
        self.recaptchaKey = key;
        return self;
    }

    var formHandler = function(e) {
        var form = this;
        var callback = this.getAttribute('data-callback');
        var recaptchaKey = function(){
            return self.recaptchaKey;
        };
        e.preventDefault();
        if (self.validateForm(this)) {
            if(!window.grecaptcha) {
                this.submit();
            } else {
                if(recaptchaKey()) {
                    if(!this.querySelector('.g-recaptcha')) {
                        var el = document.createElement('div');
                        el.classList.add('g-recaptcha');
                        this.appendChild(el);
                    }
                    if(this.getAttribute('data-recaptcha-id')) {
                        grecaptcha.reset(this.getAttribute('data-recaptcha-id'));
                        grecaptcha.execute(this.getAttribute('data-recaptcha-id'));
                    } else {
                        var recaptcha = grecaptcha.render(this.querySelector('.g-recaptcha'), {
                                'sitekey' : recaptchaKey(),
                                'size' : 'invisible',
                                'callback' : function() {
                                    form.submit();
                                }
                            }
                        )
                        this.setAttribute('data-recaptcha-id', recaptcha);
                        grecaptcha.execute(recaptcha);
                    }
                } else {
                    console.error('Missing recaptcha key.');
                }
                
            }
        }
    }
    
    this.validate = function () {
        forms = document.getElementsByTagName('form');
        for (var i = 0; i < forms.length; i++) {
            forms[i].setAttribute('novalidate', 'true');
            forms[i].addEventListener('submit', formHandler);
        }
        for (var i = 0; i < requiredFields.length; i++) {
            requiredFields[i].addEventListener('input', function(){
                self.validateElement(this);
            });
            requiredFields[i].addEventListener('change', function(){
                self.validateElement(this);
            });
        }
    }

    this.isValid = function (element) {
        element.setCustomValidity('');
        var regex = new RegExp(element.getAttribute('pattern') || '^.+$');
        if (element.validity.valueMissing || element.value.length == 0) {
            element.setCustomValidity(element.getAttribute('data-msg-required') || messages.valueMissing);
            return false;
        }
        if (
            element.hasAttribute('data-match') && document.getElementById(element.getAttribute("data-match"))) {
            var matchId = element.getAttribute("data-match");
            var value = element.value;
            var confirmValue = document.getElementById(matchId).value;
            if (value != confirmValue) {
                element.setCustomValidity(messages.noMatch.replace('$matchElement', matchId));
                return false;
            }
        }

        if (element.validity.badInput) {
            element.setCustomValidity(messages.badInput);
            return false;
        }
        if (element.validity.rangeOverflow) {
            element.setCustomValidity(messages.rangeOverflow.replace('$max', element.getAttribute('max')));
            return false;
        }
        if (element.validity.rangeUnderflow) {
            element.setCustomValidity(messages.rangeUnderflow.replace('$min', element.getAttribute('min')));
            return false;
        }
        if (element.validity.stepMismatch) {
            element.setCustomValidity(messages.stepMismatch.replace('$step', element.getAttribute('step')));
            return false;
        }
        if (element.validity.tooLong || element.value.length > parseInt(element.getAttribute('maxlength'))) {
            console.log(element.getAttribute('maxlength'));
            element.setCustomValidity(messages.tooLong.replace('$maxlength', element.getAttribute('maxlength')).replace('$currentlength', element.value.length));
            return false;
        }
        if (element.validity.tooShort || (element.value.length < parseInt(element.getAttribute('minlength')))) {
            element.setCustomValidity(messages.tooShort.replace('$minlength', element.getAttribute('minlength')).replace('$currentlength', element.value.length));
            return false;
        }
        if (element.validity.patternMismatch || !regex.test(element.value)) {
            element.setCustomValidity(messages.patternMismatch.replace('$title', element.getAttribute('title')));
            return false;
        }
        if (element.validity.typeMismatch) {
            element.setCustomValidity(messages.typeMismatch.replace('$type', element.getAttribute('type')));
            return false;
        }
        return true;
    };

    this.showError = function (element, settings) {
        var options = {
            text: element.validationMessage,
            class: 'error'
        }
        if (settings) {
            for (var option in settings) {
                options[option] = settings[option];
            }
        }
        if (
            element.nextElementSibling &&
            element.nextElementSibling.hasAttribute('for') &&
            element.nextElementSibling.classList.contains('error') &&
            element.nextElementSibling.getAttribute('for') == element.getAttribute('id')
        ) {
            element.nextElementSibling.innerText = options.text;
        } else {
            var label = document.createElement('label');
            label.setAttribute('for', element.getAttribute('id'))
            label.setAttribute('class', options.class);
            label.innerText = options.text;
            element.parentNode.insertBefore(label, element.nextElementSibling);
        }

    };

    this.hideError = function (element) {
        if (
            element.nextElementSibling &&
            element.nextElementSibling.hasAttribute('for') &&
            element.nextElementSibling.classList.contains('error') &&
            element.nextElementSibling.getAttribute('for') == element.getAttribute('id')) {
            element.parentNode.removeChild(element.nextElementSibling)
        }
    };

    this.validateElement = function (element) {
        if (!self.isValid(element)) {
            element.classList.add('error');
            self.showError(element, {class: 'error label-error'});
            return false;
        } else if (self.isValid(element) && element.classList.contains('error')) {
            element.classList.remove('error');
            self.hideError(element);
            return true;
        } else if (self.isValid(element)) {
            self.hideError(element);
            return true;
        }
    };

    this.validateParentForm = function (event) {
        node = this;
        while (node.nodeName != "FORM" && node.parentNode) {
            node = node.parentNode;
        }
        self.validateForm(node);
    };

    this.validateForm = function (form) {
        var errors = 0;
        requiredFields = form.querySelectorAll('[required]'); 
        for (var i = 0; i < requiredFields.length; i++) {
            var element = requiredFields[i];
            if(self.validateElement(element) !== true){
                errors = errors + 1;
            };
        }
        return errors ? false : true;
    }
}


// USAGE:
// var validator = new Nativa();
// validator.validate();
