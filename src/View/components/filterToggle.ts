export default class Toggle {
  private toggle = document.createElement('div');

  public filltoggle() {
    this.toggle.innerHTML = `
    <span>Show filters</span>
    `;
    this.toggle.addEventListener('click', (event) => {
      let target = event.target as HTMLElement;
      target = target.closest('.catalog__topbar__filters-toggle')!;
      const filters = document.querySelector('.sidebar-container');
      target.children[0].textContent = 'Hide filters';
      filters?.classList.toggle('catalog__sidebar_active');
    });
  }

  public getElement() {
    this.filltoggle();
    this.toggle.classList.add('catalog__topbar__filters-toggle');
    return this.toggle;
  }
}
