import { describe, it, expect, vi } from 'vitest';
import { generateTicketQR, sendTicketEmail } from './email';

// Mock QRCode
vi.mock('qrcode', () => ({
  default: {
    toDataURL: vi.fn().mockResolvedValue('data:image/png;base64,mockbase64data')
  }
}));

describe('Email Delivery System', () => {
  it('generates a valid data URL for a ticket code', async () => {
    const dataUrl = await generateTicketQR('TKT-12345');
    expect(dataUrl).toBe('data:image/png;base64,mockbase64data');
  });

  it('mocks email sending when RESEND_API_KEY is absent', async () => {
    const result = await sendTicketEmail({
      to: 'test@example.com',
      tickets: [{ code: 'TKT-123', name: 'VIP Ticket' }],
      eventName: 'Test Event'
    });
    
    expect(result.success).toBe(true);
    expect(result.mocked).toBe(true);
  });
});
