import { ArrowUpRight } from 'lucide-react'
import Button from '../ui/Button'
import { openExternal } from '../../utils/hackathon'
import { hackathon2026 } from '../../config/hackathon2026'

/**
 * The single "Apply Now" call-to-action used across the platform.
 *
 * Registration for Hackathon November 2026 is handled entirely by the organizer's
 * Google Form, so this always opens that URL in a new browser tab rather than
 * routing to an internal form.
 */
export default function ApplyNowButton({
  url = hackathon2026.registrationUrl,
  label = 'Apply Now',
  variant = 'primary',
  size = 'lg',
  icon = ArrowUpRight,
  className,
  onBeforeOpen,
  ...rest
}) {
  const handleApply = () => {
    if (onBeforeOpen) onBeforeOpen()
    openExternal(url)
  }

  return (
    <Button
      variant={variant}
      size={size}
      iconRight={icon}
      onClick={handleApply}
      className={className}
      {...rest}
    >
      {label}
    </Button>
  )
}
