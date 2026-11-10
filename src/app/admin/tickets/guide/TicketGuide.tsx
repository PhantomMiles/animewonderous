'use client';

import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import Link from 'next/link';
import Image from 'next/image';

export default function TicketGuide() {
  const [qr, setQr] = useState('');
  useEffect(() => {
    QRCode.toDataURL(`${window.location.origin}/admin/tickets/scan`, { width: 260, margin: 2, errorCorrectionLevel: 'M' }).then(setQr).catch(() => setQr(''));
  }, []);

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-6 py-12 text-foreground">
      <div className="ticket-guide-printable rounded-3xl border border-border bg-card p-8 shadow-xl sm:p-12">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-primary">Animewonderous · Event staff</p>
        <h1 className="mt-3 text-4xl font-bold">Ticket verification guide</h1>
        <p className="mt-3 max-w-xl text-muted-foreground">Use the staff check-in page to confirm payment and redeem each ticket exactly once.</p>
        <div className="mt-8 grid gap-8 sm:grid-cols-[1fr_auto] sm:items-center">
          <ol className="list-decimal space-y-4 pl-5 text-sm leading-6">
            <li>Sign in with an authorized Animewonderous superadmin account on the scanning device.</li>
            <li>Open the scanner by scanning this staff QR code, or visit <span className="break-all font-mono">/admin/tickets/scan</span>.</li>
            <li>Allow camera access and scan the attendee’s ticket QR. If scanning is unavailable, enter the printed ticket code.</li>
            <li>Allow entry only when the scanner says <strong>“Ticket verified. Entry approved.”</strong> A repeat scan will show that the ticket was already checked in.</li>
          </ol>
          <div className="mx-auto rounded-2xl bg-white p-4 text-center">
            {qr ? <Image src={qr} alt="QR code linking to the staff ticket scanner" width={260} height={260} unoptimized /> : <p className="grid h-[260px] w-[260px] place-items-center text-sm text-black">QR code could not be generated.</p>}
            <p className="mt-2 text-xs font-bold text-black">STAFF SCANNER</p>
          </div>
        </div>
        <p className="mt-8 border-t border-border pt-5 text-xs text-muted-foreground">The attendee ticket QR opens a read-only verification result. Staff must redeem the ticket from the secured scanner.</p>
      </div>
      <div className="mt-6 flex gap-3 print:hidden">
        <button type="button" onClick={() => window.print()} className="rounded-xl bg-primary px-5 py-3 font-bold text-white">Print / Save as PDF</button>
        <Link href="/admin/tickets/scan" className="rounded-xl border border-border px-5 py-3 font-bold">Open scanner</Link>
      </div>
    </main>
  );
}
