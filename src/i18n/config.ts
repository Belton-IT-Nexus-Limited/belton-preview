import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import enNZCommon from './locales/en-NZ/common.json'
import enNZNavigation from './locales/en-NZ/navigation.json'
import enNZHome from './locales/en-NZ/pages/home.json'
import enNZServices from './locales/en-NZ/pages/services.json'
import enAUCommon from './locales/en-AU/common.json'
import enAUNavigation from './locales/en-AU/navigation.json'
import enAUHome from './locales/en-AU/pages/home.json'
import enAUServices from './locales/en-AU/pages/services.json'

const resources = {
  'en-NZ': {
    common: enNZCommon,
    navigation: enNZNavigation,
    'pages/home': enNZHome,
    'pages/services': enNZServices
  },
  'en-AU': {
    common: enAUCommon,
    navigation: enAUNavigation,
    'pages/home': enAUHome,
    'pages/services': enAUServices
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en-NZ',
    defaultNS: 'common',
          ns: ['common', 'navigation', 'pages/home', 'pages/services'],
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['path', 'localStorage', 'navigator'],
      lookupLocalStorage: 'belton-i18n-lng',
      caches: ['localStorage']
    }
  })

export default i18n
