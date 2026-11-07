import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const format = searchParams.get('format') || '9x16-mp4';

  if (format.startsWith('16x9')) {
    return NextResponse.redirect('https://n.uguu.se/HfcxObDP.mp4', 302);
  }

  return NextResponse.redirect('https://n.uguu.se/PjUTpBwN.mp4', 302);
}
