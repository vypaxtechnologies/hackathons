/**
 * Presentation helpers for hackathon documents.
 *
 * The API is the long-term source of truth, but the public pages must never
 * render empty claims: `mergeWithStaticEdition` fills any missing field from
 * the canonical organizer-provided configuration.
 */

export const STATUS_META = {
  upcoming: { label: 'Upcoming', tone: 'neutral' },
  'registration-open': { label: 'Registration Started', tone: 'open' },
  'registration-closed': { label: 'Registration Closed', tone: 'closed' },
  ongoing: { label: 'In Progress', tone: 'live' },
  completed: { label: 'Completed', tone: 'done' }
}

const STATUS_FALLBACK = { label: 'To Be Announced', tone: 'neutral' }

export function getStatusMeta(status) {
  return STATUS_META[status] || STATUS_FALLBACK
}

/**
 * Merges an API hackathon document with its canonical static definition.
 * Arrays fall back only when the API returns nothing renderable.
 */
export function mergeWithStaticEdition(apiDoc, staticEdition) {
  if (!apiDoc) return staticEdition

  const pickArray = (fromApi, fallback) =>
    Array.isArray(fromApi) && fromApi.length > 0 ? fromApi : fallback

  return {
    ...staticEdition,
    ...apiDoc,
    title: apiDoc.title || staticEdition?.title,
    theme: apiDoc.theme || staticEdition?.theme,
    status: apiDoc.status || staticEdition?.status,
    registrationDeadline:
      apiDoc.registrationDeadline || staticEdition?.registrationDeadline || null,
    registrationUrl: apiDoc.registrationUrl || staticEdition?.registrationUrl || '',
    importantDates: pickArray(apiDoc.importantDates, staticEdition?.importantDates || []),
    prizes: pickArray(apiDoc.prizes, staticEdition?.prizes || []),
    recognition: pickArray(apiDoc.recognition, staticEdition?.recognition || []),
    rules: pickArray(apiDoc.rules, staticEdition?.rules || []),
    faqs: pickArray(apiDoc.faqs, staticEdition?.faqs || [])
  }
}

/**
 * Opens a registration destination in a new tab.
 * Used by every Apply Now call-to-action so behaviour stays identical.
 */
export function openExternal(url, features = 'noopener,noreferrer') {
  if (!url || typeof window === 'undefined') return null
  return window.open(url, '_blank', features)
}

/** Safe hostname for display, e.g. "forms.gle". */
export function getHostname(url) {
  try {
    return new URL(url).hostname
  } catch {
    return ''
  }
}
