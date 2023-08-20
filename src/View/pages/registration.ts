import '../../assets/css/registration-page.css';
import setAddressValidity from '../components/AdressInput';
import setBirthdayValidity from '../components/BirthdayInput';
import setCityValidity from '../components/CityInput';
import setEmailValidityListener from '../components/EmailInput';
import setNameValidityListener from '../components/NameInput';
import { setPasswordVisibility, setPasswordValidityListener, setPasswordMatchCheck} from '../components/PasswordInputs';
import setIndexValidity from '../components/PostalCode';
import { makeValid } from '../components/Helpers';
 

const months = ['January', 'February', 'March','April','May','June','July','August','September','October','November','December']

//makes text black when customer clicks on the field
function changeTextColorWhenChosen(selectedField: HTMLSelectElement){
  selectedField.addEventListener('click',() => {
    if (selectedField.classList.contains('not-selected')){
      selectedField.classList.remove('not-selected');
    }
  })
 }

//fills options for birthday dates
function fillBirthdayDates(element: HTMLElement){
  const birthdayDate = element.querySelector('.birthday-date') as HTMLSelectElement;
  let options = ``;
  for(let i=1; i<=31; i++) {
    if(i<10){
      options = options + `<option class="option_color_grey" value="${i}">0${i}</option>`;
    } else {
      options = options + `<option class="option_color_grey" value="${i}">${i}</option>`;
    }
  }
  birthdayDate.insertAdjacentHTML('afterbegin', options);
  changeTextColorWhenChosen(birthdayDate);
 }

  //fills options for birthday months
 function fillBirthdayMonths(element: HTMLElement){
  const birthdayMonth = element.querySelector('.birthday-month') as HTMLSelectElement;
  let options = ``;
  for(let i=0; i<=11; i++) {
    options = options + `<option class="option_color_grey" value="${months[i]}">${months[i]}</option>`;
  }
  birthdayMonth.insertAdjacentHTML('afterbegin', options);
  changeTextColorWhenChosen(birthdayMonth);
 }

 //fills options for birthday years
 function fillBirthdayYear(element: HTMLElement){
  const birthdayYear = element.querySelector('.birthday-year') as HTMLSelectElement;
  let options = ``;
  for(let i=1940; i<=2022; i++) {
    options = options + `<option class="option_color_grey" value="${i}">${i}</option>`;
  }
  options = options + `<option class="option_color_grey" value="2023" selected="true  ">2023</option>`;
  birthdayYear.insertAdjacentHTML('afterbegin', options);
  changeTextColorWhenChosen(birthdayYear);
 }

  function setSameAddressOption(element: HTMLElement){

   const billingIndex = element.querySelector('.billing-index') as HTMLInputElement;
   const billingCity = element.querySelector('.billing-city') as HTMLInputElement;
   const billingAddress = element.querySelector('.billing-address') as HTMLInputElement;
   const shippingIndex = element.querySelector('.shipping-index') as HTMLInputElement;
   const shippingIndexError = element.querySelector(`.shipping-index ~  span.validation-message`) as HTMLSpanElement;
   const shippingCity = element.querySelector('.shipping-city') as HTMLInputElement;
   const shippingCityError = element.querySelector(`.shipping-city ~  span.validation-message`) as HTMLSpanElement;
   const shippingAddress = element.querySelector('.shipping-address') as HTMLInputElement;
   const shippingAddressError = element.querySelector(`.shipping-address ~  span.validation-message`) as HTMLSpanElement;


   const checkbox = element.querySelector('.billing-same-shipping') as HTMLInputElement;
   checkbox.addEventListener('click', ()=>{
      checkbox.classList.toggle('checked');
      if(checkbox.classList.contains('checked')){
        shippingIndex.value = billingIndex.value;
        makeValid(shippingIndex, shippingIndexError);
        shippingCity.value = billingCity.value;
        makeValid(shippingCity, shippingCityError);
        shippingAddress.value = billingAddress.value;
        makeValid(shippingAddress, shippingAddressError);
      } else {
        shippingIndex.value = '';
        shippingCity.value = '';
        shippingAddress.value = '';
      }
   })
 }

export default function createRegistrationPage(): HTMLElement{
  //заменить на после хеадера

  const registrationMain = document.createElement('main');
  registrationMain.className = 'registration-page';
  registrationMain.innerHTML =
      `<div class="registration-page__container">
        <img src="./src/assets/img/Mask group.jpg" class="registration-page-img">
        <form class="form registration-form" novalidate>
          <h2>Create an Account</h2>
          <div class="form-1column-block api-error">
          </div> 
          <div class="form-1column-block"> 
            <label>
              <sup>*</sup>E-Mail
              <input class="e-mail" type="email" placeholder="alex@example.com" required>
              <span class="validation-message"></span>
            </label>      
          </div> 
          <div class="form-2column-block">
            <div class="form-2column-block__column"> 
              <label class="password-label">
                <sup>*</sup>Password
                <input class="password1" type="password" pattern="(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Please, enter password that is minimum 8 characters long and contains at least one number, one lowercase and one uppercase characters" required>
                <img src="./src/assets/img/solar_eye-broken.png">
                <span class="validation-message validation-message__password"></span>
              </label>
            </div>
            <div class="form-2column-block__column"> 
              <label class="password-label">
                <sup>*</sup>Repeat password
                <input type="password" class="password2" required>
                <img src="./src/assets/img/solar_eye-broken.png">
                <span class="validation-message validation-message__password"></span>
              </label>
            </div>
          </div>
          <div class="form-2column-block">
            <div class="form-2column-block__column"> 
              <label>
                <sup>*</sup>First Name
                <input type="text" class="first-name" placeholder="John" pattern="(?=.*[a-z]).{1,}" required>
                <span class="validation-message"></span>
              </label>
            </div>
            <div class="form-2column-block__column"> 
              <label>
              <sup>*</sup>Last Name
                <input type="text" placeholder="Lis" class="last-name" pattern="(?=.*[a-z]).{1,}" required>
                <span class="validation-message"></span>
              </label>
            </div>
          </div>
          <div class="form-3column-block">
            <div class="form-3column-block__column_width_medium"> 
              <label>
                <sup>*</sup>Birthday Date
                <select class="birthday-date not-selected">
                </select>
                <span class="validation-message"></span>
              </label>
            </div>
            <div class="form-3column-block__column_width_medium"> 
              <label>
                <sup>*</sup>Birthday Month
                <select class="birthday-month not-selected">
                </select>
              </label>
            </div>
            <div class="form-3column-block__column_width_medium"> 
              <label>
                <sup>*</sup>Birthday Year
                <select class="birthday-year not-selected">
                </select>
              </label>
            </div>
          </div>
          <span class="validation-message"></span>
          <div class="form-2column-block">
            <h6>Billing address</h6>
            <label>
              <input class="default-billing-address" type="checkbox">
              Default
            </label>
          </div>
            <div class="form-3column-block">
              <div class="form-3column-block__column_width_big">
                <label>
                  <sup>*</sup>Country
                  <select class="billing-country not-selected">
                    <option class="option_color_grey" value="Poland">Poland</option>
                  </select>
                  <span class="validation-message"></span>
                </label>
              </div>
              <div class="form-3column-block__column_width_small">
                <label>
                  <sup>*</sup>Postal code
                  <input class="index billing-index" type="text" placeholder="00-001" pattern="^[0-9]{2}-[0-9]{3}$" required>
                  <span class="validation-message"></span>
                </label>
              </div>
              <div class="form-3column-block__column_width_big">
                <label>
                  <sup>*</sup>City
                  <input class="city billing-city" type="text" placeholder="Warsaw" pattern="(?=.*[a-z]).{1,}" required>
                  <span class="validation-message"></span>
                </label>
              </div> 
            </div>
            <div class="form-1column-block"> 
              <label>
                <sup>*</sup>Address
                <input class="address billing-address" type="text" required>
                <span class="validation-message"></span>
              </label>      
            </div>
            <div class="form-2column-block">
              <h6>Shipping address</h6>
              <label>
                <input class="billing-same-shipping" type="checkbox">
                  Same as Billing address
              </label>
              <label>
                <input class="default-shipping-address" type="checkbox">
                Default
              </label>
            </div>
            <div class="form-3column-block">
              <div class="form-3column-block__column_width_big">
                <label>
                  <sup>*</sup>Country
                  <select class="shipping-country not-selected">
                    <option class="option_color_grey" value="Poland">Poland</option>
                  </select>
                  <span class="validation-message"></span>
                </label>
              </div>
              <div class="form-3column-block__column_width_small">
                <label>
                  <sup>*</sup>Postal code
                  <input class="index shipping-index" type="text" placeholder="00-001" pattern="^[0-9]{2}-[0-9]{3}$" required>
                  <span class="validation-message"></span>
                </label>
              </div>
              <div class="form-3column-block__column_width_big">
                <label>
                  <sup>*</sup>City
                  <input class="city shipping-city" type="text" placeholder="Warsaw" pattern="(?=.*[a-z]).{1,}" required>
                  <span class="validation-message"></span>
                </label>
              </div> 
            </div>
            <div class="form-1column-block"> 
              <label>
                <sup>*</sup>Address
                <input class="address shipping-address" type="text" required>
                <span class="validation-message"></span>
              </label>      
            </div>
            <button class="button create-an-account-button" type="submit">Create an Account</button>
            <div>
              <span>Already have an account?</span>
              <a class="log-in-page-link">Log in</a>
            </div>
        </form>
      </div>
`;

//fills options to select for Birthday
fillBirthdayDates(registrationMain);
fillBirthdayMonths(registrationMain);
fillBirthdayYear(registrationMain);

//set checking for Validity
setAddressValidity(registrationMain);
setBirthdayValidity(registrationMain);
setCityValidity(registrationMain);
setEmailValidityListener(registrationMain);
setIndexValidity(registrationMain);
setNameValidityListener(registrationMain);
setPasswordValidityListener(registrationMain);
setPasswordVisibility(1, registrationMain);
setPasswordVisibility(2, registrationMain);

setPasswordMatchCheck(registrationMain);
setSameAddressOption(registrationMain);

return registrationMain;
}