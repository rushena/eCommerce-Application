import { changeSelectedImage } from '../../Controller/apiRoot/getProduct';

export function showPreviousImage(totalAmount: number, productPage: HTMLDivElement) {
  console.log(totalAmount);
  console.log('productPage',productPage);
  const selectedImage = productPage.querySelector(
    '.product-image_selected'
  ) as HTMLDivElement;
  console.log('selectedImage',selectedImage);
  const imageNumber = Number(
    selectedImage.className.split(' ')[1].split('_')[1]
  );
  if (imageNumber === 1) {
    const previousImage = productPage.querySelector(
      `.product-image_${totalAmount}`
    ) as HTMLImageElement;
    console.log('previous image', previousImage)
    const src = previousImage.getAttribute('src');
    console.log('src', src)
    if (src) {
      changeSelectedImage(previousImage, src, productPage);
      
    }
  } else {
    const previousImage = productPage.querySelector(
      `.product-image_${imageNumber - 1}`
    ) as HTMLImageElement;
    console.log('previous image', previousImage)
    const src = previousImage.getAttribute('src');
    console.log('src', src)
    if (src) {
      changeSelectedImage(previousImage, src, productPage);
    }
  }
}

export function showNextImage(totalAmount: number, productPage: HTMLDivElement) {
  const selectedImage = productPage.querySelector(
    '.product-image_selected'
  ) as HTMLDivElement;
  const imageNumber = Number(
    selectedImage.className.split(' ')[1].split('_')[1]
  );
  if (imageNumber === totalAmount) {
    const nextImage = productPage.querySelector(
      `.product-image_1`
    ) as HTMLImageElement;
    const src = nextImage.getAttribute('src');
    if (src) {
      changeSelectedImage(nextImage, src, productPage);
    }
  } else {
    const nextImage = productPage.querySelector(
      `.product-image_${imageNumber + 1}`
    ) as HTMLImageElement;
    const src = nextImage.getAttribute('src');
    if (src) {
      changeSelectedImage(nextImage, src, productPage);
    }
  }
}
