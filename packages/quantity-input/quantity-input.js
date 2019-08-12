/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { html, LitElement, css } from 'lit-element';

export class QuantityInput extends LitElement {
  static get properties() {
    return {
      value: {
        type: Number
      },
      min: {
        type: Number
      },
      max: {
        type: Number
      }
    };
  }

  constructor() {
    super();
    this.value = 1;
    this.min = 1;
  }

  static get styles() {
    return css`
      :host {
        display: block;
        max-width: 200px;
      }
      input {
        border: 0px;
        outline: 0px;
        background: transparent;
      }
      .quantity {
        display: flex;
      }
      input[type='text'] {
        color: #393433;
        vertical-align: baseline;
        width: 30px;
        font-weight: 600;
        text-align: center;
        padding: 4px;
        background-color: #e6e6e6;
        border-radius: 62%;
      }
      input[type='button'] {
        height: 35px;
        cursor: pointer;
        width: 90px;
        font-size: 14px;
        font-weight: 600;
        color: #717171;
      }
    `;
  }

  render() {
    return html`
      <div class="quantity">
        <input type="button" value="—" @click=${this.minus} class="qtyminus" />
        <input
          type="text"
          name="Quantity"
          .value=${this.value}
          class="qty"
          readonly
        />
        <input type="button" value="+" class="qtyplus" @click=${this.plus} />
      </div>
    `;
  }

  minus(e) {
    if (this.value - 1 < this.min) return;
    this.value--;
    this.changed();
  }

  plus(e) {
    if (this.max && this.value + 1 > this.max) return;
    this.value++;
    this.changed();
  }

  changed() {
    this.dispatchEvent(new CustomEvent('change', { detail: this.value }));
  }
}

window.customElements.define('biness-quantity-input', QuantityInput);
