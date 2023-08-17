import '../../assets/css/registration-page.css';
import setAddressValidity from '../components/AdressInput';
import setBirthdayValidity from '../components/BirthdayInput';
import setCityValidity from '../components/CityInput';
import setEmailValidityListener from '../components/EmailInput';
import setNameValidityListener from '../components/NameInput';
import { setPasswordVisibility, setPasswordValidityListener} from '../components/PasswordInputs';
import setIndexValidity from '../components/PostalCode';
 

//PUT OFF STEP FOR INDEXES

const months = ['January', 'February', 'March','April','May','June','July','August','September','October','November','December']

function fillBirthdayDates(){
  const birthdayDate = document.querySelector('.birthday-date') as HTMLSelectElement;
  let options = ``;
  for(let i=1; i<=31; i++) {
    if(i<10){
      options = options + `<option class="option_color_grey" value="${i}">0${i}</option>`;
    } else {
      options = options + `<option class="option_color_grey" value="${i}">${i}</option>`;
    }
  }
  birthdayDate.insertAdjacentHTML('afterbegin', options);
 }

 function fillBirthdayMonths(){
  const birthdayMonth = document.querySelector('.birthday-month') as HTMLSelectElement;
  let options = ``;
  for(let i=0; i<=11; i++) {
    options = options + `<option class="option_color_grey" value="${months[i]}">${months[i]}</option>`;
  }
  birthdayMonth.insertAdjacentHTML('afterbegin', options);
 }

 function fillBirthdayYear(){
  const birthdayYear = document.querySelector('.birthday-year') as HTMLSelectElement;
  let options = ``;
  for(let i=1940; i<=2022; i++) {
    options = options + `<option class="option_color_grey" value="${i}">${i}</option>`;
  }
  options = options + `<option class="option_color_grey" value="2023" selected="true  ">2023</option>`;
  birthdayYear.insertAdjacentHTML('afterbegin', options);
 }

export default function createRegistrationPage(){
  //заменить на после хеадера
document.body.insertAdjacentHTML('afterbegin',`
<main class="registration-page">
      <div class="registration-page__container">
        <img src="./src/assets/img/Mask group.jpg">
        <form class="form registration-form" novalidate>
          <h2>Create an Account</h2>
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
                <input class="password1" type="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Please, enter password that is minimum 8 characters long and contains at least one number, one lowercase and one uppercase characters" required>
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
                <input type="text" class="first-name" placeholder="John" pattern="(?=.*[a-z]).{1,} required>
                <span class="validation-message"></span>
              </label>
            </div>
            <div class="form-2column-block__column"> 
              <label>
              <sup>*</sup>Last Name
                <input type="text" placeholder="Lis" class="last-name" required>
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
                  <input class="index billing-index" type="text" placeholder="00-001" pattern="[0-9]{2}[\-][0-9]{3}" required>
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
                <input class="default-shipping-address" type="checkbox">
                Default
              </label>
            </div>
            <label>
              <input class="billing-same-shipping" type="checkbox">
              Same as Billing address
            </label>
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
                  <input class="index shipping-index" type="number" placeholder="00-001" required>
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
    </main>
`);

fillBirthdayDates();
fillBirthdayMonths();
fillBirthdayYear();
setAddressValidity();
setBirthdayValidity();
setCityValidity();
setEmailValidityListener();
setIndexValidity();
setNameValidityListener();
setPasswordValidityListener(1);
setPasswordVisibility(1);
setPasswordValidityListener(2);
setPasswordVisibility(2);
}