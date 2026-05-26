import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// In-memory rate limit store. Resets on server restart (acceptable for single-instance).
// For multi-instance deployments (Vercel serverless), replace with Upstash Redis.
const rateLimitMap = new Map<string, number>();
const RATE_LIMIT_MS = 60_000; // one submission per IP per minute

function getClientIP(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'
  );
}

function validateString(value: unknown, field: string, max: number): string {
  if (typeof value !== 'string' || !value.trim()) {
    throw new Error(`${field} is required`);
  }
  if (value.length > max) {
    throw new Error(`${field} must be under ${max} characters`);
  }
  return value.trim();
}

function validateEmail(value: unknown): string {
  const email = validateString(value, 'Email', 254);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error('Please enter a valid email address');
  }
  return email;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function POST(req: NextRequest) {
  const ip = getClientIP(req);
  const now = Date.now();

  // Rate limit check
  const lastSubmit = rateLimitMap.get(ip);
  if (lastSubmit && now - lastSubmit < RATE_LIMIT_MS) {
    const retryAfter = Math.ceil((RATE_LIMIT_MS - (now - lastSubmit)) / 1000);
    return NextResponse.json(
      { error: 'Please wait a moment before sending another message.' },
      { status: 429, headers: { 'Retry-After': String(retryAfter) } }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  // Honeypot — bots fill this hidden field, humans don't
  if (body.website) {
    return NextResponse.json({ success: true }); // silently discard
  }

  let name: string, trade: string, email: string, message: string;
  try {
    name = validateString(body.name, 'Name', 100);
    trade = validateString(body.trade, 'Trade', 100);
    email = validateEmail(body.email);
    message = validateString(body.message, 'Message', 2000);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Invalid input.' },
      { status: 400 }
    );
  }

  // Record submission after successful validation
  rateLimitMap.set(ip, now);

  const resend = new Resend(process.env.RESEND_API_KEY);

  const timestamp = new Date().toLocaleString('en-GB', {
    timeZone: 'Europe/London',
    dateStyle: 'full',
    timeStyle: 'short',
  });

  try {
    await resend.emails.send({
      from: 'GrowTrades Website <noreply@growtrades.org>',
      to: ['sales@growtrades.org'],
      replyTo: email,
      subject: `New enquiry — ${name} (${trade})`,
      html: `
        <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px;margin:0 auto;padding:32px 24px;background:#ffffff;">
          <div style="border-bottom:2px solid #1D4ED8;padding-bottom:16px;margin-bottom:24px;">
            <h1 style="margin:0;font-size:18px;font-weight:700;color:#111111;">New Enquiry — GrowTrades</h1>
            <p style="margin:4px 0 0;font-size:12px;color:#999999;">${timestamp}</p>
          </div>

          <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:12px;color:#999;width:110px;vertical-align:top;">Name</td>
              <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:14px;color:#111;font-weight:600;">${escapeHtml(name)}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:12px;color:#999;vertical-align:top;">Trade</td>
              <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:14px;color:#111;">${escapeHtml(trade)}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:12px;color:#999;vertical-align:top;">Email</td>
              <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:14px;">
                <a href="mailto:${escapeHtml(email)}" style="color:#1D4ED8;text-decoration:none;">${escapeHtml(email)}</a>
              </td>
            </tr>
          </table>

          <div style="background:#F7F6F4;border-radius:8px;padding:16px 18px;margin-bottom:24px;">
            <p style="margin:0 0 8px;font-size:11px;font-weight:600;color:#aaa;text-transform:uppercase;letter-spacing:0.1em;">Message</p>
            <p style="margin:0;font-size:14px;color:#333;line-height:1.65;white-space:pre-wrap;">${escapeHtml(message)}</p>
          </div>

          <p style="margin:0;font-size:11px;color:#cccccc;">Sent via growtrades.org · Reply directly to this email to respond</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Failed to send. Please try emailing us directly.' },
      { status: 500 }
    );
  }
}
