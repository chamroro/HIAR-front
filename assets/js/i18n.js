(() => {
  const storageKey = "hiar-lang";
  const supported = ["ko", "en"];
  const defaultLang = "ko";
  const cache = {};

  const normalizeLang = (lang) =>
    supported.includes(lang) ? lang : defaultLang;

  const getStoredLang = () =>
    normalizeLang(localStorage.getItem(storageKey) || defaultLang);

  const setStoredLang = (lang) =>
    localStorage.setItem(storageKey, normalizeLang(lang));

  const getValue = (obj, keyPath) =>
    keyPath.split(".").reduce((acc, key) => {
      if (acc && Object.prototype.hasOwnProperty.call(acc, key)) {
        return acc[key];
      }
      return undefined;
    }, obj);

  const applyAttributes = (el, attrSpec, data) => {
    const pairs = attrSpec.split(",").map((pair) => pair.trim());
    pairs.forEach((pair) => {
      if (!pair) return;
      const [attr, keyPath] = pair.split(":").map((part) => part.trim());
      if (!attr || !keyPath) return;
      const value = getValue(data, keyPath);
      if (value !== undefined) {
        el.setAttribute(attr, value);
      }
    });
  };

  const applyToDom = (data) => {
    document.documentElement.lang = normalizeLang(window.HIAR_LANG);

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const keyPath = el.getAttribute("data-i18n");
      const value = getValue(data, keyPath);
      if (value !== undefined) {
        el.textContent = value;
      }
    });

    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const keyPath = el.getAttribute("data-i18n-html");
      const value = getValue(data, keyPath);
      if (value !== undefined) {
        el.innerHTML = value;
      }
    });

    document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
      applyAttributes(el, el.getAttribute("data-i18n-attr"), data);
    });
  };

  const loadData = async (lang) => {
    const normalized = normalizeLang(lang);
    if (cache[normalized]) return cache[normalized];

    const response = await fetch(`../i18n/${normalized}.json`, {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error(`Failed to load i18n data for ${normalized}`);
    }
    const data = await response.json();
    cache[normalized] = data;
    return data;
  };

  const setLanguage = async (lang) => {
    const normalized = normalizeLang(lang);
    setStoredLang(normalized);
    const data = await loadData(normalized);
    window.HIAR_LANG = normalized;
    window.HIAR_I18N = data;
    applyToDom(data);
  };

  const init = async () => {
    const lang = getStoredLang();
    await setLanguage(lang);
  };

  window.getI18nValue = (keyPath) => {
    if (!window.HIAR_I18N) return "";
    const value = getValue(window.HIAR_I18N, keyPath);
    return value === undefined ? "" : value;
  };

  window.refreshI18n = () => {
    if (window.HIAR_I18N) {
      applyToDom(window.HIAR_I18N);
    }
  };

  window.HIAR_I18N_READY = init();

  document.addEventListener("click", (event) => {
    const target = event.target.closest("[data-lang-toggle]");
    if (!target) return;
    event.preventDefault();
    const nextLang = window.HIAR_LANG === "en" ? "ko" : "en";
    setStoredLang(nextLang);
    window.location.reload();
  });
})();
