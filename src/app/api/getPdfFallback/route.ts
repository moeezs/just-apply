import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { htmlContent, filename } = await req.json();

    if (!htmlContent) {
      return new Response(JSON.stringify({ error: 'Missing HTML content' }), {
        status: 400,
      });
    }

    // Use an external PDF service as fallback
    // This is a simple fallback that returns an error suggesting manual download
    return new Response(
      JSON.stringify({ 
        error: 'PDF generation temporarily unavailable. Please use browser print function (Ctrl+P) and save as PDF.',
        fallback: true 
      }), 
      {
        status: 503,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

  } catch (error) {
    console.error('Fallback PDF generation error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: 'Failed to generate PDF', details: errorMessage }), {
      status: 500,
    });
  }
}
