'use client'
import Link from 'next/link';
import React, { useState, useEffect } from 'react'
import { CiGlobe, CiLinkedin, CiMail, CiPhone } from "react-icons/ci";
import { FaGithub } from "react-icons/fa";

export default function Resume() {
    const [profileData, setProfileData] = useState<any>({});
    const [basicInfo, setBasicInfo] = useState<any>({});
    const [selectedRepos, setSelectedRepos] = useState<any[]>([]);
    const [selectedExperiences, setSelectedExperiences] = useState<any[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Only access sessionStorage on the client side
        if (typeof window !== 'undefined') {
            setProfileData(JSON.parse(sessionStorage.getItem('profileData') || '{}'));
            setBasicInfo(JSON.parse(sessionStorage.getItem('basicInfo') || '{}'));
            setSelectedRepos(JSON.parse(sessionStorage.getItem('selectedRepos') || '[]'));
            setSelectedExperiences(JSON.parse(sessionStorage.getItem('selectedExperience') || '[]'));
            setIsLoaded(true);
        }
    }, []);

    // Helper function to format URLs
    const formatUrl = (url: string, type?: string) => {
        if (!url) return '';
        
        if (type === 'github') {
            // For GitHub, assume it's just a username and create the full URL
            return `https://github.com/${url}`;
        }
        
        if (url.startsWith('http://') || url.startsWith('https://')) {
            return url;
        }
        return `https://${url}`;
    };

    if (!isLoaded) {
        return <div className="max-w-4xl mx-auto p-8 mt-10">Loading...</div>;
    }

    return (

    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg mt-10">
        {/* <!-- Header --> */}
        <div>
            <div className="flex justify-between items-center border-b pb-4 mb-3">
                <div>
                    <h1 className="text-4xl font-bold">{profileData?.fullName}</h1>
                    <p className="text-lg text-gray-600">{basicInfo?.email} | {basicInfo?.phone}</p>
                </div>
                <div className="text-right">
                    <p className="text-sm text-gray-500">{profileData?.location}</p>
                </div>
            </div>
            <div className="flex space-x-4 mb-3 justify-center w-full">
                {basicInfo?.github && (
                    <a href={formatUrl(basicInfo.github, 'github')} className="text-blue-600 hover:underline flex items-center" target="_blank" rel="noopener noreferrer">
                        <FaGithub className='mr-1' /><span className="text-gray-500"> GitHub</span>
                    </a>
                )}
                {basicInfo?.linkedin && (
                    <a href={formatUrl(basicInfo.linkedin)} className="text-blue-600 hover:underline flex items-center" target="_blank" rel="noopener noreferrer">
                        <CiLinkedin className='mr-1' /><span className="text-gray-500"> LinkedIn</span>
                    </a>
                )}
                {basicInfo?.portfolio && (
                    <a href={formatUrl(basicInfo.portfolio)} className="text-blue-600 hover:underline flex items-center" target="_blank" rel="noopener noreferrer">
                        <CiGlobe className='mr-1' /><span className="text-gray-500"> Portfolio</span>
                    </a>
                )}
                {basicInfo?.phone && (
                    <Link href={`tel:${basicInfo.phone}`} className="text-blue-600 hover:underline flex items-center">
                        <CiPhone className='mr-1' /><span className="text-gray-500"> Phone</span>
                    </Link>
                )}
                {basicInfo?.email && (
                    <Link href={`mailto:${basicInfo.email}`} className="text-blue-600 hover:underline flex items-center">
                        <CiMail className="mr-1" /><span className="text-gray-500">Email</span>
                    </Link>
                )}
            </div>
            {/* <p className="text-xl text-gray-700 mb-4">{profileData?.headline}</p> */}
        </div>



        {/* <!-- Skills Section --> */}
        <section className="mb-8">
            <h2 className="text-2xl font-semibold border-b pb-2 mb-4">Skills</h2>
            <ul className="list-disc pl-5 space-y-1">
                {profileData?.skills.map((skill: string, index: number) => (
                    <li key={index}>{skill}</li>
                ))}
            </ul>
        </section>

        {/* <!-- Education Section --> */}
        <section className="mb-8">
            <h2 className="text-2xl font-semibold border-b pb-2 mb-4">Education</h2>
            <div className="mb-6">
                <p className="text-lg font-bold">{profileData?.latestEducation?.degree}</p>
                <p className="text-sm text-gray-600">{profileData?.latestEducation?.school}, {profileData?.latestEducation?.duration}</p>
            </div>
            {/* <div>
                <p className="text-lg font-bold">B.S. Multidisciplinary Studies with Focus in IT</p>
                <p className="text-sm text-gray-600">[University Name], Jun 2018 - May 2022</p>
                <p className="text-sm text-gray-600">Relevant Courses: Computer Science Fundamentals, Data Structures, Web Development</p>
            </div> */}
        </section>

        {/* <!-- Work Experience Section --> */}
        <section className="mb-8">
            <h2 className="text-2xl font-semibold border-b pb-2 mb-4">Work Experience</h2>
            {selectedExperiences.map((experience: any, index: number) => (
                <div key={index} className="mb-6">
                    <p className="text-lg font-bold">{experience.title} | {experience.company} {experience.company2}</p>
                    <p className="text-sm text-gray-600">{experience.duration}</p>
                </div>
            ))}

            {/* <div className="mb-6">
                <p className="text-lg font-bold">{selectedExperiences[0]?.title} | [Company Name]</p>
                <p className="text-sm text-gray-600">Jan 2024 - Present</p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                    <li>Developed and maintained web applications using React.js and Node.js, improving site performance by 30%.</li>
                    <li>Collaborated with cross-functional teams to design and implement RESTful APIs.</li>
                    <li>Utilized MySQL and MongoDB to manage and optimize database systems, reducing query times by 15%.</li>
                    <li>Led the integration of third-party services and APIs, enhancing application functionality.</li>
                    <li>Conducted code reviews and provided mentorship to junior developers, ensuring code quality and best practices.</li>
                    <li>Automated deployment processes using Jenkins and Docker, reducing deployment time by 50%.</li>
                </ul>
            </div> */}


            {/* <div className="mb-6">
                <p className="text-lg font-bold">IT Support Technician | [University Name]</p>
                <p className="text-sm text-gray-600">Aug 2021 - Mar 2022</p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                    <li>Provided technical support for over 300 students and faculty, resolving 90% of issues on first contact.</li>
                    <li>Maintained and upgraded software on university computers, ensuring systems were up-to-date and secure.</li>
                    <li>Created and delivered training sessions on software tools, improving user proficiency and reducing support calls by 25%.</li>
                    <li>Collaborated with the IT team to roll out new hardware and software solutions across the campus.</li>
                </ul>
            </div> */}
        </section>

        {/* <!-- Projects Section --> */}
        <section className="mb-8">
            <h2 className="text-2xl font-semibold border-b pb-2 mb-4">Projects</h2>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                {selectedRepos.map((repo: any, index: number) => (
                    <li key={index}>
                        <strong>{repo.name}</strong> : {repo.description} <br />
                        <em>{repo.lang}</em>
                    </li>
                ))}
                {/* <li><strong>[Project Name]</strong>: Developed a real-time chat application using Node.js, Express, and WebSocket. Implemented authentication with JWT and OAuth.</li>
                <li><strong>[Project Name]</strong>: Created an e-commerce platform using React.js and MongoDB. Integrated Stripe for payment processing.</li>
                <li><strong>[Project Name]</strong>: Automated the deployment of a microservices architecture on AWS using Docker and Kubernetes.</li> */}
            </ul>
        </section>

        {/* <!-- Certifications Section --> */}
        <section>
            <h2 className="text-2xl font-semibold border-b pb-2 mb-4">Certifications</h2>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                {profileData?.certifications.map((certification: any, index: number) => (
                    <li key={index}>
                        <strong>{certification.name}</strong> from {certification.issuer} - {certification.issuedDate}
                    </li>
                ))}
                {/* <li><strong>[Certification Name]</strong>: Issued by [Issuer], [Date]</li>
                <li><strong>[Certification Name]</strong>: Issued by [Issuer], [Date]</li> */}
            </ul>
        </section>
    </div>
    


  )
}