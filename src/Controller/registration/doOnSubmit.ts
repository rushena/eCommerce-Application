import { Routing } from '../../Router/Router';
import { getInputElement } from '../../Utility/submitForm';
import { registerNewCustomer } from './registerationClient';

const months: { [key: string]: number } = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12,
};

const countries: { [key: string]: string } = {
  Poland: 'PL',
};

function getAdress(
  country: string,
  index: string,
  city: string,
  address: string
) {
  return {
    country: country,
    postalCode: index,
    city: city,
    streetName: address,
  };
}

// need to catch default switch
export async function doOnRegistrationSubmit(event: SubmitEvent) {
  const form = event.target as HTMLFormElement;
  if (!form.reportValidity()) return;
  event.preventDefault();
  const email = getInputElement(form, '.e-mail');
  const password = getInputElement(form, '.password1');
  const birthDay = getInputElement(form, '.birthday-date');
  const birthMonth = getInputElement(form, '.birthday-month');
  const birthYear = getInputElement(form, '.birthday-year');
  const firstName = getInputElement(form, '.first-name');
  const lastName = getInputElement(form, '.last-name');
  const billingCountry = getInputElement(form, '.billing-country');
  const shipingCountry = getInputElement(form, '.shipping-country');
  const billingIndex = getInputElement(form, '.billing-index');
  const shippingIndex = getInputElement(form, '.shipping-index');
  const billingCity = getInputElement(form, '.billing-city');
  const shippingCity = getInputElement(form, '.shipping-city');
  const billingAddress = getInputElement(form, '.billing-address');
  const shippingAddress = getInputElement(form, '.shipping-address');

  const response = await registerNewCustomer({
    email: email.value,
    password: password.value,
    firstName: firstName.value,
    lastName: lastName.value,
    dateOfBirth: `${birthYear}-${months[birthMonth.value]}-${birthDay}`,
    addresses: [
      getAdress(
        countries[billingCountry.value],
        billingIndex.value,
        billingCity.value,
        billingAddress.value
      ),
      getAdress(
        countries[shipingCountry.value],
        shippingIndex.value,
        shippingCity.value,
        shippingAddress.value
      ),
    ],
    defaultBillingAddress: 0,
    defaultShippingAddress: 1,
  });
  if (response.success === true) {
    email.value = '';
    birthDay.value = '';
    birthMonth.value = '';
    birthYear.value = '';
    firstName.value = '';
    lastName.value = '';
    billingCountry.value = '';
    shipingCountry.value = '';
    billingIndex.value = '';
    shippingIndex.value = '';
    billingCity.value = '';
    shippingCity.value = '';
    billingAddress.value = '';
    shippingAddress.value = '';
    const router = new Routing();
    router.get('/');
  } else {
    const errorrDiv = document.querySelector('.api-error')!;
    errorrDiv.textContent = response.errorMessage;
    errorrDiv.classList.add('api-error_color_red');
  }
}
