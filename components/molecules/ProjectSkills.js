// @ts-nocheck
class ProjectSkills extends HTMLElement {
  static get observedAttributes() {
    return ['technologies'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const tech = JSON.parse(this.getAttribute('technologies') || '[]');

    this.innerHTML = /* html */ `
      <div class="project-skills">
        ${tech.map(t => `<span class="project-skills__tag">${t}</span>`).join('')}
      </div>
    `;
  }
}

customElements.define('project-skills', ProjectSkills);
