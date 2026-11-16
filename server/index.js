/**
 * OPTIONAL CONTACT API
 * ------------------------------------------------------------------
 * A tiny Express server that receives the portfolio's contact form.
 * The website itself is static and does NOT need this to run.
 *
 *   POST /api/contact   { name, email, service?, message, language? }
 *   GET  /api/health
 *
 * Delivery is intentionally left as one clearly marked function,
 * `deliver()`. Until you connect a real email service there, the API
 * answers 503 "not configured" — so the form will never tell a visitor
 * their message was sent when it wasn't.
 *
 * Environment variables (see .env.example):
 *   PORT              default 8787
 *   ALLOWED_ORIGINS   comma-separated list of sites allowed to call the API
 */
import express from 'express';

const app = express();
const PORT = Number(process.env.PORT) || 8787;
const ALLOWED = (process.env.ALLOWED_ORIGINS || 'http://localhost:5173,http://localhost:4173')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

app.disable('x-powered-by');
app.use(express.json({ limit: '20kb' }));

// Minimal CORS (no extra dependency).
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && ALLOWED.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
  }
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  return next();
});

// Very small in-memory rate limit: 5 messages / 10 minutes / IP.
const hits = new Map();
function rateLimited(ip) {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000;
  const list = (hits.get(ip) || []).filter((t) => now - t < windowMs);
  list.push(now);
  hits.set(ip, list);
  return list.length > 5;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const clean = (v, max) => String(v ?? '').trim().slice(0, max);

function validate(body) {
  const data = {
    name: clean(body.name, 120),
    email: clean(body.email, 200),
    service: clean(body.service, 160),
    message: clean(body.message, 5000),
    language: body.language === 'ar' ? 'ar' : 'en',
  };
  const errors = [];
  if (data.name.length < 2) errors.push('name');
  if (!EMAIL_RE.test(data.email)) errors.push('email');
  if (data.message.length < 10) errors.push('message');
  return { data, errors };
}

/**
 * ▼▼▼ CONNECT YOUR EMAIL SERVICE HERE ▼▼▼
 * Replace the body with a call to your provider (Resend, Postmark,
 * SendGrid, Nodemailer + SMTP, …), reading credentials from environment
 * variables — never hard-code secrets. Return normally on success,
 * throw on failure.
 */
async function deliver(message) {
  void message;
  const err = new Error('Email delivery is not configured on the server.');
  err.code = 'NOT_CONFIGURED';
  throw err;
}

app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.post('/api/contact', async (req, res) => {
  if (rateLimited(req.ip)) return res.status(429).json({ error: 'Too many messages. Please try again later.' });
  if (req.body?.website) return res.status(200).json({ ok: true }); // honeypot

  const { data, errors } = validate(req.body || {});
  if (errors.length) return res.status(422).json({ error: 'Invalid fields', fields: errors });

  try {
    await deliver(data);
    return res.status(200).json({ ok: true });
  } catch (err) {
    if (err.code === 'NOT_CONFIGURED') {
      return res.status(503).json({ error: 'Contact delivery is not configured yet.' });
    }
    console.error('[contact] delivery failed:', err.message);
    return res.status(502).json({ error: 'Message could not be delivered.' });
  }
});

app.use((_req, res) => res.status(404).json({ error: 'Not found' }));

app.listen(PORT, () => {
  console.log(`Contact API listening on http://localhost:${PORT}`);
});
