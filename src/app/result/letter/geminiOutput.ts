import { GoogleGenAI, Type } from "@google/genai";
const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });

export async function coverLetterOutput(jobDesc: string, relevantExperiencesIn: string, relevantProjectsIn: string, profileDataIn: string) {
    const relevantExperiences = JSON.parse(relevantExperiencesIn);
    const relevantProjects = JSON.parse(relevantProjectsIn);
    const profileData = JSON.parse(profileDataIn);
    /*
    const response = await ai.models.generateContent({
        model: "gemini-1.5-flash",
        contents: [
            {
                role: "user",
                parts: [
                    {
                        text: `
                                You are an elite cover letter writing specialist and career strategist with 15+ years of experience helping candidates secure positions at top-tier companies. You have an exceptional understanding of what hiring managers look for and how to craft compelling narratives that showcase candidates' unique value propositions.

                                Your mission is to create an outstanding, personalized cover letter that will make the candidate stand out from hundreds of other applicants. You will be provided with the candidate's background information and a job description, and you must craft a cover letter that strategically positions them as the ideal candidate.

                                **CRITICAL INSTRUCTIONS:**

                                **1. HEADER FORMATTING:**
                                You must extract and format the following information from the job description. If any information cannot be found, follow these specific rules:
                                - Hiring Manager Name: If not found, use "To Whom It May Concern"
                                - Title: Extract the exact job title from the posting
                                - Company Name: Extract the exact company name
                                - Company Address: If not available, write "[N/A]"
                                - City, State ZIP Code: If not available, write "[N/A]"

                                **2. CONTENT STRATEGY:**
                                - Be highly selective - only use the most relevant and impressive elements from the provided background
                                - Focus on achievements with quantifiable impact rather than just listing experiences
                                - Create a compelling narrative that shows progression and growth
                                - Demonstrate clear understanding of the company's needs and how the candidate fulfills them
                                - Show genuine enthusiasm and cultural fit
                                - Use action verbs and specific examples
                                - Avoid generic statements and clichés

                                **3. STRUCTURE REQUIREMENTS:**
                                - Opening paragraph: Hook the reader with your strongest qualification and show company knowledge
                                - Body paragraphs (3-4): Strategically showcase relevant experience, projects, and skills with specific examples
                                - Closing paragraph: Reinforce value proposition and include strong call to action
                                - Each paragraph must be a separate element in an array

                                **4. TONE AND STYLE:**
                                - Professional yet personable
                                - Confident but not arrogant
                                - Specific and concrete rather than vague
                                - Show personality while maintaining professionalism
                                - Tailor language to match company culture (startup vs. enterprise, etc.)

                                **5. RESPONSE FORMAT:**
                                Return a JSON object with this exact structure:
                                {
                                    "header": {
                                        "hiringManagerName": "[Name or 'To Whom It May Concern']",
                                        "title": "[Job Title]",
                                        "companyName": "[Company Name]",
                                        "companyAddress": "[Address or '[N/A]']",
                                        "location": "[City, State ZIP Code or '[N/A]']"
                                    },
                                    "paragraphs": [
                                        "Opening paragraph text here...",
                                        "Body paragraph 1 text here...",
                                        "Body paragraph 2 text here...",
                                        "Closing paragraph text here..."
                                    ]
                                }

                                **INPUT INFORMATION TO ANALYZE:**

                                **Candidate Background:**
                                - School: ${profileData?.latestEducation?.school} studying ${profileData?.latestEducation?.degree} for ${profileData?.latestEducation?.duration}
                                - Relevant Experiences: ${relevantExperiences.map((experience: any) => `${experience.title} at ${experience.company} ${experience.company2} (${experience.duration})`).join(", ")}
                                - Relevant Projects: ${relevantProjects.map((repo: any) => `${repo.name} (${repo.description})`).join(", ")}
                                - Certifications: ${profileData?.certifications?.map((cert: any) => cert.name).join(", ") || "None"}
                                - Skills: ${profileData?.skills?.join(", ") || "None"}

                                **Job Description:**
                                ${jobDesc}

                                **Remember:** You are creating a masterpiece that could be the difference between getting an interview and being overlooked. Every word must serve a purpose. Every sentence must add value. Make this candidate unforgettable.
                                `
                    }
                ]
            }
        ],
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    header: {
                        type: Type.OBJECT,
                        properties: {
                            hiringManagerName: { type: Type.STRING },
                            title: { type: Type.STRING },
                            companyName: { type: Type.STRING },
                            companyAddress: { type: Type.STRING },
                            location: { type: Type.STRING }
                        },
                        required: ["hiringManagerName", "title", "companyName", "companyAddress", "location"]
                    },
                    paragraphs: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING }
                    }
                },
                required: ["header", "paragraphs"]
            }
        }
    });
    */

    // console.log(response.text);
    // return response.text;
    return JSON.stringify(sample)
}


const sample = {
    "header": {
        "companyAddress": "845 Mission Street, Suite 1200, San Francisco, CA 94103",
        "companyName": "Lunaris Digital Inc.",
        "hiringManagerName": "Avery Kim, Director of Engineering",
        "location": "San Francisco, CA 94103",
        "title": "Senior TypeScript Web Developer"
    },
    "paragraphs": [
        "While my academic journey at McMaster University, pursuing a BASc in Computer Science, is still ongoing (anticipated graduation: April 2029), my experience leading software development within student organizations like McMaster Robo Sub and McMaster Aerial Robotics & Drones Club has prepared me to excel as your Senior TypeScript Web Developer. Lunaris Digital's commitment to building scalable and visually stunning web applications deeply resonates with my passion for crafting high-quality, performant software.",
        "My contributions to McMaster Robo Sub, where I served as a Software Team Member for five months, involved designing and implementing key algorithms critical to the autonomous navigation system of our underwater robot. This project sharpened my skills in problem-solving, collaborative development and directly contributed to improving our robot's maneuverability and efficiency by 15%. Similarly, my role at McMaster Aerial Robotics & Drones Club further solidified my proficiency in collaborative software development within a fast-paced team environment. While details of specific projects like 'just-apply' and 'studysaver' cannot be openly shared at this moment, I am able to showcase additional examples within my portfolio.",
        "My experience extends beyond academic projects. I'm proficient in Xcode and iPhone Application Development, demonstrating a versatile skill set and capacity to adapt to diverse technological environments. I possess a strong understanding of Git & Github and adhere to robust code review practices, essential for maintaining a high standard of code quality. My experience with collaborative software development, including agile methodologies, makes me confident in my ability to seamlessly integrate into your team and contribute from day one.",
        "I am eager to leverage my skills and passion for web development to contribute to Lunaris Digital's success. The opportunity to work on challenging projects alongside a team of talented engineers excites me. My portfolio ( [insert portfolio link here] ) provides further details on my projects. Thank you for your time and consideration. I am available for an interview at your earliest convenience."
    ]
};