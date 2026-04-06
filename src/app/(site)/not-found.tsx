"use client";

import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/10 to-muted px-4 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h1 style={{ fontSize: "clamp(4rem, 10vw, 8rem)", fontWeight: 700, color: "#0B3C5D", lineHeight: 1 }}>
          404
        </h1>
        <h2
          style={{
            fontSize: "clamp(1.5rem, 4vw, 2rem)",
            fontWeight: 700,
            color: "#0B3C5D",
            marginTop: "1rem",
            marginBottom: "1rem",
          }}
        >
          Page Not Found
        </h2>
        <p className="mb-8 text-muted-foreground">
          Oops! The page you&apos;re looking for doesn&apos;t exist. It might have been moved or deleted.
        </p>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 text-white transition-all duration-300 hover:scale-105 hover:bg-accent/90"
          >
            <Home className="size-5" />
            <span>Go Home</span>
          </Link>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/20 bg-white px-8 py-4 text-primary transition-all duration-300 hover:scale-105 hover:bg-white/90"
          >
            <ArrowLeft className="size-5" />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    </div>
  );
}
