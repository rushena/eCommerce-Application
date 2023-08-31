import '../../assets/css/sidebar.css';

export default class SideBar {
  private sideBar = document.createElement('div');

  public fillSideBar() {
    this.sideBar.innerHTML = '';
  }

  public getElement() {
    this.fillSideBar();
    this.sideBar.classList.add('catalog__sidebar');
    this.sideBar.classList.add('sidebar-container');
    return this.sideBar;
  }
}
