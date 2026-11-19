export interface Profile {
  id: number;
  name: string;
  age: number;
  photo: string | null;
  bio: string | null;
  location: string | null;
  interests: string | null;
}

export interface Match extends Profile {
  matched_at?: string;
}

export interface FeedResponse {
  success: boolean;
  count: number;
  profiles: Profile[];
  message?: string;
}

export interface SwipeResponse {
  success: boolean;
  message: string;
  isMatch: boolean;
}

export interface MatchesResponse {
  success: boolean;
  count: number;
  matches: Match[];
  message?: string;
}

export type SwipeAction = "like" | "pass";
export type AppView = "home" | "discover" | "matches";
