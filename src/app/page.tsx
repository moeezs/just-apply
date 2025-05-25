"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Mail, Zap } from "lucide-react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (!sessionStorage.getItem('sessionId')) {
      sessionStorage.setItem('sessionId', uuidv4());
    }
  }, []);

  const handleGetStarted = () => {
    router.push('/onboarding');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Main heading */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Land Your Dream Job with
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 block mt-2">
              Just Apply
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Generate personalized resumes and cover letters in seconds using your GitHub and LinkedIn profiles
          </p>
        </div>

        {/* Features */}
        <div className="flex flex-wrap justify-center gap-8 mb-12">
          <div className="flex items-center gap-3 text-gray-700">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <span className="font-medium">Custom Resumes</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Mail className="w-5 h-5 text-purple-600" />
            </div>
            <span className="font-medium">Tailored Cover Letters</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <div className="p-2 bg-green-100 rounded-lg">
              <Zap className="w-5 h-5 text-green-600" />
            </div>
            <span className="font-medium">Instant Generation</span>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mb-8">
          <Button 
            onClick={handleGetStarted}
            size="lg"
            className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          >
            Get Started Now
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}