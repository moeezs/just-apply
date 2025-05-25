import { NextRequest } from 'next/server';
import puppeteer from 'puppeteer';

export async function POST(req: NextRequest) {
  try {
    const { url, sessionData } = await req.json();

    if (!url) {
      return new Response(JSON.stringify({ error: 'Missing URL' }), {
        status: 400,
      });
    }

    // Get the full URL by combining with the request origin
    const fullUrl = new URL(url, req.url).toString();

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    
    await page.setViewport({ width: 1200, height: 800 });
    
    const urlWithParams = new URL(fullUrl);
    urlWithParams.searchParams.append('generating-pdf', 'true');
    
    if (sessionData) {
      urlWithParams.searchParams.append('session-data', sessionData);
    }
    
    // console.log(`Navigating to: ${urlWithParams.toString()}`);
    
    await page.goto(urlWithParams.toString(), { waitUntil: 'networkidle2' });
    
    await page.waitForFunction(
      'document.querySelector("body").classList.contains("content-loaded") || document.readyState === "complete"',
      { timeout: 10000 }
    );
    
  
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const buffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '0cm',
        right: '0cm',
        bottom: '0cm',
        left: '0cm'
      }
    });
    
    await browser.close();

    return new Response(buffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Length': buffer.length.toString(),
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to generate PDF' }), {
      status: 500,
    });
  }
}
