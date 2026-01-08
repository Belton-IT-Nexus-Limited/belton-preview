import 'react-i18next'
import enNZCommon from '../i18n/locales/en-NZ/common.json'
import enNZNavigation from '../i18n/locales/en-NZ/navigation.json'
import enNZHome from '../i18n/locales/en-NZ/pages/home.json'

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common'
    resources: {
      common: typeof enNZCommon
      navigation: typeof enNZNavigation
      'pages/home': typeof enNZHome
    }
  }
}
