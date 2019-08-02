/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import {
  html,
  property,
  customElement,
  TemplateResult,
  LitElement,
  css
} from 'lit-element';
import { IronOverlayBehaviorImpl } from '@polymer/iron-overlay-behavior/iron-overlay-behavior.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';

import './cart-modal.scss';

class Notify extends mixinBehaviors([IronOverlayBehaviorImpl], LitElement) {
  render() {
    return html`
      <div class="layout-horizontal">
        <h1 class="label">Success! You've added this item to your cart.</h1>
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

    document.addEventListener('add-cart', e => this.open());
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
