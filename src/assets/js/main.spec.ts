// import { RegisterContainer } from './main';

describe('RegisterContainer Component', () => {

  let component;

  beforeEach(() => {
    let form = `<form name="register_form" data-init="register-container" novalidate><div class="form-input" data-init="inputText"><label class="form-input__label">Forename<span>*</span></label><input class="form-input__field" type="text" placeholder="forename" value="" name="forename" required="true" if inputfield.inputPattern pattern="^[a-zA-Z.]{1,100}$"><div class="errors form-input__errors errors__hide" role="alert"><div class="errors__title form-input__errors__title"><strong>Error:</strong></div><div class="errors__message errors__hide form-input__errors__message errors__message-required">Input of Forename is required.</div><div class="errors__message errors__hide form-input__errors__message errors__message-not-equal">Both Forename field values needs to be equal.</div><div class="errors__message errors__hide form-input__errors__message errors__message-pattern">Input of Forename is invalid.<span>Value should have at least 1 and maximum 100 characters.</span></div></div></div><div class="form-input" data-init="inputText"><label class="form-input__label">Surname<span>*</span></label><input class="form-input__field" type="text" placeholder="surename" value="" name="surname" required="true" if inputfield.inputPattern pattern="^[a-zA-Z.]{1,100}$"><div class="errors form-input__errors errors__hide" role="alert"><div class="errors__title form-input__errors__title"><strong>Error:</strong></div><div class="errors__message errors__hide form-input__errors__message errors__message-required">Input of Surname is required.</div><div class="errors__message errors__hide form-input__errors__message errors__message-not-equal">Both Surname field values needs to be equal.</div><div class="errors__message errors__hide form-input__errors__message errors__message-pattern">Input of Surname is invalid.<span>Value should have at least 1 and maximum 100 characters.</span></div></div></div><div class="form-input" data-init="inputText"><label class="form-input__label">E-mail</label><input class="form-input__field" type="email" placeholder="E-mail" value="" name="email" if inputfield.inputPattern pattern="(.+)@(.+){2,}.(.+){2,}"><div class="errors form-input__errors errors__hide" role="alert"><div class="errors__title form-input__errors__title"><strong>Error:</strong></div><div class="errors__message errors__hide form-input__errors__message errors__message-required">Input of E-mail is required.</div><div class="errors__message errors__hide form-input__errors__message errors__message-not-equal">Both E-mail field values needs to be equal.</div><div class="errors__message errors__hide form-input__errors__message errors__message-pattern">Input of E-mail is invalid.<span>Please provide email address in proper format.</span></div></div></div><div class="form-input" data-init="inputText"><label class="form-input__label">Verify Email<span>*</span></label><input class="form-input__field" type="email" placeholder="Verify E-mail" value="" name="verify_email" required="true" if inputfield.inputPattern pattern="(.+)@(.+){2,}.(.+){2,}"><div class="errors form-input__errors errors__hide" role="alert"><div class="errors__title form-input__errors__title"><strong>Error:</strong></div><div class="errors__message errors__hide form-input__errors__message errors__message-required">Input of Verify Email is required.</div><div class="errors__message errors__hide form-input__errors__message errors__message-not-equal">Both Verify Email field values needs to be equal.</div><div class="errors__message errors__hide form-input__errors__message errors__message-pattern">Input of Verify Email is invalid.</div></div></div><div class="form-input" data-init="inputText"><label class="form-input__label">Password<span>*</span></label><div class="password-checkbox"><input type="checkbox" name="password-checkbox"><label for="password-checkbox">Show password</label></div><input class="form-input__field" type="password" placeholder="Password" value="" name="password" required="true" if inputfield.inputPattern pattern="^[a-zA-Z.]{7,25}$"><div class="errors form-input__errors errors__hide" role="alert"><div class="errors__title form-input__errors__title"><strong>Error:</strong></div><div class="errors__message errors__hide form-input__errors__message errors__message-required">Input of Password is required.</div><div class="errors__message errors__hide form-input__errors__message errors__message-not-equal">Both Password field values needs to be equal.</div><div class="errors__message errors__hide form-input__errors__message errors__message-pattern">Input of Password is invalid.<span>Value should have at least 7 and maximum 25 characters.</span></div></div></div><div class="form-dropdown"><label class="form-dropdown__label" for="sex">Sex</label><select class="form-dropdown__field" value="male" name="sex"><option name="male">Male</option><option name="female">Female</option></select><div class="errors form-dropdown__errors errors__hide" role="alert"><div class="errors__title form-dropdown__errors__title"><Error></Error></div>
    <div class="errors__message form-dropdown__errors__message">Field Sex is invalid.</div></div></div><div class="form-input" data-init="inputText"><label class="form-input__label">Date of birth</label><input class="form-input__field" type="date" placeholder="Pick a date" value="" name="dateofbrith" required="true"><div class="errors form-input__errors errors__hide" role="alert"><div class="errors__title form-input__errors__title"><Error></Error></div>
    <div class="errors__message form-input__errors__message">Field Date of birth is invalid.</div></div></div><button class="right" type="submit">Register</button></form>`

    document.body.insertAdjacentHTML(
     'afterbegin',
     form);
     component  = new RegisterContainer();
  })

  afterEach(function() {
    document.body.removeChild(document.querySelector('form'));
  });

  it('should initialize', () => {

   expect(document.querySelectorAll('[name="register_form"]').length).not.toEqual(0);
  });

  it('should show error when input does not match pattern', () => {
   let inputElement = <HTMLInputElement> document.querySelector('[name="verify_email"]');
   inputElement.value = 'ss';

   inputElement.dispatchEvent(new Event('change'));

   expect(inputElement.nextElementSibling.classList).not.toContain('errors_hide');
  });

  it('should change input type to text after clicking password box checkbox', () => {
    // given
    let checkboxElement = <HTMLInputElement> document.querySelector('[name="password-checkbox"]');
    let passwordElement = <HTMLInputElement> document.querySelector('[name="password"]');

    // when
    checkboxElement.checked = true;
    passwordElement.value='some password';
    checkboxElement.dispatchEvent(new Event('click'));

    // then
    expect(passwordElement.getAttribute('type')).toEqual('text');

  })

  it('should not show error on correct email value', () => {
    // given
    let verifyEmailElement = <HTMLInputElement> document.querySelector('[name="verify_email"]');
    let emailElement = <HTMLInputElement> document.querySelector('[name="email"]');

    // when
    emailElement.value = 'somevalue@test.com';
    verifyEmailElement.value = 'somevalue@test.com';

    emailElement.dispatchEvent(new Event('change'));
    verifyEmailElement.dispatchEvent(new Event('change'));

    // then
    expect(verifyEmailElement.nextElementSibling.classList).toContain('errors__hide');

  });

  it('should show error if value of input is too short', () => {
    // given
    let passwordInput = <HTMLInputElement> document.querySelector('[name="password"]');

    // when
    passwordInput.value = '1234';
    passwordInput.dispatchEvent(new Event('change'));

    // then
    expect(passwordInput.nextElementSibling.classList).not.toContain('errors__hide');
  });

  it('should show error if value of input is too long', () => {
    // given
    let forenameInput = <HTMLInputElement> document.querySelector('[name="forename"]');

    // when
    forenameInput.value = 'miLngIEhfFfQNbbW5nDBTSjf9ERWrOKNwrGo1gKO8Yxjgmi6OnJi8go4B8qMJ7PMHv6WrKINdO75g5ZSW1RAuyYM9BJ7vEBg1AvAV';
    forenameInput.dispatchEvent(new Event('change'));

    // then
    expect(forenameInput.nextElementSibling.classList).not.toContain('errors__hide');
  });

  it('should show error if required input is empty and not pristine', () => {
    // given
    let forenameInput = <HTMLInputElement> document.querySelector('[name="forename"]');
    // when
    forenameInput.value = '';
    forenameInput.dispatchEvent(new Event('change'));

    // then
    expect(forenameInput.nextElementSibling.classList).not.toContain('errors__hide');
  });

  it ('should not submit form if there are form errors', () => {

    let inputElement = <HTMLInputElement> document.querySelector('[name="verify_email"]');
    inputElement.value = 'ss';

    inputElement.dispatchEvent(new Event('change'));
    expect(document.querySelector('button[type="submit"]').hasAttribute('disabled')).toEqual(true);
  });

  it ('should submit form if there are no errors', () => {

    let forenameElement = <HTMLInputElement> document.querySelector('[name="forename"]');
    forenameElement.value = 'sampleName';
    forenameElement.dispatchEvent(new Event('change'));

    let surnameElement = <HTMLInputElement> document.querySelector('[name="surname"]');
    surnameElement.value = 'sampleName';
    surnameElement.dispatchEvent(new Event('change'));

    let emailElement = <HTMLInputElement> document.querySelector('[name="email"]');
    emailElement.value = 'samplename@test.com';
    emailElement.dispatchEvent(new Event('change'));

    let verifyEmailElement = <HTMLInputElement> document.querySelector('[name="verify_email"]');
    verifyEmailElement.value = 'samplename@test.com';
    verifyEmailElement.dispatchEvent(new Event('change'));

    let passwordElement = <HTMLInputElement> document.querySelector('[name="password"]');
    passwordElement.value = 'samplePassword';
    passwordElement.dispatchEvent(new Event('change'));

    let dropdownElement = <HTMLSelectElement> document.querySelector('[name="sex"]');
    dropdownElement.dispatchEvent(new Event('change'));

    let dateElement = <HTMLInputElement> document.querySelector('input[type="date"]');
    dateElement.value = '1985-05-23';
    dateElement.dispatchEvent(new Event('change'));

    expect(document.querySelector('button[type="submit"]').hasAttribute('disabled')).toEqual(false);
  });
});
