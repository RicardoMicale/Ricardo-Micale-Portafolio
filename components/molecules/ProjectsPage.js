// @ts-nocheck
import LangStore from '../../langStore.js';
import { initScrollReveal } from '../../scrollReveal.js';

class ProjectsPage extends HTMLElement {
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
    const t = LangStore.getTexts('projects');

    this.innerHTML = /* html */ `
      <div class="projects-page">
        <div class="section-header" data-reveal>
          <h2 class="title">${t.title}</h2>
          <div class="section-divider"></div>
        </div>
        <div class="projects-page__grid">
          ${t.list.map(project => /* html */ `
            <project-card data-reveal
              title="${project.title}"
              description="${project.description}"
              technologies='${JSON.stringify(project.technologies)}'
              github-link="${project.githubLink}"
              project-link="${project.projectLink}"
            ></project-card>
          `).join('')}
        </div>
      </div>
    `;
    initScrollReveal();
  }
}

customElements.define('projects-page', ProjectsPage);
