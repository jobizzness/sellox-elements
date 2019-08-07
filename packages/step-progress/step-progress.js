import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `step-progress`
 * progress based on steps for forms
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class StepProgress extends PolymerElement {
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
        value: 'step-progress',
      },
    };
  }
}

window.customElements.define('step-progress', StepProgress);
