import LangStore from '../../langStore.js';
import { initScrollReveal } from '../../scrollReveal.js';

class ContactPage extends HTMLElement {
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
    const t = LangStore.getTexts('contact');

    this.innerHTML = /* html */ `
      <div class="contact-page">
        <div class="section-header" data-reveal>
          <h2 class="title">${t.title}</h2>
          <div class="section-divider"></div>
        </div>
        <p class="paragraph contact-page__description" data-reveal>${t.description}</p>
        <div class="contact-page__cards">
          <a href="mailto:${t.email}" class="contact-card" data-reveal>
            <span class="contact-card__icon">✉️</span>
            <span class="contact-card__label">${t.email}</span>
          </a>
          <a href="tel:${t.phone}" class="contact-card" data-reveal>
            <span class="contact-card__icon">📞</span>
            <span class="contact-card__label">${t.phone}</span>
          </a>
          <a href="${t.linkedin}" target="_blank" rel="noopener noreferrer" class="contact-card" data-reveal>
            <span class="contact-card__icon">💼</span>
            <span class="contact-card__label">LinkedIn</span>
          </a>
          <a href="${t.github}" target="_blank" rel="noopener noreferrer" class="contact-card" data-reveal>
            <span class="contact-card__icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
            </span>
            <span class="contact-card__label">GitHub</span>
          </a>
        </div>
      </div>
    `;
    initScrollReveal();
  }
}

customElements.define('contact-page', ContactPage);
