import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `quantity-input`
 * shop quantity input
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class QuantityInput extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <h2>Hello [[prop1]]!</h2>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'quantity-input',
      },
    };
  }
}

window.customElements.define('quantity-input', QuantityInput);
