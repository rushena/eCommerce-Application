import Paging from '../../View/components/paging';
import Products from '../../View/components/products';
import Navigation from '../../View/components/topBarNavigation';
import SideBar from '../../View/components/sidebar';
import { Category } from '../../types/product.type';

export async function categoryHandler(
  event: Event,
  products: Products,
  paging: Paging,
  navigation: Navigation,
  getSubCategories: SideBar['getSubCategories'],
  sidebarElement: HTMLDivElement
) {
  event.preventDefault();
  event.stopPropagation();
  const target = event.target as HTMLElement;
  const parent = target.closest('.type-menu__item');
  const inputElement = parent?.children[0] as HTMLInputElement;
  const categoryText = parent?.children[2].textContent;
  if (!categoryText) return;
  const categoryID = products.categories.find((value) => {
    if (value.name === categoryText) return true;
  })?.id;
  const newFilter = products.options?.queryArgs?.filter;
  if (!newFilter || !Array.isArray(newFilter)) return;
  if (
    products.currentCategories.filter((item) => {
      if (typeof item !== 'string') {
        return item.parent === categoryText;
      }
    }).length > 0
  ) {
    const index = products.currentCategories.indexOf(categoryText);
    newFilter.splice(index, 1);
    products.currentCategories.splice(index, 1);
    inputElement.checked = false;
    document.querySelector(
      '.sidebar-container__sub-category-container'
    )!.innerHTML = '';
  } else {
    const previousIndex = newFilter.indexOf(
      newFilter.find((item) => item.includes('categories.id:'))!
    );
    newFilter.splice(previousIndex, 1);
    products.currentCategories.splice(previousIndex, 1);
    products.currentCategories.push({ parent: categoryText, children: [] });
    newFilter.push(`categories.id:"${categoryID}"`);
    inputElement.checked = true;

    const subCategories = products.categories.filter((item) => {
      if (item.parent?.id === categoryID) return true;
      return false;
    });
    console.log(products);
    const subcategories = getSubCategories.call(products, subCategories);
    sidebarElement.after(subcategories);
  }
  navigation.fillNavigation();
  const newOptions: typeof products.options = {
    queryArgs: {
      ...products.options?.queryArgs,
      filter: newFilter,
    },
  };
  await products.fillProducts(newOptions);
  paging.setLength(products.total);
}

export async function subCategoryHandler(
  event: Event,
  products: Products,
  paging: Paging,
  navigation: Navigation,
  categoriesList: Category[]
) {
  event.preventDefault();
  event.stopPropagation();
  const target = event.target as HTMLElement;
  const parent = target.closest('.sub-category-menu__item');
  const inputElement = parent?.children[0] as HTMLInputElement;
  const categoryText = parent?.children[2].textContent;
  if (!categoryText) return;

  const categoryID = products.categories.find((value) => {
    if (value.name === categoryText) return true;
  })?.id;
  const newFilter = products.options?.queryArgs?.filter;
  if (!newFilter || !Array.isArray(newFilter)) return;
  if (
    products.currentCategories.filter((item) => {
      if (typeof item !== 'string') {
        return item.children.includes(categoryText);
      }
    }).length > 0
  ) {
    const previousIndex = newFilter.indexOf(
      newFilter.find((item) => item.includes('categories.id:'))!
    );
    const currentFilter = products.currentCategories[previousIndex];
    if (typeof currentFilter !== 'string') {
      const childrenFilterIndex = currentFilter.children.indexOf(categoryText);
      currentFilter.children.splice(childrenFilterIndex, 1);
    }
    if ((`${newFilter[previousIndex]}`.match(/subtree/g) || []).length > 1) {
      newFilter[previousIndex] = newFilter[previousIndex].replace(
        `, subtree("${categoryID}")`,
        ''
      );
      newFilter[previousIndex] = newFilter[previousIndex].replace(
        ` subtree("${categoryID}"),`,
        ''
      );
    } else {
      newFilter[previousIndex] = newFilter[previousIndex].replace(
        ` subtree("${categoryID}")`,
        ''
      );
    }
    inputElement.checked = false;
    if (newFilter[previousIndex] === 'categories.id:') {
      newFilter[previousIndex] = `categories.id:"${
        categoriesList[0].parent!.id
      }"`;
    }
  } else {
    const previousIndex = newFilter.indexOf(
      newFilter.find((item) => item.includes('categories.id:'))!
    );
    const currentFilter = products.currentCategories[previousIndex];
    if (typeof currentFilter !== 'string') {
      currentFilter.children.push(categoryText);
    }
    if (newFilter[previousIndex].includes('subtree')) {
      newFilter[previousIndex] += `, subtree("${categoryID}")`;
    } else {
      newFilter[previousIndex] = `categories.id: subtree("${categoryID}")`;
    }
    inputElement.checked = true;
  }
  navigation.fillNavigation();
  const newOptions: typeof products.options = {
    queryArgs: {
      ...products.options?.queryArgs,
      filter: newFilter,
    },
  };
  await products.fillProducts(newOptions);
  paging.setLength(products.total);
}

export async function priceHandle(
  firstInput: HTMLInputElement,
  secondInput: HTMLInputElement,
  products: Products,
  paging: Paging
) {
  const newFilter = products.options?.queryArgs?.filter;
  if (!newFilter || !Array.isArray(newFilter)) return;
  if (!products.currentCategories.includes('Price')) {
    products.currentCategories.push('Price');
  } else {
    const index = products.currentCategories.indexOf('Price');
    newFilter.splice(index, 1);
  }
  newFilter.push(
    `variants.price.centAmount:range (${
      firstInput.value === '' ? firstInput.placeholder : firstInput.value
    } to ${
      secondInput.value === '' ? secondInput.placeholder : secondInput.value
    })`
  );
  const newOptions: typeof products.options = {
    queryArgs: {
      ...products.options?.queryArgs,
      filter: newFilter,
    },
  };
  await products.fillProducts(newOptions);
  paging.setLength(products.total);
}

export async function colorHandler(
  color: string,
  products: Products,
  paging: Paging
) {
  const newFilter = products.options?.queryArgs?.filter;
  if (!newFilter || !Array.isArray(newFilter)) return;
  if (!products.currentCategories.includes('Color')) {
    products.currentCategories.push('Color');
    newFilter.push(`variants.attributes.color:"${color}"`);
  } else {
    const index = products.currentCategories.indexOf('Color');
    if (newFilter[index].includes(color)) {
      newFilter[index] = newFilter[index].replace(`,"${color}"`, '');
      newFilter[index] = newFilter[index].replace(`"${color}",`, '');
      newFilter[index] = newFilter[index].replace(`"${color}"`, '');
      if (newFilter[index] === 'variants.attributes.color:') {
        newFilter.splice(index, 1);
        products.currentCategories.splice(index, 1);
      }
    } else {
      newFilter[index] += `,"${color}"`;
    }
  }
  console.log(newFilter);
  const newOptions: typeof products.options = {
    queryArgs: {
      ...products.options?.queryArgs,
      filter: newFilter,
    },
  };
  await products.fillProducts(newOptions);
  paging.setLength(products.total);
}
