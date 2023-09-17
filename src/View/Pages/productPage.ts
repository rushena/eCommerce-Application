import {
  setProductMainData,
  setProductInfo,
  setProductDetails,
} from '../../Controller/apiRoot/getProduct';
import '../../assets/css/product.css';
import '../../assets/css/modal-window.css';
import { getCart } from '../../Controller/basket/basket';
import {addToBasket} from '../../Controller/basket/addToBasket';
import {deleteFromBasket} from '../../Controller/basket/deleteFromBasket';

function getProductInfoLayout(id: string) {

  const productInfo = document.createElement('div');
  productInfo.className = `product-info`;
  productInfo.innerHTML = `
<div class="product-gallery">
  <div class="main-image-container">
    <img class="product-image" alt="product-image">
  </div> 
          <div class="other-images">
            <img class="product-image_size_small product-image_1 product-image_selected" alt="image">
          </div>
        </div>
        <div class="product-sidebar">
          <div class="price-block">
            <div class="current-price"></div>
            <div class="previous-price"></div>
            <div class="discount"></div>
          </div>
          <div class="color-block">
          </div>
          <!-- <div class="size-block">
            <h6 class="size-block__heading">Size</h6>
            <select class="size">
              <option class="please-select">Please select</option>
              <option class="XS">XS</option>
              <option class="S">S</option>
              <option class="M">M</option>
              <option class="L">L</option>
              <option class="XL">XL</option>
            </select>
          </div> -->
          <div class="variants-block"></div>
          <div class="cart-add-block">
            <input class="quantity" type="number" value="1" min="1" max="100">
            <button class="add-to-cart"><img src="./src/assets/img/Cart.png" alt="cart-image">  </button>
          </div>
        </div>
      </div>
`;

console.log('4', getCart())
  //переключает кнопку с добавить в удалить
  getCart().then((contents)=>{
    const addToCartButton = productInfo.querySelector('.add-to-cart') as HTMLButtonElement;
    console.log('addToCart', addToCartButton)
    contents.forEach((item) => {
      console.log('itemID',item.productId)
      if(item.productId === id){
        addToCartButton.innerHTML = '<img src="./src/assets/img/Cart.png" alt="cart-image"> Remove from cart';
        addToCartButton.classList.add('non-active');
      } else {
        addToCartButton.innerHTML = '<img src="./src/assets/img/Cart.png" alt="cart-image"> Add to cart';
      }
    })

    //слушатель на добавление / удаление из корзины. Возможно нужно добавить про хеадер
    addToCartButton.addEventListener(('click'), () => {      
      if(addToCartButton.classList.contains('non-active')){
        getCart().then((contents)=>{
          contents.forEach((item)=>{
            if(item.productId === id){
              deleteFromBasket(item);
            }
          })
        })
      } else {
        const quantityInput = addToCartButton.querySelector('.quantity') as HTMLInputElement;
        const productQuantity = quantityInput.value;
        addToBasket(id, productQuantity);
      }
      addToCartButton.classList.toggle('non-active');
    })
  })

  setProductInfo(id, productInfo);

  return productInfo;
}

function getProductDetailsLayout(id: string) {
  const productDetails = document.createElement('div');
  productDetails.className = `product-details`;
  productDetails.innerHTML = `
      <div class="description-block">
        <h6>Description</h6>
        <div class="product__description">
         - 
        </div>
      </div>
      <div class="brand-block">
        <h6>Brand</h6>
        <div class="product__brand">-</div>
      </div>
`;
  setProductDetails(id, productDetails);

  return productDetails;
}

export default function getProductPage(id: string) {
  const productPage = document.createElement('div');
  productPage.className = `product-card id_${id}`;
  productPage.innerHTML = `
  <h2 class="product-name">Basic hooded sweatshirt in pink</h2>
  <div class="tabs">
    <div class="tab tab__general tab_selected">General Info</div>
    <div class="tab tab__details">Product details</div>
  </div>
  <hr>
  `;
  setProductMainData(id, productPage);

  const productInfoLayout = getProductInfoLayout(id);
  const productDetailsLayout = getProductDetailsLayout(id);

  productPage.appendChild(productInfoLayout);

  const generalTab = productPage.querySelector(
    '.tab__general'
  ) as HTMLDivElement;
  const detailsTab = productPage.querySelector(
    '.tab__details'
  ) as HTMLDivElement;

  generalTab.addEventListener('click', () => {
    if (!generalTab.classList.contains('tab_selected')) {
      detailsTab.classList.remove('tab_selected');
      generalTab.classList.add('tab_selected');
      productDetailsLayout.remove();
      productPage.appendChild(productInfoLayout);
    }
  });

  detailsTab.addEventListener('click', () => {
    if (!detailsTab.classList.contains('tab_selected')) {
      generalTab.classList.remove('tab_selected');
      detailsTab.classList.add('tab_selected');
      productInfoLayout.remove();
      productPage.appendChild(productDetailsLayout);
    }
  });

  return productPage;
}
