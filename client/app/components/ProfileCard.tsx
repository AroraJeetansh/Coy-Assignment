"use client";

import { motion, type MotionValue } from "framer-motion";
import { MapPin } from "lucide-react";
import { parseInterests } from "@/app/lib/api";
import type { Profile } from "@/app/types";
import ProfilePhoto from "./ProfilePhoto";

interface ProfileCardProps {
  profile: Profile;
  likeOpacity?: MotionValue<number> | number;
  passOpacity?: MotionValue<number> | number;
}

export default function ProfileCard({
  profile,
  likeOpacity = 0,
  passOpacity = 0,
}: ProfileCardProps) {
  const interests = parseInterests(profile.interests);

  return (
    <article className="coy-card relative flex h-full w-full flex-col overflow-hidden bg-white">
      <div className="relative min-h-0 flex-1">
        <ProfilePhoto
          name={profile.name}
          photo={profile.photo}
          className="h-full w-full"
        />

        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-4 top-5 rounded-full border-3 border-coy-green bg-white px-3 py-1 text-sm font-black tracking-wide text-coy-green"
          style={{ opacity: likeOpacity }}
        >
          LIKE
        </motion.div>
        <motion.div
          aria-hidden
          className="pointer-events-none absolute right-4 top-5 rounded-full border-3 border-coy-ink bg-white px-3 py-1 text-sm font-black tracking-wide text-coy-ink"
          style={{ opacity: passOpacity }}
        >
          PASS
        </motion.div>
      </div>

      <div className="flex shrink-0 flex-col gap-2 px-5 pb-5 pt-4">
        <div>
          <h2 className="text-2xl font-black leading-tight text-coy-ink">
            {profile.name}
            <span className="ml-2 font-extrabold text-coy-muted">
              {profile.age}
            </span>
          </h2>
          {profile.location ? (
            <p className="mt-1 flex items-center gap-1.5 text-sm font-bold text-coy-muted">
              <MapPin size={15} strokeWidth={2.4} />
              {profile.location}
            </p>
          ) : null}
        </div>

        {profile.bio ? (
          <p className="line-clamp-2 text-sm font-semibold leading-relaxed text-coy-ink/80">
            {profile.bio}
          </p>
        ) : null}

        {interests.length > 0 ? (
          <ul className="flex flex-wrap gap-1.5">
            {interests.slice(0, 5).map((interest) => (
              <li
                key={interest}
                className="rounded-full bg-coy-lavender px-2.5 py-1 text-xs font-extrabold text-coy-ink"
              >
                {interest}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  );
}
