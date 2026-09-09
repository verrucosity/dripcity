"use client";

import jsQR from "jsqr";
import { useCallback, useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";

type ScanResult = {
  status: "valid" | "already-used" | "invalid" | "unauthorized";
  buyerName?: string;
  tierLabel?: string;
};

export default function CheckinPage() {
  const [pin, setPin] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const [manualId, setManualId] = useState("");
  const [result, setResult] = useState<ScanResult | null>(null);
  const [checking, setChecking] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const resultRef = useRef<ScanResult | null>(null);
  const checkingRef = useRef(false);

  useEffect(() => {
    resultRef.current = result;
  }, [result]);

  const verify = useCallback(
    async (ticketId: string) => {
      if (checkingRef.current) return;
      checkingRef.current = true;
      setResult(null);
      setChecking(true);
      try {
        const res = await fetch("/api/tickets/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ticketId, pin }),
        });
        const data = await res.json();
        setResult(data);
      } finally {
        checkingRef.current = false;
        setChecking(false);
      }
    },
    [pin]
  );

  useEffect(() => {
    if (!authorized) return;
    let active = true;
    let stream: MediaStream | null = null;

    async function start() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });
        const video = videoRef.current;
        if (!video) return;
        video.srcObject = stream;
        await video.play();
        requestAnimationFrame(tick);
      } catch {
        setCameraError("Camera access denied or unavailable. Use manual entry below.");
      }
    }

    function tick() {
      if (!active) return;
      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (video && canvas && video.readyState === video.HAVE_ENOUGH_DATA) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, imageData.width, imageData.height);
          if (code && code.data && !resultRef.current) {
            verify(code.data);
          }
        }
      }
      requestAnimationFrame(tick);
    }

    start();

    return () => {
      active = false;
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, [authorized, verify]);

  function handlePinSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!pin) return;
    setAuthorized(true);
  }

  function handleManualSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!manualId) return;
    verify(manualId);
    setManualId("");
  }

  if (!authorized) {
    return (
      <section className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center px-6">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-fg-dim">
          Drip City Records
        </p>
        <h1 className="mt-4 font-display text-4xl uppercase">Check-In</h1>
        <form onSubmit={handlePinSubmit} className="mt-8 flex flex-col gap-4">
          <input
            type="password"
            inputMode="numeric"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="Staff PIN"
            className="h-14 border border-line bg-transparent px-4 text-lg outline-none focus:border-fg"
          />
          <button
            type="submit"
            className="h-14 w-full bg-accent text-sm font-semibold uppercase tracking-[0.2em] text-fg"
          >
            Enter
          </button>
        </form>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-sm px-6 py-12">
      <h1 className="font-display text-2xl uppercase">Scan Ticket</h1>

      <div className="relative mt-6 aspect-square overflow-hidden border border-line bg-bg-raised">
        <video ref={videoRef} className="h-full w-full object-cover" playsInline muted />
        <canvas ref={canvasRef} className="hidden" />
      </div>

      {cameraError && (
        <p className="mt-4 font-mono text-xs uppercase tracking-wide text-accent">
          {cameraError}
        </p>
      )}

      {checking && (
        <div className="mt-6 border border-line p-6 text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-line border-t-accent" />
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-fg-dim">
            Checking Ticket...
          </p>
        </div>
      )}

      {result && !checking && (
        <div
          className={`mt-6 border p-6 text-center ${
            result.status === "valid" ? "border-green-500" : "border-accent"
          }`}
        >
          <p
            className={`font-display text-3xl uppercase ${
              result.status === "valid" ? "text-green-500" : ""
            }`}
          >
            {result.status === "valid" && "Valid"}
            {result.status === "already-used" && "Already Used"}
            {result.status === "invalid" && "Invalid"}
            {result.status === "unauthorized" && "Wrong PIN"}
          </p>
          {result.buyerName && (
            <>
              <p className="mt-4 font-display text-4xl uppercase leading-tight">
                {result.buyerName}
              </p>
              {result.tierLabel && (
                <p className="mt-1 font-mono text-xs uppercase tracking-[0.2em] text-fg-dim">
                  {result.tierLabel}
                </p>
              )}
            </>
          )}
          <button
            type="button"
            onClick={() => setResult(null)}
            className="mt-6 h-12 w-full bg-fg text-sm font-semibold uppercase tracking-[0.2em] text-bg"
          >
            Scan Next
          </button>
        </div>
      )}

      <form onSubmit={handleManualSubmit} className="mt-8 flex flex-col gap-3">
        <label className="font-mono text-xs uppercase tracking-[0.2em] text-fg-dim">
          Manual Entry
        </label>
        <input
          type="text"
          value={manualId}
          onChange={(e) => setManualId(e.target.value)}
          placeholder="Ticket ID"
          className="h-12 border border-line bg-transparent px-4 text-sm outline-none focus:border-fg"
        />
        <button
          type="submit"
          disabled={checking}
          className="h-12 w-full border border-line text-sm font-semibold uppercase tracking-[0.2em] hover:border-fg disabled:opacity-40"
        >
          {checking ? "Checking..." : "Check"}
        </button>
      </form>
    </section>
  );
}
