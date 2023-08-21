import { getElementValue } from '../../Utility/submitForm';
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
  const email = getElementValue(form, '.e-mail');
  const password = getElementValue(form, '.password1');
  const birthDay = getElementValue(form, '.birthday-date');
  const birthMonth = getElementValue(form, '.birthday-month');
  const birthYear = getElementValue(form, '.birthday-year');
  const firstName = getElementValue(form, '.first-name');
  const lastName = getElementValue(form, '.last-name');
  const billingCountry = getElementValue(form, '.billing-country');
  const shipingCountry = getElementValue(form, '.shipping-country');
  const billingIndex = getElementValue(form, '.billing-index');
  const shippingIndex = getElementValue(form, '.shipping-index');
  const billingCity = getElementValue(form, '.billing-city');
  const shippingCity = getElementValue(form, '.shipping-city');
  const billingAddress = getElementValue(form, '.billing-address');
  const shippingAddress = getElementValue(form, '.shipping-address');

  const response = await registerNewCustomer({
    email: email,
    password: password,
    firstName: firstName,
    lastName: lastName,
    dateOfBirth: `${birthYear}-${months[birthMonth]}-${birthDay}`,
    addresses: [
      getAdress(
        countries[billingCountry],
        billingIndex,
        billingCity,
        billingAddress
      ),
      getAdress(
        countries[shipingCountry],
        shippingIndex,
        shippingCity,
        shippingAddress
      ),
    ],
    defaultBillingAddress: 0,
    defaultShippingAddress: 1,
  });
  if (response.success === true) {
    const anchor = document.createElement('a');
    anchor.setAttribute('href', '/');
    anchor.click();
  } else {
    const errorrDiv = document.querySelector('.api-error')!;
    errorrDiv.textContent = response.errorMessage;
    errorrDiv.classList.add('api-error_color_red');
  }
}
