// @ts-nocheck
import LangStore from '../../langStore.js';

class NavigationBar extends HTMLElement {
  constructor() {
    super();
    this._onLangChange = () => this.updateSwitch();
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

  // Only update the switch state without re-rendering nav links (avoids flicker)
  updateSwitch() {
    const lang = LangStore.getLang();
    const knob = this.querySelector('.lang-switch__knob');
    const track = this.querySelector('.lang-switch');
    const enLabel = this.querySelector('.lang-switch__label--en');
    const esLabel = this.querySelector('.lang-switch__label--es');

    if (!knob) {
      // Fallback: full re-render (first load)
      this.render();
      return;
    }

    if (lang === 'es') {
      knob.style.transform = 'translateX(28px)';
      track.setAttribute('data-lang', 'es');
      enLabel.style.opacity = '0.45';
      esLabel.style.opacity = '1';
    } else {
      knob.style.transform = 'translateX(0px)';
      track.setAttribute('data-lang', 'en');
      enLabel.style.opacity = '1';
      esLabel.style.opacity = '0.45';
    }

    // Also update nav link texts
    const menu = LangStore.getTexts('menu');
    const links = this.querySelectorAll('.nav-link');
    const keys = ['home', 'projects', 'about', 'contact'];
    links.forEach((a, i) => { a.textContent = menu[keys[i]]; });
  }

  render() {
    const menu = LangStore.getTexts('menu');
    const lang = LangStore.getLang();
    const isEs = lang === 'es';

    this.innerHTML = /* html */ `
      <nav class="navigation-bar">
        <h4 class="nav-logo">RICARDO <span>MICALE</span></h4>

        <ul class="nav-links">
          <li><a href="#home"   class="nav-link">${menu.home}</a></li>
          <li><a href="#projects" class="nav-link">${menu.projects}</a></li>
          <li><a href="#about"  class="nav-link">${menu.about}</a></li>
          <li><a href="#contact" class="nav-link">${menu.contact}</a></li>
        </ul>

        <!-- EN / ES Toggle Switch -->
        <div
          class="lang-switch"
          id="lang-switch"
          role="switch"
          aria-checked="${isEs}"
          aria-label="Toggle language between English and Spanish"
          data-lang="${lang}"
          tabindex="0"
        >
          <span class="lang-switch__label lang-switch__label--en" style="opacity:${isEs ? '0.45' : '1'}">EN</span>
          <div class="lang-switch__track">
            <div
              class="lang-switch__knob"
              style="transform: translateX(${isEs ? '28px' : '0px'})"
            ></div>
          </div>
          <span class="lang-switch__label lang-switch__label--es" style="opacity:${isEs ? '1' : '0.45'}">ES</span>
        </div>
      </nav>
    `;

    const switchEl = this.querySelector('#lang-switch');
    const toggle = () => LangStore.toggle();
    switchEl.addEventListener('click', toggle);
    switchEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });
  }
}

customElements.define('navigation-bar', NavigationBar);
