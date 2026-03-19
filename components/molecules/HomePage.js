import LangStore from '../../langStore.js';

class HomePage extends HTMLElement {
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
    const t = LangStore.getTexts('home');

    this.innerHTML = /* html */ `
      <div class="homePage">
        <h1>${t.title}</h1>
        <p>${t.description}</p>
        <section class="homePage__actions">
          <a href="#projects" class="primary">${t.primaryCallToAction}</a>
          <a href="#contact" class="secondary">${t.secondaryCallToAction}</a>
        </section>
        <div class="homePage__scroll-cue" aria-hidden="true">
          <span></span>
        </div>
      </div>
    `;
  }
}

customElements.define('home-page', HomePage);
