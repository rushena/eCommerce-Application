//Date of birth: A valid date input ensuring the user is above a certain age (e.g., 13 years old or older)

function showError(birthdayError: HTMLSpanElement) {
  birthdayError.textContent = 'Your age must be above 16 years'
}

function checkAge(birthdayDate: HTMLSelectElement, birthdayMonth: HTMLSelectElement, birthdayYear: HTMLSelectElement, birthdayError: HTMLSpanElement){
  
  const birthday = new Date(`${birthdayMonth.value} ${birthdayDate.value}, ${birthdayYear.value}`);
  const currentDateMS = new Date();
  const currentDate = currentDateMS.getDate();
  const currentMonth = currentDateMS.getMonth();
  const currentYear = currentDateMS.getFullYear();
  const comparableDate = new Date(`${currentMonth} ${currentDate}, ${currentYear - 16}`);

  if(birthday.getTime() <= comparableDate.getTime()){
    return true;
  } else {
    showError(birthdayError);
    return false
  }
}

 export default function setBirthdayValidity() {
  const form = document.querySelector('.form') as HTMLFormElement;

  form.addEventListener('submit', (event)=> {
    const birthdayDate = document.querySelector('.birthday-date') as HTMLSelectElement;
    const birthdayMonth = document.querySelector('.birthday-month') as HTMLSelectElement;
    const birthdayYear = document.querySelector('.birthday-year') as HTMLSelectElement;
    const birthdayError = document.querySelector(".birthday-date ~ span.validation-message") as HTMLSpanElement;

  birthdayError.textContent = '';

    if (!checkAge(birthdayDate, birthdayMonth, birthdayYear, birthdayError)){
      event.preventDefault();
    } 
  })
}