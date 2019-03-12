class RegisterContainer {
  private name: string = 'register-container'
  private domSelectors;
  private inputTextElements: NodeListOf<Element>;
  private dropdownElements: NodeListOf<Element>;
  moduleWrapper: HTMLFormElement;
  private isFormValid: boolean = false;
  private isFormPristine: boolean = true;

 constructor() {
   this.domSelectors = {
     moduleName: '[data-init="'+ this.name + '"]',
     inputText: '[data-init="inputText"]',
     dropdownField: '[data-init="dropdownField"]'
   }
   this.initUI();
   this.addEventListeners();
 }

 initUI():void {
   this.moduleWrapper = document.querySelector(this.domSelectors.moduleName);
   this.inputTextElements = document.querySelectorAll(this.domSelectors.inputText + ' input');
   this.dropdownElements = document.querySelectorAll(this.domSelectors.dropdownField);
 }

 addEventListeners():void {
   this.moduleWrapper.addEventListener('submit', (event:Event) => {this.formSubmit(event)});
   this.attachInputElementHandler();
 }

 attachInputElementHandler():void {
   this.inputTextElements.forEach((inputText:any) => {
     inputText.addEventListener('change', (event: Event) => {this.validateField(event)});

     if (inputText.getAttribute('type') === 'password') {
       inputText.previousElementSibling.querySelector('input[type="checkbox"]').addEventListener('click', (event: Event) => {
         let checkboxElement:HTMLInputElement = <HTMLInputElement> event.currentTarget;
         inputText.setAttribute('type', checkboxElement.checked ? 'text' : 'password');
       });
     }
   });
 }

 validateField(event:Event): void {
   let isFieldValid = true;
   let element:HTMLInputElement = <HTMLInputElement> event.currentTarget;
   this.isFormPristine = false;

   isFieldValid = !this.isFieldEmpty(element);


   if (element.getAttribute('pattern')) {
     let isPatternValid = this.checkFieldPattern(element);

     isFieldValid = isPatternValid ? isFieldValid: false;
   }

   if (element.getAttribute('type') === 'email') {
     let isEmailEqual =  this.checkEqualityOfEmails(element) && isFieldValid;

     isFieldValid = isEmailEqual ? isFieldValid: false;
   }

   isFieldValid ? element.nextElementSibling.classList.add('errors__hide') : element.nextElementSibling.classList.remove('errors__hide')
 }

 showErrorMessage(type: string, element:any) {
   element.nextElementSibling.classList.remove('errors__hide');
   element.nextElementSibling.querySelector('.errors__message-' + type).classList.remove('errors__hide')
 }

 hideErrorMessage(type:string, element: any) {
   element.nextElementSibling.querySelector('.errors__message-' + type).classList.add('errors__hide')
 }

 checkFieldPattern(element:any): boolean {
   let pattern = new RegExp(element.getAttribute('pattern'));
   let isRegExpValid = pattern.test(element.value);

   isRegExpValid ? this.hideErrorMessage('pattern', element) : this.showErrorMessage('pattern', element);
   return isRegExpValid;
 }

 checkEqualityOfEmails(element:any) {
   let baseValue = element.value;
   let emailFields:NodeListOf<Element> = this.moduleWrapper.querySelectorAll('input[type="email"]');
   let isEmailEqual = true;

   emailFields.forEach((inputPassword:any) => {
     if (inputPassword.value !== baseValue) {
       isEmailEqual = false;
     }
   });

  isEmailEqual ? this.hideErrorMessage('not-equal', element): this.showErrorMessage('not-equal', element);

  return isEmailEqual;
 }

 isFieldEmpty(field:any): boolean {
   let isEmpty = field.getAttribute('required') && field.value.length === 0;

   isEmpty ? this.showErrorMessage('required', field): this.hideErrorMessage('required', field);
   return isEmpty;
 }

 formSubmit(event: Event): void {
   event.preventDefault();
   this.isFormValid = this.isFormHavingErrors();

    if (this.isFormValid) {
      this.moduleWrapper.submit();
    }
 }
 isFormHavingErrors(): boolean {
   return this.moduleWrapper.querySelectorAll('.errors:not(.error-hide)').length === 0;
 }
}
