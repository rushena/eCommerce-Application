// @vitest-environment jsdom

import { describe, expect, it } from 'vitest';
import { PageNotFound } from '../src/View/Pages/404.page';
import pageImage from '../src/assets/img/notFoundPageImage';

describe('404 Page', function (): void {
  const instance = new PageNotFound();

  it('creates an instance', function (): void {
    expect(instance).toBeTruthy();
  });

  it('check svg', function (): void {
    const image: HTMLElement = document.createElement('svg');
    image.outerHTML = pageImage();
    expect(image.tagName).eq('SVG');
  });

  it('setStructure', function (): void {
    const DOMStructure = instance.getPageCode();
    expect(DOMStructure.querySelector('.not-found__inner')).toBeTruthy();
    expect(DOMStructure.querySelector('.not-found__image')).toBeTruthy();
    expect(DOMStructure.querySelector('.not-found__button')).toBeTruthy();
    expect(DOMStructure.querySelector('.not-found__some-class')).toBeFalsy();
  });
});
