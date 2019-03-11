"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RegisterContainer = (function () {
    function RegisterContainer() {
        this.name = 'register-container';
        this.isFormValid = false;
        this.isFormPristine = true;
        this.domSelectors = {
            moduleName: '[data-init="' + this.name + '"]',
            inputText: '[data-init="inputText"]',
            dropdownField: '[data-init="dropdownField"]'
        };
        this.initUI();
        this.addEventListeners();
    }
    RegisterContainer.prototype.initUI = function () {
        this.moduleWrapper = document.querySelector(this.domSelectors.moduleName);
        this.inputTextElements = document.querySelectorAll(this.domSelectors.inputText + ' input');
        this.dropdownElements = document.querySelectorAll(this.domSelectors.dropdownField);
    };
    RegisterContainer.prototype.addEventListeners = function () {
        var _this = this;
        this.moduleWrapper.addEventListener('submit', function (event) { _this.formSubmit(event); });
        this.attachInputElementHandler();
    };
    RegisterContainer.prototype.attachInputElementHandler = function () {
        var _this = this;
        Array(this.inputTextElements).forEach(function (inputText) {
            inputText.addEventListener('keyup', function (event) { _this.validateField(event); });
            if (inputText.getAttribute('type') === 'password') {
                inputText.previousElementSibling.querySelector('input[type="checkbox"]').addEventListener('click', function (event) {
                    var checkboxElement = event.currentTarget;
                    inputText.setAttribute('type', checkboxElement.checked ? 'text' : 'password');
                });
            }
        });
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
        if (element.getAttribute('type') === 'email') {
            var isEmailEqual = this.checkEqualityOfEmails(element) && isFieldValid;
            isFieldValid = isEmailEqual ? isFieldValid : false;
        }
        isFieldValid ? element.nextElementSibling.classList.add('errors__hide') : element.nextElementSibling.classList.remove('errors__hide');
    };
    RegisterContainer.prototype.showErrorMessage = function (type, element) {
        element.nextElementSibling.classList.remove('errors__hide');
        element.nextElementSibling.querySelector('.errors__message-' + type).classList.remove('errors__hide');
    };
    RegisterContainer.prototype.hideErrorMessage = function (type, element) {
        element.nextElementSibling.querySelector('.errors__message-' + type).classList.add('errors__hide');
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
        Array(emailFields).forEach(function (inputPassword) {
            if (inputPassword.value !== baseValue) {
                isEmailEqual = false;
            }
        });
        isEmailEqual ? this.hideErrorMessage('not-equal', element) : this.showErrorMessage('not-equal', element);
        return isEmailEqual;
    };
    RegisterContainer.prototype.isFieldEmpty = function (field) {
        var isEmpty = field.getAttribute('required') && field.value.length === 0;
        isEmpty ? this.showErrorMessage('required', field) : this.hideErrorMessage('required', field);
        return isEmpty;
    };
    RegisterContainer.prototype.formSubmit = function (event) {
        event.preventDefault();
        this.isFormValid = this.isFormHavingErrors();
        if (this.isFormValid) {
            this.moduleWrapper.submit();
        }
    };
    RegisterContainer.prototype.isFormHavingErrors = function () {
        return this.moduleWrapper.querySelectorAll('.errors:not(.error-hide)').length === 0;
    };
    return RegisterContainer;
}());
exports.RegisterContainer = RegisterContainer;
var object = new RegisterContainer();
