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
