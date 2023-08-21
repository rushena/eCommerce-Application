//Date of birth: A valid date input ensuring the user is above a certain age (e.g., 13 years old or older)

function showError(
  birthdayError: HTMLSpanElement,
  errorType: 'not valid date of birth' | 'age under 16'
) {
  if (errorType === 'age under 16') {
    birthdayError.textContent = 'Your age must be above 16 years';
  } else {
    birthdayError.textContent = 'Please choose valid date of birth ';
  }
}

function checkAge(
  birthdayDate: HTMLSelectElement,
  birthdayMonth: HTMLSelectElement,
  birthdayYear: HTMLSelectElement,
  birthdayError: HTMLSpanElement
) {
  const birthday = new Date(
    `${birthdayMonth.value} ${birthdayDate.value}, ${birthdayYear.value}`
  );
  const currentDateFull = new Date();
  const currentDate = currentDateFull.getDate();
  const currentMonth = currentDateFull.getMonth();
  const currentYear = currentDateFull.getFullYear();
  const comparableDate = new Date(
    `${currentMonth} ${currentDate}, ${currentYear - 16}`
  );

  if (birthday.getTime() >= currentDateFull.getTime()) {
    showError(birthdayError, 'not valid date of birth');
    return false;
  } else {
    if (birthday.getTime() <= comparableDate.getTime()) {
      return true;
    } else {
      showError(birthdayError, 'age under 16');
      return false;
    }
  }
}

export default function setBirthdayValidity(element: HTMLElement) {
  const form = element.querySelector('.form') as HTMLFormElement;

  form.addEventListener('submit', (event) => {
    const birthdayDate = element.querySelector(
      '.birthday-date'
    ) as HTMLSelectElement;
    const birthdayMonth = element.querySelector(
      '.birthday-month'
    ) as HTMLSelectElement;
    const birthdayYear = element.querySelector(
      '.birthday-year'
    ) as HTMLSelectElement;
    const birthdayError = element.querySelector(
      '.birthday-date ~ span.validation-message'
    ) as HTMLSpanElement;

    birthdayError.textContent = '';

    if (!checkAge(birthdayDate, birthdayMonth, birthdayYear, birthdayError)) {
      event.preventDefault();
    }
  });
}
