"use client";

import { useState, useEffect } from "react";
import { coverLetterOutput } from "./geminiOutput";

// Type definitions
interface CoverLetterHeader {
    hiringManagerName: string;
    title: string;
    companyName: string;
    companyAddress: string;
    location: string;
    hiringManagerTitle?: string;
    hiringManagerCompany?: string;
    hiringManagerAddress?: string;
    hiringManagerLocation?: string;
    hiringManagerEmail?: string;
    hiringManagerPhone?: string;
}

interface CoverLetterData {
    header: CoverLetterHeader;
    paragraphs: string[];
}

interface BasicInfo {
    github: string;
    linkedin: string;
    phone: string;
    email: string;
    portfolio: string;
}

interface ProfileData {
    fullName: string;
    location: string;
    latestEducation?: {
        school: string;
        degree: string;
        duration: string;
    };
    certifications?: Array<{
        name: string;
        issuer: string;
        issued_date: string;
    }>;
    skills?: string[];
}

interface SessionData {
    jobDesc: string;
    selectedExperience: string;
    selectedRepos: string;
    profileData: string;
    basicInfo: string;
    generatedCoverLetter?: string;
}

export default function CoverLetterPage() {
    const [coverLetterData, setCoverLetterData] = useState<CoverLetterData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [basicInfo, setBasicInfo] = useState<BasicInfo>({
        github: "",
        linkedin: "",
        phone: "",
        email: "",
        portfolio: ""
    });
    const [profileDataParsed, setProfileDataParsed] = useState<ProfileData>({
        fullName: "",
        location: ""
    });

    useEffect(() => {
        const generateCoverLetter = async () => {
            try {
                setIsLoading(true);
                
                let jobDesc = "";
                let relevantExperiences = "[]";
                let relevantProjects = "[]";
                let profileData = "{}";
                let basicInfoData: BasicInfo = {
                    github: "",
                    linkedin: "",
                    phone: "",
                    email: "",
                    portfolio: ""
                };
                let preGeneratedCoverLetter: string | null = null;
                
                if (typeof window !== 'undefined') {
                    const urlParams = new URLSearchParams(window.location.search);
                    const sessionDataParam = urlParams.get('session-data');
                    
                    if (sessionDataParam) {
                        try {
                            const decodedData: SessionData = JSON.parse(decodeURIComponent(sessionDataParam));
                            
                            jobDesc = decodedData.jobDesc || "";
                            relevantExperiences = decodedData.selectedExperience || "[]";
                            relevantProjects = decodedData.selectedRepos || "[]";
                            profileData = decodedData.profileData || "{}";
                            basicInfoData = JSON.parse(decodedData.basicInfo || "{}") as BasicInfo;
                            preGeneratedCoverLetter = decodedData.generatedCoverLetter || null;
                            
                        } catch (e) {
                            console.error("Error parsing session data from URL:", e);
                        }
                    } else {
                        jobDesc = sessionStorage.getItem("jobDesc") || "";
                        relevantExperiences = sessionStorage.getItem("selectedExperience") || "[]";
                        relevantProjects = sessionStorage.getItem("selectedRepos") || "[]";
                        profileData = sessionStorage.getItem("profileData") || "{}";
                        basicInfoData = JSON.parse(sessionStorage.getItem("basicInfo") || "{}") as BasicInfo;
                        preGeneratedCoverLetter = sessionStorage.getItem("generatedCoverLetter");
                        
                        console.log("Using data from sessionStorage");
                    }
                }
                
                setBasicInfo(basicInfoData);
                
                let data: string;
                if (preGeneratedCoverLetter) {
                    data = preGeneratedCoverLetter;
                } else {
                    data = await JSON.stringify(coverLetterOutput(jobDesc, relevantExperiences, relevantProjects, profileData))
                }
                
                const parsedData: CoverLetterData = JSON.parse(data || "{}");
                const parsedProfileData: ProfileData = JSON.parse(profileData || "{}");
                setProfileDataParsed(parsedProfileData);

                setCoverLetterData(parsedData);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
                console.error('Error generating cover letter:', err);
            } finally {
                setIsLoading(false);
                document.body.classList.add('content-loaded');
            }
        };

        generateCoverLetter();
    }, []);

    if (isLoading) {
        return (
            <div className="max-w-4xl mx-auto p-8 bg-white min-h-screen flex items-center justify-center">
                <p>Generating cover letter...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-4xl mx-auto p-8 bg-white min-h-screen flex items-center justify-center">
                <p className="text-red-600">Error: {error}</p>
            </div>
        );
    }

    if (!coverLetterData) {
        return (
            <div className="max-w-4xl mx-auto p-8 bg-white min-h-screen flex items-center justify-center">
                <p>No cover letter data available</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white min-h-screen">
            <div className="space-y-6">
                <div className="text-right space-y-1">
                    <h1 className="text-2xl font-bold text-gray-900">{profileDataParsed?.fullName || "[Your Full Name]"}</h1>
                    <p className="text-gray-700">{basicInfo?.phone || "[Your Phone Number]"}</p>
                    <p className="text-gray-700">{basicInfo?.email || "[Your Email Address]"}</p>
                    <p className="text-gray-700">{profileDataParsed?.location || "[Your Location]"}</p>
                </div>

                {/* Date */}
                <div className="text-right">
                    {new Date().toLocaleDateString('en-GB', { 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric' 
                    }).replace(/ ([0-9]{4})$/, ', $1')}
                </div>

                {/* Hiring manager info */}
                <div className="space-y-1">
                    <p className="text-gray-900 font-semibold">{coverLetterData.header.hiringManagerName}</p>
                    {coverLetterData.header.hiringManagerTitle !== "N/A" && (
                        <p className="text-gray-700">{coverLetterData.header.hiringManagerTitle}</p>
                    )}
                    {coverLetterData.header.hiringManagerCompany !== "N/A" && (
                        <p className="text-gray-700">{coverLetterData.header.hiringManagerCompany}</p>
                    )}
                    {coverLetterData.header.hiringManagerAddress !== "N/A" && (
                        <p className="text-gray-700">{coverLetterData.header.hiringManagerAddress}</p>
                    )}
                    {coverLetterData.header.hiringManagerLocation !== "N/A" && (
                        <p className="text-gray-700">{coverLetterData.header.hiringManagerLocation}</p>
                    )}
                    {coverLetterData.header.hiringManagerEmail !== "N/A" && (
                        <p className="text-gray-700">{coverLetterData.header.hiringManagerEmail}</p>
                    )}
                    {coverLetterData.header.hiringManagerPhone !== "N/A" && (
                        <p className="text-gray-700">{coverLetterData.header.hiringManagerPhone}</p>
                    )}
                </div>
                {/* <div className="space-y-1">
                    <p className="text-gray-700">{coverLetterData.header.title}</p>
                    <p className="text-gray-700">{coverLetterData.header.companyName}</p>
                    <p className="text-gray-700">{coverLetterData.header.companyAddress}</p>
                    <p className="text-gray-700">{coverLetterData.header.location}</p>
                </div> */}

                {/* Salutation */}
                <div>
                    <p className="text-gray-900">Dear {coverLetterData.header.hiringManagerName},</p>
                </div>

                {/* Body paragraphs */}
                <div className="space-y-4 text-gray-800 leading-relaxed">
                    {coverLetterData.paragraphs.map((paragraph: string, index: number) => (
                        <p key={index}>{paragraph}</p>
                    ))}
                </div>

                {/* Closing */}
                <div className="space-y-4">
                    <p className="text-gray-900">Sincerely,</p>
                    <div className="pt-2">
                        <p className="text-gray-900 font-semibold">{profileDataParsed?.fullName || "[Your Full Name]"}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}