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
        height: 30px;
        width: 100%;
        position: relative;
      }
      biness-step-progress-bar {
        background-color: #bde1ec6b;
        height: 5px;
        position: absolute;
        width: 100%;
        top: 19px;
      }
      biness-step-progress-node {
        position: absolute;
        left: 0;
        transform: translateX(0%);
        border-radius: 50%;
        padding: 8px 14px;
        background: #0bb1e4;
        border: 7px solid #bde1ec;
        color: white;
      }
    `;
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
  }
}

window.customElements.define('biness-step-progress', StepProgress);
