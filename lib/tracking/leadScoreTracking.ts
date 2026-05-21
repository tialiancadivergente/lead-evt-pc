const DEFAULT_LEADSCORE_URL =
  "https://webhooks.o-meu-gps.com/webhook/registro_leadscore";

export interface LeadScoreTrackingOptions {
  baseUrl?: string;
  gaPropertyId?: string | null;
  answers?: Array<string | null | undefined>;
  resultadoV2?: string | null | undefined;
  pontuacaoV2?: string | number | null | undefined;
  extras?: Record<string, string | number | null | undefined>;
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

function extractGa4CookieId(gaId?: string | null): string | null {
  if (!gaId || gaId.indexOf("G-") !== 0) return null;
  const suffix = gaId.replace("G-", "");
  return getCookie(`_ga_${suffix}`);
}

function appendIfValue(params: URLSearchParams, key: string, value?: string | number | null) {
  if (value === undefined || value === null || value === "") return;
  params.append(key, String(value));
}

export function buildLeadScoreParams(options: LeadScoreTrackingOptions = {}) {
  const params = new URLSearchParams();

  appendIfValue(params, "ga_cookie", getCookie("_ga"));
  appendIfValue(params, "ga_propriedade", extractGa4CookieId(options.gaPropertyId));

  (options.answers ?? []).forEach((answer, index) => {
    const key = `pergunta${String(index + 1).padStart(2, "0")}`;
    appendIfValue(params, key, answer);
  });

  appendIfValue(params, "resultado_v2", options.resultadoV2);
  appendIfValue(params, "pontuacao_v2", options.pontuacaoV2);
  appendIfValue(params, "ts", Date.now());

  if (options.extras) {
    Object.entries(options.extras).forEach(([key, value]) => appendIfValue(params, key, value));
  }

  return params;
}

export async function sendLeadScoreTracking(options: LeadScoreTrackingOptions = {}) {
  if (!isBrowser()) {
    return {
      ok: false,
      url: "",
      error: new Error("Lead score tracking só pode ser executado no navegador."),
    };
  }

  const params = buildLeadScoreParams(options);
  const baseUrl = options.baseUrl ?? DEFAULT_LEADSCORE_URL;
  const fullUrl = `${baseUrl}?${params.toString()}`;

  // eslint-disable-next-line no-console
  console.log("[leadScoreTracking] Disparando webhook", {
    baseUrl,
    queryParams: params.toString(),
  });

  try {
    const response = await fetch(fullUrl, { method: "GET", mode: "cors", cache: "no-cache" });
    return {
      ok: response.ok,
      url: fullUrl,
    };
  } catch (error) {
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


