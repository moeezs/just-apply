"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const steps = [
  { label: "Input", content: "github" },
  { label: "Your Proudest Work", content: "step2" },
  { label: "Work Experience", content: "step3" },
  { label: "LinkedIn", content: "linkedin" },
];

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");

  const nextStep = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  const nextStepCheck = () => {
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
      
      const githubRes = fetch(`/api/getRepos?username=${github}`);
      const linkedinRes = fetch(`/api/getLinkedIn?url=${linkedin}`);

      Promise.all([githubRes, linkedinRes])
        .then(([githubData, linkedinData]) => {
          // Handle the responses
          console.log(githubData, linkedinData);
          nextStep();
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
    if (step === 1) {
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
          
          <div className="text-gray-500">Step 2 placeholder</div>
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