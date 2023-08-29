import '../../assets/css/sidebar.css';

export default class SideBar {
  private sideBar = document.createElement('div');

  public fillProducts() {
    this.sideBar.innerHTML = '';
  }

  public getElement() {
    this.fillProducts();
    this.sideBar.classList.add('catalog__sidebar');
    this.sideBar.classList.add('sidebar-container');
    return this.sideBar;
  }
}
