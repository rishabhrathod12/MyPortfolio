import { useEffect } from 'react'

function descriptionTag(): HTMLMetaElement | null {
  return document.querySelector<HTMLMetaElement>('meta[name="description"]')
}

/** Sets the document title and meta description while the page is shown, and restores them after. */
export function usePageMeta(title: string, description: string): void {
  useEffect(() => {
    const previousTitle = document.title
    const tag = descriptionTag()
    const previousDescription = tag?.getAttribute('content') ?? null

    document.title = title
    tag?.setAttribute('content', description)

    return () => {
      document.title = previousTitle
      if (previousDescription !== null) tag?.setAttribute('content', previousDescription)
    }
  }, [title, description])
}
