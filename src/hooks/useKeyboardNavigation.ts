import { useEffect } from 'react'

interface UseKeyboardNavigationOptions {
  onEscape?: () => void
  onEnter?: () => void
  isActive?: boolean
}

export function useKeyboardNavigation({
  onEscape,
  onEnter,
  isActive = true
}: UseKeyboardNavigationOptions): void {
  useEffect(() => {
    if (!isActive) {
      return
    }

    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape' && onEscape) {
        e.preventDefault()
        onEscape()
      }
      if (e.key === 'Enter' && onEnter && (e.target as HTMLElement).tagName === 'BUTTON') {
        onEnter()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onEscape, onEnter, isActive])
}
