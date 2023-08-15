export function checkIfContainsCharacters(inputField: HTMLInputElement, errorField: HTMLSpanElement){
  if (inputField.validity.valueMissing) {
    errorField.textContent = "Please, fill in the field";
    return false;
  } else return true;
}

export function checkPatternMatch(inputField: HTMLInputElement, errorField: HTMLSpanElement, patternType: 'no special characters or numbers'){
  if (inputField.validity.patternMismatch) {
    if(patternType === 'no special characters or numbers'){
      errorField.textContent = "No special characters or numbers are allowed";
    } 
  }
}
