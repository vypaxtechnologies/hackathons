import nodemailer from 'nodemailer'

/**
 * Transactional email via Nodemailer, delivered through Resend's SMTP service.
 *
 * Resend's SMTP endpoint authenticates with the same API key used for the REST
 * API, so RESEND_API_KEY is the only credential required.
 *
 * Every sender is designed to fail soft: a misconfigured key, an unverified
 * domain or a provider outage must never make a user-facing form submission
 * fail. Messages are logged and swallowed so the request still succeeds and
 * the data is still persisted — losing a form submission because of an email
 * failure would be strictly worse than losing the notification.
 *
 * The HTML is deliberately plain: no external CSS, no fonts, no dark theme, no
 * decorative chrome. Mail clients rewrite aggressively, and the markup below
 * sticks to inline styles and table layout that Gmail, Outlook and Apple Mail all
 * render predictably. In particular the message body uses explicit <br> tags
 * rather than `white-space: pre-wrap`, which Gmail largely ignores and which
 * would otherwise run every line of a long message together.
 */

const FROM_ADDRESS = process.env.EMAIL_FROM || 'Vypax EdTech & Hackathons <onboarding@resend.dev>'
const TO_ADDRESS = process.env.EMAIL_TO || process.env.VITE_CONTACT_EMAIL || 'vypaxtechnologiesindia@gmail.com'

const SMTP_PORT = Number(process.env.SMTP_PORT) || 465

let transporter = null

function getTransporter() {
  if (!process.env.RESEND_API_KEY) return null
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.resend.com',
      port: SMTP_PORT,
      // 465 is implicit TLS; 587 and friends negotiate TLS via STARTTLS.
      secure: SMTP_PORT === 465,
      auth: {
        user: process.env.SMTP_USER || 'resend',
        pass: process.env.RESEND_API_KEY
      }
    })
  }
  return transporter
}

export function isEmailConfigured() {
  return Boolean(process.env.RESEND_API_KEY)
}

/**
 * Escape untrusted text before interpolating it into an HTML email body.
 * Without this, a contact message containing markup would be injected into
 * the email itself.
 */
function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/**
 * Render user text as HTML with its line breaks preserved as real <br> tags.
 * Blank lines are left as-is; consecutive breaks still produce a visible gap.
 */
function textToHtml(value) {
  return escapeHtml(value ?? '')
    .split(/\r\n|\r|\n/)
    .join('<br>')
}

/**
 * Render a label/value row, skipping any row with no value.
 *
 * `preserveLines` converts newlines to <br> tags for free-form text such as a
 * submitted message. Gmail largely ignores `white-space: pre-wrap`, so real
 * <br> tags are the only reliable way to keep the author's line breaks.
 */
function row(label, value, { preserveLines = false } = {}) {
  if (value === undefined || value === null || value === '') return ''
  const rendered = preserveLines ? textToHtml(value) : escapeHtml(value)

  return `
    <tr>
      <td align="left" valign="top" style="padding:3px 12px 3px 0;color:#6b7280;font-size:14px;font-family:Arial,Helvetica,sans-serif;white-space:nowrap;">${escapeHtml(label)}</td>
      <td align="left" valign="top" style="padding:3px 0;color:#111827;font-size:14px;line-height:1.6;font-family:Arial,Helvetica,sans-serif;word-break:break-word;">${rendered}</td>
    </tr>`
}

/**
 * Minimal email shell: one centred column of plain text on a white background.
 *
 * Deliberately stripped down — no dark header bar, no dividers, no boxed panels,
 * no footer. The inbox already frames the message; anything beyond the submitted
 * data is decoration that only gets in the way when skimming an enquiry.
 */
function layout(title, bodyHtml) {
  return `<!DOCTYPE html>
<html>
  <body style="margin:0;padding:0;background:#ffffff;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;">
      <tr>
        <td align="center" style="padding:24px 12px;">
          <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="width:100%;max-width:560px;font-family:Arial,Helvetica,sans-serif;">
            <tr>
              <td align="left" style="padding:0 0 16px 0;color:#111827;font-size:18px;font-weight:bold;">
                ${escapeHtml(title)}
              </td>
            </tr>
            <tr>
              <td align="left" style="padding:0;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                  ${bodyHtml}
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`
}

/**
 * Low-level send. Returns `{ sent, error }` and never throws.
 */
async function send({ to = TO_ADDRESS, subject, html, text }) {
  const mailer = getTransporter()

  if (!mailer) {
    // Loud, not a warning. A silently dropped notification looks identical to a
    // successful one from the outside: the form still returns 201 and nothing
    // ever arrives, which is far harder to diagnose than a failed request.
    console.error(
      `[email] NOT SENT — "${subject}" to ${to}. RESEND_API_KEY is not set in the loaded environment. ` +
      'Check that the server was started with server/.env available.'
    )
    return { sent: false, error: 'RESEND_API_KEY is not configured' }
  }

  try {
    const info = await mailer.sendMail({
      from: FROM_ADDRESS,
      to,
      subject,
      html,
      text
    })

    return { sent: true, id: info.messageId }
  } catch (error) {
    console.error('[email] Failed to send:', error.message)
    return { sent: false, error }
  }
}

/**
 * Build the contact email. Exported so the rendered output can be inspected
 * without sending a real message.
 */
export function buildContactEmail({ name, email, phone, subject, message, createdAt }) {
  const resolvedSubject = subject || 'General enquiry'
  const received = createdAt || new Date().toISOString()

  return {
    subject: `[Contact] ${resolvedSubject} — ${name}`,
    text: [
      'NEW CONTACT MESSAGE',
      '',
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || 'Not provided'}`,
      `Subject: ${resolvedSubject}`,
      `Received: ${received}`,
      '',
      'MESSAGE',
      '-------',
      message
    ].join('\n'),
    html: layout(
      'New contact message',
      `
        ${row('Name', name)}
        ${row('Email', email)}
        ${row('Phone', phone || 'Not provided')}
        ${row('Subject', resolvedSubject)}
        ${row('Received', new Date(received).toUTCString())}
        ${row('Message', message, { preserveLines: true })}`
    )
  }
}

/** Build the registration email. Exported for inspection without sending. */
export function buildRegistrationEmail({ name, email, phone, role }) {
  return {
    subject: `[Registration] New ${role} account — ${name}`,
    text: [
      'NEW ACCOUNT REGISTRATION',
      '',
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || 'Not provided'}`,
      `Role: ${role}`,
      '',
      `Registered: ${new Date().toISOString()}`
    ].join('\n'),
    html: layout(
      'New account registration',
      `
        ${row('Name', name)}
        ${row('Email', email)}
        ${row('Phone', phone || 'Not provided')}
        ${row('Role', role)}
        ${row('Registered', new Date().toUTCString())}`
    )
  }
}

/** Notify the team about a new contact form submission. */
export async function sendContactNotification(payload) {
  return send(buildContactEmail(payload))
}

/** Notify the team about a new account registration. */
export async function sendRegistrationNotification(payload) {
  return send(buildRegistrationEmail(payload))
}
