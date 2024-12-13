import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enTranslation from "./en.json";
import idTranslation from "./id.json";

export enum Locales {
  ID = "id",
  EN = "en",
}

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslation,
    },
    id: {
      translation: idTranslation,
    },
  },
  lng: Locales.EN, // Default language.
  fallbackLng: Locales.EN,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
