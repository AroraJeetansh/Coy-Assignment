"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useTransform,
  type PanInfo,
} from "framer-motion";
import { Compass, RotateCcw } from "lucide-react";
import { fetchFeed, submitSwipe } from "@/app/lib/api";
import type { Profile, SwipeAction } from "@/app/types";
import MatchModal from "./MatchModal";
import ProfileCard from "./ProfileCard";
import SwipeActions from "./SwipeActions";

const SWIPE_THRESHOLD = 110;
const EXIT_X = 520;

interface DiscoverViewProps {
  onOpenMatches: () => void;
}

export default function DiscoverView({ onOpenMatches }: DiscoverViewProps) {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );
  const [error, setError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [matchedProfile, setMatchedProfile] = useState<Profile | null>(null);
  const [busy, setBusy] = useState(false);
  const busyRef = useRef(false);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-220, 0, 220], [-14, 0, 14]);
  const likeOpacity = useTransform(x, [20, 120], [0, 1]);
  const passOpacity = useTransform(x, [-20, -120], [0, 1]);

  const current = profiles[0] ?? null;
  const next = profiles[1] ?? null;
  const remaining = useMemo(() => profiles.length, [profiles.length]);

  const applyFeed = useCallback(async () => {
    const data = await fetchFeed();
    if (!data.success) {
      throw new Error(data.message ?? "Failed to fetch profiles");
    }
    setProfiles(data.profiles);
    setStatus("ready");
    setError(null);
  }, []);

  const retryFeed = useCallback(() => {
    setStatus("loading");
    setError(null);
    void applyFeed().catch((err: unknown) => {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Could not load profiles.");
    });
  }, [applyFeed]);

  useEffect(() => {
    let cancelled = false;

    fetchFeed()
      .then((data) => {
        if (cancelled) return;
        if (!data.success) {
          throw new Error(data.message ?? "Failed to fetch profiles");
        }
        setProfiles(data.profiles);
        setStatus("ready");
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setStatus("error");
        setError(
          err instanceof Error ? err.message : "Could not load profiles.",
        );
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const snapHome = useCallback(() => {
    void animate(x, 0, { type: "spring", stiffness: 420, damping: 32 });
  }, [x]);

  const completeSwipe = useCallback(
    async (profile: Profile, action: SwipeAction, direction: number) => {
      if (busyRef.current) return;
      busyRef.current = true;
      setBusy(true);
      setActionError(null);

      try {
        const result = await submitSwipe(profile.id, action);
        if (!result.success) {
          throw new Error(result.message || "Swipe was not saved.");
        }

        await animate(x, direction * EXIT_X, {
          type: "tween",
          duration: 0.22,
          ease: "easeIn",
        });

        setProfiles((prev) => prev.filter((item) => item.id !== profile.id));
        x.set(0);

        if (result.isMatch) {
          setMatchedProfile(profile);
        }
      } catch (err) {
        snapHome();
        setActionError(
          err instanceof Error
            ? err.message
            : "Could not save that swipe. Try again.",
        );
      } finally {
        busyRef.current = false;
        setBusy(false);
      }
    },
    [snapHome, x],
  );

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (!current || busyRef.current) return;
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset > SWIPE_THRESHOLD || velocity > 700) {
      void completeSwipe(current, "like", 1);
      return;
    }
    if (offset < -SWIPE_THRESHOLD || velocity < -700) {
      void completeSwipe(current, "pass", -1);
      return;
    }
    snapHome();
  };

  if (status === "loading") {
    return (
      <div className="mx-auto flex min-h-[70vh] w-full max-w-md flex-col items-center justify-center px-4">
        <div className="coy-card flex h-[520px] w-full items-center justify-center bg-white">
          <div className="flex flex-col items-center gap-3">
            <span className="h-12 w-12 animate-pulse rounded-full bg-coy-pink" />
            <p className="font-extrabold text-coy-muted">Finding people…</p>
          </div>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="mx-auto flex min-h-[60vh] w-full max-w-md flex-col items-center justify-center px-4">
        <div className="coy-card w-full bg-white p-8 text-center">
          <p className="text-lg font-black text-coy-ink">
            Couldn&apos;t load profiles
          </p>
          <p className="mt-2 text-sm font-bold text-coy-muted">{error}</p>
          <button
            type="button"
            onClick={retryFeed}
            className="mt-5 inline-flex items-center gap-2 rounded-full border-3 border-coy-ink bg-coy-pink px-5 py-2.5 font-black text-white"
          >
            <RotateCcw size={16} />
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (!current) {
    return (
      <div className="mx-auto flex min-h-[60vh] w-full max-w-md flex-col items-center px-4 pt-8">
        <div className="w-full rounded-[28px] border-3 border-dashed border-coy-ink/40 bg-white p-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-3 border-dashed border-coy-ink/30">
            <Compass className="text-coy-muted" />
          </div>
          <h2 className="mt-4 text-2xl font-black text-coy-ink">
            You&apos;re all caught up
          </h2>
          <p className="mt-2 text-sm font-bold text-coy-muted">
            There are no more profiles to discover right now. Check your matches
            or come back later.
          </p>
          <button
            type="button"
            onClick={onOpenMatches}
            className="mt-6 w-full rounded-full border-3 border-coy-ink bg-coy-pink py-3 font-black text-white shadow-[4px_4px_0_0_#111]"
          >
            See matches
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col items-center px-4 pb-4 pt-4 sm:px-6">
      <div className="mb-3 flex w-full max-w-[420px] items-center justify-between">
        <h1 className="text-lg font-black text-coy-ink">Discover</h1>
        <span className="rounded-full bg-coy-lavender px-3 py-1 text-xs font-extrabold text-coy-ink">
          {remaining} left
        </span>
      </div>

      {actionError ? (
        <p
          role="alert"
          className="mb-3 w-full max-w-[420px] rounded-2xl border-3 border-coy-ink bg-coy-pink-soft px-3 py-2 text-center text-sm font-extrabold text-coy-ink"
        >
          {actionError}
        </p>
      ) : null}

      <div className="relative h-[min(620px,calc(100dvh-220px))] w-full max-w-[420px]">
        {next ? (
          <div className="absolute inset-0 origin-bottom scale-[0.96] opacity-70">
            <ProfileCard profile={next} />
          </div>
        ) : null}

        <motion.div
          key={current.id}
          className="absolute inset-0 cursor-grab touch-none active:cursor-grabbing"
          style={{ x, rotate }}
          drag={busy ? false : "x"}
          dragListener={!busy}
          onDragEnd={handleDragEnd}
        >
          <ProfileCard
            profile={current}
            likeOpacity={likeOpacity}
            passOpacity={passOpacity}
          />
        </motion.div>
      </div>

      <div className="mt-6">
        <SwipeActions
          disabled={busy}
          onPass={() => void completeSwipe(current, "pass", -1)}
          onLike={() => void completeSwipe(current, "like", 1)}
        />
      </div>

      <MatchModal
        open={Boolean(matchedProfile)}
        profile={matchedProfile}
        onContinue={() => setMatchedProfile(null)}
      />
    </section>
  );
}
