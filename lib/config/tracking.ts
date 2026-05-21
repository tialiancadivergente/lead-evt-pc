export const TRACKING_BASE_URL =
  process.env.NEXT_PUBLIC_TRACKING_BASE_URL ??
  "https://webhooks.o-meu-gps.com/webhook/lead";

export const TRACKING_EVENT_NAME =
  process.env.NEXT_PUBLIC_TRACKING_EVENT_NAME ?? "lead";

export const TRACKING_EVENT_ID =
  process.env.NEXT_PUBLIC_TRACKING_EVENT_ID ?? "";

export const TRACKING_GA_PROPERTY_ID =
  process.env.NEXT_PUBLIC_TRACKING_GA_ID ?? null;

export const TRACKING_SECONDARY_WEBHOOK =
  process.env.NEXT_PUBLIC_TRACKING_SECONDARY_WEBHOOK ??
  "https://webhooks.o-meu-gps.com/webhook/ce00d876-2ff9-484d-ba0e-219c01bd35a7";

export const TRACKING_LEADSCORE_SUMMARY_WEBHOOK =
  process.env.NEXT_PUBLIC_TRACKING_LEADSCORE_SUMMARY_WEBHOOK ??
  "https://webhooks.o-meu-gps.com/webhook/36054d79-8fd8-4294-b612-f09e5a92fb74";

export const TRACKING_LEADSCORE_RESPONSES_WEBHOOK =
  process.env.NEXT_PUBLIC_TRACKING_LEADSCORE_RESPONSES_WEBHOOK ??
  "https://webhooks.o-meu-gps.com/webhook/717c78ed-07f2-450e-94ac-fa995924a624";

export const TRACKING_LEADSCORE_EVENT_NAME =
  process.env.NEXT_PUBLIC_TRACKING_LEADSCORE_EVENT_NAME ?? "leadscore";

export const TRACKING_LEADSCORE_EVENT_ID =
  process.env.NEXT_PUBLIC_TRACKING_LEADSCORE_EVENT_ID ?? "";

export const TRACKING_PAGEVIEW_WEBHOOK =
  process.env.NEXT_PUBLIC_TRACKING_PAGEVIEW_WEBHOOK ??
  "https://webhooks.o-meu-gps.com/webhook/page_view";

export const TRACKING_PAGEVIEW_EVENT_NAME =
  process.env.NEXT_PUBLIC_TRACKING_PAGEVIEW_EVENT_NAME ?? "page_view";

export const TRACKING_PAGEVIEW_EVENT_ID =
  process.env.NEXT_PUBLIC_TRACKING_PAGEVIEW_EVENT_ID ?? "";

export const TRACKING_PAGEVIEW_DELAYED_WEBHOOK =
  process.env.NEXT_PUBLIC_TRACKING_PAGEVIEW_DELAYED_WEBHOOK ??
  "https://webhooks.o-meu-gps.com/webhook/3c5e3bf8-5e11-4327-9778-0736253538d9";


