import { NextRequest, NextResponse } from 'next/server';
import { SIMMO_SYSTEM_PROMPT } from 'lib/simmo-system-prompt';
import { getFallbackResponse } from 'lib/simmo-fallback';
import { SIMO_API_CONTEXT_SIZE } from 'lib/constants';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages, brand, page } = body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Invalid messages' }, { status: 400 });
    }

    const lastUserMsg = messages[messages.length - 1]?.content || '';

    // Mode fallback si pas de cle API
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({
        message: getFallbackResponse(lastUserMsg),
        fallback: true,
      });
    }

    const systemPrompt =
      SIMMO_SYSTEM_PROMPT +
      `\n\nCONTEXTE ACTUEL :\n- Page : ${page || '/'}\n- Sport actif : ${brand || 'aucun (homepage)'}\n- Adapte tes réponses à ce contexte.`;

    const apiMessages = messages.slice(-SIMO_API_CONTEXT_SIZE).map((m: { role: string; content: string }) => ({
      role: m.role,
      content: m.content,
    }));

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 500,
        system: systemPrompt,
        messages: apiMessages,
      }),
    });

    if (!response.ok) {
      return NextResponse.json({
        message: getFallbackResponse(lastUserMsg),
        fallback: true,
      });
    }

    const data = await response.json();
    const assistantMessage = data.content?.[0]?.text || getFallbackResponse(lastUserMsg);

    return NextResponse.json({ message: assistantMessage });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    // Production: replace with monitoring service (Sentry, LogRocket, etc.)
    console.error(`[SimmoChat] API error: ${message}`);
    return NextResponse.json({
      message: "Oups ! Simo a un petit souci technique \uD83D\uDC19 R\u00e9essaie dans un instant !",
      fallback: true,
    });
  }
}
