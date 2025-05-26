import { NextRequest } from 'next/server';
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { jobDesc, relevantExperiencesIn, relevantProjectsIn, profileDataIn } = await req.json();
    
    if (!jobDesc || !relevantExperiencesIn || !relevantProjectsIn || !profileDataIn) {
      return new Response(JSON.stringify({ error: 'Missing required parameters' }), {
        status: 400,
      });
    }

    const relevantExperiences = JSON.parse(relevantExperiencesIn);
    const relevantProjects = JSON.parse(relevantProjectsIn);
    const profileData = JSON.parse(profileDataIn);
    
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
                                - Body paragraphs (2-3): Strategically showcase relevant experience, projects, and skills with specific examples
                                - Closing paragraph: Reinforce value proposition and include strong call to action
                                - Each paragraph must be a separate element in an array
                                - You ARE NOT TO implement ANY placeholders at all. The output must be a complete cover letter with no placeholders.
                                - Use a professional and clean format, ensuring readability and clarity

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

    return new Response(response.text, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Cover letter generation error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: 'Failed to generate cover letter', details: errorMessage }), {
      status: 500,
    });
  }
}
