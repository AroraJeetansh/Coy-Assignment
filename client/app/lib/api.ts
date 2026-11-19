import type {
  FeedResponse,
  MatchesResponse,
  SwipeAction,
  SwipeResponse,
} from "@/app/types";

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";
export const CURRENT_USER_ID = 1;

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  let data: T;

  try {
    data = (await response.json()) as T;
  } catch {
    throw new Error("The server returned an unexpected response.");
  }

  if (!response.ok) {
    const message =
      typeof data === "object" &&
      data !== null &&
      "message" in data &&
      typeof data.message === "string"
        ? data.message
        : "Request failed. Please try again.";
    throw new Error(message);
  }

  return data;
}

export function fetchFeed() {
  return request<FeedResponse>("/api/feed");
}

export function submitSwipe(profileId: number, action: SwipeAction) {
  return request<SwipeResponse>("/api/swipe", {
    method: "POST",
    body: JSON.stringify({
      userId: CURRENT_USER_ID,
      profileId,
      action,
    }),
  });
}

export function fetchMatches() {
  return request<MatchesResponse>("/api/matches");
}

export function parseInterests(interests: string | null): string[] {
  if (!interests) return [];
  return interests
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}
