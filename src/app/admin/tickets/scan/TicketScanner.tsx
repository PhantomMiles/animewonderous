'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

type ScanResult = { state: 'ACCEPTED' | 'USED' | 'INVALID'; message: string; code?: string };

export default function TicketScanner() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<ScanResult | null>(null);
  const [busy, setBusy] = useState(false);
  const [cameraError, setCameraError] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const scanFrameRef = useRef<number | null>(null);

  useEffect(() => () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    if (scanFrameRef.current !== null) cancelAnimationFrame(scanFrameRef.current);
  }, []);

  async function verify(value = input) {
    if (!value.trim() || busy) return;
    setBusy(true);
    setResult(null);
    try {
      const response = await fetch('/api/admin/tickets/check-in', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ code: value.trim() }),
      });
      const data = await response.json();
      setResult(data as ScanResult);
      if (response.ok) setInput('');
    } catch {
      setResult({ state: 'INVALID', message: 'Could not reach the ticket service. Check the connection and try again.' });
    } finally {
      setBusy(false);
    }
  }

  async function startCamera() {
    setCameraError('');
    if (!('BarcodeDetector' in window)) {
      setCameraError('Automatic QR scanning is not supported by this browser. Enter the ticket code manually below.');
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
      const Detector = (window as Window & { BarcodeDetector: new (options?: { formats: string[] }) => { detect: (source: HTMLVideoElement | HTMLCanvasElement) => Promise<Array<{ rawValue: string }>> } }).BarcodeDetector;
      const detector = new Detector({ formats: ['qr_code'] });
      const scan = async () => {
        const video = videoRef.current;
        if (video && video.readyState >= 2) {
          try {
            const codes = await detector.detect(video);
            if (codes[0]?.rawValue) {
              streamRef.current?.getTracks().forEach((track) => track.stop());
              streamRef.current = null;
              await verify(codes[0].rawValue);
              return;
            }
          } catch { /* Keep scanning; manual code entry remains available. */ }
        }
        scanFrameRef.current = requestAnimationFrame(scan);
      };
      scanFrameRef.current = requestAnimationFrame(scan);
    } catch {
      setCameraError('Camera access failed. Allow camera access or enter the ticket code manually.');
    }
  }

  const resultClass = result?.state === 'ACCEPTED' ? 'border-emerald-500 bg-emerald-500/10 text-emerald-700' : result?.state === 'USED' ? 'border-amber-500 bg-amber-500/10 text-amber-800' : 'border-red-500 bg-red-500/10 text-red-700';

  return (
    <main className="mx-auto min-h-screen w-full max-w-2xl px-5 py-12 text-foreground">
      <Link href="/admin" className="text-sm font-semibold text-primary">← Back to admin</Link>
      <h1 className="mt-5 text-3xl font-bold">Ticket check-in</h1>
      <p className="mt-2 text-sm text-muted-foreground">Scan a guest’s ticket QR or enter the ticket code. A valid ticket is checked in once and cannot be reused.</p>
      <Link href="/admin/tickets/guide" className="mt-3 inline-block text-sm font-semibold text-primary underline">Open printable staff guide</Link>
      <div className="mt-8 space-y-4 rounded-2xl border border-border bg-card p-6">
        <button type="button" onClick={startCamera} className="w-full rounded-xl bg-primary px-5 py-3 font-bold text-white">Open QR scanner</button>
        <video ref={videoRef} autoPlay playsInline className="mx-auto max-h-80 w-full rounded-xl bg-black" />
        {cameraError && <p role="status" className="text-sm text-amber-600">{cameraError}</p>}
        <form onSubmit={(event) => { event.preventDefault(); void verify(); }} className="flex flex-col gap-3 sm:flex-row">
          <input autoComplete="off" value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ticket code or QR URL" className="min-w-0 flex-1 rounded-xl border border-border bg-background px-4 py-3 font-mono" />
          <button disabled={busy || !input.trim()} className="rounded-xl bg-foreground px-5 py-3 font-bold text-background disabled:opacity-50">{busy ? 'Checking…' : 'Check in'}</button>
        </form>
        {result && <div role="status" aria-live="polite" className={`rounded-xl border p-4 ${resultClass}`}><p className="font-bold">{result.message}</p>{result.code && <p className="mt-1 font-mono text-sm">{result.code}</p>}</div>}
      </div>
      <p className="mt-5 text-xs text-muted-foreground">Only a superadmin can redeem tickets. Existing email QR codes containing the ticket code can be entered manually.</p>
    </main>
  );
}
