// @vitest-environment jsdom
import { MainPage } from '../src/View/pages/Main.page';
import { describe, expect, it } from 'vitest';

describe('404 Page', function (): void {
  const instance = new MainPage();

  it('creates an instance', function (): void {
    expect(instance).toBeTruthy();
  });

  it('setStructure', function (): void {
    const DOMStructure = instance.getElement();
    expect(DOMStructure.querySelector('.main-promo__slider-item')).toBeTruthy();
    expect(DOMStructure.querySelector('.main-bottom-form__inner')).toBeTruthy();
    expect(DOMStructure.querySelector('.main-blog__vendor')).toBeTruthy();
    expect(DOMStructure.querySelector('.main-blog__vendor.active')).toBeFalsy();
  });
});
