import '../../assets/css/main.css'

export class MainPage {
  private $main: HTMLElement = document.createElement('main');

  private renderPromo(): HTMLElement {
    const $mainPromo = document.createElement('div');
    $mainPromo.classList.add('main-promo');

    $mainPromo.innerHTML = `
      <div class="main-promo__inner">
      dfdsf
      </div>
    `;

    return $mainPromo;
  }

  private renderCatalog(): HTMLElement {
    const $mainCatalog = document.createElement('div');
    $mainCatalog.classList.add('main-catalog');

    $mainCatalog.innerHTML = `
      <div class="main-catalog__inner block-inner">
        <div class="main-catalog__list">
          <div class="main-catalog__item">
            <div class="main-catalog__item-image"><img src="./src/assets/img/main-catalog1.jpg" alt="Furniture"></div>
            <div class="main-catalog__item-text">Furniture</div>
          </div>
          <div class="main-catalog__item">
            <div class="main-catalog__item-image"><img src="./src/assets/img/main-catalog2.jpg" alt="Clothes"></div>
            <div class="main-catalog__item-text">Clothes</div>
          </div>
          <div class="main-catalog__item">
            <div class="main-catalog__item-image"><img src="./src/assets/img/main-catalog3.jpg" alt="Stationery"></div>
            <div class="main-catalog__item-text">Stationery</div>
          </div>
          <div class="main-catalog__item">
            <div class="main-catalog__item-image"><img src="./src/assets/img/main-catalog4.jpg" alt="Electronics"></div>
            <div class="main-catalog__item-text">Electronics</div>
          </div>
          <div class="main-catalog__item">
            <div class="main-catalog__item-image"><img src="./src/assets/img/main-catalog5.jpg" alt="Hobby"></div>
            <div class="main-catalog__item-text">Hobby</div>
          </div>
          <div class="main-catalog__item">
            <div class="main-catalog__item-image"><img src="./src/assets/img/main-catalog6.jpg" alt="Food"></div>
            <div class="main-catalog__item-text">Food</div>
          </div>
        </div>
      </div>
    `;

    return $mainCatalog;
  }

  private renderAdvantages(): HTMLElement {
    const $mainBlog = document.createElement('div');
    $mainBlog.classList.add('main-advantages');

    $mainBlog.innerHTML = `
      <div class="main-blog__inner">
      dfdsf
      </div>
    `;

    return $mainBlog;
  }

  private renderAppBlock(): HTMLElement {
    const $mainBlog = document.createElement('div');
    $mainBlog.classList.add('main-app');

    $mainBlog.innerHTML = `
      <div class="main-blog__inner">
      dfdsf
      </div>
    `;

    return $mainBlog;
  }

  private renderBlog(): HTMLElement {
    const $mainBlog = document.createElement('div');
    $mainBlog.classList.add('main-blog');

    $mainBlog.innerHTML = `
      <div class="main-blog__inner">
      dfdsf
      </div>
    `;

    return $mainBlog;
  }

  private renderBottomForm(): HTMLElement {
    const $mainBottomForm = document.createElement('div');
    $mainBottomForm.classList.add('main-bottom-form');

    $mainBottomForm.innerHTML = `
      <div class="main-bottom-form__inner">
        <div class="main-bottom-form__left">
          <div class="main-bottom-form__title">Subscribe for updates</div>
          <div class="main-bottom-form__subtitle">Subscribe for exclusive early sale access and new arrivals.</div>
          <form class="main-bottom-form__form">
            <div class="main-bottom-form__form-field">
              <label for="">Email</label>
              <input type="text" placeholder="Your working email">
            </div>
            <div class="main-bottom-form__form-field">
              <button class="main-bottom-form__form-button">Subscribe</button>
            </div>
          </form>
        </div>
        <div class="main-bottom-form__right">
          <img src="./src/assets/img/form-bottom-img.png" alt="">
        </div>
      </div>
    `;

    return $mainBottomForm;
  }

  private setPageStructure(): void {
    this.$main.append(
      this.renderPromo(),
      this.renderCatalog(),
      this.renderAdvantages(),
      this.renderAppBlock(),
      this.renderBlog(),
      this.renderBottomForm()
    );
  }


  getElement(): HTMLElement {
    this.setPageStructure();
    return this.$main;
  }
}
