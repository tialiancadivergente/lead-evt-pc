import { NextRequest, NextResponse } from "next/server";
import {
  TRACKING_COOKIE_KEYS,
} from "@/lib/tracking/lead-tracking-cookie";
import { LeadRegistrationPayload } from "@/app/modules/lead-capture/lead-capture.model";

const EXTERNAL_ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/lead-registration/start`;
const BBF_X_API_KEY = process.env.BBF_X_API_KEY?.trim();

function getRequestIp(request: NextRequest): string {
  const xForwardedFor = request.headers.get("x-forwarded-for");
  if (xForwardedFor) {
    const [firstIp] = xForwardedFor.split(",");
    if (firstIp) {
      return firstIp.trim();
    }
  }

  return (
    request.headers.get("x-real-ip")?.trim() ??
    request.headers.get("cf-connecting-ip")?.trim() ??
    ""
  );
}

export async function POST(request: NextRequest) {
  try {
    if (!BBF_X_API_KEY) {
      return NextResponse.json(
        { message: "BBF_X_API_KEY nao configurada no servidor." },
        { status: 500 }
      );
    }

    const body = (await request.json()) as LeadRegistrationPayload;

    if (!body?.email || !body?.telefone) {
      return NextResponse.json(
        { message: "Campos obrigatorios: email e telefone." },
        { status: 400 }
      );
    }

    const mergedCookies = TRACKING_COOKIE_KEYS.reduce<Record<string, string>>(
      (acc, key) => {
        const cookieFromBody = body.metadados?.cookies?.[key] ?? "";
        const cookieFromRequest = request.cookies.get(key)?.value ?? "";
        acc[key] = cookieFromBody || cookieFromRequest;
        return acc;
      },
      {}
    );

    const payloadToExternalApi = {
      ...body,
      metadados: {
        ...body.metadados,
        ip: getRequestIp(request) || body.metadados?.ip || "",
        user_agent:
          request.headers.get("user-agent") || body.metadados?.user_agent || "",
        cookies: mergedCookies,
      },
    };

    const response = await fetch(EXTERNAL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": BBF_X_API_KEY,
      },
      body: JSON.stringify(payloadToExternalApi),
      cache: "no-store",
    });

    const responseType = response.headers.get("content-type") ?? "";
    if (responseType.includes("application/json")) {
      const responseData = await response.json();
      return NextResponse.json(responseData, { status: response.status });
    }

    const textData = await response.text();
    return NextResponse.json(
      {
        message: textData || "Resposta sem JSON do endpoint externo.",
      },
      { status: response.status }
    );
  } catch (error) {
    console.error("Erro no proxy lead-registration/start:", error);
    return NextResponse.json(
      { message: "Erro ao processar lead-registration/start." },
      { status: 500 }
    );
  }
}
