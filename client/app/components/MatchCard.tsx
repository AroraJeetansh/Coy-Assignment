"use client";

import { Heart, MapPin } from "lucide-react";
import type { Match } from "@/app/types";
import { getInitials } from "@/app/lib/api";
import ProfilePhoto from "./ProfilePhoto";

interface MatchCardProps {
  match: Match;
}

export default function MatchCard({ match }: MatchCardProps) {
  return (
    <article className="flex items-center gap-3 rounded-[24px] border-3 border-coy-ink bg-coy-pink-soft p-3 shadow-[4px_4px_0_0_#111]">
      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full border-3 border-coy-ink bg-white">
        {match.photo ? (
          <ProfilePhoto
            name={match.name}
            photo={match.photo}
            className="h-full w-full"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-white text-lg font-black text-coy-pink">
            {getInitials(match.name)}
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-lg font-black text-coy-ink">
          {match.name}
          <span className="ml-1.5 font-extrabold text-coy-muted">
            {match.age}
          </span>
        </p>
        <p className="mt-0.5 flex items-center gap-1 text-xs font-extrabold text-coy-pink">
          <Heart size={12} fill="currentColor" />
          Matched
        </p>
        {match.location ? (
          <p className="mt-0.5 flex items-center gap-1 truncate text-sm font-bold text-coy-muted">
            <MapPin size={13} />
            {match.location}
          </p>
        ) : null}
      </div>
    </article>
  );
}
