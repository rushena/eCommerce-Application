import { changeSelectedImage } from "../../Controller/apiRoot/getProduct";

export function showPreviousImage(totalAmount: number){
  console.log(totalAmount)
  const selectedImage = document.querySelector('.product-image_selected')  as HTMLDivElement;
  const imageNumber = Number(selectedImage.className.split(' ')[1].split('_')[1]);
  if(imageNumber === 1){
    const previousImage = document.querySelector(`.product-image_${totalAmount}`) as HTMLImageElement;
    const src = previousImage.getAttribute('src');
    if(src){
      changeSelectedImage(previousImage, src)
    }
  } else {
    const previousImage = document.querySelector(`.product-image_${imageNumber-1}`) as HTMLImageElement;
    const src = previousImage.getAttribute('src');
    if(src){
      changeSelectedImage(previousImage, src)
    }
  }
}

export function showNextImage(totalAmount: number){
  const selectedImage = document.querySelector('.product-image_selected')  as HTMLDivElement;
  const imageNumber = Number(selectedImage.className.split(' ')[1].split('_')[1]);
  if(imageNumber === totalAmount){
    const nextImage = document.querySelector(`.product-image_1`) as HTMLImageElement;
    const src = nextImage.getAttribute('src');
    if(src){
      changeSelectedImage(nextImage, src)
    }
  } else {
    const nextImage = document.querySelector(`.product-image_${imageNumber+1}`) as HTMLImageElement;
    const src = nextImage.getAttribute('src');
    if(src){
      changeSelectedImage(nextImage, src)
    }
  }
}