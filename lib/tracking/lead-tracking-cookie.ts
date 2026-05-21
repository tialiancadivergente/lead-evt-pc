export const TRACKING_COOKIE_KEYS = [
  "_fbc",
  "_fbp",
  "_gcl_au",
  "_gcl_aw",
  "_ga",
  "ttclid",
] as const;

export type TrackingCookieKey = (typeof TRACKING_COOKIE_KEYS)[number];
