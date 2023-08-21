export function getElementValue(parent: HTMLElement, elementClass: string) {
  const element = parent.querySelector(`${elementClass}`) as HTMLInputElement;
  return element.value;
}
