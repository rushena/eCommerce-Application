import './style.css';
import './assets/css/login-page.css';
import { App } from './App';
import './assets/css/login-page.css';
/* import createLoginPage from './View/pages/login';
import createRegistrationPage from './View/pages/registration';
import Header from './View/components/header.ts';
import { createFooter } from './View/components/footer.ts';
import { registrationTest, authTest, loggedInterractions } from './counter.ts'; */

/*const registrationMain = createRegistrationPage();
document.body.appendChild(registrationMain);

const check = localStorage.getItem('check') === 'true';
let option: { isLogged: boolean; cartItems: number };
if (check === null) {
  option = { isLogged: true, cartItems: 0 };
} else {
  option = { isLogged: check, cartItems: 0 };
}

// Example of how to add/change/render header
const header = Header.getInstance(option);
console.log(header.element);
header.addListeners(); // renders header if there is none present and add listeners
setTimeout(() => {
  header.cartElement = 10;
  header.loginElement = false;
}, 4000);
header.cartElement = 0;
// Example of how to get footer
const footerElement = createFooter();
document.body.append(footerElement);

registrationTest();
authTest();
loggedInterractions();
const loginPage = createLoginPage();
document.body.appendChild(loginPage);*/

const app: App = new App();

app.start();
