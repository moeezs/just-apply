"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Download, Mail, FileText, Package } from 'lucide-react';

export default function ResultPage() {
  const [emailForm, setEmailForm] = useState({
    to: '',
    subject: 'Job Application - Cover Letter and Resume',
    message: 'Dear Hiring Manager,\n\nPlease find attached my cover letter and resume for your consideration.\n\nBest regards,'
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Job Application Documents</h1>
          <p className="text-gray-600">Preview, download, and share your cover letter and resume</p>
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
              <div className="border rounded-lg p-4 bg-white">
                <iframe
                  src="/result/letter"
                  className="w-full h-96 border-0"
                  title="Cover Letter Preview"
                />
              </div>
              <Button className="w-full">
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
              <div className="border rounded-lg p-4 bg-white">
                <iframe
                  src="/result/resume"
                  className="w-full h-96 border-0"
                  title="Resume Preview"
                />
              </div>
              <Button className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Download Resume
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" className="min-w-[200px]">
            <Package className="h-4 w-4 mr-2" />
            Download as ZIP
          </Button>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="min-w-[200px]">
                <Mail className="h-4 w-4 mr-2" />
                Send via Email
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Send Documents via Email</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  type="email"
                  placeholder="hiring@company.com"
                  value={emailForm.to}
                  onChange={(e) => setEmailForm(prev => ({ ...prev, to: e.target.value }))}
                />
                <Input
                  placeholder="Subject"
                  value={emailForm.subject}
                  onChange={(e) => setEmailForm(prev => ({ ...prev, subject: e.target.value }))}
                />
                <Textarea
                  placeholder="Message"
                  rows={6}
                  value={emailForm.message}
                  onChange={(e) => setEmailForm(prev => ({ ...prev, message: e.target.value }))}
                />
                <Button className="w-full">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
