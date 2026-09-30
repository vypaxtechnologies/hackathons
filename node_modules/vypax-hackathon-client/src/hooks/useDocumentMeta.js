import { useEffect } from 'react'
import { SITE } from '../config/site'

/**
 * Declarative per-page SEO. Sets the document title plus description,
 * Open Graph, Twitter and canonical tags for the active route.
 *
 * `image` is optional and defaults to none. There is deliberately no bundled
 * fallback: a default that points at a file which may not exist produces a 404
 * in the console on every page load, and a 404 in the crawler's log for a
 * social preview image that renders as a broken card. Pass a real absolute
 * path per page when one is available, or omit it and no image tag is emitted.
 *
 * Usage: useDocumentMeta({ title, description, path, image, type })
 */
export default function useDocumentMeta({
  title,
  description = SITE.description,
  path = '',
  image,
  type = 'website',
  noIndex = false
} = {}) {
  useEffect(() => {
    const fullTitle = title ? `${title} | Vypax EdTech & Hackathons` : SITE.productName
    const canonicalUrl = `${SITE.url.replace(/\/$/, '')}${path}`
    const siteRoot = SITE.url.replace(/\/$/, '')
    const absoluteImage = image ? (image.startsWith('http') ? image : `${siteRoot}${image}`) : ''

    document.title = fullTitle

    setMeta('name', 'description', description)
    setMeta('name', 'robots', noIndex ? 'noindex, nofollow' : 'index, follow')

    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:type', type)
    setMeta('property', 'og:url', canonicalUrl)
    setMeta('property', 'og:site_name', SITE.productName)
    // Image tags are skipped entirely when no image is supplied, rather than
    // being written with an empty content value that crawlers would fetch.
    if (absoluteImage) setMeta('property', 'og:image', absoluteImage)

    setMeta('name', 'twitter:title', fullTitle)
    setMeta('name', 'twitter:description', description)
    if (absoluteImage) {
      setMeta('name', 'twitter:card', 'summary_large_image')
      setMeta('name', 'twitter:image', absoluteImage)
    }

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
