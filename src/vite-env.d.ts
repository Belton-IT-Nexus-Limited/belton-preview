/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_ENV: string
  readonly VITE_GA_MEASUREMENT_ID: string
  readonly VITE_WEB3FORMS_ACCESS_KEY: string
  readonly VITE_WEB3FORMS_API_URL: string
  readonly VITE_SITE_URL_NZ: string
  readonly VITE_SITE_URL_AU: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
