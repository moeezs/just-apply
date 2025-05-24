"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import * as helperFunctions from "@/app/onboarding/helperFunctions";

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
      if (githubRawJson) {
        const parsedRepos = helperFunctions.githubRepoParser(githubRawJson);
        const jobDescValue = jobDesc?.value ?? "";
        const relevantReposString = await helperFunctions.relevantReposParser(parsedRepos, jobDescValue);
        const relevantRepos = relevantReposString ? JSON.parse(relevantReposString) : [];
        sessionStorage.setItem("relevantRepos", JSON.stringify(relevantRepos));
        sessionStorage.setItem("jobDesc", jobDescValue);
        nextStep();
      } else {
        console.error("No GitHub data found in sessionStorage.");
        // sessionStorage.clear();
      }

    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded">
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
          <div className="text-gray-500">Step 3 placeholder</div>
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