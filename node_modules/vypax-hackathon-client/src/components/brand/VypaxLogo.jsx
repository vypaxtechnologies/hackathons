import { Link } from 'react-router-dom'
import { VypaxMark } from './VypaxMark'

/**
 * Primary Vypax EdTech & Hackathons lockup: mark + wordmark.
 * Renders as a router link unless `asLink` is false.
 */
export function VypaxLogo({
  asLink = true,
  size = 'md',
  to = '/',
  showWordmark = true,
  className = ''
}) {
  const markSize = size === 'lg' ? 'h-11 w-11' : size === 'sm' ? 'h-8 w-8' : 'h-9 w-9'
  const textSize = size === 'lg' ? 'text-lg' : size === 'sm' ? 'text-sm' : 'text-base'

  const content = (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <VypaxMark className={`${markSize} shrink-0`} />
      {showWordmark && (
        <span className="flex flex-col leading-none">
          <span className={`font-display font-bold tracking-tight text-mist-100 ${textSize}`}>
            Vypax
          </span>
          <span className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-mist-400">
            EdTech &amp; Hackathons
          </span>
        </span>
      )}
    </span>
  )

  if (!asLink) return content

  return (
    <Link to={to} aria-label="Vypax EdTech & Hackathons — home" className="group transition-opacity hover:opacity-90">
      {content}
    </Link>
  )
}
