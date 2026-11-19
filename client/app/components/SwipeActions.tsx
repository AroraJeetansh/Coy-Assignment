"use client";

import { Heart, X } from "lucide-react";

interface SwipeActionsProps {
  disabled?: boolean;
  onPass: () => void;
  onLike: () => void;
}

export default function SwipeActions({
  disabled = false,
  onPass,
  onLike,
}: SwipeActionsProps) {
  return (
    <div className="flex items-center justify-center gap-8">
      <button
        type="button"
        onClick={onPass}
        disabled={disabled}
        aria-label="Pass"
        className="flex h-16 w-16 items-center justify-center rounded-full border-3 border-coy-ink bg-white text-coy-ink shadow-[4px_4px_0_0_#111] transition enabled:hover:-translate-y-0.5 enabled:active:translate-y-0.5 enabled:active:shadow-none disabled:opacity-40"
      >
        <X size={28} strokeWidth={2.8} />
      </button>
      <button
        type="button"
        onClick={onLike}
        disabled={disabled}
        aria-label="Like"
        className="flex h-16 w-16 items-center justify-center rounded-full border-3 border-coy-ink bg-coy-pink text-white shadow-[4px_4px_0_0_#111] transition enabled:hover:-translate-y-0.5 enabled:active:translate-y-0.5 enabled:active:shadow-none disabled:opacity-40"
      >
        <Heart size={28} strokeWidth={2.6} fill="currentColor" />
      </button>
    </div>
  );
}
