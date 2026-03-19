// @ts-nocheck
/**
 * Global language store using a simple pub/sub pattern.
 * Components subscribe to language changes and re-render.
 */

const LangStore = (() => {
  let _lang = localStorage.getItem('portfolio-lang') || 'en';
  let _texts = null;
  const _subscribers = new Set();

  async function init() {
    const response = await fetch('./texts.json');
    _texts = await response.json();
  }

  function getLang() {
    return _lang;
  }

  function getTexts(section) {
    if (!_texts) return null;
    return _texts[_lang][section];
  }

  function getAllTexts() {
    if (!_texts) return null;
    return _texts[_lang];
  }

  function setLang(lang) {
    _lang = lang;
    localStorage.setItem('portfolio-lang', lang);
    _subscribers.forEach((cb) => cb(lang));
  }

  function toggle() {
    setLang(_lang === 'en' ? 'es' : 'en');
  }

  function subscribe(callback) {
    _subscribers.add(callback);
    return () => _subscribers.delete(callback);
  }

  const _ready = init();

  return { getLang, getTexts, getAllTexts, setLang, toggle, subscribe, _ready };
})();

export default LangStore;
