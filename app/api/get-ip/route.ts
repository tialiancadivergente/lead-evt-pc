import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const forwarded = req.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : req.headers.get('x-real-ip') ?? 'IP não encontrado';

  return Response.json({ ip });
}