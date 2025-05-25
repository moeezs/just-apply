"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Download, Mail, FileText, Package, Loader2 } from 'lucide-react';
import JSZip from 'jszip';

export default function ResultPage() {
  const [emailForm, setEmailForm] = useState({
    to: '',
    subject: 'Job Application - Cover Letter and Resume',
    body: 'Below are your cover letter and resume for the job application. Enjoy \n\nBest,\nMoeez',
  });
  const [letterUrl, setLetterUrl] = useState('');
  const [resumeUrl, setResumeUrl] = useState('');
  const [isGeneratingPDFs, setIsGeneratingPDFs] = useState(true);
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const basicInfo = JSON.parse(sessionStorage.getItem('basicInfo') || '{}');
      if (basicInfo.email) {
        setEmailForm(prev => ({ ...prev, to: basicInfo.email }));
      }
    }

    const timer = setTimeout(() => {
      fetchPdfs();
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  const fetchPdfs = async () => {
    try {
      // console.log('genrating');
      setIsGeneratingPDFs(true);
      
      const sessionData = {
        jobDesc: sessionStorage.getItem("jobDesc") || "",
        selectedExperience: sessionStorage.getItem("selectedExperience") || "[]",
        selectedRepos: sessionStorage.getItem("selectedRepos") || "[]",
        profileData: sessionStorage.getItem("profileData") || "{}",
        basicInfo: sessionStorage.getItem("basicInfo") || "{}"
      };
      
      const encodedData = btoa(JSON.stringify(sessionData));
      
      const response = await fetch('/api/getPdf', {
        method: 'POST',
        body: JSON.stringify({ 
          url: '/result/letter',
          sessionData: encodedData
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const resumeResponse = await fetch('/api/getPdf', {
        method: 'POST',
        body: JSON.stringify({ 
          url: '/result/resume',
          sessionData: encodedData
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      console.log('Letter response status:', response.status);
      console.log('Resume response status:', resumeResponse.status);
      
      if (!resumeResponse.ok) {
        const errorText = await resumeResponse.text();
        console.error('Resume PDF error:', errorText);
        throw new Error('Failed to generate resume PDF');
      }
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Letter PDF error:', errorText);
        throw new Error('Failed to generate letter PDF');
      }

      const resumeArrayBuffer = await resumeResponse.arrayBuffer();
      // console.log('Resume PDF size:', resumeArrayBuffer.byteLength);
      const resumeBlob = new Blob([resumeArrayBuffer], { type: 'application/pdf' });
      const resumeUrl = URL.createObjectURL(resumeBlob);
      // console.log('Resume blob URL created:', resumeUrl);
      setResumeUrl(resumeUrl);

      const letterArrayBuffer = await response.arrayBuffer();
      // console.log('Letter PDF size:', letterArrayBuffer.byteLength);
      const letterBlob = new Blob([letterArrayBuffer], { type: 'application/pdf' });
      const letterUrl = URL.createObjectURL(letterBlob);
      // console.log('Letter blob URL created:', letterUrl);
      setLetterUrl(letterUrl);
      
      setIsGeneratingPDFs(false);
    } catch (err) {
      console.error('PDF generation error:', err);
      setIsGeneratingPDFs(false);
    }
  };

  const downloadLetter = () => {
    if (!letterUrl) return;
    const a = document.createElement('a');
    a.href = letterUrl;
    a.download = 'cover-letter.pdf';
    a.click();
  };

  const downloadResume = () => {
    if (!resumeUrl) return;
    const a = document.createElement('a');
    a.href = resumeUrl;
    a.download = 'resume.pdf';
    a.click();
  };

  const downloadAsZip = async () => {
    if (!letterUrl || !resumeUrl) return;
    
    try {
      const zip = new JSZip();
      
      const letterResponse = await fetch(letterUrl);
      const resumeResponse = await fetch(resumeUrl);
      
      zip.file("cover-letter.pdf", await letterResponse.blob());
      zip.file("resume.pdf", await resumeResponse.blob());
      
      const zipContent = await zip.generateAsync({ type: "blob" });
      
      const downloadUrl = URL.createObjectURL(zipContent);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = "job-documents.zip";
      a.click();
      
      URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Error creating ZIP file:", error);
    }
  };

  const handleSendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!letterUrl || !resumeUrl) {
      return;
    }
    
    try {
      setIsSendingEmail(true);
      
      const formData = new FormData();
      formData.append('to', emailForm.to);
      formData.append('subject', emailForm.subject);
      formData.append('body', emailForm.body);
      
      const letterResponse = await fetch(letterUrl);
      const resumeResponse = await fetch(resumeUrl);
      
      formData.append('letter', await letterResponse.blob(), 'cover-letter.pdf');
      formData.append('resume', await resumeResponse.blob(), 'resume.pdf');
      
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Failed to send email');
      }
      
      setIsEmailDialogOpen(false);
      
    } catch (error) {
      console.error('Error sending email:', error);
    } finally {
      setIsSendingEmail(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Job Application Documents</h1>
          <p className="text-gray-600">Preview, download, and share your cover letter and resume. Good Luck! :)</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Cover Letter
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-lg p-4 bg-white relative">
                {isGeneratingPDFs ? (
                  <div className="inset-0 flex items-center justify-center bg-white bg-opacity-80 z-10 h-96">
                    <div className="flex flex-col items-center">
                      <Loader2 className="h-8 w-8 text-primary animate-spin mb-2" />
                      <p className="text-sm text-gray-600">Generating PDF...</p>
                    </div>
                  </div>
                ) : (
                  <iframe
                    src={letterUrl} // || '/result/letter'}
                    className="w-full h-96 border-0"
                    title="Cover Letter Preview"
                  />
                )}
              </div>
              <Button className="w-full" onClick={downloadLetter} disabled={isGeneratingPDFs}>
                <Download className="h-4 w-4 mr-2" />
                Download Cover Letter
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Resume
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-lg p-4 bg-white relative ">
                {isGeneratingPDFs ? (
                  <div className="inset-0 flex items-center justify-center bg-white bg-opacity-80 z-10 h-96">
                    <div className="flex flex-col items-center">
                      <Loader2 className="h-8 w-8 text-primary animate-spin mb-2" />
                      <p className="text-sm text-gray-600">Generating PDF...</p>
                    </div>
                  </div>
                ) : (
                  <iframe
                    src={resumeUrl || ""} // || '/result/resume'}
                    className="w-full h-96 border-0"
                  title="Resume Preview"
                />
                )}
              </div>
              <Button className="w-full" onClick={downloadResume} disabled={isGeneratingPDFs}>
                <Download className="h-4 w-4 mr-2" />
                Download Resume
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" className="min-w-[200px]" onClick={downloadAsZip} disabled={isGeneratingPDFs}>
            <Package className="h-4 w-4 mr-2" />
            Download as ZIP
          </Button>

          <Dialog open={isEmailDialogOpen} onOpenChange={setIsEmailDialogOpen} >
            <DialogTrigger asChild>
              <Button className="min-w-[200px]" disabled={isGeneratingPDFs} onClick={() => setIsEmailDialogOpen(true)}>
                <Mail className="h-4 w-4 mr-2" />
                Send via Email
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Send Documents via Email</DialogTitle>
                <DialogDescription>
                  Fill out the form below to send your cover letter and resume via email.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSendEmail}>
                <div className="space-y-4">
                  <Input
                    type="email"
                    placeholder="hiring@company.com"
                    value={emailForm.to}
                    onChange={(e) => setEmailForm(prev => ({ ...prev, to: e.target.value }))}
                    required
                  />
                  <Input
                    placeholder="Subject"
                    value={emailForm.subject}
                    onChange={(e) => setEmailForm(prev => ({ ...prev, subject: e.target.value }))}
                    required
                  />
                  <Textarea
                    placeholder="Message"
                    rows={6}
                    value={emailForm.body}
                    onChange={(e) => setEmailForm(prev => ({ ...prev, body: e.target.value }))}
                    required
                  />

                <Button className="w-full" type="submit" disabled={isGeneratingPDFs || isSendingEmail}>
                  {isSendingEmail ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Mail className="h-4 w-4 mr-2" />
                      Send Email
                    </>
                  )}
                </Button>
              </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
