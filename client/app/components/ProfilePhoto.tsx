"use client";

import { useState } from "react";
import { getInitials } from "@/app/lib/api";

interface ProfilePhotoProps {
  name: string;
  photo: string | null;
  className?: string;
  sizes?: string;
}

export default function ProfilePhoto({
  name,
  photo,
  className = "",
}: ProfilePhotoProps) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(photo) && !failed;

  return (
    <div className={`relative overflow-hidden bg-coy-lavender ${className}`}>
      {showImage ? (
        // External profile URLs come from the API and may use many hosts.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={photo ?? ""}
          alt={`${name}'s photo`}
          className="h-full w-full object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <span className="text-4xl font-black text-coy-pink">
            {getInitials(name)}
          </span>
        </div>
      )}
    </div>
  );
}
