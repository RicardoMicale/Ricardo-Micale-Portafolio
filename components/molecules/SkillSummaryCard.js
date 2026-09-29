// @ts-nocheck
class SkillSummaryCard extends HTMLElement {
  static get observedAttributes() {
    return ['title'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const title = this.getAttribute('title') || '';
    const skills = JSON.parse(this.getAttribute('skills') || '[]');

    this.innerHTML = /* html */ `
      <div class="skill-summary-card retro-window">
        <div class="window-bar">
          <h3 class="skill-summary-card__title window-bar__title">${title}</h3>
        </div>
        <div class="skill-summary-card__list window-body">
          ${skills.map(s => `<skill-item name="${s.name}" icon="${s.icon}"></skill-item>`).join('')}
        </div>
      </div>
    `;
  }
}

customElements.define('skill-summary-card', SkillSummaryCard);
