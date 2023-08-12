import '../../assets/css/registration-page.css'

function fillBirthdayDates(){

}

export default function createRegistrationPage(){
  //заменить на после хеадера
document.body.insertAdjacentHTML('afterbegin',`
<main class="registration-page">
      <div class="registration-page__container">
        <img src="./src/assets/img/Mask group.jpg">
        <form class="registration-form">
          <h2>Create an Account</h2>
          <div class="form-1column-block"> 
            <label>
              <sup>*</sup>E-Mail
              <input class="e-mail" type="e-mail" placeholder="alex@example.com">
              <span class="validation-message"></span>
            </label>      
          </div> 
          <div class="form-2column-block">
            <div class="form-2column-block__column"> 
              <label class="password-label">
                <sup>*</sup>Password
                <input type="password">
                <img src="./src/assets/img/solar_eye-broken.png">
                <span class="validation-message"></span>
              </label>
            </div>
            <div class="form-2column-block__column"> 
              <label class="password-label">
                <sup>*</sup>Repeat password
                <input type="password">
                <img src="./src/assets/img/solar_eye-broken.png">
                <span class="validation-message"></span>
              </label>
            </div>
          </div>
          <div class="form-2column-block">
            <div class="form-2column-block__column"> 
              <label>
                <sup>*</sup>First Name
                <input type="text" placeholder="John">
                <span class="validation-message"></span>
              </label>
            </div>
            <div class="form-2column-block__column"> 
              <label>
                Last Name
                <input type="text" placeholder="Lis">
                <span class="validation-message"></span>
              </label>
            </div>
          </div>
          <div class="form-3column-block">
            <div class="form-3column-block__column_width_medium"> 
              <label>
                <sup>*</sup>Birthday Date
                <select class="birthday-date not-selected">
                  <option class="option_color_grey" value="1">01</option>
                </select>
              </label>
            </div>
            <div class="form-3column-block__column_width_medium"> 
              <label>
                <sup>*</sup>Birthday Month
                <select class="birthday-month not-selected">
                  <option class="option_color_grey" value="July">July</option>
                </select>
              </label>
            </div>
            <div class="form-3column-block__column_width_medium"> 
              <label>
                <sup>*</sup>Birthday Year
                <select class="birthday-year not-selected">
                  <option class="option_color_grey" value="2023">2023</option>
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
                  <input class="billing-index" type="number" placeholder="00-001">
                  <span class="validation-message"></span>
                </label>
              </div>
              <div class="form-3column-block__column_width_big">
                <label>
                  <sup>*</sup>City
                  <input class="billing-city" type="text" placeholder="Warsaw">
                  <span class="validation-message"></span>
                </label>
              </div> 
            </div>
            <div class="form-1column-block"> 
              <label>
                <sup>*</sup>Address
                <input class="billing-address" type="text">
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
                  <input class="shipping-index" type="number" placeholder="00-001">
                </label>
                <span class="validation-message"></span>
              </div>
              <div class="form-3column-block__column_width_big">
                <label>
                  <sup>*</sup>City
                  <input class="shipping-city" type="text" placeholder="Warsaw">
                  <span class="validation-message"></span>
                </label>
              </div> 
            </div>
            <div class="form-1column-block"> 
              <label>
                <sup>*</sup>Address
                <input class="shipping-address" type="text">
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

fillBirthdayDates()
}