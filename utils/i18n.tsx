import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import { EN_TRANSLATIONS } from "./translations/en/translations"


i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: EN_TRANSLATIONS,
    }
  },
  lng: "en",
})

export default i18n;
