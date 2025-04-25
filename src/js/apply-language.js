import languagesMap from "./languagesMap.js";
import i18next from "i18next";

applyLanguage();

const PER_YEAR_PRICE = 39.99; //to use variables in translate. we need them in some fields. We can get it from api e.g.
const PER_WEEK_PRICE = 6.99; //to use variables in translate. we need them in some fields. We can get it from api e.g.

export default async function applyLanguage() {
  const DEFAULT_LANG = "en";
  const currentLang = detectLang();
  const langToTranslate = languagesMap[currentLang] ? currentLang : DEFAULT_LANG;
  console.log(langToTranslate, DEFAULT_LANG);

  const t = await import(`../lang/${langToTranslate}.json`);

  await i18next.init({
    lng: langToTranslate,
    resources: {
      [langToTranslate]: {
        translation: t.default,
      },
    },
  });

  if (langToTranslate === DEFAULT_LANG) {
    //the default page in english will be used
    await translateDynamicText("data-t-vars");
    return;
  }

  try {
    setLangHTMLAttribute(langToTranslate);

    await Promise.all([translateStaticText("data-t-static"), translateDynamicText("data-t-vars")]);
  } catch (error) {
    console.log(`Error by tranlating the page in ${langToTranslate} lang`);
    console.log(error);
  }
}

async function translateStaticText(attr) {
  const toTranslate = document.querySelectorAll(`[${attr}]`);

  toTranslate.forEach((el) => {
    const key = el.getAttribute(attr);
    el.innerHTML = i18next.t(key);
  });
}

async function translateDynamicText(attr) {
  const toTranslate = document.querySelectorAll(`[${attr}]`);

  toTranslate.forEach((el) => {
    const key = el.getAttribute(attr);

    switch (key) {
      case "Just {{price}} per year": {
        el.innerHTML = i18next.t(key, { price: PER_YEAR_PRICE }); //insert variables-value into translation
        break;
      }
      case "{{price}} <br>per week": {
        el.innerHTML = i18next.t(key, { price: PER_WEEK_PRICE }); //insert variables-value into translation
        break;
      }
      default: {
        el.innerHTML = i18next.t(key);
        break;
      }
    }
  });
}

function setLangHTMLAttribute(lang) {
  const htmlTag = document.querySelector("html");
  htmlTag.setAttribute("lang", lang);
}

function detectLang() {
  const queryParams = new URLSearchParams(window.location.search);
  const langFromQueryParams = queryParams.get("lang");

  return langFromQueryParams || navigator.language.split("-")[0]; //language can be en-US, because we need implement some transformation
}
