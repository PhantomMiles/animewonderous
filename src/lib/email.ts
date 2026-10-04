import { Resend } from 'resend';
import QRCode from 'qrcode';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function generateTicketQR(ticketCode: string): Promise<string> {
  try {
    return await QRCode.toDataURL(ticketCode, {
      color: {
        dark: '#000000',
        light: '#ffffff',
      },
      margin: 2,
    });
  } catch (err) {
    console.error('Failed to generate QR code', err);
    return '';
  }
}

export async function sendTicketEmail({
  to,
  tickets,
  eventName,
}: {
  to: string;
  tickets: Array<{ code: string; name: string }>;
  eventName: string;
}) {
  const qrAttachments = await Promise.all(
    tickets.map(async (t) => {
      const qrDataUrl = await generateTicketQR(t.code);
      // Remove data:image/png;base64, to get raw base64
      const base64Data = qrDataUrl.replace(/^data:image\/\w+;base64,/, '');
      return {
        filename: `ticket-${t.code}.png`,
        content: base64Data,
        content_id: `qr-${t.code}`,
      };
    })
  );

  const html = `
    <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto;">
      <h1 style="color: #6d28d9;">Your Tickets for ${eventName}</h1>
      <p>Thank you for your purchase! Attached to this email are your tickets.</p>
      
      <div style="margin-top: 30px;">
        ${tickets.map(t => `
          <div style="margin-bottom: 20px; padding: 15px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <h3 style="margin-top: 0;">${t.name}</h3>
            <p><strong>Code:</strong> ${t.code}</p>
            <p>Please present the attached QR code at the venue.</p>
            <!-- Note: cid: reference works in many clients for inline display -->
            <img src="cid:qr-${t.code}" alt="QR Code for ${t.code}" style="width: 200px; height: 200px; border: 1px solid #ccc; border-radius: 8px;"/>
          </div>
        `).join('')}
      </div>
      
      <p style="color: #6b7280; font-size: 12px; margin-top: 40px;">
        Animewonderous Team<br>
        If you have any questions, reply to this email.
      </p>
    </div>
  `;

  if (!resend) {
    console.log('----------------------------------------------------');
    console.log(`[MOCK EMAIL] To: ${to}`);
    console.log(`Subject: Your Tickets for ${eventName}`);
    console.log(`Generated ${tickets.length} tickets and QR codes.`);
    console.log('----------------------------------------------------');
    return { success: true, mocked: true };
  }

  try {
    const data = await resend.emails.send({
      from: 'tickets@animewonderous.com', // Must be verified domain in Resend
      to,
      subject: `Your Tickets for ${eventName}`,
      html,
      attachments: qrAttachments.map(a => ({
        filename: a.filename,
        content: a.content,
      })),
    });
    return { success: true, data };
  } catch (error) {
    console.error('Error sending ticket email:', error);
    return { success: false, error };
  }
}
