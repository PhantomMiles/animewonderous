import crypto from 'crypto';

const PAYSTACK_BASE_URL = 'https://api.paystack.co';

/** Server-only. Never import this file from a 'use client' component. */
function getSecretKey(): string {
  const key = process.env.PAYSTACK_SECRET_KEY;
  if (!key) {
    throw new Error('PAYSTACK_SECRET_KEY is not set');
  }
  return key;
}

async function paystackFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${PAYSTACK_BASE_URL}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${getSecretKey()}`,
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    cache: 'no-store',
  });

  const json = await res.json();
  if (!res.ok || json.status === false) {
    throw new Error(json.message || `Paystack request failed (${res.status})`);
  }
  return json as T;
}

export interface InitializeResponse {
  status: boolean;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

export interface VerifyResponse {
  status: boolean;
  message: string;
  data: {
    status: 'success' | 'failed' | 'abandoned' | 'pending' | string;
    reference: string;
    amount: number; // in kobo
    currency: string;
    paid_at: string | null;
    customer: { email: string };
    metadata?: Record<string, unknown> | null;
  };
}

export function initializeTransaction(payload: {
  email: string;
  amount: number; // in kobo
  reference: string;
  callback_url: string;
  metadata?: Record<string, unknown>;
}) {
  return paystackFetch<InitializeResponse>('/transaction/initialize', {
    method: 'POST',
    body: JSON.stringify({ currency: 'NGN', ...payload }),
  });
}

export function verifyTransaction(reference: string) {
  return paystackFetch<VerifyResponse>(
    `/transaction/verify/${encodeURIComponent(reference)}`
  );
}

/** Validates the x-paystack-signature header against the raw request body. */
export function isValidWebhookSignature(rawBody: string, signature: string | null): boolean {
  if (!signature) return false;
  const expected = crypto
    .createHmac('sha512', getSecretKey())
    .update(rawBody)
    .digest('hex');

  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
