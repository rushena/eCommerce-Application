import '../../assets/css/perpage.css';

export default class Perpage {
  private perpage = document.createElement('div');

  public fillProducts() {
    this.perpage.innerHTML = `
    <div class='catalog__topbar__perpage__submit'>
      <input type="submit" value="Show" />
    </div>
    <input
      id="perpage"
      type="number"
      step="1"
      min="0"
      max="20"
      placeholder="12"
      required
      class='catalog__topbar__perpage__input'/>
    <label for="perpage">products per page</label>
    `;
  }

  public getElement() {
    this.fillProducts();
    this.perpage.classList.add('catalog__topbar__perpage');
    return this.perpage;
  }
}
