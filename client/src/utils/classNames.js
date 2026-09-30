/**
 * Tiny conditional className joiner. Falsy values are skipped so callers can
 * write `cn('base', isActive && 'active')` without template-string noise.
 */
export default function cn(...values) {
  return values.filter(Boolean).join(' ')
}
