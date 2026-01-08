import { useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { useRegion } from '@/hooks/useRegion'
import { trackFormSubmission } from '@/lib/analytics'
import { Input } from './Input'
import { Textarea } from './Textarea'
import { CheckboxGroup } from './CheckboxGroup'
import { Button } from '../ui/Button'
import { LiveRegion } from '../ui/LiveRegion'
import { cn } from '@/lib/utils'

const WEB3FORMS_ACCESS_KEY = '64c15151-8b61-4a9e-b92d-8ad9cb574933'
const WEB3FORMS_API_URL = 'https://api.web3forms.com/submit'

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  message: string
  topics: string[]
}

interface ContactFormProps {
  className?: string
}

export function ContactForm({ className }: ContactFormProps): JSX.Element {
  const { t } = useTranslation('pages/contact')
  const { t: tCommon } = useTranslation('common')
  const { isAU } = useRegion()

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    topics: []
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const topicOptions = [
    { value: 'new-client', label: t('form.topics.newClient') },
    { value: 'support', label: t('form.topics.support') },
    { value: 'quote', label: t('form.topics.quote') },
    { value: 'security', label: t('form.topics.security') },
    { value: 'microsoft365', label: t('form.topics.microsoft365') },
    { value: 'general', label: t('form.topics.general') }
  ]

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('access_key', WEB3FORMS_ACCESS_KEY)
      formDataToSend.append('subject', `New Contact Form Submission - ${isAU ? 'AU' : 'NZ'}`)
      formDataToSend.append('from_name', 'Belton Website')
      formDataToSend.append('first-name', formData.firstName)
      formDataToSend.append('last-name', formData.lastName)
      formDataToSend.append('email', formData.email)
      formDataToSend.append('phone', formData.phone)
      formDataToSend.append('company', formData.company)
      formDataToSend.append('message', formData.message)
      formData.topics.forEach((topic) => {
        formDataToSend.append('topic', topic)
      })

      const response = await fetch(WEB3FORMS_API_URL, {
        method: 'POST',
        body: formDataToSend
      })

      const result = await response.json()

      if (result.success) {
        trackFormSubmission('contact', true)
        setIsSuccess(true)
      } else {
        trackFormSubmission('contact', false)
        throw new Error(result.message || 'Failed to send message')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <>
        <LiveRegion level="assertive">
          {t('form.successMessage')}
        </LiveRegion>
        <div className={cn('bg-surface border border-border rounded-xl p-10 text-center', className)} role="alert">
        <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-6 h-6 text-accent"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold mb-2">{t('form.success.title')}</h3>
        <p className="text-text-secondary mb-4">{t('form.success.message')}</p>
        <p className="text-sm text-text-muted">
          {t('form.success.urgent')}{' '}
          <a href={`tel:${tCommon('phone')}`} className="text-accent hover:text-text">
            {tCommon('phone')}
          </a>
        </p>
      </div>
      </>
    )
  }

  return (
    <>
      {error && (
        <LiveRegion level="assertive">
          {error}
        </LiveRegion>
      )}
      <div className={cn('bg-surface border border-border rounded-xl p-10', className)}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
        <CheckboxGroup
          label={t('form.topics.label')}
          name="topics"
          options={topicOptions}
          values={formData.topics}
          onChange={(values) => setFormData({ ...formData, topics: values })}
        />

        <div className="grid grid-cols-2 gap-5 md:grid-cols-1">
          <Input
            label={t('form.firstName')}
            name="first-name"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            required
            placeholder={t('form.firstName')}
          />
          <Input
            label={t('form.lastName')}
            name="last-name"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            required
            placeholder={t('form.lastName')}
          />
        </div>

        <div className="grid grid-cols-2 gap-5 md:grid-cols-1">
          <Input
            type="email"
            label={t('form.email')}
            name="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            placeholder={isAU ? 'you@company.com.au' : 'you@company.co.nz'}
          />
          <Input
            type="tel"
            label={t('form.phone')}
            name="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder={isAU ? '0412 345 678' : '021 123 4567'}
          />
        </div>

        <Input
          label={t('form.company')}
          name="company"
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          placeholder={t('form.companyPlaceholder')}
        />

        <Textarea
          label={t('form.message')}
          name="message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          required
          placeholder={t('form.messagePlaceholder')}
        />

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-md text-sm text-red-500">
            {error}
          </div>
        )}

        <div className="mt-2">
          <Button type="submit" disabled={isSubmitting} className="w-full justify-center">
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                {t('form.sending')}
              </>
            ) : (
              <>
                {t('form.submit')}
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </>
            )}
          </Button>
        </div>
      </form>
      </div>
    </>
  )
}
