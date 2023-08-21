export class MainPage {
  getElement(): HTMLElement {
    const $wrap = document.createElement('div');
    $wrap.innerText = 'Тут будет код главной';
    return $wrap;
  }
}
