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

    void jobDesc;


    const currentRes = repos.map((repo: any) => ({
        ...repo,
        relevant: "false" // for now
    }));
    return JSON.stringify(currentRes);
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
