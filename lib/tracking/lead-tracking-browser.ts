import { TRACKING_COOKIE_KEYS } from "@/lib/tracking/lead-tracking-cookie";

interface TrackingPageInfo {
  currentUrl: string;
  currentPath: string;
  currentPage: string;
}

interface TrackingUtmInfo {
  utmObject: Record<string, string>;
  getUtmValue: (key: string) => string;
}

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function getCookieValue(cookieName: string): string {
  if (!isBrowser() || !document.cookie) {
    return "";
  }

  const match = document.cookie
    .split("; ")
    .find((entry) => entry.startsWith(`${cookieName}=`));

  if (!match) {
    return "";
  }

  return decodeURIComponent(match.split("=").slice(1).join("="));
}

export function getTrackingPageInfo(): TrackingPageInfo {
  if (!isBrowser()) {
    return {
      currentUrl: "",
      currentPath: "",
      currentPage: "",
    };
  }

  return {
    currentUrl: window.location.href,
    currentPath: window.location.pathname,
    currentPage: window.location.hostname,
  };
}

export function getTrackingUtmInfo(): TrackingUtmInfo {
  if (!isBrowser()) {
    return {
      utmObject: {},
      getUtmValue: () => "",
    };
  }

  const normalizedSearch = window.location.search.replace(/^\?+/, "?");
  const urlParams = new URLSearchParams(normalizedSearch);

  const utmObject: Record<string, string> = {};
  urlParams.forEach((value, rawKey) => {
    const key = rawKey.replace(/^\?+/, "").trim();
    if (key.toLowerCase().startsWith("utm_")) {
      utmObject[key] = value;
    }
  });

  const getUtmValue = (key: string): string =>
    utmObject[key] || urlParams.get(key) || urlParams.get(`?${key}`) || "";

  return {
    utmObject,
    getUtmValue,
  };
}

export function getTrackingCookies(): Record<string, string> {
  return TRACKING_COOKIE_KEYS.reduce<Record<string, string>>((acc, key) => {
    acc[key] = getCookieValue(key);
    return acc;
  }, {});
}
