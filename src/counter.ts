import { registration } from '../src/Controller/registration/registerClient';
export function setupCounter(element: HTMLButtonElement) {
  let counter = 0;
  const setCounter = (count: number) => {
    counter = count;
    element.innerHTML = `count is ${counter}`;
  };
  element.addEventListener('click', () => setCounter(counter + 1));
  setCounter(0);
}
const newLine = '';
console.log(newLine);

export function testFunction(a: number, b: number): number {
  return a + b;
}

export function registrationTest() {
  const regustrationButton = document.createElement('button');
  document
    .querySelector<HTMLButtonElement>('#counter')!
    .after(regustrationButton);
  regustrationButton.addEventListener('click', async () => {
    const response = await registration({
      email: 'test5@gmail.com',
      password: '123456',
      firstName: 'John',
      lastName: 'Doe',
    });
    console.log(response);
  });
}
