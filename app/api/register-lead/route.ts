import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, phone } = body;

    // Chamada para a API externa
    const response = await fetch('https://xkb1r81n29.execute-api.us-east-1.amazonaws.com/dev/register/lead/lp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error('Falha ao registrar lead');
    }

    const data = await response.json();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Erro ao processar requisição:', error);
    return NextResponse.json(
      { success: false, message: 'Erro ao registrar lead' },
      { status: 500 }
    );
  }
} 