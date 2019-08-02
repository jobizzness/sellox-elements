/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { IronOverlayBehaviorImpl } from '@polymer/iron-overlay-behavior/iron-overlay-behavior.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';

class Notify extends mixinBehaviors([IronOverlayBehaviorImpl], PolymerElement) {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
          border-radius: 56px;
          position: fixed;
          background: #00bf8f;
          background: -webkit-linear-gradient(to right, #35b3b9, #00bfa5);
          background: linear-gradient(to right, #35b3b9, #00bfa5);
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
          width: 100%;
          max-width: 400px;
          padding: 12px 24px;
          visibility: hidden;
          color: white;
          will-change: transform;
          top: 14px;
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

        .layout-horizontal {
          display: flex;
          flex-direction: row;
        }

        .label {
          font-size: 1rem;
          color: var(--app-primary-color);
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
        <h1 class="label">Success! You've seen this message.</h1>
      </div>
      <div class="actions"></div>
    `;
  }

  static get properties() {
    return {
      withBackdrop: {
        type: Boolean,
        value: true
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
