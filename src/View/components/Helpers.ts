export function checkIfContainsCharacters(inputField: HTMLInputElement, errorField: HTMLSpanElement){
  if (inputField.validity.valueMissing) {
    errorField.textContent = "Please, fill in the field";
    return false;
  } else return true;
}

export function checkPatternMatch(inputField: HTMLInputElement, errorField: HTMLSpanElement, patternType: "no special characters or numbers" | "Postal code does not correspond to country's format"){
  if (inputField.validity.patternMismatch) {
    if(patternType === 'no special characters or numbers'){
      errorField.textContent = "No special characters or numbers are allowed";
    } 
    if(patternType === "Postal code does not correspond to country's format"){
      errorField.textContent = "Postal code does not correspond to country's format";
    } 
  }
}
