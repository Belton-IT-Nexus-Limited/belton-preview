declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
  }
}

export const GA_MEASUREMENT_ID = 'G-WLYH298P2J'

export interface GAEventParams {
  event_category?: string
  event_label?: string
  value?: number
  [key: string]: unknown
}

export function hasConsent(): boolean {
  if (typeof window === 'undefined') {
    return false
  }

  try {
    const stored = localStorage.getItem('belton-analytics-consent')
    if (!stored) {
      return false
    }

    const consent: { accepted: boolean; timestamp: number } = JSON.parse(stored)
    const now = Date.now()
    const expiry = consent.timestamp + 365 * 24 * 60 * 60 * 1000

    return consent.accepted && now < expiry
  } catch {
    return false
  }
}

export function initializeGA(): void {
  if (typeof window === 'undefined') {
    return
  }

  if (!hasConsent()) {
    return
  }

  if (typeof window.gtag === 'function') {
    return
  }

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag(...args: unknown[]): void {
    window.dataLayer.push(args)
  }

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  document.head.appendChild(script)

  window.gtag('js', new Date())
  window.gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: false
  })
}

export function trackPageView(path: string, title?: string): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return
  }

  try {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: path,
      page_title: title
    })
  } catch {
    // Silently fail if GA is not available
  }
}

export function trackEvent(
  eventName: string,
  params?: GAEventParams
): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return
  }

  try {
    window.gtag('event', eventName, params)
  } catch {
    // Silently fail if GA is not available
  }
}

export function trackFormSubmission(formName: string, success: boolean): void {
  trackEvent('form_submit', {
    form_name: formName,
    success: success ? 1 : 0,
    event_category: 'engagement',
    event_label: formName
  })
}

export function trackDownload(fileName: string, fileType: string): void {
  trackEvent('file_download', {
    file_name: fileName,
    file_type: fileType,
    event_category: 'engagement',
    event_label: fileName
  })
}

export function trackOutboundLink(url: string, linkText?: string): void {
  trackEvent('click', {
    outbound: true,
    url: url,
    link_text: linkText,
    event_category: 'outbound',
    event_label: url
  })
}
