import { useEffect, useRef } from 'react'

interface UseFocusTrapOptions {
  isActive: boolean
  initialFocus?: HTMLElement | null
}

export function useFocusTrap({ isActive, initialFocus }: UseFocusTrapOptions): React.RefObject<HTMLElement> {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!isActive || !containerRef.current) {
      return
    }

    const container = containerRef.current
    const focusableElements = container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )

    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    if (initialFocus) {
      initialFocus.focus()
    } else if (firstElement) {
      firstElement.focus()
    }

    const handleTabKey = (e: KeyboardEvent): void => {
      if (e.key !== 'Tab') {
        return
      }

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement?.focus()
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement?.focus()
        }
      }
    }

    container.addEventListener('keydown', handleTabKey)

    return () => {
      container.removeEventListener('keydown', handleTabKey)
    }
  }, [isActive, initialFocus])

  return containerRef
}
