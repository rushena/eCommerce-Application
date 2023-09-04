import { Customer, Address } from '@commercetools/platform-sdk';
import { ProfileController } from '../../Controller/ProfileController/ProfileController';
import '.././../assets/css/profile.page.css';
import { Routing } from '../../Router/Router';

type CustomerData = {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
};

export class ProfilePageView {
  private $main: HTMLElement = document.createElement('div');
  private profileController: ProfileController = new ProfileController();

  renderProfileMenu() {
    const $menu = document.createElement('div');
    $menu.classList.add('profile-page__menu');

    $menu.innerHTML = `
        <button class="profile-page__menu-item active" data-event="showUserInfo">User Information</button>
        <button class="profile-page__menu-item" data-event="showPasswordChange">Password change</button>
        <button class="profile-page__menu-item" data-event="showBillingAddresses">Billing Addresses</button>
        <button class="profile-page__menu-item" data-event="showShippingAddresses">Shipping Addresses</button>
    `;

    const $buttons = $menu.querySelectorAll('.profile-page__menu-item');

    $menu.addEventListener('click', (e) => {
      const $button: HTMLElement | null = (e.target as HTMLElement).closest(
        'button'
      );

      if (!$button) return;

      e.preventDefault();

      if ($button.classList.contains('active')) return;

      $buttons.forEach((button) => button.classList.remove('active'));
      $button.classList.add('active');
      const eventName = $button.dataset['event'];
      document.dispatchEvent(new Event(eventName || ''));
    });

    return $menu;
  }

  renderProfileBoxes() {
    const $box = document.createElement('div');
    $box.classList.add('profile-page__boxes');

    $box.innerHTML = `
        <div class="profile-page__box active"></div>
        <div class="profile-page__box"></div>
        <div class="profile-page__box"></div>
        <div class="profile-page__box"></div>
    `;

    const $boxes: NodeListOf<Element> =
      $box.querySelectorAll('.profile-page__box');
    const removeActiveClassOnBoxes = () =>
      $boxes.forEach((box) => box.classList.remove('active'));

    document.addEventListener('showUserInfo', () => {
      removeActiveClassOnBoxes();
      $boxes[0].classList.add('active');
    });

    document.addEventListener('showPasswordChange', () => {
      removeActiveClassOnBoxes();
      $boxes[1].classList.add('active');
    });

    document.addEventListener('showBillingAddresses', () => {
      removeActiveClassOnBoxes();
      $boxes[2].classList.add('active');
    });

    document.addEventListener('showShippingAddresses', () => {
      removeActiveClassOnBoxes();
      $boxes[3].classList.add('active');
    });

    this.renderContent($boxes);

    document.addEventListener('updateUserContent', () => {
        this.renderContent($boxes);
    })

    return $box;
  }

  async renderContent(boxes: NodeListOf<Element>) {
    const data: Customer = (
      await (await this.profileController.getCustomer()).get().execute()
    ).body;

    this.setGeneralInfo(boxes[0] as HTMLElement, data);
    this.setPasswordChangeBox(boxes[1] as HTMLElement);
    this.setBillingAddresses(boxes[2] as HTMLElement, data);
    this.setShippingAddresses(boxes[3] as HTMLElement, data);
  }

  setGeneralInfo($wrap: HTMLElement, data: Customer) {
    const customerData: CustomerData = {
      firstName: data.firstName || '',
      lastName: data.lastName || '',
      email: data.email || '',
      dateOfBirth: data.dateOfBirth || '',
    };

    const $button = document.createElement('button');
    $button.classList.add('profile-page__info-button');
    $button.innerText = 'Edit User Information';

    $wrap.innerHTML = '';

    $wrap.append(this.renderEditInfo(customerData), $button);

    $button.addEventListener('click', (e) => {
      e.preventDefault();
      $wrap.innerHTML = '';
      $wrap.append(this.renderEditGeneralInfoForm(customerData));
    });

    document.addEventListener('cancelUpdateUserContent', () => {
        $wrap.innerHTML = '';
        $wrap.append(this.renderEditInfo(customerData), $button);
    })
  }

  renderEditInfo(data: CustomerData) {
    const $wrap = document.createElement('div');
    $wrap.classList.add('profile-page__info-wrap');

    $wrap.innerHTML = `
        <div class="profile-page__info-field">
            <div class="profile-page__info-title">Your First name:</div>
            <div class="profile-page__info-value">${data.firstName}</div>
        </div>
        <div class="profile-page__info-field">
            <div class="profile-page__info-title">Your Last name:</div>
            <div class="profile-page__info-value">${data.lastName}</div>
        </div>
        <div class="profile-page__info-field">
            <div class="profile-page__info-title">Your Email:</div>
            <div class="profile-page__info-value">${data.email}</div>
        </div>

        <div class="profile-page__info-field">
            <div class="profile-page__info-title">Your Birthday:</div>
            <div class="profile-page__info-value">${data.dateOfBirth}</div>
        </div>
    `;

    return $wrap;
  }

  renderEditGeneralInfoForm(data: CustomerData) {
    const $form: HTMLElement = document.createElement('form');
    $form.classList.add('profile-page__info-form')
    const parseDate: string[] = data.dateOfBirth.split('-');
    const months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    $form.innerHTML = `
        <div class="profile-page__info-form-field">
            <label class="profile-page__info-form-label">
                <div class="profile-page__info-form-title">First Name</div>
                <input type="text" name="firstName" value="${
                  data.firstName
                }" class="profile-page__info-form-input">
                <div class="profile-page__info-form-error"></div>
            </label>
        </div>
        <div class="profile-page__info-form-field">
            <label class="profile-page__info-form-label">
                <div class="profile-page__info-form-title">Last Name</div>
                <input type="text" name="lastName" value="${
                  data.lastName
                }" class="profile-page__info-form-input">
                <div class="profile-page__info-form-error"></div>
            </label>
        </div>
        <div class="profile-page__info-form-field">
            <label class="profile-page__info-form-label">
                <div class="profile-page__info-form-title">E-mail</div>
                <input type="text" name="email" value="${
                  data.email
                }" class="profile-page__info-form-input">
                <div class="profile-page__info-form-error"></div>
            </label>
        </div>

        <div class="profile-page__info-form-field _birthday">
            <label class="profile-page__info-form-label">
                <div class="profile-page__info-form-title">Day</div>
                <select class="profile-page__info-form-select" name="day">
                    ${new Array(31)
                      .fill('')
                      .map((_, k) => {
                        const value: string = `${k < 9 ? '0' : ''}${k + 1}`;
                        return `<option value="${value}"${
                          value === parseDate[2] ? ' selected' : ''
                        }>${value}</option>`;
                      })
                      .join('')}
                </select>
                <div class="profile-page__info-form-error"></div>
            </label>
            <label class="profile-page__info-form-label">
                <div class="profile-page__info-form-title">Month</div>
                <select class="profile-page__info-form-select" name="month">
                    ${new Array(12)
                      .fill('')
                      .map((_, k) => {
                        const value: string = `${k < 9 ? '0' : ''}${k + 1}`;
                        return `<option value="${value}"${
                          value === parseDate[1] ? ' selected' : ''
                        }>${months[k]}</option>`;
                      })
                      .join('')}
                </select>
                <div class="profile-page__info-form-error"></div>
            </label>
            <label class="profile-page__info-form-label">
                <div class="profile-page__info-form-title">Year:</div>
                <select class="profile-page__info-form-select" name="year">
                    ${new Array(83)
                      .fill('')
                      .map((_, k) => {
                        const value: string = `${k + 1940}`;
                        return `<option value="${value}"${
                          value === parseDate[0] ? ' selected' : ''
                        }>${value}</option>`;
                      })
                      .join('')}
                </select>
                <div class="profile-page__info-form-error"></div>
            </label>
        </div>

        <div class="profile-page__info-form-buttons">
          <button type="submit" class="profile-page__info-form-button-submit">Send changes</button>
          <button class="profile-page__info-form-button-cancel">Cancel</button>
        </div>
    `;

    $form.addEventListener('click', function(e) {
        const $target = e.target as HTMLElement;
        const $button = $target.closest('.profile-page__info-form-button-cancel');
        if (!$button) return;
        e.preventDefault();
        document.dispatchEvent(new Event('cancelUpdateUserContent'));
    })

    $form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.submitChageUserInfo(new FormData($form as HTMLFormElement));
        
    })

    return $form;
  }

  async submitChageUserInfo(formData: FormData) {
    const res = await this.profileController.updateUserInfo(formData);

    if (res.statusCode === 200) {
        document.dispatchEvent(new Event('updateUserContent'));
    }
  }

  setPasswordChangeBox($wrap: HTMLElement) {
    $wrap.innerHTML = `
        <form class="profile-page__change-password">
            <div class="profile-page__change-password-field">
                <label class="profile-page__change-password-field">
                    <div class="profile-page__change-password-title">Old password</div>
                    <div class="profile-page__change-password-input-wrapper">
                        <input type="password" name="currentPassword" class="profile-page__change-password-input">
                        <span class="profile-page__change-password-show"></span>
                    </div>
                    <div class="profile-page__change-password-error"></div>
                </label>
            </div>
            <div class="profile-page__change-password-field">
                <label class="profile-page__change-password-field">
                    <div class="profile-page__change-password-title">New password</div>
                    <div class="profile-page__change-password-input-wrapper">
                        <input type="password" name="newPassword" class="profile-page__change-password-input">
                        <span class="profile-page__change-password-show"></span>
                    </div>
                    <div class="profile-page__change-password-error"></div>
                </label>
            </div>
            <div class="profile-page__change-password-field">
                <label class="profile-page__change-password-field">
                    <div class="profile-page__change-password-title">Repeat new password</div>
                    <div class="profile-page__change-password-input-wrapper">
                        <input type="password" name="repeatNewPassword" class="profile-page__change-password-input">
                        <span class="profile-page__change-password-show"></span>
                    </div>
                    <div class="profile-page__change-password-error"></div>
                </label>
            </div>
            <button class="profile-page__change-password-button">Change password</button>
        </form>
    `;

    const $form = $wrap.querySelector('form');

    if ($form) {
        $form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const res = await this.submitChagePassord(new FormData($form));
            console.log(res);

            if (res.statusCode === 200) {
                Routing.get('/logout');
                Routing.get('/user/authorization');
            }

        });
    }
  }

  async submitChagePassord(formData: FormData) {
    return await this.profileController.updatePassword(formData);
  }

  renderNewAddressForm() {
    const $wrap = document.createElement('div');
    $wrap.classList.add('profile-page__address');

    $wrap.innerHTML = `
        <form class="profile-page__address-add-form">
            <label class="profile-page__address-add-form-field">
                <div class="profile-page__address-add-form-title">Country:</div>
                <select class="profile-page__address-add-form-select" name="country">
                    <option value="Poland" selected>Poland</option>
                </select>
                <div class="profile-page__address-add-form-error"></div>
            </label>
            <label class="profile-page__address-add-form-field">
                <div class="profile-page__address-add-form-title">Postal Code:</div>
                <input type="text" placeholder="00-001" name="postalCode" class="profile-page__address-add-form-input">
                <div class="profile-page__address-add-form-error"></div>
            </label>
            <label class="profile-page__address-add-form-field">
                <div class="profile-page__address-add-form-title">City:</div>
                <input type="text" placeholder="Warsaw" name="city" class="profile-page__address-add-form-input">
                <div class="profile-page__address-add-form-error"></div>
            </label>
            <label class="profile-page__address-add-form-field">
                <div class="profile-page__address-add-form-title">Address:</div>
                <input type="text" name="streetName" class="profile-page__address-add-form-input">
                <div class="profile-page__address-add-form-error"></div>
            </label>
            <div class="profile-page__address-add-form-buttons">
                <button class="profile-page__address-add-form-button-add" type="submit">Add</button>
                <button class="profile-page__address-add-form-button-cancel">Cancel</button>
            </div>
        </form>
    `

    $wrap.addEventListener('click', (e) => {
        const $target = e.target as HTMLElement;
        const $cancelButton = $target.closest('.profile-page__address-add-form-button-cancel');

        if (!$cancelButton) return;

        e.preventDefault();

        $wrap.outerHTML = '';

    })

    return $wrap;
  }

  renderEditAddressForm(data: Address) {
    const $wrap = document.createElement('form');
    $wrap.classList.add('profile-page__address-add-form');

    $wrap.innerHTML = `
        <label class="profile-page__address-add-form-field">
            <div class="profile-page__address-add-form-title">Country:</div>
            <select class="profile-page__address-add-form-select" name="country">
                <option value="Poland" selected>Poland</option>
            </select>
            <div class="profile-page__address-add-form-error"></div>
        </label>
        <label class="profile-page__address-add-form-field">
            <div class="profile-page__address-add-form-title">Postal Code:</div>
            <input type="text" placeholder="00-001" value="${data.postalCode}" name="postalCode" class="profile-page__address-add-form-input">
            <div class="profile-page__address-add-form-error"></div>
        </label>
        <label class="profile-page__address-add-form-field">
            <div class="profile-page__address-add-form-title">City:</div>
            <input type="text" placeholder="Warsaw" name="city" value="${data.city}" class="profile-page__address-add-form-input">
            <div class="profile-page__address-add-form-error"></div>
        </label>
        <label class="profile-page__address-add-form-field">
            <div class="profile-page__address-add-form-title">Address:</div>
            <input type="text" name="streetName" value="${data.streetName}" class="profile-page__address-add-form-input">
            <div class="profile-page__address-add-form-error"></div>
        </label>
        <div class="profile-page__address-add-form-buttons">
            <button class="profile-page__address-add-form-button-edit" type="submit">Edit</button>
            <button class="profile-page__address-add-form-button-cancel">Cancel</button>
        </div>
    `

    $wrap.addEventListener('submit',async (e) => {
        e.preventDefault();
        const res = await this.profileController.changeAddress(data.id || '', new FormData($wrap));
        if (res.statusCode === 200) {
            document.dispatchEvent(new Event('updateUserContent'));
        }
    })

    return $wrap;
  }

  renderAddress(data: Address, type: 'billing' | 'shipping', defaultAddress : boolean = false) {
    const $wrap = document.createElement('div');
    $wrap.classList.add('profile-page__address');

    if (defaultAddress) {
        $wrap.classList.add('_default');
    }
    
    const addressHTML: string = `
        ${defaultAddress ? `<div class="profile-page__address-label">Default address</div>` : ``}
        <div class="profile-page__address-row">
            <div class="profile-page__address-title">Country:</div>
            <div class="profile-page__address-value">Poland</div>
        </div>
        <div class="profile-page__address-row">
            <div class="profile-page__address-title">City:</div>
            <div class="profile-page__address-value">${data.city}</div>
        </div>
        <div class="profile-page__address-row">
            <div class="profile-page__address-title">Postal Code:</div>
            <div class="profile-page__address-value">${data.postalCode}</div>
        </div>
        <div class="profile-page__address-row">
            <div class="profile-page__address-title">Street Name:</div>
            <div class="profile-page__address-value">${data.streetName}</div>
        </div>
        <div class="profile-page__address-buttons">
            <button class="profile-page__address-button-edit">Edit</button>
            <button class="profile-page__address-button-delete">Delete</button>
            ${!defaultAddress ? `<button class="profile-page__address-button-default">Use this address as default</button>` : ``}
            
        </div>
    `;

    $wrap.innerHTML = addressHTML;

    $wrap.addEventListener('click', async (e) => {
        const $target: HTMLElement = e.target as HTMLElement;
        const $removeButton = $target.closest('.profile-page__address-button-delete');

        if ($removeButton) {
            const res = await this.profileController.deleteAddress(data.id || '');
            if (res.statusCode === 200) {
                $wrap.outerHTML = '';
            }

            return;
        }

        const $defaultButton = $target.closest('.profile-page__address-button-default');

        if ($defaultButton) {
            let res;
            if (type === 'billing') {
                res = await this.profileController.setDefaultBillingAddress(data.id || '');
            } else {
                res = await this.profileController.setDefaultShippingAddress(data.id || '');
            }

            if (res.statusCode === 200) {
                document.dispatchEvent(new Event('updateUserContent'));
            }

            return;
        }

        const $editButton = $target.closest('.profile-page__address-button-edit');

        if ($editButton) {
            const $form = this.renderEditAddressForm(data);
            $wrap.innerHTML = '';
            $wrap.append($form);
        }
    });

    return $wrap;
  }

  renderAddNewAddresssButton() {
    const $button = document.createElement('button');
    $button.classList.add('profile-page__address-add');
    $button.innerHTML = `
        <svg width="108" height="108" viewBox="0 0 108 108" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="54" cy="54" r="52.5" fill="#fff" stroke="#AEAEAE" stroke-width="3"/><path fill-rule="evenodd" clip-rule="evenodd" d="M54 24a2 2 0 0 0-2 2v26H26a2 2 0 1 0 0 4h26v26a2 2 0 1 0 4 0V56h26a2 2 0 1 0 0-4H56V26a2 2 0 0 0-2-2Z" fill="#18C03D"/></svg>
        <span>Add new Address</span>
    `;
    return $button;
  }

  setBillingAddresses($wrap: HTMLElement, data: Customer) {
    $wrap.innerHTML = '';
    const billingAddressIds = data.billingAddressIds || [];
    const $box = document.createElement('div');
    $box.classList.add('profile-page__addresses');

    $wrap.append($box);

    const billingAddresessDOM = billingAddressIds.map((address) => {
      const currentAddress: Address | undefined = data.addresses.find((item) => item.id === address);
      if (!currentAddress) {
        return '';
      } else {
        return this.renderAddress(currentAddress, 'billing', currentAddress?.id === data.defaultBillingAddressId);
    }
    });

    const $addAddressButton = this.renderAddNewAddresssButton();

    $addAddressButton.addEventListener('click', (e) => {
        e.preventDefault();
        const $formWrap = this.renderNewAddressForm();
        $addAddressButton.before($formWrap);
        const $form = $formWrap.querySelector('form');

        if ($form) {
            $form.addEventListener('submit', async e => {
                e.preventDefault();
                const res = await this.profileController.addBillingAddress(new FormData($form));

                if (res.statusCode === 200) {
                    document.dispatchEvent(new Event('updateUserContent'));
                }
            })
        }

    })

    $box.append(...billingAddresessDOM, $addAddressButton);
  }

  setShippingAddresses($wrap: HTMLElement, data: Customer) {

    $wrap.innerHTML = '';
    const shippingAddressIds = data.shippingAddressIds || [];
    const $box = document.createElement('div');
    $box.classList.add('profile-page__addresses');

    $wrap.append($box);

    const shippingAddressDOM = shippingAddressIds.map((address) => {
      const currentAddress: Address | undefined = data.addresses.find((item) => item.id === address);
      if (!currentAddress) {
        return '';
      } else {
        return this.renderAddress(currentAddress, 'shipping' ,currentAddress?.id === data.defaultShippingAddressId);
    }
      
    });

    const $addAddressButton = this.renderAddNewAddresssButton();

    $addAddressButton.addEventListener('click', (e) => {
        e.preventDefault();
        const $formWrap = this.renderNewAddressForm();
        $addAddressButton.before($formWrap);
        const $form = $formWrap.querySelector('form');

        if ($form) {
            $form.addEventListener('submit', async e => {
                e.preventDefault();
                const res = await this.profileController.addShippingAddress(new FormData($form));

                if (res.statusCode === 200) {
                    document.dispatchEvent(new Event('updateUserContent'));
                }
            })
        }

    })

    $box.append(...shippingAddressDOM, $addAddressButton);
  }

  setPageStructure() {
    const $mainInner = document.createElement('div');
    $mainInner.classList.add('profile-page');

    $mainInner.innerHTML = `<h1 class="profile-page__title">Account Information</h1>`;

    const $content = document.createElement('div');
    $content.classList.add('profile-page__main');

    $content.append(this.renderProfileMenu(), this.renderProfileBoxes());

    $mainInner.append($content);

    this.$main.append($mainInner);
  }

  getElement() {
    this.setPageStructure();
    return this.$main;
  }
}
