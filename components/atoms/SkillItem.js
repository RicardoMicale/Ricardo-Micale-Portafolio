class SkillItem extends HTMLElement {
  static get observedAttributes() {
    return ['name', 'icon'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const name = this.getAttribute('name') || '';
    const icon = this.getAttribute('icon') || '';

    this.innerHTML = /* html */ `
      <span class="skill-item">
        <span class="skill-item__icon">${icon}</span>
        <span class="skill-item__name">${name}</span>
      </span>
    `;
  }
}

customElements.define('skill-item', SkillItem);
