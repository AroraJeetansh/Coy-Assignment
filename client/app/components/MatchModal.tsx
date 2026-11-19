"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Heart } from "lucide-react";
import type { Profile } from "@/app/types";
import { getInitials } from "@/app/lib/api";
import ProfilePhoto from "./ProfilePhoto";

interface MatchModalProps {
  profile: Profile | null;
  open: boolean;
  onContinue: () => void;
}

export default function MatchModal({
  profile,
  open,
  onContinue,
}: MatchModalProps) {
  return (
    <AnimatePresence>
      {open && profile ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-coy-ink/45 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="match-heading"
        >
          <motion.div
            className="coy-card w-full max-w-md overflow-hidden bg-white px-6 py-8 text-center"
            initial={{ scale: 0.82, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 20 }}
          >
            <div className="mx-auto mb-5 h-20 w-full max-w-[220px] rounded-[22px] border-3 border-coy-ink bg-coy-lavender dot-grid" />

            <motion.h2
              id="match-heading"
              className="text-3xl font-black tracking-tight text-coy-ink sm:text-4xl"
              initial={{ scale: 0.6 }}
              animate={{ scale: [0.6, 1.12, 1] }}
              transition={{ duration: 0.55 }}
            >
              IT&apos;S A MATCH!
            </motion.h2>
            <p className="mt-2 font-bold text-coy-muted">
              You and {profile.name} like each other.
            </p>

            <div className="relative mx-auto mt-7 flex items-center justify-center">
              <motion.div
                className="h-28 w-28 overflow-hidden rounded-full border-3 border-coy-ink bg-coy-lavender"
                initial={{ x: -40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.15 }}
              >
                <div className="flex h-full w-full items-center justify-center text-2xl font-black text-coy-pink">
                  You
                </div>
              </motion.div>
              <motion.div
                className="z-10 -mx-3 flex h-12 w-12 items-center justify-center rounded-full border-3 border-coy-ink bg-coy-pink text-white"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.28, type: "spring" }}
              >
                <Heart size={22} fill="currentColor" />
              </motion.div>
              <motion.div
                className="h-28 w-28 overflow-hidden rounded-full border-3 border-coy-ink"
                initial={{ x: 40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.15 }}
              >
                {profile.photo ? (
                  <ProfilePhoto
                    name={profile.name}
                    photo={profile.photo}
                    className="h-full w-full"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-coy-pink-soft text-2xl font-black text-coy-pink">
                    {getInitials(profile.name)}
                  </div>
                )}
              </motion.div>
            </div>

            <button
              type="button"
              onClick={onContinue}
              className="mt-8 w-full rounded-full border-3 border-coy-ink bg-coy-pink py-3.5 text-base font-black text-white shadow-[4px_4px_0_0_#111] transition hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none"
            >
              Continue Discovering
            </button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
