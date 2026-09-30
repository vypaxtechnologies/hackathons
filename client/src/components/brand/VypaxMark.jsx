/**
 * The Vypax EdTech & Hackathons brand mark.
 *
 * Uses the supplied `Vypaxfavicon.webp` from `public/`, so the browser tab,
 * the navbar lockup and every page header render the exact same artwork.
 */
export function VypaxMark({ className = 'h-9 w-9', title = 'Vypax EdTech & Hackathons' }) {
  return (
    <img
      src="/Vypaxfavicon.webp"
      alt={title}
      width="64"
      height="64"
      className={className}
      decoding="async"
    />
  )
}

export default VypaxMark
