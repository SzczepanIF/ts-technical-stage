


class RegisterContainer {
  private name: string = 'register-container';
  private domSelectors;
  private domClasses;
  private inputTextElements: NodeListOf<Element>;
  private dropdownElements: NodeListOf<Element>;
  private submitButton: HTMLElement;
  moduleWrapper: HTMLFormElement;
  private isFormValid: boolean = false;
  private isFormPristine: boolean = true;
  private isIE8: boolean = false;

 constructor() {
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

 private initUI(): void {
   this.moduleWrapper = document.querySelector(this.domSelectors.moduleName);
   this.inputTextElements = document.querySelectorAll(this.domSelectors.inputText + ' .form-input__field');
   this.dropdownElements = document.querySelectorAll(this.domSelectors.dropdownField);
   this.submitButton = document.querySelector('button[type="submit"]');
 }

 private addEventListeners(): void {
   this.moduleWrapper.addEventListener('submit', ( event: Event ) => { this.validateFormSubmit( event ); });
   this.attachInputElementHandler();
 }

 private attachInputElementHandler(): void {
   for (let i = 0; i < this.inputTextElements.length; i++) {
     this.inputTextElements[i].addEventListener('keyup', ( event: Event ) => { this.validateField( event ); });
     this.inputTextElements[i].addEventListener('change', ( event: Event ) => { this.validateField( event ); });

     if (this.inputTextElements[i].getAttribute('type') === 'password') {
       this.inputTextElements[i].previousElementSibling.querySelector('input[type="checkbox"]').addEventListener('click', (event: Event) => {
         const checkboxElement: HTMLInputElement = <HTMLInputElement> event.currentTarget;
         if (!this.isIE8) {
           this.inputTextElements[i].setAttribute('type', checkboxElement.checked ? 'text' : 'password');
         } else {
           this.showPasswordInIE8(this.inputTextElements[i]);
         }
       });
     }
   }
 }

 private showPasswordInIE8(inputPassword) {
   const tooltipElement = inputPassword.parentNode.querySelector('.' + this.domClasses.tooltip);

   tooltipElement.classList.contains(this.domClasses.hideTooltip) ?
    tooltipElement.classList.remove(this.domClasses.hideTooltip) :
    tooltipElement.classList.add(this.domClasses.hideTooltip);
 }

 private validateField(event: Event): void {
   let isFieldValid = true;
   const element: HTMLInputElement = <HTMLInputElement> event.currentTarget;
   this.isFormPristine = false;

   isFieldValid = !this.isFieldEmpty(element);


   if (element.getAttribute('pattern')) {
     const isPatternValid = this.checkFieldPattern(element);

     isFieldValid = isPatternValid ? isFieldValid : false;
   }

   if (element.getAttribute('type') === 'password') {
     const inputPasswordWrapper: HTMLElement = <HTMLElement>element.parentNode;
     inputPasswordWrapper.querySelector('.' + this.domClasses.tooltip).innerHTML = '<strong>Current password</strong>: ' + element.value;
   }

   if (element.getAttribute('type') === 'email') {
     const isEmailEqual =  this.checkEqualityOfEmails(element) && isFieldValid;

     isFieldValid = isEmailEqual ? isFieldValid : false;
   }

   if (isFieldValid) {
     this.submitButton.removeAttribute('disabled');
   }

   isFieldValid ? element.nextElementSibling.classList.add(this.domClasses.hideError) : element.nextElementSibling.classList.remove(this.domClasses.hideError);
 }

 private showErrorMessage(type: string, element: HTMLElement): void {
   const errorMessage = element.nextElementSibling.querySelector('.' + this.domClasses.errorMessage + '-' + type);
   if (element.nextElementSibling && errorMessage) {
    element.nextElementSibling.classList.remove(this.domClasses.hideError);
    errorMessage.classList.remove(this.domClasses.hideError);
   }

   this.submitButton.setAttribute('disabled', 'disabled');
 }

 private hideErrorMessage(type: string, element: HTMLElement): void {

   let errorMessage = element.nextElementSibling.querySelector('.' +  this.domClasses.errorMessage + '-' + type);
   if (element.nextElementSibling && errorMessage) {
     errorMessage.classList.add(this.domClasses.hideError);
   }

   if (type === 'not-equal') {
     this.validateMailFields(type);
   }
 }

private validateMailFields(type: string): void {
  const errorMessageMailInputs:NodeListOf<Element> = this.moduleWrapper.querySelectorAll(' input[type="email"]');
  // Here
  for (let i = 0; i < errorMessageMailInputs.length; i++) {
    if (errorMessageMailInputs[i].nextElementSibling.classList.contains(this.domClasses.hideError)) {
      errorMessageMailInputs[i].dispatchEvent(new Event('change'));
    }
 }
}

 private checkFieldPattern(element: HTMLInputElement): boolean {
   const pattern = new RegExp(element.getAttribute('pattern'));
   const isRegExpValid = pattern.test(element.value);

   isRegExpValid ? this.hideErrorMessage('pattern', element) : this.showErrorMessage('pattern', element);
   return isRegExpValid;
 }

 private checkEqualityOfEmails(element: HTMLInputElement): boolean {
   const baseValue = element.value;
   const emailFields: NodeListOf<Element> = this.moduleWrapper.querySelectorAll('input[type="email"]');
   let isEmailEqual = true;

   emailFields.forEach((inputPassword: HTMLInputElement) => {
     if (inputPassword.value !== baseValue) {
       isEmailEqual = false;
     }
   });

  isEmailEqual ? this.hideErrorMessage('not-equal', element) : this.showErrorMessage('not-equal', element);

  return isEmailEqual;
 }

 private isFieldEmpty(field: HTMLInputElement): boolean {
   const isEmpty = field.getAttribute('required') === '' && field.value.length === 0;

   isEmpty ? this.showErrorMessage('required', field) : this.hideErrorMessage('required', field);
   return isEmpty;
 }

 private validateFormSubmit(event: Event): void {
   event.preventDefault();
   this.isFormValid = this.isFormHavingErrors();

    if (this.isFormValid) {
      this.formSubmit();
    } else {
      this.scrollIntoFirstError();
    }
 }

 private scrollIntoFirstError(): void {
   const firstErrorInput: HTMLInputElement = <HTMLInputElement> this.moduleWrapper.querySelector('.' + this.domClasses.errorsWrapper + ':not(.' + this.domClasses.hideError + ')').previousElementSibling;
   firstErrorInput.scrollIntoView();
   firstErrorInput.focus();
 }

 private formSubmit(): void {
   this.moduleWrapper.submit();
 }

 private isFormHavingErrors(): boolean {
   for (let i = 0; i < this.inputTextElements.length; i++) {
     this.inputTextElements[i].dispatchEvent(new Event('change'));
  }

   return this.moduleWrapper.querySelectorAll('.' + this.domClasses.errorsWrapper + ':not(.' + this.domClasses.hideError + ')').length === 0;
 }
}
