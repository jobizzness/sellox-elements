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
      active: {
        type: Number
      }
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        position: relative;
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
        transform: 0.4s linear;
        top: 19px;
      }
      biness-step-progress-bar::after {
        content: '';
        position: absolute;
        left: 0;
        transform: translateX(-50%);
        width: 100%;
        height: 4px;
        background-color: #0bb1e4;
      }
      biness-step-progress-node {
        cursor: pointer;
        position: absolute;
        background: white;
        left: 0;
        transform: translateX(0%);
        border-radius: 50%;
        padding: 8px 13px;
        border: 4px solid #bde1ec;
        color: #0bb1e4;
      }
      biness-step-progress-node[status='active'] {
        border-color: #0bb1e4;
      }
      biness-step-progress-node[status='done'] {
        background: #0bb1e4;
        color: white;
      }
    `;
  }

  constructor() {
    super();
    this.nodes$ = [];
    this.bar$ = null;
  }

  render() {
    return html`
      <h2>Hello ${this.prop1}!</h2>
      <section class="wrapper">
        <!-- Start State -->
        <biness-step-progress-bar></biness-step-progress-bar>

        <biness-step-progress-node status="done">1</biness-step-progress-node>
        <biness-step-progress-node status="active">2</biness-step-progress-node>
        <biness-step-progress-node>3</biness-step-progress-node>
      </section>
    `;
  }

  firstUpdated() {
    this.prop1 = 'Step progress';
    this.init();
  }

  setActiveNode() {}

  init() {
    this.nodes$ = this.shadowRoot.querySelectorAll('biness-step-progress-node');
    this.wrapper$ = this.shadowRoot.querySelector('.wrapper');
    const numberOfSteps = this.nodes$.length;
    const wrapperWidth = this.wrapper$.offsetWidth - 43;
    const offset = wrapperWidth / numberOfSteps;

    // Of all our nodes
    this.nodes$.forEach((node, index) => {
      let translate;

      // Determine where to position this node
      if (this._isLastNode(index, numberOfSteps)) {
        translate = wrapperWidth;
      } else {
        translate = offset * 1.4 * index;
      }

      // Set the style for this node
      node.setAttribute('style', `transform: translateX(${translate}px)`);
    });
  }

  _isLastNode(node, numberOfSteps) {
    return node === numberOfSteps - 1;
  }
}

window.customElements.define('biness-step-progress', StepProgress);
