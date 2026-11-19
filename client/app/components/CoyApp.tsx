"use client";

import { useState } from "react";
import type { AppView } from "@/app/types";
import DiscoverView from "./DiscoverView";
import HomeView from "./HomeView";
import MatchesView from "./MatchesView";
import Navbar from "./Navbar";

export default function CoyApp() {
  const [view, setView] = useState<AppView>("home");
  const [matchesKey, setMatchesKey] = useState(0);

  const navigate = (next: AppView) => {
    if (next === "matches") {
      setMatchesKey((value) => value + 1);
    }
    setView(next);
  };

  return (
    <div className="flex min-h-full flex-1 flex-col bg-background">
      <Navbar currentView={view} onNavigate={navigate} />
      <main className="flex-1 pb-24 md:pb-10">
        {view === "home" ? (
          <HomeView
            onExplore={() => navigate("discover")}
            onMatches={() => navigate("matches")}
          />
        ) : null}
        {view === "discover" ? (
          <DiscoverView onOpenMatches={() => navigate("matches")} />
        ) : null}
        {view === "matches" ? (
          <MatchesView
            refreshKey={matchesKey}
            onDiscover={() => navigate("discover")}
          />
        ) : null}
      </main>
    </div>
  );
}
