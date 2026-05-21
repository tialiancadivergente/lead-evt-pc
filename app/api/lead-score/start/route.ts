import { NextRequest, NextResponse } from "next/server";

const LEAD_SCORE_START_ENDPOINT =
  "https://leads-api.aliancadivergente.com.br/lead-score/start";
const BBF_X_API_KEY = process.env.BBF_X_API_KEY?.trim();

export async function POST(request: NextRequest) {
  try {
    if (!BBF_X_API_KEY) {
      return NextResponse.json(
        { message: "BBF_X_API_KEY nao configurada no servidor." },
        { status: 500 }
      );
    }

    const body = await request.json();

    const response = await fetch(LEAD_SCORE_START_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": BBF_X_API_KEY,
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const contentType = response.headers.get("content-type") ?? "";
    if (contentType.includes("application/json")) {
      const responseData = await response.json();
      return NextResponse.json(responseData, { status: response.status });
    }

    const textData = await response.text();
    return NextResponse.json(
      { message: textData || "Resposta invalida de lead-score/start." },
      { status: response.status }
    );
  } catch (error) {
    console.error("Erro no proxy lead-score/start:", error);
    return NextResponse.json(
      { message: "Erro ao processar lead-score/start." },
      { status: 500 }
    );
  }
}
