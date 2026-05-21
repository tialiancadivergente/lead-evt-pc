/* eslint-disable @typescript-eslint/no-explicit-any */

const DEFAULT_BASE_URL = "https://webhooks.o-meu-gps.com/webhook/lead";
const DEFAULT_EVENT_NAME = "lead";

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_content",
  "utm_term",
  "utm_id",
  "utm_campaign",
] as const;

type StringRecord = Record<string, string | null | undefined>;

export interface LeadTrackingConfig {
  baseUrl?: string;
  eventName?: string;
  eventId?: string | null;
  gaPropertyId?: string | null;
}

export interface LeadTrackingPayload {
  leadEmail?: string | null;
  leadPhone?: string | null;
  ipAddress?: string | null;
  extraParams?: StringRecord;
}

export interface LeadTrackingResult {
  ok: boolean;
  url: string;
  data?: any;
  error?: unknown;
}

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function getCookie(name: string): string | null {
  if (!isBrowser() || !document.cookie) return null;
  const regex = new RegExp(`(?:^|; )${name}=([^;]*)`);
  const match = document.cookie.match(regex);
  return match ? decodeURIComponent(match[1]) : null;
}

function getUrlParam(name: string): string | null {
  if (!isBrowser()) return null;
  return new URLSearchParams(window.location.search).get(name);
}

function extractGa4CookieId(gaId?: string | null): string | null {
  if (!gaId || gaId.indexOf("G-") !== 0) return null;
  const suffix = gaId.replace("G-", "");
  return getCookie(`_ga_${suffix}`);
}

function appendIfValue(params: URLSearchParams, key: string, value?: string | null) {
  if (value !== undefined && value !== null && value !== "") {
    params.append(key, value);
  }
}

function collectUtmParams(): StringRecord {
  if (!isBrowser()) return {};
  const params: StringRecord = {};
  const searchParams = new URLSearchParams(window.location.search);

  UTM_KEYS.forEach((key) => {
    const value = searchParams.get(key);
    if (value) params[key] = value;
  });

  return params;
}

function collectAuxiliaryIdentifiers(): StringRecord {
  const userId = getCookie("user_id");
  const userCode = getCookie("user_code");

  const data: StringRecord = {
    user_id: userId,
    user_code: userCode,
  };

  if (userId || userCode) {
    data.user_f = getUrlParam("f");
    data.user_i = getUrlParam("i");
    data.user_w = getUrlParam("w");
  }

  return data;
}

function collectAnalyticsCookies(gaPropertyId?: string | null): StringRecord {
  return {
    ga_cookie: getCookie("_ga"),
    ga_propriedade: extractGa4CookieId(gaPropertyId ?? null),
    gcl_au: getCookie("_gcl_au"),
    gcl_aw: getCookie("_gcl_aw"),
    fbp: getCookie("_fbp"),
    fbc: getCookie("_fbc"),
    ttclid: getCookie("ttclid") ?? getUrlParam("ttclid"),
  };
}

function collectNavigationData(ipAddress?: string | null): StringRecord {
  if (!isBrowser()) {
    return {
      ip_address: ipAddress ?? null,
    };
  }

  return {
    landing_page: window.location.href,
    referer: document.referrer || "",
    session_id: getCookie("session_id") ?? "",
    user_agent: navigator.userAgent || "",
    ip_address: ipAddress ?? null,
  };
}

export function buildLeadTrackingParams(
  config: LeadTrackingConfig = {},
  payload: LeadTrackingPayload = {},
): URLSearchParams {
  const params = new URLSearchParams();

  const utmParams = collectUtmParams();
  Object.entries(utmParams).forEach(([key, value]) => appendIfValue(params, key, value));

  const auxiliary = collectAuxiliaryIdentifiers();
  Object.entries(auxiliary).forEach(([key, value]) => appendIfValue(params, key, value));

  const analytics = collectAnalyticsCookies(config.gaPropertyId ?? null);
  Object.entries(analytics).forEach(([key, value]) => appendIfValue(params, key, value));

  if (payload.leadEmail) params.append("lead_email", payload.leadEmail);
  if (payload.leadPhone) params.append("lead_telefone", payload.leadPhone);

  const navigation = collectNavigationData(payload.ipAddress ?? null);
  Object.entries(navigation).forEach(([key, value]) => appendIfValue(params, key, value));

  params.append("event", config.eventName ?? DEFAULT_EVENT_NAME);
  params.append("event_id", config.eventId ?? "");
  params.append("ts", Date.now().toString());

  if (payload.extraParams) {
    Object.entries(payload.extraParams).forEach(([key, value]) => appendIfValue(params, key, value));
  }

  return params;
}

export function pushLeadTrackingToDataLayer(
  status: "success" | "error",
  response: any,
  url: string,
  eventName: string = DEFAULT_EVENT_NAME,
) {
  if (!isBrowser()) return;

  const dataLayer = (window as typeof window & { dataLayer?: any[] }).dataLayer || [];

  dataLayer.push({
    event: "web_tracking_response",
    status,
    tracking_event: eventName,
    tracking_url: url,
    user_id: response?.user_id ?? null,
    user_code: response?.user_code ?? null,
  });

  (window as typeof window & { dataLayer?: any[] }).dataLayer = dataLayer;
}

export async function sendLeadTracking(
  config: LeadTrackingConfig = {},
  payload: LeadTrackingPayload = {},
): Promise<LeadTrackingResult> {
  if (!isBrowser()) {
    return {
      ok: false,
      url: "",
      error: new Error("Lead tracking só pode ser executado no navegador."),
    };
  }

  const params = buildLeadTrackingParams(config, payload);
  const baseUrl = config.baseUrl ?? DEFAULT_BASE_URL;
  const fullUrl = `${baseUrl}?${params.toString()}`;

  try {
    // eslint-disable-next-line no-console
    console.log("[leadTracking] Disparando webhook", {
      baseUrl,
      event: config.eventName ?? DEFAULT_EVENT_NAME,
      eventId: config.eventId ?? "",
      hasPayload: Boolean(payload),
      queryParams: params.toString(),
    });

    const response = await fetch(fullUrl, { method: "GET", mode: "cors", cache: "no-cache" });
    let data: any = null;

    try {
      data = await response.json();
    } catch (error) {
      data = null;
    }

    pushLeadTrackingToDataLayer("success", data, fullUrl, config.eventName ?? DEFAULT_EVENT_NAME);

    return {
      ok: true,
      url: fullUrl,
      data,
    };
  } catch (error) {
    pushLeadTrackingToDataLayer("error", {}, fullUrl, config.eventName ?? DEFAULT_EVENT_NAME);

    if (typeof Image !== "undefined") {
      const img = new Image();
      img.src = fullUrl;
    }

    return {
      ok: false,
      url: fullUrl,
      error,
    };
  }
}

export async function trackLeadEvent(options?: LeadTrackingConfig & LeadTrackingPayload) {
  const config: LeadTrackingConfig = {
    baseUrl: options?.baseUrl,
    eventId: options?.eventId ?? "",
    eventName: options?.eventName,
    gaPropertyId: options?.gaPropertyId,
  };

  const payload: LeadTrackingPayload = {
    leadEmail: options?.leadEmail,
    leadPhone: options?.leadPhone,
    ipAddress: options?.ipAddress,
    extraParams: options?.extraParams,
  };

  return sendLeadTracking(config, payload);
}


