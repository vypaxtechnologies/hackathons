import { useEffect } from 'react'
import { SITE } from '../config/site'

/**
 * Declarative per-page SEO. Sets the document title plus description,
 * Open Graph, Twitter and canonical tags for the active route.
 *
 * Usage: useDocumentMeta({ title, description, path, image, type })
 */
export default function useDocumentMeta({
  title,
  description = SITE.description,
  path = '',
  image = '/og-cover.jpg',
  type = 'website',
  noIndex = false
} = {}) {
  useEffect(() => {
    const fullTitle = title ? `${title} | Vypax EdTech & Hackathons` : SITE.productName
    const canonicalUrl = `${SITE.url.replace(/\/$/, '')}${path}`
    const absoluteImage = image.startsWith('http') ? image : `${SITE.url.replace(/\/$/, '')}${image}`

    document.title = fullTitle

    setMeta('name', 'description', description)
    setMeta('name', 'robots', noIndex ? 'noindex, nofollow' : 'index, follow')

    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:type', type)
    setMeta('property', 'og:url', canonicalUrl)
    setMeta('property', 'og:image', absoluteImage)
    setMeta('property', 'og:site_name', SITE.productName)

    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', fullTitle)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', absoluteImage)

    setLink('canonical', canonicalUrl)
  }, [title, description, path, image, type, noIndex])
}

function setMeta(attribute, key, content) {
  if (!content) return

  let element = document.head.querySelector(`meta[${attribute}="${key}"]`)

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }

  element.setAttribute('content', content)
}

function setLink(rel, href) {
  if (!href) return

  let element = document.head.querySelector(`link[rel="${rel}"]`)

  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', rel)
    document.head.appendChild(element)
  }

  element.setAttribute('href', href)
}

/** JSON-LD structured data for the event, injected once per page. */
export function useEventStructuredData(data, id = 'vypax-event-schema') {
  useEffect(() => {
    if (!data) return undefined

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = id
    script.text = JSON.stringify(data)
    document.head.appendChild(script)

    return () => {
      const existing = document.getElementById(id)
      if (existing) existing.remove()
    }
  }, [data, id])
}
