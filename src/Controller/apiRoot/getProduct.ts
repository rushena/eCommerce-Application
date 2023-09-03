import { getApiRoot } from "./generalClient";
import { showNextImage,showPreviousImage } from "../../View/components/Slider";

type ProductImages = {
  url: string,
  dimensions: {
    w: number,
    h: number
  }
}

type ProductAttributes= {
  name: string,
  value: {
    key: string,
    label: string
  }
}

type ProductPrice = {
  centAmount: number,
  currencyCode: string,
  fractionDigits: number,
  type: string
}

// type ProductVariants = {
//   assets: any[],
//   attributes: ProductAttributes,
//   id: number,
//   images: ProductImages,
//   key: string,
//   prices: {
//     country: string,
//     discounted: {
//       discount: {
//         id: string,
//         typeId: string,
//       },
//       value: ProductPrice,
//       id: string
//     },
//     value: ProductPrice
//   },
//   sku: string
// }
   



function getCurrencySign(currency: string, productPage: HTMLDivElement){
  switch (currency) {
    case "USD": return '$';
    case "EUR": return '€';
  }
}

export async function getProductData(id: string){
  const response = await getApiRoot()
  .withProjectKey({
    projectKey: 'new-ecommerce-app',
  })
  .productProjections()
  .withId({ID:id})
  .get()
  .execute()
  return response.body;
}

export async function setProductMainData(id: string, productPage: HTMLDivElement){
  await getProductData(id)
  .then((body)=>{
    const productName = body.name["en-US"];
    setProductName(productName, productPage);
  })
}


export async function setProductInfo(id: string, productPage: HTMLDivElement){
  await getProductData(id)
  .then((body)=>{   
    const mainVariant = body.masterVariant;
   // const productVariants = body.variants;
    setMainVariant(mainVariant, productPage);
   // setVariants(productVariants);
  })
}

export async function setProductDetails(id: string, productPage: HTMLDivElement){
  await getProductData(id)
  .then((body)=>{
    const attributesArray = body.masterVariant.attributes;
    if(attributesArray) {
      setDescription(attributesArray, productPage);
      setBrand(attributesArray, productPage);
    }  
  })
}

// рассписать mainVariant тип
function setMainVariant(mainVariant, productPage: HTMLDivElement){
    const productImageSrc = mainVariant.images[0].url;
    setProductMainImage(productImageSrc, productPage);
    mainVariant.images.shift();
    setOtherImages(mainVariant.images, productPage)

    const currentPrice = mainVariant.prices[0].discounted.value.centAmount /100;
    const currentPriceCurrency = getCurrencySign(mainVariant.prices[0].discounted.value.currencyCode, productPage);
    const currentPriceFull = currentPriceCurrency + currentPrice;
    if(currentPriceFull){
      setProductCurrentPrice(currentPriceFull, productPage);
    }
    
    const previousPrice = mainVariant.prices[0].value.centAmount / 100;
    const previousPriceCurrency = getCurrencySign(mainVariant.prices[0].value.currencyCode, productPage);
    const previousPriceFull = previousPriceCurrency + previousPrice;
    if(previousPriceFull){
      setProductPreviousPrice(previousPriceFull, productPage);
    }

    setDiscount(previousPrice, currentPrice, productPage);

    const attributesArray = mainVariant.attributes;
    if(attributesArray) {
      setColors(attributesArray, productPage);
      setSize(attributesArray, productPage);
    }  
}

function setProductName(productName: string, productPage: HTMLDivElement){
  const productNameField = productPage.querySelector('.product-name') as HTMLHeadingElement;
    productNameField.innerHTML = productName;
}


function setProductMainImage(src: string, productPage: HTMLDivElement){
  const mainImage = productPage.querySelector('.product-image') as HTMLImageElement;
  mainImage.setAttribute('src', src);
  const selectedImage = productPage.querySelector('.product-image_selected') as HTMLImageElement;
  selectedImage.setAttribute('src', src);  
  selectedImage.addEventListener('click', () => {
    changeSelectedImage(selectedImage, src);
  })
}

export function changeSelectedImage(additionalImage: HTMLImageElement, src: string){
  const otherImagesArray = document.querySelectorAll('.product-image_size_small');
      otherImagesArray.forEach((image)=>{
        if(image.classList.contains('product-image_selected')){
          image.classList.remove('product-image_selected')
        }
      });
      additionalImage.classList.add('product-image_selected');
      const mainImage = document.querySelector('.product-image') as HTMLImageElement;
      mainImage.setAttribute('src', src)
}

// скачут изображения доделать
function setOtherImages(srcArray: ProductImages[], productPage: HTMLDivElement){
  if(srcArray.length > 1){
    const mainImageContainer = productPage.querySelector('.main-image-container') as HTMLDivElement;
    mainImageContainer.insertAdjacentHTML('beforeend', 
    `<div class="image-change">
      <div class="previous-image"></div>
      <div class="next-image"></div>
    </div>`)
  }
  const otherImages = productPage.querySelector('.other-images') as HTMLDivElement;
  srcArray.forEach((src, index)=>{
    const additionalImage = document.createElement('img');
    additionalImage.className = `product-image_size_small product-image_${index+2}`;
    additionalImage.setAttribute('src', src.url);
    additionalImage.setAttribute('alt', 'product-image');
    additionalImage.addEventListener('click', ()=>{
      changeSelectedImage(additionalImage, src.url);
    });
    otherImages.appendChild(additionalImage);
 })

 const totalImageAmount = productPage.querySelectorAll('.product-image_size_small').length;
console.log(totalImageAmount)
const previousImageButton = productPage.querySelector('.previous-image') as HTMLDivElement;
previousImageButton.addEventListener('click', ()=>{
  showPreviousImage(totalImageAmount);
})
const nextImageButton = productPage.querySelector('.next-image') as HTMLDivElement;
nextImageButton.addEventListener('click', () => {
  showNextImage(totalImageAmount);
})
}

function setProductCurrentPrice(currentPrice: string, productPage: HTMLDivElement){
  const currentPriceField = productPage.querySelector('.current-price') as HTMLDivElement;
  currentPriceField.innerText = currentPrice;
}

function setProductPreviousPrice(previousPrice: string, productPage: HTMLDivElement){
  const previousPriceField = productPage.querySelector('.previous-price') as HTMLDivElement;
  previousPriceField.innerText = previousPrice;
}

function setDiscount(previousPrice: number, currentPrice: number, productPage: HTMLDivElement){
  const discount = productPage.querySelector('.discount') as HTMLDivElement;
  discount.innerText = ((previousPrice - currentPrice)/previousPrice * 100).toFixed(2).toString() + '%' ;
}

function setColors(attributesArray: ProductAttributes[], productPage: HTMLDivElement){
    attributesArray.forEach((attribute) => {
      if(attribute.name === 'color'){
        const colorBlock = productPage.querySelector('.color-block') as HTMLDivElement;
        const colorBlockHeadingField = productPage.querySelector('.color-block__heading');
        if(!colorBlockHeadingField){
          colorBlock.innerHTML = `
          <h6 class="color-block__heading">Color</h6>
          <div class="color">
            <div class="color-container color-container-selected">
              <div class="color color_${attribute.value.key}"></div>
            </div>
          </div>
          `
        } else {
          const color = productPage.querySelector('.color') as HTMLDivElement;
          color.insertAdjacentHTML('beforeend', `
            <div class="color-container">
              <div class="color color_${attribute.value.key}"></div>
            </div>
          `);
        }
      }
    })
}

function setSize(attributesArray: ProductAttributes[], productPage: HTMLDivElement){
  attributesArray.forEach((attribute)=>{
    if(attribute.name === 'size'){
      const sizeBlock = productPage.querySelector('.size-block') as HTMLDivElement;
      const sizeBlockHeadingField = productPage.querySelector('.size-block__heading');
      if(!sizeBlockHeadingField){
        sizeBlock.innerHTML = `
        <h6 class="size-block__heading">Size</h6>
        <select class="size">
        <option class="please-select">Please select</option>
        <option class=${attribute.value.key}>${attribute.value.key}</option>
        </select>
        `
      } else {
        const size = productPage.querySelector('.size') as HTMLDivElement;
        size.insertAdjacentHTML('beforeend', `
          <option class=${attribute.value.key}>${attribute.value.key}</option>
        `);
      }
    }
  })
}

function setDescription(attributesArray: ProductAttributes[], productPage: HTMLDivElement){
  attributesArray.forEach((attribute) => {
    if(attribute.name === 'description'){
      const descriptionBlock = productPage.querySelector('.product__description') as HTMLDivElement;
        descriptionBlock.innerHTML = attribute.value.key
        return;
    }
  })
};

function setBrand(attributesArray: ProductAttributes[], productPage: HTMLDivElement){
  attributesArray.forEach((attribute) => {
    if(attribute.name === 'brand'){
      const brandBlock = productPage.querySelector('.product__brand') as HTMLDivElement;
        brandBlock.innerHTML = attribute.value.key
        return;
    }
  })
};

// function setVariants(variantsArray: ProductVariants[]){
//   const variantsBlock = productPage.querySelector('.variants-block') as HTMLDivElement;
//   const variantBlockHeadingField = productPage.querySelector('.variant-block__heading');
//   variantsArray.forEach((variant) => {
//     if(!variantBlockHeadingField){
//       variantsBlock.innerHTML = `
//       <h6 class="variant-block__heading">Variants</h6>
//       <img class="variant variant_${variant.sku}" src="${variant.images[0].url}" alt="variant-img">
//       </select>
//       `
//       variantsBlock.querySelector(`.variant_${variant.sku}`)?.addEventListener('click', () => {
//         setMainVariant(variant);
//       })
//     } else {
//       variantsBlock.insertAdjacentHTML('beforeend', `
//       <img class="variant variant_${variant.sku}" src="${variant.images[0].url}" alt="variant-img">
//       `)
//       variantsBlock.querySelector(`.variant_${variant.sku}`)?.addEventListener('click', () => {
//         setMainVariant(variant);
//         variantsBlock.setAttribute('src')
//       })
      
//     }      
//   })
// }