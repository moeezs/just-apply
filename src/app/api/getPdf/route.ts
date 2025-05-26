import { NextRequest } from 'next/server';

// Use dynamic imports to avoid type conflicts
let puppeteer: any;
let chromium: any;

async function getBrowser() {
  const isProduction = process.env.NODE_ENV === 'production';
  
  if (isProduction) {
    // Production/Vercel environment
    if (!puppeteer) puppeteer = await import('puppeteer-core');
    if (!chromium) chromium = await import('@sparticuz/chromium');
    
    return await puppeteer.default.launch({
      args: [...chromium.default.args, '--hide-scrollbars', '--disable-web-security'],
      defaultViewport: chromium.default.defaultViewport,
      executablePath: await chromium.default.executablePath(),
      headless: chromium.default.headless,
    });
  } else {
    // Development environment
    if (!puppeteer) puppeteer = await import('puppeteer');
    return await puppeteer.default.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { url, sessionData } = await req.json();
    console.log('PDF generation request:', { url, hasSessionData: !!sessionData });

    if (!url) {
      return new Response(JSON.stringify({ error: 'Missing URL' }), {
        status: 400,
      });
    }

    const fullUrl = new URL(url, req.url).toString();
    console.log('Full URL constructed:', fullUrl);

    console.log('Launching puppeteer browser...');
    
    const isProduction = process.env.NODE_ENV === 'production';
    const browser = await getBrowser();
    
    console.log('Browser launched successfully');

    const page = await browser.newPage();
    console.log('New page created');
    
    await page.setViewport({ width: 1200, height: 800 });
    
    const urlWithParams = new URL(fullUrl);
    urlWithParams.searchParams.append('generating-pdf', 'true');
    
    if (sessionData) {
      urlWithParams.searchParams.append('session-data', sessionData);
    }
    
    console.log(`Navigating to: ${urlWithParams.toString()}`);
    
    await page.goto(urlWithParams.toString(), { 
      waitUntil: 'networkidle2',
      timeout: isProduction ? 30000 : 60000 // Shorter timeout for production
    });
    console.log('Navigation completed');
    
    console.log('Waiting for content to load...');
    await page.waitForFunction(
      'document.querySelector("body").classList.contains("content-loaded") || document.readyState === "complete"',
      { timeout: isProduction ? 15000 : 10000 }
    );
    console.log('Content loading check completed');
  
    await new Promise(resolve => setTimeout(resolve, isProduction ? 1000 : 2000));
    console.log('Additional wait completed');
    
    console.log('Generating PDF...');
    const buffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '0cm',
        right: '0cm',
        bottom: '0cm',
        left: '0cm'
      },
      preferCSSPageSize: true,
    });
    console.log('PDF generated successfully, size:', buffer.length);
    
    await browser.close();
    console.log('Browser closed');

    return new Response(buffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Length': buffer.length.toString(),
      },
    });
  } catch (error) {
    console.error('PDF generation error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: 'Failed to generate PDF', details: errorMessage }), {
      status: 500,
    });
  }
}
