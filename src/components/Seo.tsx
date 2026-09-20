import { useEffect } from 'react'

type SeoProps = {
  title: string
  description: string
  path?: string
  noIndex?: boolean
  jsonLd?: Record<string, unknown>
}

export function Seo({ title, description, path = '/', noIndex = false, jsonLd }: SeoProps) {
  useEffect(() => {
    const absoluteUrl = new URL(path, window.location.origin).toString()
    document.title = title

    const setMeta = (selector: string, attribute: 'name' | 'property', content: string) => {
      let element = document.head.querySelector<HTMLMetaElement>(selector)
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attribute, selector.includes('og:') ? selector.slice(1, -1).split('="')[1] : selector.slice(7, -2))
        document.head.appendChild(element)
      }
      element.content = content
    }

    setMeta('meta[name="description"]', 'name', description)
    setMeta('meta[name="robots"]', 'name', noIndex ? 'noindex, follow' : 'index, follow')
    setMeta('meta[property="og:title"]', 'property', title)
    setMeta('meta[property="og:description"]', 'property', description)

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = absoluteUrl

    const schemaId = 'quizspace-structured-data'
    let schema = document.getElementById(schemaId)
    if (jsonLd) {
      if (!schema) {
        schema = document.createElement('script')
        schema.id = schemaId
        schema.setAttribute('type', 'application/ld+json')
        document.head.appendChild(schema)
      }
      schema.textContent = JSON.stringify(jsonLd)
    } else {
      schema?.remove()
    }
  }, [description, jsonLd, noIndex, path, title])

  return null
}