"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import * as helperFunctions from "@/app/onboarding/helperFunctions";
import { ScrollArea } from "@/components/ui/scroll-area";

const steps = [
  { label: "Input", content: "github" },
  { label: "Job Description", content: "step2" },
  { label: "Work Experience", content: "step3" },
  { label: "LinkedIn", content: "linkedin" },
];

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");

  const [selectedExperience, setSelectedExperience] = useState<number[]>([]);
  const [selectedRepos, setSelectedRepos] = useState<number[]>([]);

  const nextStep = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  async function nextStepCheck() {
    if (step === 0) {
      const githubInput = document.getElementById("github");
      const linkedinInput = document.getElementById("linkedin");

      if (github.trim() === "") {
        githubInput?.style.setProperty("border", "1px solid red");
        githubInput?.focus();
        return;
      } else {
        githubInput?.style.removeProperty("border");
      }

      if (linkedin.trim() === "") {
        linkedinInput?.style.setProperty("border", "1px solid red");
        linkedinInput?.focus();
        return;
      } else {
        linkedinInput?.style.removeProperty("border");
      }
      
      const githubRes = await fetch(`/api/getRepos?username=${github}`);
      const linkedinRes = await fetch(`/api/getLinkedin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: linkedin }),
      });

      try {
        const githubData = await githubRes.json();
        const linkedinData = await linkedinRes.json();
        const profileData = helperFunctions.extractProfileInfo(JSON.stringify(linkedinData));
        sessionStorage.setItem("profileData", JSON.stringify(profileData));
        sessionStorage.setItem("githubRawJson", JSON.stringify(githubData));
        sessionStorage.setItem("linkedinRawJson", JSON.stringify(linkedinData));
        nextStep();
      } catch (error) {
        console.error("Error fetching data:", error);
      }

    }
    if (step === 1) {
      const jobDesc = document.getElementById("job-desc") as HTMLTextAreaElement | null;
      if (jobDesc?.value.trim() === "") {
        jobDesc?.style.setProperty("border", "1px solid red");
        jobDesc?.focus();
        return;
      } else {
        jobDesc?.style.removeProperty("border");
      }
      const githubRawJson = sessionStorage.getItem("githubRawJson");
      const linkedinRawJson = sessionStorage.getItem("linkedinRawJson");
      if (githubRawJson && linkedinRawJson) {
        const parsedRepos = helperFunctions.githubRepoParser(githubRawJson);
        const jobDescValue = jobDesc?.value ?? "";
        const relevantReposString = await helperFunctions.relevantReposParser(parsedRepos, jobDescValue);
        const relevantRepos = relevantReposString ? JSON.parse(relevantReposString) : [];
        sessionStorage.setItem("relevantRepos", JSON.stringify(relevantRepos));
        sessionStorage.setItem("jobDesc", jobDescValue);
        const parsedExperience = helperFunctions.rawToExperience(linkedinRawJson);
        sessionStorage.setItem("linkedinExperience", JSON.stringify(parsedExperience));
        nextStep();
      } else {
        console.error("No GitHub or LinkedIn data found in sessionStorage.");
        // sessionStorage.clear();
      }

    }
    if (step === 2) {
      const allRepos = JSON.parse(sessionStorage.getItem("relevantRepos") || "[]");
      const allExperience = JSON.parse(sessionStorage.getItem("linkedinExperience") || "[]");
      
      if (selectedRepos.length === 0) {
        alert("Please select at least one repository.");
        return;
      }
      if (selectedExperience.length === 0) {
        alert("Please select at least one work experience.");
        return;
      }

      const filteredRepos = selectedRepos.map(index => allRepos[index]);
      const filteredExperience = selectedExperience.map(index => allExperience[index]);
      
      sessionStorage.setItem("selectedRepos", JSON.stringify(filteredRepos));
      sessionStorage.setItem("selectedExperience", JSON.stringify(filteredExperience));
      nextStep();
    }
    if (step === 3) {
      const phoneInput = document.getElementById("phone") as HTMLInputElement | null;
      const emailInput = document.getElementById("email") as HTMLInputElement | null;
      const portfolioInput = document.getElementById("portfolio") as HTMLInputElement | null;

      if (phoneInput?.value.trim() === "") {
        phoneInput?.style.setProperty("border", "1px solid red");
        phoneInput?.focus();
        return;
      } else {
        phoneInput?.style.removeProperty("border");
      }

      if (emailInput?.value.trim() === "") {
        emailInput?.style.setProperty("border", "1px solid red");
        emailInput?.focus();
        return;
      } else {
        emailInput?.style.removeProperty("border");
      }

      const basicInfo = {
        github: github,
        linkedin: linkedin,
        phone: phoneInput?.value ?? "",
        email: emailInput?.value ?? "",
        portfolio: portfolioInput?.value ?? "",
      }
      sessionStorage.setItem("basicInfo", JSON.stringify(basicInfo));
      nextStep();
    }
      
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 border rounded">
      <div className="mb-6 text-lg font-semibold">
        Step {step + 1} of {steps.length}: {steps[step].label}
      </div>

      {step === 0 && (
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="github" className="block text-sm font-medium">
              GitHub Username
            </label>
            <Input
              id="github"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
              placeholder="Enter your GitHub username"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="linkedin" className="block text-sm font-medium">
              LinkedIn URL
            </label>
            <Input
              id="linkedin"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              placeholder="Enter your LinkedIn URL"
            />
          </div>
        </div>
        
      )}

      {step === 1 && (
        <div>
          <Label>Enter The Job Description</Label>
          <Textarea className="h-32" id="job-desc"/>
        </div>
      )}

      {step === 2 && (
        <div>
          <Label className="mb-4 text-sm font-medium">Select The Relevant Repositories and Work Experience</Label>
          <div className="flex gap-2 mt-4">
            <ScrollArea className="h-64 w-full">
              <div className="flex flex-col gap-2">
                {JSON.parse(sessionStorage.getItem("relevantRepos") || "[]").map((repo: any, index: number) => (
                  <div key={repo.id || index} className="border p-2 rounded">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedRepos.includes(index)}
                        onChange={() =>
                          setSelectedRepos((prev) =>
                            prev.includes(index)
                              ? prev.filter((i) => i !== index)
                              : [...prev, index]
                          )
                        }
                      />
                      <span><strong>{repo.name}</strong></span>
                    </label>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <ScrollArea className="h-64 w-full">
              <div className="flex flex-col gap-2">

                {JSON.parse(sessionStorage.getItem("linkedinExperience") || "[]").map((exp: any, index: number) => (
                  <div key={index} className="border p-2 rounded">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedExperience.includes(index)}
                        onChange={() => {
                          setSelectedExperience((prev: number[]) =>
                            prev.includes(index)
                              ? prev.filter((i) => i !== index)
                              : [...prev, index]
                          );
                        }}
                      />
                      <span>
                        <strong>{exp.title}</strong> at {exp.company} {exp.company2}
                      </span>
                    </label>
                  </div>
                ))}

              </div>
            </ScrollArea>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-2">
          <label htmlFor="linkedin" className="block text-sm font-medium">
            LinkedIn URL
          </label>
          <Input
            id="linkedin"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            placeholder="Enter your LinkedIn URL"
          />
        </div>
      )}
      {step === 3 && (
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="phone" className="block text-sm font-medium">
              Phone Number
            </label>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium">
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="portfolio" className="block text-sm font-medium">
              Portfolio Link (optional)
            </label>
            <Input
              id="portfolio"
              type="url"
              placeholder="Enter your portfolio URL"
            />
          </div>
        </div>
      )}

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={prevStep} disabled={step === 0}>
          Previous
        </Button>
        {step < steps.length - 1 ? (
          <Button onClick={nextStepCheck}>Next</Button>
        ) : (
          <Button type="submit">Submit</Button>
        )}
      </div>
    </div>
  );
}
