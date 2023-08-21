import setEmailValidityListener from '../components/EmailInput';
import {
  setPasswordValidityListener,
  setPasswordVisibility,
} from '../components/PasswordInputs';

export default function createLoginPage(): HTMLElement {
  const loginPage = document.createElement('main') as HTMLElement;
  loginPage.className = 'login-page';
  loginPage.innerHTML = `
      <div class="login-page__container">
        <img class="login-page-img" src="/src/assets/img/sign-in.jpg">
        <form class="form login-form" novalidate>
          <h2>Sign In</h2>
          <div class="form-1column-block api-error">
          </div> 
          <div class="form-1column-block">
            <label>
              <sup>*</sup>E-Mail
              <input class="e-mail" type="email" placeholder="alex@example.com"  required>
              <span class="validation-message"></span>
            </label>
          </div>
          <div class="form-1column-block">
            <label class="password-label">
              <sup>*</sup>Password
              <input class="password1" type="password" pattern="(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}" required>
              <img src="/src/assets/img/solar_eye-broken.png">
              <span class="validation-message validation-message__password"></span>
            </label>
          </div>
            <button class="button sign-in-button" type="submit">Sign In</button>
            <div>
              <span>Don't have an account?</span>
              <a class="log-in-page-link">Register</a>
            </div>
        </form>
      </div>
  `;

  setEmailValidityListener(loginPage);
  setPasswordValidityListener(loginPage);
  setPasswordVisibility(1, loginPage);

  return loginPage;
}
