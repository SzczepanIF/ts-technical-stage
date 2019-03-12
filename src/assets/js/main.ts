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

 constructor() {
   this.domSelectors = {
     moduleName: '[data-init="' + this.name + '"]',
     inputText: '[data-init="inputText"]',
     dropdownField: '[data-init="dropdownField"]'
   };
   this.domClasses = {
     hideError: 'errors__hide',
     errorMessage: 'errors__message',
     errorsWrapper: 'errors'
   };
   this.initUI();
   this.addEventListeners();
 }

 private initUI(): void {
   this.moduleWrapper = document.querySelector(this.domSelectors.moduleName);
   this.inputTextElements = document.querySelectorAll(this.domSelectors.inputText + ' input');
   this.dropdownElements = document.querySelectorAll(this.domSelectors.dropdownField);
   this.submitButton = document.querySelector('button[type="submit"]');
 }

 private addEventListeners(): void {
   this.moduleWrapper.addEventListener('submit', ( event: Event ) => { this.validateFormSubmit( event ); });
   this.attachInputElementHandler();
 }

 private attachInputElementHandler(): void {
   this.inputTextElements.forEach((inputText: HTMLInputElement) => {
     inputText.addEventListener('keyup change', ( event: Event ) => { this.validateField( event ); });

     if (inputText.getAttribute('type') === 'password') {
       inputText.previousElementSibling.querySelector('input[type="checkbox"]').addEventListener('click', (event: Event) => {
         const checkboxElement: HTMLInputElement = <HTMLInputElement> event.currentTarget;
         inputText.setAttribute('type', checkboxElement.checked ? 'text' : 'password');
       });
     }
   });
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
   const errorMessage = element.nextElementSibling.querySelector('.' +  this.domClasses.errorMessage + '-' + type);

   if (element.nextElementSibling && errorMessage) {
     errorMessage.classList.add(this.domClasses.hideError);
   }
  }

 private checkFieldPattern(element: HTMLInputElement): boolean {
   const pattern = new RegExp(element.getAttribute('pattern'));
   const isRegExpValid = pattern.test(element.value);

   isRegExpValid ? this.hideErrorMessage('pattern', element) : this.showErrorMessage('pattern', element);
   return isRegExpValid;
 }

 private checkEqualityOfEmails(element: HTMLInputElement) {
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
   const isEmpty = field.getAttribute('required') && field.value.length === 0;

   isEmpty ? this.showErrorMessage('required', field) : this.hideErrorMessage('required', field);
   return isEmpty;
 }

 private validateFormSubmit(event: Event): void {
   event.preventDefault();
   this.isFormValid = this.isFormHavingErrors();

    if (this.isFormValid) {
      this.formSubmit();
    }
 }

 private formSubmit(): void {
   this.moduleWrapper.submit();
 }

 private isFormHavingErrors(): boolean {
   return this.moduleWrapper.querySelectorAll('.' + this.domClasses.errorsWrapper + ':not(.' + this.domClasses.hideError + ')').length === 0;
 }
}
