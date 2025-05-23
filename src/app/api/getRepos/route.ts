import { NextResponse } from 'next/server';
const gs = require('github-scraper');

interface GitHubRepoData {
  entries: Array<{
    url: string;
    name: string;
    lang: string;
    desc: string;
    info: string;
    stars: string;
    forks: string;
    updated: string;
  }>;
}
const mockData: GitHubRepoData = {
  entries: [{
    url: 'https://github.com/iteles/learn-ab-and-multivariate-testing',
    name: 'learn-ab-and-multivariate-testing',
    lang: '',
    desc: 'Tutorial on A/B and multivariate testing',
    info: '',
    stars: '4',
    forks: '0',
    updated: '2015-07-08T08:36:37Z'
  }]
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');
  const urlReq = username + "?tab=repositories";

  if (!username) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 });
  }

  return new Promise((resolve) => {
    gs(urlReq, (err: Error, data: GitHubRepoData) => {
      if (err) {
        resolve(
          NextResponse.json({ error: 'Failed to scrape GitHub repos' }, { status: 500 })
        );
      } else {
        resolve(NextResponse.json(data));
      }
    });
  });
}
