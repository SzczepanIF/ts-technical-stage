var RegisterContainer = (function () {
    function RegisterContainer() {
        this.name = 'register-container';
        this.isFormValid = false;
        this.isFormPristine = true;
        this.isIE8 = false;
        this.domSelectors = {
            moduleName: '[data-init="' + this.name + '"]',
            inputText: '[data-init="inputText"]',
            dropdownField: '[data-init="dropdownField"]'
        };
        this.domClasses = {
            hideError: 'errors__hide',
            hideTooltip: 'tooltip__hide',
            errorMessage: 'errors__message',
            errorsWrapper: 'errors',
            tooltip: 'form-input__tooltip'
        };
        this.isIE8 = navigator.appVersion.indexOf('MSIE 8') > 0;
        this.initUI();
        this.addEventListeners();
    }
    RegisterContainer.prototype.initUI = function () {
        this.moduleWrapper = document.querySelector(this.domSelectors.moduleName);
        this.inputTextElements = document.querySelectorAll(this.domSelectors.inputText + ' .form-input__field');
        this.dropdownElements = document.querySelectorAll(this.domSelectors.dropdownField);
        this.submitButton = document.querySelector('button[type="submit"]');
    };
    RegisterContainer.prototype.addEventListeners = function () {
        var _this = this;
        this.moduleWrapper.addEventListener('submit', function (event) { _this.validateFormSubmit(event); });
        this.attachInputElementHandler();
    };
    RegisterContainer.prototype.attachInputElementHandler = function () {
        var _this = this;
        var _loop_1 = function (i) {
            this_1.inputTextElements[i].addEventListener('keyup', function (event) { _this.validateField(event); });
            this_1.inputTextElements[i].addEventListener('change', function (event) { _this.validateField(event); });
            if (this_1.inputTextElements[i].getAttribute('type') === 'password') {
                this_1.inputTextElements[i].previousElementSibling.querySelector('input[type="checkbox"]').addEventListener('click', function (event) {
                    var checkboxElement = event.currentTarget;
                    if (!_this.isIE8) {
                        _this.inputTextElements[i].setAttribute('type', checkboxElement.checked ? 'text' : 'password');
                    }
                    else {
                        _this.showPasswordInIE8(_this.inputTextElements[i]);
                    }
                });
            }
        };
        var this_1 = this;
        for (var i = 0; i < this.inputTextElements.length; i++) {
            _loop_1(i);
        }
    };
    RegisterContainer.prototype.showPasswordInIE8 = function (inputPassword) {
        var tooltipElement = inputPassword.parentNode.querySelector('.' + this.domClasses.tooltip);
        tooltipElement.classList.contains(this.domClasses.hideTooltip) ?
            tooltipElement.classList.remove(this.domClasses.hideTooltip) :
            tooltipElement.classList.add(this.domClasses.hideTooltip);
    };
    RegisterContainer.prototype.validateField = function (event) {
        var isFieldValid = true;
        var element = event.currentTarget;
        this.isFormPristine = false;
        isFieldValid = !this.isFieldEmpty(element);
        if (element.getAttribute('pattern')) {
            var isPatternValid = this.checkFieldPattern(element);
            isFieldValid = isPatternValid ? isFieldValid : false;
        }
        if (element.getAttribute('type') === 'password') {
            var inputPasswordWrapper = element.parentNode;
            inputPasswordWrapper.querySelector('.' + this.domClasses.tooltip).innerHTML = '<strong>Current password</strong>: ' + element.value;
        }
        if (element.getAttribute('type') === 'email') {
            var isEmailEqual = this.checkEqualityOfEmails(element) && isFieldValid;
            isFieldValid = isEmailEqual ? isFieldValid : false;
        }
        if (isFieldValid) {
            this.submitButton.removeAttribute('disabled');
        }
        isFieldValid ? element.nextElementSibling.classList.add(this.domClasses.hideError) : element.nextElementSibling.classList.remove(this.domClasses.hideError);
    };
    RegisterContainer.prototype.showErrorMessage = function (type, element) {
        var errorMessage = element.nextElementSibling.querySelector('.' + this.domClasses.errorMessage + '-' + type);
        if (element.nextElementSibling && errorMessage) {
            element.nextElementSibling.classList.remove(this.domClasses.hideError);
            errorMessage.classList.remove(this.domClasses.hideError);
        }
        this.submitButton.setAttribute('disabled', 'disabled');
    };
    RegisterContainer.prototype.hideErrorMessage = function (type, element) {
        var errorMessage = element.nextElementSibling.querySelector('.' + this.domClasses.errorMessage + '-' + type);
        if (element.nextElementSibling && errorMessage) {
            errorMessage.classList.add(this.domClasses.hideError);
        }
        if (type === 'not-equal') {
            this.validateMailFields(type);
        }
    };
    RegisterContainer.prototype.validateMailFields = function (type) {
        var errorMessageMailInputs = this.moduleWrapper.querySelectorAll(' input[type="email"]');
        for (var i = 0; i < errorMessageMailInputs.length; i++) {
            if (errorMessageMailInputs[i].nextElementSibling.classList.contains(this.domClasses.hideError)) {
                errorMessageMailInputs[i].dispatchEvent(new Event('change'));
            }
        }
    };
    RegisterContainer.prototype.checkFieldPattern = function (element) {
        var pattern = new RegExp(element.getAttribute('pattern'));
        var isRegExpValid = pattern.test(element.value);
        isRegExpValid ? this.hideErrorMessage('pattern', element) : this.showErrorMessage('pattern', element);
        return isRegExpValid;
    };
    RegisterContainer.prototype.checkEqualityOfEmails = function (element) {
        var baseValue = element.value;
        var emailFields = this.moduleWrapper.querySelectorAll('input[type="email"]');
        var isEmailEqual = true;
        emailFields.forEach(function (inputPassword) {
            if (inputPassword.value !== baseValue) {
                isEmailEqual = false;
            }
        });
        isEmailEqual ? this.hideErrorMessage('not-equal', element) : this.showErrorMessage('not-equal', element);
        return isEmailEqual;
    };
    RegisterContainer.prototype.isFieldEmpty = function (field) {
        var isEmpty = field.getAttribute('required') === '' && field.value.length === 0;
        isEmpty ? this.showErrorMessage('required', field) : this.hideErrorMessage('required', field);
        return isEmpty;
    };
    RegisterContainer.prototype.validateFormSubmit = function (event) {
        event.preventDefault();
        this.isFormValid = this.isFormHavingErrors();
        if (this.isFormValid) {
            this.formSubmit();
        }
        else {
            this.scrollIntoFirstError();
        }
    };
    RegisterContainer.prototype.scrollIntoFirstError = function () {
        var firstErrorInput = this.moduleWrapper.querySelector('.' + this.domClasses.errorsWrapper + ':not(.' + this.domClasses.hideError + ')').previousElementSibling;
        firstErrorInput.scrollIntoView();
        firstErrorInput.focus();
    };
    RegisterContainer.prototype.formSubmit = function () {
        this.moduleWrapper.submit();
    };
    RegisterContainer.prototype.isFormHavingErrors = function () {
        for (var i = 0; i < this.inputTextElements.length; i++) {
            this.inputTextElements[i].dispatchEvent(new Event('change'));
        }
        return this.moduleWrapper.querySelectorAll('.' + this.domClasses.errorsWrapper + ':not(.' + this.domClasses.hideError + ')').length === 0;
    };
    return RegisterContainer;
}());
