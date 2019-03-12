// import { RegisterContainer } from './main';

describe('RegisterContainer Component', () => {


  beforeEach(() => {
    let form = `<form name="register_form" data-init="register-container" novalidate><div class="form-input" data-init="inputText"><label class="form-input__label">Forename<span>*</span></label><input class="form-input__field" type="text" placeholder="forename" value="" name="forename" required="true" if inputfield.inputPattern pattern="^[a-zA-Z.]{1,100}$"><div class="errors form-input__errors errors__hide" role="alert"><div class="errors__title form-input__errors__title"><strong>Error:</strong></div><div class="errors__message errors__hide form-input__errors__message errors__message-required">Input of Forename is required.</div><div class="errors__message errors__hide form-input__errors__message errors__message-not-equal">Both Forename field values needs to be equal.</div><div class="errors__message errors__hide form-input__errors__message errors__message-pattern">Input of Forename is invalid.<span>Value should have at least 1 and maximum 100 characters.</span></div></div></div><div class="form-input" data-init="inputText"><label class="form-input__label">Surname<span>*</span></label><input class="form-input__field" type="text" placeholder="surename" value="" name="surname" required="true" if inputfield.inputPattern pattern="^[a-zA-Z.]{1,100}$"><div class="errors form-input__errors errors__hide" role="alert"><div class="errors__title form-input__errors__title"><strong>Error:</strong></div><div class="errors__message errors__hide form-input__errors__message errors__message-required">Input of Surname is required.</div><div class="errors__message errors__hide form-input__errors__message errors__message-not-equal">Both Surname field values needs to be equal.</div><div class="errors__message errors__hide form-input__errors__message errors__message-pattern">Input of Surname is invalid.<span>Value should have at least 1 and maximum 100 characters.</span></div></div></div><div class="form-input" data-init="inputText"><label class="form-input__label">E-mail</label><input class="form-input__field" type="email" placeholder="E-mail" value="" name="email" if inputfield.inputPattern pattern="(.+)@(.+){2,}.(.+){2,}"><div class="errors form-input__errors errors__hide" role="alert"><div class="errors__title form-input__errors__title"><strong>Error:</strong></div><div class="errors__message errors__hide form-input__errors__message errors__message-required">Input of E-mail is required.</div><div class="errors__message errors__hide form-input__errors__message errors__message-not-equal">Both E-mail field values needs to be equal.</div><div class="errors__message errors__hide form-input__errors__message errors__message-pattern">Input of E-mail is invalid.<span>Please provide email address in proper format.</span></div></div></div><div class="form-input" data-init="inputText"><label class="form-input__label">Verify Email<span>*</span></label><input class="form-input__field" type="email" placeholder="Verify E-mail" value="" name="verify_email" required="true" if inputfield.inputPattern pattern="(.+)@(.+){2,}.(.+){2,}"><div class="errors form-input__errors errors__hide" role="alert"><div class="errors__title form-input__errors__title"><strong>Error:</strong></div><div class="errors__message errors__hide form-input__errors__message errors__message-required">Input of Verify Email is required.</div><div class="errors__message errors__hide form-input__errors__message errors__message-not-equal">Both Verify Email field values needs to be equal.</div><div class="errors__message errors__hide form-input__errors__message errors__message-pattern">Input of Verify Email is invalid.</div></div></div><div class="form-input" data-init="inputText"><label class="form-input__label">Password<span>*</span></label><div class="password-checkbox"><input type="checkbox" name="password-checkbox"><label for="password-checkbox">Show password</label></div><input class="form-input__field" type="password" placeholder="Password" value="" name="password" required="true" if inputfield.inputPattern pattern="^[a-zA-Z.]{7,25}$"><div class="errors form-input__errors errors__hide" role="alert"><div class="errors__title form-input__errors__title"><strong>Error:</strong></div><div class="errors__message errors__hide form-input__errors__message errors__message-required">Input of Password is required.</div><div class="errors__message errors__hide form-input__errors__message errors__message-not-equal">Both Password field values needs to be equal.</div><div class="errors__message errors__hide form-input__errors__message errors__message-pattern">Input of Password is invalid.<span>Value should have at least 7 and maximum 25 characters.</span></div></div></div><div class="form-dropdown"><label class="form-dropdown__label" for="sex">Sex</label><select class="form-dropdown__field" value="male" name="sex"><option name="male">Male</option><option name="female">Female</option></select><div class="errors form-dropdown__errors errors__hide" role="alert"><div class="errors__title form-dropdown__errors__title"><Error></Error></div>
    <div class="errors__message form-dropdown__errors__message">Field Sex is invalid.</div></div></div><div class="form-input" data-init="inputText"><label class="form-input__label">Date of birth</label><input class="form-input__field" type="date" placeholder="Pick a date" value="" name="dateofbrith" required="true"><div class="errors form-input__errors errors__hide" role="alert"><div class="errors__title form-input__errors__title"><Error></Error></div>
    <div class="errors__message form-input__errors__message">Field Date of birth is invalid.</div></div></div><button class="right" type="submit">Register</button></form>`

    document.body.insertAdjacentHTML(
     'afterbegin',
     form);

  })

  afterEach(function() {
    document.body.removeChild(document.querySelector('form'));
  });

  it('should initialize', () => {
    new RegisterContainer();

   expect(document.querySelectorAll('[name="register_form"]').length).not.toEqual(0);
 });

 it('should show error when input does not match pattern', () => {
   new RegisterContainer();

   let inputElement = <HTMLInputElement> document.querySelector('[name="verify_email"]');
   inputElement.value = 'ss';

   inputElement.dispatchEvent(new Event('change'));

   let visibleErrors = document.querySelectorAll('.errors:not(.errors__hide)');

  expect(visibleErrors.length).not.toEqual(0);
});

});
