interface EnvConfig {
  appEnv: 'development' | 'staging' | 'production'
  gaMeasurementId: string
  web3formsAccessKey: string
  web3formsApiUrl: string
  siteUrlNz: string
  siteUrlAu: string
}

function getEnvVar(key: string, defaultValue?: string): string {
  const env = import.meta.env as Record<string, string | undefined>
  const value = env[key]
  if (value) {
    return value
  }
  if (defaultValue) {
    return defaultValue
  }
  throw new Error(`Missing required environment variable: ${key}`)
}

export const env: EnvConfig = {
  appEnv: (getEnvVar('VITE_APP_ENV', 'development') as 'development' | 'staging' | 'production'),
  gaMeasurementId: getEnvVar('VITE_GA_MEASUREMENT_ID', 'G-WLYH298P2J'),
  web3formsAccessKey: getEnvVar('VITE_WEB3FORMS_ACCESS_KEY', '64c15151-8b61-4a9e-b92d-8ad9cb574933'),
  web3formsApiUrl: getEnvVar('VITE_WEB3FORMS_API_URL', 'https://api.web3forms.com/submit'),
  siteUrlNz: getEnvVar('VITE_SITE_URL_NZ', 'https://www.belton.co.nz'),
  siteUrlAu: getEnvVar('VITE_SITE_URL_AU', 'https://belton.com.au')
}

export const isDevelopment = env.appEnv === 'development'
export const isProduction = env.appEnv === 'production'
export const isStaging = env.appEnv === 'staging'
