import { NextRequest, NextResponse } from 'next/server';
import { SIMMO_SYSTEM_PROMPT } from 'lib/simmo-system-prompt';
import { getFallbackResponse } from 'lib/simmo-fallback';

export async function POST(request: NextRequest) {
  try {
    const { messages, brand, page } = await request.json();

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

    const apiMessages = messages.slice(-10).map((m: { role: string; content: string }) => ({
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
  } catch {
    return NextResponse.json({
      message: "Oups ! Simmo a un petit souci technique \uD83D\uDC19 Réessaie dans un instant !",
      fallback: true,
    });
  }
}
