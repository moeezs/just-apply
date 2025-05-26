"use client";

import { useState, useEffect } from "react";

export default function CoverLetterPage() {
    const [coverLetterData, setCoverLetterData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [basicInfo, setBasicInfo] = useState<any>({});
    const [profileDataParsed, setProfileDataParsed] = useState<any>({});
    const [isManualPdfMode, setIsManualPdfMode] = useState(false);

    useEffect(() => {
        // Check if this is manual PDF mode
        const urlParams = new URLSearchParams(window.location.search);
        setIsManualPdfMode(urlParams.get('manual-pdf') === 'true');

        const generateCoverLetter = async () => {
            try {
                setIsLoading(true);
                
                let jobDesc = "";
                let relevantExperiences = "[]";
                let relevantProjects = "[]";
                let profileData = "{}";
                let basicInfoData = {};
                let preGeneratedCoverLetter = null;
                
                if (typeof window !== 'undefined') {
                    const urlParams = new URLSearchParams(window.location.search);
                    const sessionDataParam = urlParams.get('session-data');
                    
                    if (sessionDataParam) {
                        try {
                            const decodedData = JSON.parse(decodeURIComponent(sessionDataParam));
                            
                            jobDesc = decodedData.jobDesc || "";
                            relevantExperiences = decodedData.selectedExperience || "[]";
                            relevantProjects = decodedData.selectedRepos || "[]";
                            profileData = decodedData.profileData || "{}";
                            basicInfoData = JSON.parse(decodedData.basicInfo || "{}");
                            preGeneratedCoverLetter = decodedData.generatedCoverLetter || null;
                            
                        } catch (e) {
                            console.error("Error parsing session data from URL:", e);
                        }
                    } else {
                        jobDesc = sessionStorage.getItem("jobDesc") || "";
                        relevantExperiences = sessionStorage.getItem("selectedExperience") || "[]";
                        relevantProjects = sessionStorage.getItem("selectedRepos") || "[]";
                        profileData = sessionStorage.getItem("profileData") || "{}";
                        basicInfoData = JSON.parse(sessionStorage.getItem("basicInfo") || "{}");
                        preGeneratedCoverLetter = sessionStorage.getItem("generatedCoverLetter");
                        
                        console.log("Using data from sessionStorage");
                    }
                }
                
                setBasicInfo(basicInfoData);
                
                let data;
                if (preGeneratedCoverLetter) {
                    data = preGeneratedCoverLetter;
                } else {
                    const response = await fetch('/api/generateCoverLetter', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            jobDesc,
                            relevantExperiencesIn: relevantExperiences,
                            relevantProjectsIn: relevantProjects,
                            profileDataIn: profileData
                        }),
                    });

                    if (!response.ok) {
                        throw new Error('Failed to generate cover letter');
                    }

                    data = await response.text();
                }
                
                const parsedData = JSON.parse(data || "{}");
                setProfileDataParsed(JSON.parse(profileData || "{}"));

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
            {isManualPdfMode && (
                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h2 className="text-lg font-semibold text-blue-800 mb-2">📄 Manual PDF Generation</h2>
                    <p className="text-blue-700 mb-2">
                        To save this cover letter as a PDF:
                    </p>
                    <ol className="list-decimal list-inside text-blue-700 text-sm space-y-1">
                        <li>Press <kbd className="px-1 py-0.5 bg-blue-100 rounded">Ctrl+P</kbd> (or <kbd className="px-1 py-0.5 bg-blue-100 rounded">Cmd+P</kbd> on Mac)</li>
                        <li>In the print dialog, select &quot;Save as PDF&quot; as the destination</li>
                        <li>Name the file &quot;cover-letter.pdf&quot;</li>
                        <li>Click &quot;Save&quot;</li>
                    </ol>
                </div>
            )}
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