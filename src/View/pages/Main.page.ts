import '../../assets/css/main.css';

export class MainPage {
  private $main: HTMLElement = document.createElement('main');

  private renderPromo(): HTMLElement {
    const $mainPromo: HTMLElement = document.createElement('div');
    $mainPromo.classList.add('main-promo');

    $mainPromo.innerHTML = `
      <div class="main-promo__inner block-inner">
        <div class="main-promo__text">Unleash Your Productivity with Our Remote <br />Work Solutions</div>
        <div class="main-promo__slider">
          <div class="main-promo__slider-item active"><img src="./src/assets/img/main-promo-slide1.png" alt="Slide 1"></div>
          <div class="main-promo__slider-item"><img src="./src/assets/img/main-promo-slide2.png" alt="Slide 2"></div>
          <div class="main-promo__slider-item"><img src="./src/assets/img/main-promo-slide3.png" alt="Slide 3"></div>
          <div class="main-promo__slider-item"><img src="./src/assets/img/main-promo-slide4.png" alt="Slide 4"></div>
        </div>
      </div>
    `;

    return $mainPromo;
  }

  initSlider(block: HTMLElement): void {
    const slides = block.querySelectorAll('.main-promo__slider-item');
    console.log(slides)
    let currentIndex = 0;
    const getNewCurentAndPrevIndex = () => {
      return [currentIndex, currentIndex === slides.length - 1 ? 0 : currentIndex + 1];
    }

    setInterval(() => {
      const [prevIndex, newIndex] = getNewCurentAndPrevIndex();
      slides[prevIndex].classList.remove('active');
      slides[prevIndex].classList.add('prev');
      slides[newIndex].classList.add('active');

      setTimeout(() => {
        slides[prevIndex].classList.remove('prev');
        currentIndex = newIndex;
      }, 1500);

    }, 4000);
  }

  private renderCatalog(): HTMLElement {
    const $mainCatalog: HTMLElement = document.createElement('div');
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
    const $mainBlog: HTMLElement = document.createElement('div');
    $mainBlog.classList.add('main-advantages');

    $mainBlog.innerHTML = `
      <div class="main-advantages__inner block-inner">
        <div class="main-advantages__list">
          <div class="main-advantages__item">
            <div class="main-advantages__item-ico"><img src="./src/assets/img/main-advantages-ico1.png" alt="Fast Worldwide Shipping<"></div>
            <div class="main-advantages__item-title">Fast Worldwide Shipping</div>
            <div class="main-advantages__item-subtitle">Get free shipping over $250</div>
          </div>
          <div class="main-advantages__item">
            <div class="main-advantages__item-ico"><img src="./src/assets/img/main-advantages-ico2.png" alt="Fast Worldwide Shipping<"></div>
            <div class="main-advantages__item-title">Fast Worldwide Shipping</div>
            <div class="main-advantages__item-subtitle">Get free shipping over $250</div>
          </div>
          <div class="main-advantages__item">
            <div class="main-advantages__item-ico"><img src="./src/assets/img/main-advantages-ico3.png" alt="Fast Worldwide Shipping<"></div>
            <div class="main-advantages__item-title">Fast Worldwide Shipping</div>
            <div class="main-advantages__item-subtitle">Get free shipping over $250</div>
          </div>
          <div class="main-advantages__item">
            <div class="main-advantages__item-ico"><img src="./src/assets/img/main-advantages-ico4.png" alt="Fast Worldwide Shipping<"></div>
            <div class="main-advantages__item-title">Fast Worldwide Shipping</div>
            <div class="main-advantages__item-subtitle">Get free shipping over $250</div>
          </div>
        </div>
      </div>
    `;

    return $mainBlog;
  }

  private renderAppBlock(): HTMLElement {
    const $mainBlog: HTMLElement = document.createElement('div');
    $mainBlog.classList.add('main-app');

    $mainBlog.innerHTML = `
      <div class="main-app__inner block-inner">
        <div class="main-app__image">
          <img src="./src/assets/img/main-app-image.png" alt="Enjoy mobile shopping with our CozyHome Store App!">
        </div>
        <div class="main-app__text">
          <h2 class="main-app__title">Enjoy mobile shopping with our CozyHome Store App!</h2>
          <img src="./src/assets/img/main-app-logos.png" alt="Store App logos">
        </div>
      </div>
    `;

    return $mainBlog;
  }

  private renderBlog(): HTMLElement {
    const $mainBlog: HTMLElement = document.createElement('div');
    $mainBlog.classList.add('main-blog');

    $mainBlog.innerHTML = `
      <div class="main-blog__inner block-inner">
        <div class="main-blog__title">Our Blog</div>
        <div class="main-blog__list">
          <div class="main-blog__list-item blog-item">
            <div class="blog-item__image"><img src="./src/assets/img/main-blog-image1.png" alt="Bag Trends"></div>
            <div class="blog-item__text-wrapper">
              <div class="blog-item__title">Bag Trends</div>
              <div class="blog-item__text">Ipsum aliquet nisi, hendrerit rhoncus quam tortor, maecenas faucibus. Tincidunt aliquet sit vel, venenatis nulla. Integer bibendum turpis convallis...</div>
            </div>
          </div>
          <div class="main-blog__list-item blog-item">
            <div class="blog-item__image"><img src="./src/assets/img/main-blog-image2.png" alt="Top 10 of This Season’s Hottest Sneakers"></div>
            <div class="blog-item__text-wrapper">
              <div class="blog-item__title">Top 10 of This Season’s Hottest Sneakers</div>
              <div class="blog-item__text">Porta habitant vitae quam interdum. Leo viverra non volutpat rhoncus placerat vitae scelerisque. Rhoncus augue faucibus maecenas lacus...</div>
            </div>
          </div>
        </div>
        <div class="main-blog__vendors">
          <div class="main-blog__vendor"><img src="./src/assets/img/main-vendor-logo-1.png" alt="Vendor Name 1"></div>
          <div class="main-blog__vendor"><img src="./src/assets/img/main-vendor-logo-2.png" alt="Vendor Name 1"></div>
          <div class="main-blog__vendor"><img src="./src/assets/img/main-vendor-logo-3.png" alt="Vendor Name 1"></div>
          <div class="main-blog__vendor"><img src="./src/assets/img/main-vendor-logo-4.png" alt="Vendor Name 1"></div>
          <div class="main-blog__vendor"><img src="./src/assets/img/main-vendor-logo-5.png" alt="Vendor Name 1"></div>
          <div class="main-blog__vendor"><img src="./src/assets/img/main-vendor-logo-6.png" alt="Vendor Name 1"></div>
        </div>
      </div>
    `;

    return $mainBlog;
  }

  private renderBottomForm(): HTMLElement {
    const $mainBottomForm: HTMLElement = document.createElement('div');
    $mainBottomForm.classList.add('main-bottom-form');

    $mainBottomForm.innerHTML = `
      <div class="main-bottom-form__inner block-inner">
        <div class="main-bottom-form__left">
          <div class="main-bottom-form__title">Subscribe for updates</div>
          <div class="main-bottom-form__subtitle">Subscribe for exclusive early sale access and new arrivals.</div>
          <form class="main-bottom-form__form">
            <div class="main-bottom-form__form-field">
              <label class="main-bottom-form__form-label" for="form-bottom-input">Email</label>
              <input type="text" class="main-bottom-form__form-input" name="Email" id="form-bottom-input" placeholder="Your working email">
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
    const promoBlock: HTMLElement = this.renderPromo();
    this.$main.append(
      promoBlock,
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