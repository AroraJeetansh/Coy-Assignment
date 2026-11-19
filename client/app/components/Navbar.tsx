"use client";

import { Compass, Heart, Home } from "lucide-react";
import type { AppView } from "@/app/types";
import Logo from "./Logo";

const links: { id: AppView; label: string; icon: typeof Home }[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "discover", label: "Discover", icon: Compass },
  { id: "matches", label: "Matches", icon: Heart },
];

interface NavbarProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
}

export default function Navbar({ currentView, onNavigate }: NavbarProps) {
  return (
    <>
      <header className="sticky top-0 z-30 border-b-3 border-coy-ink bg-white/90 backdrop-blur-sm">
        <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-4 sm:px-6">
          <button
            type="button"
            onClick={() => onNavigate("home")}
            aria-label="Coy Discover home"
            className="rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coy-pink"
          >
            <Logo />
          </button>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-1 rounded-full border-3 border-coy-ink bg-white p-1 md:flex"
          >
            {links.map(({ id, label, icon: Icon }) => {
              const active = currentView === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => onNavigate(id)}
                  aria-current={active ? "page" : undefined}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-extrabold transition-colors ${
                    active
                      ? "bg-coy-pink text-white"
                      : "text-coy-ink hover:bg-coy-lavender"
                  }`}
                >
                  <Icon size={16} strokeWidth={2.4} />
                  {label}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      <nav
        aria-label="Mobile"
        className="fixed inset-x-0 bottom-0 z-30 border-t-3 border-coy-ink bg-white md:hidden"
      >
        <div className="mx-auto grid max-w-lg grid-cols-3 px-2 py-2">
          {links.map(({ id, label, icon: Icon }) => {
            const active = currentView === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => onNavigate(id)}
                aria-current={active ? "page" : undefined}
                className={`flex flex-col items-center gap-1 rounded-2xl py-2 text-xs font-extrabold ${
                  active ? "text-coy-pink" : "text-coy-muted"
                }`}
              >
                <Icon size={22} strokeWidth={active ? 2.6 : 2.2} />
                {label}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
