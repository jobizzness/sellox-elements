import { html, LitElement, css } from 'lit-element';

/**
 * `step-progress`
 * progress based on steps for forms
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class StepProgress extends LitElement {
  static get properties() {
    return {
      steps: {
        type: Array
      },
      prop1: {
        type: String
      },
      index: {
        type: Number
      },
      status: {
        type: String
      }
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        position: relative;
        padding: 0 8px;
      }
      .wrapper {
        height: 50px;
        width: 100%;
        position: relative;
        overflow: hidden;
      }
      biness-step-progress-bar {
        background-color: #bde1ec6b;
        height: 5px;
        position: absolute;
        width: 100%;
        top: 19px;
      }
      biness-step-progress-bar > div.biness-step-progress-bar {
        content: '';
        position: absolute;
        left: 0;
        transform: translateX(-100%);
        width: 100%;
        height: 4px;
        background-color: #0bb1e4;
        transition: transform 0.4s linear;
      }
      biness-step-progress-node {
        cursor: pointer;
        position: absolute;
        background: white;
        left: 0;
        transform: translateX(0%);
        border-radius: 50%;
        height: 40px;
        width: 40px;
        border: 4px solid #bde1ec;
        color: #0bb1e4;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      biness-step-progress-node[class='active'] {
        border-color: #0bb1e4;
      }
      biness-step-progress-node[class='done'] {
        background: #0bb1e4;
        color: white;
      }
    `;
  }

  constructor() {
    super();
    this.nodes$ = [];
    this.bar$ = null;
    this.steps = [];
    this.index = 0;
  }

  render() {
    return html`
      <section class="wrapper">
        <!-- Start State -->
        <biness-step-progress-bar>
          <div class="biness-step-progress-bar"></div>
        </biness-step-progress-bar>

        ${this.steps.map(
          step => html`
            <biness-step-progress-node
              @click=${e => (this.index = step.value)}
              .className=${this.computeStatus(step)}
              >${step.label}</biness-step-progress-node
            >
          `
        )}
      </section>
    `;
  }

  computeStatus(step) {
    if (step.value === this.index) {
      return 'active';
    } else if (step.value < this.index) {
      return 'done';
    } else {
      return '';
    }
  }

  firstUpdated() {
    this.steps = [
      { value: 0, label: 1, title: 'Start' },
      { value: 1, label: 2, title: 'Start' },
      { value: 2, label: 3, title: 'Start' },
      { value: 3, label: 4, title: 'End' }
    ];
  }

  set active(val) {
    this.index = val;
    this._setActiveNode(val);
  }

  _setActiveNode(index = this.index) {
    let translate;
    const numberOfSteps = this.nodes$.length;
    const wrapperWidth = this.wrapper$.offsetWidth;
    const offset = wrapperWidth / (numberOfSteps - 1); // we need n - 1 edges

    if (index === 0) {
      translate = wrapperWidth;
    } else {
      translate = wrapperWidth - offset * this.index; // dont know why
    }

    this.bar$.setAttribute('style', `transform: translateX(${-translate}px)`);
  }

  updated(changedProperties) {
    this.init();
  }

  init() {
    this.nodes$ = this.shadowRoot.querySelectorAll('biness-step-progress-node');
    this.wrapper$ = this.shadowRoot.querySelector('.wrapper');
    this.bar$ = this.shadowRoot.querySelector('.biness-step-progress-bar');
    this._setActiveNode();
    const numberOfSteps = this.nodes$.length;
    const wrapperWidth = this.wrapper$.offsetWidth - 48;
    const offset = wrapperWidth / (numberOfSteps - 1);

    if (numberOfSteps < 2) {
      throw new Error('steps is less that the required number');
    }
    // Of all our nodes
    this.nodes$.forEach((node, index) => {
      let translate;

      // Determine where to position this node
      if (this._isLastNode(index, numberOfSteps)) {
        translate = wrapperWidth;
      } else {
        translate = offset * index;
      }

      // Set the style for this node
      node.setAttribute('style', `transform: translateX(${translate}px)`);
    });
  }

  /**
   *
   * @param {*} node
   * @param {*} numberOfSteps
   */
  _isLastNode(node, numberOfSteps) {
    return node === numberOfSteps - 1;
  }
}

window.customElements.define('biness-step-progress', StepProgress);
