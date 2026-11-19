"use client";

import { useCallback, useEffect, useState } from "react";
import { Heart, RotateCcw } from "lucide-react";
import { fetchMatches } from "@/app/lib/api";
import type { Match } from "@/app/types";
import MatchCard from "./MatchCard";

interface MatchesViewProps {
  onDiscover: () => void;
  refreshKey: number;
}

export default function MatchesView({
  onDiscover,
  refreshKey,
}: MatchesViewProps) {
  const [matches, setMatches] = useState<Match[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );
  const [error, setError] = useState<string | null>(null);

  const retryMatches = useCallback(() => {
    setStatus("loading");
    setError(null);
    void fetchMatches()
      .then((data) => {
        if (!data.success) {
          throw new Error(data.message ?? "Failed to fetch matches");
        }
        setMatches(data.matches);
        setStatus("ready");
      })
      .catch((err: unknown) => {
        setStatus("error");
        setError(
          err instanceof Error ? err.message : "Could not load matches.",
        );
      });
  }, []);

  useEffect(() => {
    let cancelled = false;

    fetchMatches()
      .then((data) => {
        if (cancelled) return;
        if (!data.success) {
          throw new Error(data.message ?? "Failed to fetch matches");
        }
        setMatches(data.matches);
        setStatus("ready");
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setStatus("error");
        setError(
          err instanceof Error ? err.message : "Could not load matches.",
        );
      });

    return () => {
      cancelled = true;
    };
  }, [refreshKey]);

  if (status === "loading") {
    return (
      <div className="mx-auto w-full max-w-2xl px-4 pt-8">
        <p className="text-center font-extrabold text-coy-muted">
          Loading matches…
        </p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="mx-auto w-full max-w-md px-4 pt-8 text-center">
        <p className="text-lg font-black">Couldn&apos;t load matches</p>
        <p className="mt-2 text-sm font-bold text-coy-muted">{error}</p>
        <button
          type="button"
          onClick={retryMatches}
          className="mt-5 inline-flex items-center gap-2 rounded-full border-3 border-coy-ink bg-coy-pink px-5 py-2.5 font-black text-white"
        >
          <RotateCcw size={16} />
          Try again
        </button>
      </div>
    );
  }

  return (
    <section className="mx-auto w-full max-w-2xl px-4 pb-8 pt-4 sm:px-6">
      <div className="mb-4 flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-black text-coy-ink">Your matches</h1>
          <p className="text-sm font-bold text-coy-muted">
            Only people who liked you back
          </p>
        </div>
        <span className="rounded-full bg-coy-lavender px-3 py-1 text-xs font-extrabold">
          {matches.length}
        </span>
      </div>

      {matches.length === 0 ? (
        <div className="rounded-[28px] border-3 border-dashed border-coy-ink/35 bg-white p-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-coy-pink-soft text-coy-pink">
            <Heart fill="currentColor" />
          </div>
          <h2 className="mt-4 text-xl font-black">No matches yet</h2>
          <p className="mt-2 text-sm font-bold text-coy-muted">
            Keep discovering. When someone you like likes you back, they&apos;ll
            show up here.
          </p>
          <button
            type="button"
            onClick={onDiscover}
            className="mt-6 rounded-full border-3 border-coy-ink bg-coy-pink px-6 py-3 font-black text-white shadow-[4px_4px_0_0_#111]"
          >
            Start discovering
          </button>
        </div>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2">
          {matches.map((match) => (
            <li key={match.id}>
              <MatchCard match={match} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
