import './style.css';
import Header from './View/pages/header.ts';

const check = localStorage.getItem('check') === 'true';
let option;
if (check === null) {
  option = { isLogged: true, cartItems: 0 };
} else {
  option = { isLogged: check, cartItems: 0 };
}
const header = Header.getInstance(option);
header.cartElement = 0;
