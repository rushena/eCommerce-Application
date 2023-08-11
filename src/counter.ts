import { registration } from './Controller/registration/registerationClient';
import { authentication } from './Controller/login/loginClient';
import { tests } from './Controller/apiRoot/testInterractions/testClient';
export function setupCounter(element: HTMLButtonElement) {
  let counter = 0;
  const setCounter = (count: number) => {
    counter = count;
    element.innerHTML = `count is ${counter}`;
  };
  element.addEventListener('click', () => setCounter(counter + 1));
  setCounter(0);
}

export function testFunction(a: number, b: number): number {
  return a + b;
}

export function loggedInterractions() {
  const testButton = document.createElement('button');
  document.querySelector<HTMLButtonElement>('#counter')!.after(testButton);
  testButton.textContent = 'get Products test';
  testButton.addEventListener('click', async () => {
    const response = await tests();
    console.log(response);
  });
}

export function authTest() {
  const authButton = document.createElement('button');
  document.querySelector<HTMLButtonElement>('#counter')!.after(authButton);
  authButton.textContent = 'Sign in test5@gmail.com';
  authButton.addEventListener('click', async () => {
    await authentication({ username: 'test1@gmail.com', password: '123' }); // it returns some stuff but dont need it yet
  });
}

export function registrationTest() {
  const regustrationButton = document.createElement('button');
  document
    .querySelector<HTMLButtonElement>('#counter')!
    .after(regustrationButton);
  regustrationButton.textContent = 'Sign up test555@gmail.com';
  regustrationButton.addEventListener('click', async () => {
    await registration({
      // it returns some stuff but dont need it yet
      email: 'test555@gmail.com',
      password: '123456',
      firstName: 'John',
      lastName: 'Doe', // for test just these inputs
    });
  });
}
