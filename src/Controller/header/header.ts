import Header from '../../View/pages/header';

export function userHandler(event: Event, header: Header) {
  const target = event.target as HTMLElement;
  if (target.classList.contains('account__actions__logout')) {
    header.loginElement = false;
  }
  if (
    target.classList.contains('account__actions__login') ||
    target.classList.contains('account__actions__register')
  ) {
    header.loginElement = true;
  }
}

export function menuHandler(event: Event) {
  const target = event.target as HTMLElement;
  target
    .closest('.mobile-menu__button')!
    .classList.toggle('mobile-menu__button_open');
  const menuElement = document.querySelector('.mobile-menu__main');
  if (!menuElement) return;
  menuElement.classList.toggle('mobile-menu__main_toggle');
  if (menuElement.classList.contains('mobile-menu__main_settle')) {
    menuElement.classList.toggle('mobile-menu__main_settle');
    document.body.style.overflow = 'scroll';
  } else {
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      menuElement.classList.toggle('mobile-menu__main_settle');
    }, 200);
  }
}
