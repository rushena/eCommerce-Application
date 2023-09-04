export function createDOMElement(
  tag: string,
  className?: string,
  id?: string
): HTMLElement {
  const element = document.createElement(tag);
  element.classList.add(className ?? '');
  element.id = id ?? '';
  return element;
}
