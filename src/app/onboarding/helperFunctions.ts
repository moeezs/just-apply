import { GoogleGenAI, Type } from "@google/genai";
import { title } from "process";
const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });

const githubTemp = `[
    {
        "url": "/moeezs/just-apply",
        "name": "just-apply",
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
]`

const testJobDesc = `We are seeking a talented and motivated Software Engineer to join our dynamic team. The ideal candidate will have hands-on experience with TypeScript and Python, and a solid foundation in modern web development technologies, including HTML, CSS, and JavaScript. You will be responsible for designing, developing, and maintaining scalable web applications, collaborating closely with cross-functional teams, and contributing to all phases of the software development lifecycle.

Key Responsibilities:
- Develop and maintain high-quality web applications using TypeScript, Python, and related technologies.
- Collaborate with designers, product managers, and other engineers to deliver robust solutions.
- Write clean, efficient, and well-documented code.
- Participate in code reviews and provide constructive feedback to peers.
- Troubleshoot, debug, and optimize existing applications for performance and scalability.

Qualifications:
- Proficiency in TypeScript and Python.
- Strong understanding of web development fundamentals: HTML, CSS, and JavaScript.
- Experience with version control systems, especially Git and GitHub.
- Familiarity with PHP is a plus.
- Demonstrated ability to work on collaborative projects, preferably with open-source contributions.
- Excellent problem-solving skills and attention to detail.
- Strong communication and teamwork abilities.
`

export function githubRepoParser(rawJson: string) {
    const githubRepos = JSON.parse(rawJson);
    const parsedRepos = githubRepos.entries.map((repo: any) => ({
        url: `https://github.com${repo.url}`,
        name: repo.name,
        lang: repo.lang,
        desc: repo.desc,
        info: repo.info,
    }));
    return parsedRepos;
}

export async function relevantReposParser(repos: ReturnType<typeof githubRepoParser>, jobDesc: string) {
    // const response = await ai.models.generateContent({
    //     model: "gemini-1.5-flash",
    //     contents: [
    //         {
    //             role: "user",
    //             parts: [
    //                 {
    //                     text: `
    //                         You are an expert technical recruiter and software engineer. Your task is to analyze a candidate's GitHub repositories and a job description, and determine which repositories are most relevant to the job.

    //                         Instructions:
    //                         - Carefully read the provided job description.
    //                         - For each repository in the array, assess its relevance to the job description based on language, project type, and any other available information.
    //                         - For each repository object, add a boolean property "relevant": true if the repository is relevant to the job description, false otherwise. Please be picky. ONLY mark a repository as relevant if it is a match for the job description. 
    //                         - Do not infer or hallucinate details not present in the input.
    //                         - Respond ONLY with the modified JSON array, preserving all original properties and order, and adding the "relevant" property to each object.

    //                         Repositories:
    //                         ${JSON.stringify(repos, null, 2)}

    //                         Job Description:
    //                         ${jobDesc}
    //                         `,
    //                 }
    //             ]
    //         }
    //     ],
    //     config: {
    //         responseMimeType: "application/json",
    //         responseSchema: {
    //             type: Type.ARRAY,
    //             items: {
    //                 type: Type.OBJECT,
    //                 properties: {
    //                     url: { type: Type.STRING },
    //                     name: { type: Type.STRING },
    //                     lang: { type: Type.STRING },
    //                     desc: { type: Type.STRING },
    //                     info: { type: Type.STRING },
    //                     relevant: { type: Type.BOOLEAN }
    //                 },
    //                 propertyOrdering: ["url", "name", "lang", "desc", "info", "relevant"]
    //             }
    //         }
    //     }
    // });

    // console.log(response.text);

    const sampleRes = `[
    {
        "url": "https://github.com/moeezs/just-apply",
        "name": "just-apply",
        "lang": "TypeScript",
        "desc": "",
        "info": "",
        "relevant": true
    },
    {
        "url": "https://github.com/moeezs/portfolio",
        "name": "portfolio",
        "lang": "TypeScript",
        "desc": "",
        "info": "",
        "relevant": false
    },
    {
        "url": "https://github.com/moeezs/studysaver",
        "name": "studysaver",
        "lang": "TypeScript",
        "desc": "",
        "info": "",
        "relevant": false
    },
    {
        "url": "https://github.com/moeezs/VocabBuddy",
        "name": "VocabBuddy",
        "lang": "TypeScript",
        "desc": "",
        "info": "",
        "relevant": false
    },
    {
        "url": "https://github.com/moeezs/yapandyap",
        "name": "yapandyap",
        "lang": "JavaScript",
        "desc": "",
        "info": "",
        "relevant": false
    },
    {
        "url": "https://github.com/moeezs/HoopsDynasty",
        "name": "HoopsDynasty",
        "lang": "PHP",
        "desc": "",
        "info": "",
        "relevant": false
    },
    {
        "url": "https://github.com/moeezs/team45_site",
        "name": "team45_site",
        "lang": "HTML",
        "desc": "",
        "info": "",
        "relevant": false
    },
    {
        "url": "https://github.com/moeezs/1xd3-final-proj",
        "name": "1xd3-final-proj",
        "lang": "CSS",
        "desc": "",
        "info": "",
        "relevant": false
    },
    {
        "url": "https://github.com/moeezs/Commence",
        "name": "Commence",
        "lang": "Python",
        "desc": "",
        "info": "",
        "relevant": true
    },
    {
        "url": "https://github.com/moeezs/DataScrape",
        "name": "DataScrape",
        "lang": "Python",
        "desc": "",
        "info": "",
        "relevant": true
    },
    {
        "url": "https://github.com/moeezs/learn-node",
        "name": "learn-node",
        "lang": "JavaScript",
        "desc": "",
        "info": "",
        "relevant": false
    },
    {
        "url": "https://github.com/moeezs/Finance-Tracker",
        "name": "Finance-Tracker",
        "lang": "JavaScript",
        "desc": "",
        "info": "",
        "relevant": false
    },
    {
        "url": "https://github.com/moeezs/TodoList",
        "name": "TodoList",
        "lang": "JavaScript",
        "desc": "",
        "info": "",
        "relevant": false
    },
    {
        "url": "https://github.com/moeezs/Resume-Analyzer",
        "name": "Resume-Analyzer",
        "lang": "JavaScript",
        "desc": "",
        "info": "",
        "relevant": false
    },
    {
        "url": "https://github.com/moeezs/GoPic",
        "name": "GoPic",
        "lang": "Swift",
        "desc": "",
        "info": "",
        "relevant": false
    },
    {
        "url": "https://github.com/moeezs/CareSync",
        "name": "CareSync",
        "lang": "Java",
        "desc": "",
        "info": "",
        "relevant": false
    },
    {
        "url": "https://github.com/moeezs/ChatItUp",
        "name": "ChatItUp",
        "lang": "JavaScript",
        "desc": "",
        "info": "",
        "relevant": false
    },
    {
        "url": "https://github.com/moeezs/Local-Email-System",
        "name": "Local-Email-System",
        "lang": "Python",
        "desc": "",
        "info": "",
        "relevant": true
    }
]`
    return sampleRes;
}

export function rawToExperience(rawJson: string) {
    const rawExperience = JSON.parse(rawJson);
    const parsedExperience = rawExperience[0].experience.map((exp: any) => ({
        title: exp.title,
        company: exp.company,
        location: exp.location,
        duration: exp.duration,
        company2: exp.employment_type,
        description: exp.description,
    }));
    return parsedExperience;
}
export function extractProfileInfo(rawJson: string) {
    const profileData = JSON.parse(rawJson);
    const profile = profileData[0];
    
    return {
        fullName: profile.basic_info.fullname,
        headline: profile.basic_info.headline,
        location: profile.basic_info.location.full,
        latestEducation: profile.education[0] ? {
            school: profile.education[0].school,
            degree: profile.education[0].degree,
            duration: profile.education[0].duration
        } : null,
        skills: profile.experience
            .filter((exp: any) => exp.skills && exp.skills.length > 0)
            .flatMap((exp: any) => exp.skills),
        certifications: profile.certifications.map((cert: any) => ({
            name: cert.name,
            issuer: cert.issuer,
            issuedDate: cert.issued_date
        }))
    };
}
