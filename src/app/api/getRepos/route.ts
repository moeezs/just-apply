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
const tempData = {entries: [
    {
        "url": "/moeezs/just-apply",
        "name": "just-apply",
        "lang": "TypeScript",
        "desc": "",
        "info": "",
        "stars": null,
        "forks": "",
        "updated": "2025-05-24T03:52:52Z"
    },
    {
        "url": "/moeezs/just-apply-old",
        "name": "just-apply-old",
        "lang": "TypeScript",
        "desc": "",
        "info": "",
        "stars": null,
        "forks": "",
        "updated": "2025-05-22T04:11:57Z"
    },
    {
        "url": "/moeezs/portfolio",
        "name": "portfolio",
        "lang": "TypeScript",
        "desc": "",
        "info": "",
        "stars": null,
        "forks": "",
        "updated": "2025-05-18T19:30:15Z"
    },
    {
        "url": "/moeezs/studysaver",
        "name": "studysaver",
        "lang": "TypeScript",
        "desc": "",
        "info": "",
        "stars": null,
        "forks": "",
        "updated": "2025-05-18T02:44:52Z"
    },
    {
        "url": "/moeezs/VocabBuddy",
        "name": "VocabBuddy",
        "lang": "TypeScript",
        "desc": "",
        "info": "",
        "stars": 1,
        "forks": "",
        "updated": "2025-05-16T17:59:45Z"
    },
    {
        "url": "/moeezs/yapandyap",
        "name": "yapandyap",
        "lang": "JavaScript",
        "desc": "",
        "info": "",
        "stars": null,
        "forks": "",
        "updated": "2025-05-04T02:27:19Z"
    },
    {
        "url": "/moeezs/HoopsDynasty",
        "name": "HoopsDynasty",
        "lang": "PHP",
        "desc": "",
        "info": "",
        "stars": null,
        "forks": "",
        "updated": "2025-04-26T22:52:05Z"
    },
    {
        "url": "/moeezs/team45_site",
        "name": "team45_site",
        "lang": "HTML",
        "desc": "",
        "info": "",
        "stars": null,
        "forks": "",
        "updated": "2025-04-26T19:25:39Z"
    },
    {
        "url": "/moeezs/1xd3-final-proj",
        "name": "1xd3-final-proj",
        "lang": "CSS",
        "desc": "",
        "info": "",
        "stars": null,
        "forks": "",
        "updated": "2025-03-30T20:26:47Z"
    },
    {
        "url": "/moeezs/Commence",
        "name": "Commence",
        "lang": "Python",
        "desc": "",
        "info": "",
        "stars": null,
        "forks": "",
        "updated": "2025-01-19T03:25:59Z"
    },
    {
        "url": "/moeezs/DataScrape",
        "name": "DataScrape",
        "lang": "Python",
        "desc": "",
        "info": "",
        "stars": null,
        "forks": "",
        "updated": "2025-01-09T00:56:16Z"
    },
    {
        "url": "/moeezs/learn-node",
        "name": "learn-node",
        "lang": "JavaScript",
        "desc": "",
        "info": "",
        "stars": null,
        "forks": "",
        "updated": "2024-12-22T17:36:13Z"
    },
    {
        "url": "/moeezs/Finance-Tracker",
        "name": "Finance-Tracker",
        "lang": "JavaScript",
        "desc": "",
        "info": "",
        "stars": null,
        "forks": "",
        "updated": "2024-11-29T04:44:43Z"
    },
    {
        "url": "/moeezs/TodoList",
        "name": "TodoList",
        "lang": "JavaScript",
        "desc": "",
        "info": "",
        "stars": null,
        "forks": "",
        "updated": "2024-11-24T00:23:19Z"
    },
    {
        "url": "/moeezs/Resume-Analyzer",
        "name": "Resume-Analyzer",
        "lang": "JavaScript",
        "desc": "",
        "info": "",
        "stars": null,
        "forks": "",
        "updated": "2024-11-23T02:10:24Z"
    },
    {
        "url": "/moeezs/GoPic",
        "name": "GoPic",
        "lang": "Swift",
        "desc": "",
        "info": "",
        "stars": null,
        "forks": "",
        "updated": "2024-11-12T19:36:55Z"
    },
    {
        "url": "/moeezs/CareSync",
        "name": "CareSync",
        "lang": "Java",
        "desc": "",
        "info": "",
        "stars": null,
        "forks": "",
        "updated": "2024-11-10T18:36:25Z"
    },
    {
        "url": "/moeezs/ChatItUp",
        "name": "ChatItUp",
        "lang": "JavaScript",
        "desc": "",
        "info": "",
        "stars": null,
        "forks": "",
        "updated": "2023-09-04T16:05:59Z"
    },
    {
        "url": "/moeezs/Local-Email-System",
        "name": "Local-Email-System",
        "lang": "Python",
        "desc": "",
        "info": "",
        "stars": null,
        "forks": "",
        "updated": "2023-08-17T03:31:50Z"
    }
]};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');
  const urlReq = username + "?tab=repositories";

  if (!username) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 });
  }
  return NextResponse.json(tempData);

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

