"use client";

import { Heart, Lock, UserPlus } from "lucide-react";
import Logo from "./Logo";

interface HomeViewProps {
  onExplore: () => void;
  onMatches: () => void;
}

export default function HomeView({ onExplore, onMatches }: HomeViewProps) {
  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col items-center px-4 pb-8 pt-6 sm:px-6">
      <div className="w-full max-w-[420px]">
        <article className="coy-card overflow-hidden bg-white">

          <div className="px-6 pb-6 pt-5">
            <h1 className="text-[2rem] font-black leading-[1.15] tracking-tight text-coy-ink">
              Find out if your crush likes you back
            </h1>
            <p className="mt-3 text-sm font-bold leading-relaxed text-coy-muted">
              Coy Discover is a playful way to meet people nearby. Swipe through
              real profiles, like the ones that click, and we only reveal a
              match when the feeling is mutual.
            </p>

            <ul className="mt-5 space-y-3">
              <li className="flex items-center gap-3 text-sm font-extrabold text-coy-ink">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-coy-lavender">
                  <UserPlus size={18} />
                </span>
                Discover people you might like
              </li>
              <li className="flex items-center gap-3 text-sm font-extrabold text-coy-ink">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f6e6d8]">
                  <Lock size={18} />
                </span>
                Likes stay private until they like you too
              </li>
              <li className="flex items-center gap-3 text-sm font-extrabold text-coy-ink">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-coy-pink-soft">
                  <Heart size={18} className="text-coy-pink" />
                </span>
                If they swipe back, it&apos;s a match
              </li>
            </ul>

            <button
              type="button"
              onClick={onExplore}
              className="mt-6 w-full rounded-full border-3 border-coy-ink bg-coy-pink py-3.5 text-base font-black text-white shadow-[4px_4px_0_0_#111] transition hover:-translate-y-0.5 hover:bg-coy-pink-hover active:translate-y-0.5 active:shadow-none"
            >
              Explore profiles
            </button>
            <button
              type="button"
              onClick={onMatches}
              className="mt-3 w-full rounded-full border-3 border-coy-ink bg-white py-3 text-sm font-black text-coy-ink transition hover:bg-coy-lavender"
            >
              View matches
            </button>
          </div>
        </article>
      </div>
    </section>
  );
}
