const FROM_ADDRESS =
  process.env.EMAIL_FROM ||
  'Vypax EdTech & Hackathons <onboarding@resend.dev>'

const TO_ADDRESS =
  process.env.EMAIL_TO ||
  process.env.VITE_CONTACT_EMAIL ||
  'vypaxtechnologiesindia@gmail.com'

export function isEmailConfigured() {
  return Boolean(process.env.RESEND_API_KEY)
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function textToHtml(value) {
  return escapeHtml(value ?? '')
    .split(/\r\n|\r|\n/)
    .join('<br>')
}

function row(label, value, { preserveLines = false } = {}) {
  if (value === undefined || value === null || value === '') return ''

  const rendered = preserveLines
    ? textToHtml(value)
    : escapeHtml(value)

  return `
    <tr>
      <td align="left" valign="top"
        style="padding:3px 12px 3px 0;color:#6b7280;font-size:14px;font-family:Arial,Helvetica,sans-serif;white-space:nowrap;">
        ${escapeHtml(label)}
      </td>
      <td align="left" valign="top"
        style="padding:3px 0;color:#111827;font-size:14px;line-height:1.6;font-family:Arial,Helvetica,sans-serif;word-break:break-word;">
        ${rendered}
      </td>
    </tr>`
}

function layout(title, bodyHtml) {
  return `<!DOCTYPE html>
<html>
  <body style="margin:0;padding:0;background:#ffffff;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
      style="background:#ffffff;">
      <tr>
        <td align="center" style="padding:24px 12px;">
          <table role="presentation" width="560" cellpadding="0" cellspacing="0"
            style="width:100%;max-width:560px;font-family:Arial,Helvetica,sans-serif;">
            <tr>
              <td align="left"
                style="padding:0 0 16px 0;color:#111827;font-size:18px;font-weight:bold;">
                ${escapeHtml(title)}
              </td>
            </tr>
            <tr>
              <td align="left" style="padding:0;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                  style="border-collapse:collapse;">
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
 * Send email using Resend REST API.
 * No SMTP connection is required.
 */
async function send({ to = TO_ADDRESS, subject, html, text }) {
  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    console.error(
      `[email] NOT SENT — "${subject}" to ${to}. RESEND_API_KEY is not configured.`
    )

    return {
      sent: false,
      error: 'RESEND_API_KEY is not configured'
    }
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: FROM_ADDRESS,
        to: [to],
        subject,
        html,
        text
      })
    })

    const data = await response.json().catch(() => ({}))

    if (!response.ok) {
      console.error(
        '[email] Resend API failed:',
        response.status,
        data
      )

      return {
        sent: false,
        error: data?.message || `Resend API returned ${response.status}`
      }
    }

    console.log(`[email] Sent successfully: ${data?.id || 'unknown-id'}`)

    return {
      sent: true,
      id: data?.id
    }
  } catch (error) {
    console.error('[email] Failed to send:', error.message)

    return {
      sent: false,
      error
    }
  }
}

export function buildContactEmail({
  name,
  email,
  phone,
  subject,
  message,
  createdAt
}) {
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
        ${row('Message', message, { preserveLines: true })}
      `
    )
  }
}

export function buildRegistrationEmail({
  name,
  email,
  phone,
  role
}) {
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
        ${row('Registered', new Date().toUTCString())}
      `
    )
  }
}

export async function sendContactNotification(payload) {
  return send(buildContactEmail(payload))
}

export async function sendRegistrationNotification(payload) {
  return send(buildRegistrationEmail(payload))
}