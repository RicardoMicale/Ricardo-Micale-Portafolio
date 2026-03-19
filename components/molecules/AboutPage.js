import LangStore from '../../langStore.js';
import { initScrollReveal } from '../../scrollReveal.js';

class AboutPage extends HTMLElement {
  constructor() {
    super();
    this._onLangChange = () => this.render();
  }

  async connectedCallback() {
    await LangStore._ready;
    this._unsubscribe = LangStore.subscribe(this._onLangChange);
    this.render();
  }

  disconnectedCallback() {
    if (this._unsubscribe) this._unsubscribe();
    this.innerHTML = '';
  }

  render() {
    const t = LangStore.getTexts('about');
    const { frontend, backend, tools } = t.skills;

    this.innerHTML = /* html */ `
      <div class="about-page">
        <div class="section-header" data-reveal>
          <h2 class="title">${t.title}</h2>
          <div class="section-divider"></div>
        </div>
        <div class="about-page__content">
          <div class="about-page__bio" data-reveal>
            <p class="paragraph">${t.description}</p>
          </div>
          <div class="about-page__skills">
            <skill-summary-card data-reveal
              title="${frontend.title}"
              skills='${JSON.stringify(frontend.list)}'
            ></skill-summary-card>
            <skill-summary-card data-reveal
              title="${backend.title}"
              skills='${JSON.stringify(backend.list)}'
            ></skill-summary-card>
            <skill-summary-card data-reveal
              title="${tools.title}"
              skills='${JSON.stringify(tools.list)}'
            ></skill-summary-card>
          </div>
        </div>
      </div>
    `;
    initScrollReveal();
  }
}

customElements.define('about-page', AboutPage);
