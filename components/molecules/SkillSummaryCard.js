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
      <div class="skill-summary-card">
        <h3 class="skill-summary-card__title">${title}</h3>
        <div class="skill-summary-card__list">
          ${skills.map(s => `<skill-item name="${s.name}" icon="${s.icon}"></skill-item>`).join('')}
        </div>
      </div>
    `;
  }
}

customElements.define('skill-summary-card', SkillSummaryCard);
