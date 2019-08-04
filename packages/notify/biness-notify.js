// TODO: write docs
/**
`biness-notify` is an element for displaying lalalala
The `fade` option (only valid when `preload` is set) will cause the placeholder
image/color to be faded out once the image is rendered.
Examples:
    `<biness-notify 
      opened message="someone just sent you something" 
      type="warn">
    </biness-notify>`
Custom property | Description | Default
----------------|-------------|----------
`--biness-notify-color` | Sets the color of the label
`--iron-image-width` | Sets the width of the wrapped image | `auto`
`--iron-image-height` | Sets the height of the wrapped image | `auto`
@demo demo/index.html
*/

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { IronOverlayBehaviorImpl } from '@polymer/iron-overlay-behavior/iron-overlay-behavior.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';

export class Notify extends mixinBehaviors(
  [IronOverlayBehaviorImpl],
  PolymerElement
) {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
          border-radius: 56px;
          position: fixed;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
          width: 100%;
          max-width: 400px;
          padding: 8px 24px;
          visibility: hidden;
          will-change: transform;
          top: 14px;
          right: 8px;
          transform: translate3d(0, calc(-100%), 0);
          transition-property: visibility, -webkit-transform;
          transition-property: visibility, transform;
          transition-duration: 0.2s;
          transition-delay: 0.1s;
        }

        :host(.opened) {
          visibility: visible;
          -webkit-transform: translate3d(0, 0, 0);
          transform: translate3d(0, 0, 0);
        }

        :host([type='success']) {
          color: var(--biness-notify-color, #1dc9b7);
          background: rgba(29, 201, 183, 0.1);
        }

        :host([type='warn']) {
          background-color: #ffbc2552;
          color: var(--biness-notify-color, #ff6a00);
        }

        :host([type='error']) {
          background-color: #ff254e52;
          color: var(--biness-notify-color, #ff0030);
        }

        :host([type='info']),
        :host(:not([type])) {
          background-color: #f9f9fc;
          color: var(--biness-notify-color, #595d6e);
        }

        .layout-horizontal {
          display: flex;
          flex-direction: row;
          align-items: center;
        }

        button {
          outline: 0;
          border: 0;
          color: inherit;
          padding: 8px;
          background: #0808080a;
          border-radius: 13px;
          cursor: pointer;
          margin: 0 12px;
        }

        .flex {
          flex: 1;
        }
        .label {
          font-size: 1rem;
          color: var(--biness-notify-color, inherit);
          font-weight: 500;
        }

        #closeBtn {
          position: absolute;
          right: 5px;
          top: 5px;
        }

        @media (max-width: 767px) {
        }
      </style>
      <div class="layout-horizontal">
        <h1 class="label">[[message]]</h1>
        <span class="flex"></span>
        <div class="actions">
          <button on-click="close">close</button>
        </div>
      </div>
    `;
  }

  static get properties() {
    return {
      withBackdrop: {
        type: Boolean,
        value: true
      },
      message: {
        type: String,
        value: "Success! You've seen this message."
      },
      type: {
        type: String,
        value: 'success'
      }
    };
  }

  ready() {
    super.ready();
    this.setAttribute('role', 'dialog');
    this.setAttribute('aria-modal', 'true');
    this.addEventListener('transitionend', e => this._transitionEnd(e));
    this.addEventListener('iron-overlay-canceled', e => this._onCancel(e));
    this.addEventListener('opened-changed', () => {});
  }

  _renderOpened() {
    this.restoreFocusOnClose = true;
    this.backdropElement.style.display = 'none';
    this.classList.add('opened');
  }

  _renderClosed() {
    this.classList.remove('opened');
  }

  _onCancel(e) {
    // Don't restore focus when the overlay is closed after a mouse event
    if (e.detail instanceof MouseEvent) {
      this.restoreFocusOnClose = false;
    }
  }

  _transitionEnd(e) {
    if (e.target !== this || e.propertyName !== 'transform') {
      return;
    }
    if (this.opened) {
      this._finishRenderOpened();
    } else {
      this._finishRenderClosed();
      this.backdropElement.style.display = '';
    }
  }

  get _focusableNodes() {
    return [this.$.viewCartAnchor, this.$.closeBtn];
  }

  refit() {}

  notifyResize() {}
}

customElements.define('biness-notify', Notify);
