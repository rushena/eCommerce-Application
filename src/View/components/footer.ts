import { heartSVG } from '../../assets/img/heart';
import './../../assets/css/footer.css';

export function createFooter(): HTMLElement {
  const footerElement = document.createElement('footer');
  footerElement.classList.add('footer');
  footerElement.innerHTML = `
  <div class='footer-container'>
    <ul class='footer-sections'>
      <li class='footer-sections__item'>
        <p class='footer-sections__item__title'>HELP</p>
        <ul class='footer-sections__item__body footer-list'>
          <li class='footer-list__item'><a href=''>Delivery & returns</a></li>
          <li class='footer-list__item'><a href=''>FAQ</a></li>
          <li class='footer-list__item'><a href=''>Track order</a></li>
          <li class='footer-list__item'><a href=''>Contacts</a></li>
          <li class='footer-list__item'><a href=''>Blog</a></li>
        </ul>
      </li>
      <li class='footer-sections__item'>
        <p class='footer-sections__item__title'>SHOP</p>
        <ul class='footer-sections__item__body footer-list'>
          <li class='footer-list__item'><a href=''>New arrivals</a></li>
          <li class='footer-list__item'><a href=''>Trending now</a></li>
          <li class='footer-list__item'><a href=''>Sales</a></li>
          <li class='footer-list__item'><a href=''>Brands</a></li>
        </ul>
      </li>
      <li class='footer-sections__item'>
        <p class='footer-sections__item__title'>GET IN TOUCH</p>
        <ul class='footer-sections__item__body footer-list'>
          <li class='footer-list__item'>
            <span>Call: </span><a href='tel:(405) 555-0128'>(405) 555-0128</a>
          </li>
          <li class='footer-list__item'>
          <span>Email: </span><a href='mailto:hello@createx.com'>hello@createx.com</a>
          </li>
        </ul>
      </li>
    </ul>
    <div class='footer-bottom'>
      <div class='footer-bottom__copyright'>
      <span>© All rights reserved. Made with</span> ${heartSVG()}
      </div>
      <a class='footer-bottom__toTop' href='#'>Go to top</a>
    </div>
  </div>
  `;
  return footerElement;
}
