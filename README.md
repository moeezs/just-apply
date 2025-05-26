# Just Apply 🚀

> **Generate personalized resumes and cover letters in seconds using your GitHub and LinkedIn profiles**

Just Apply is an intelligent job application tool that automates the creation of tailored resumes and cover letters. Simply input your GitHub username, upload your LinkedIn profile data, and provide a job description to get professionally formatted documents ready for download.

![Next.js](https://img.shields.io/badge/Next.js-15.3.2-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.0.0-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=flat-square&logo=tailwindcss)
![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat-square&logo=vercel)

## ✨ Features

- **🤖 AI-Powered Generation**: Uses Google Gemini AI to create personalized cover letters
- **📄 PDF Export**: Generates professional PDF documents ready for submission
- **🔗 GitHub Integration**: Automatically fetches your repositories and project data
- **💼 LinkedIn Import**: Upload and parse your LinkedIn profile data
- **🎯 Smart Matching**: Intelligently selects relevant experience and projects based on job requirements
- **📧 Email Integration**: Send documents directly via email with built-in mailer
- **📱 Responsive Design**: Beautiful, modern UI that works on all devices
- **⚡ Fast Performance**: Optimized for speed with Next.js 15 and React 19

## 🛠 Tech Stack

### Frontend
- **Next.js 15.3.2** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Shadcn UI** - Accessible component primitives
- **Lucide React** - Beautiful icons

### AI & Data Processing
- **Google Gemini AI** - Advanced text generation
- **GitHub Scraper** - Repository data extraction
- **Apify Client** - Web scraping capabilities

### PDF Generation
- **Puppeteer Core** - Headless browser automation
- **@sparticuz/chromium** - Optimized Chromium for serverless
- **jsPDF** - Client-side PDF generation
- **html2canvas** - HTML to canvas conversion

### Additional Tools
- **JSZip** - Archive generation
- **Nodemailer** - Email sending

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun
- Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/just-apply.git
   cd just-apply
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Add your environment variables:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   APIFY_TOKEN=your_apify_token_here
   GMAIL_FROM=your_email@domain.com
   GMAIL_APP_PASSWORD=your_app_password
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 How to Use

### Step 1: Basic Information
- Enter your full name
- Provide your GitHub username
- Upload your LinkedIn profile data (JSON format)

### Step 2: Job Details
- Paste the job description
- The AI will analyze requirements and match your profile

### Step 3: Experience Selection
- Review auto-selected relevant experiences
- Modify selections as needed
- Choose relevant GitHub repositories/projects

### Step 4: Contact Information
- Add phone number, email, and portfolio links
- Generate your personalized documents

### Step 5: Download & Share
- Download individual PDFs or as a ZIP file
- Send directly via email
- Manual PDF generation fallback available

## 🏗 Project Structure

```
just-apply/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── generateCoverLetter/    # AI-powered cover letter generation
│   │   │   ├── getPdf/                 # PDF generation service
│   │   │   ├── getPdfFallback/         # Fallback PDF service
│   │   │   └── sendEmail/              # Email sending service
│   │   ├── onboarding/                 # Multi-step form
│   │   ├── result/
│   │   │   ├── letter/                 # Cover letter preview
│   │   │   ├── resume/                 # Resume preview
│   │   │   └── page.tsx                # Results dashboard
│   │   └── page.tsx                    # Landing page
│   ├── components/
│   │   └── ui/                         # Reusable UI components
│   └── lib/
├── public/                             # Static assets
├── vercel.json                         # Vercel deployment config
└── package.json
```

## 🔧 Configuration

### Vercel Deployment
The app is optimized for Vercel with:
- Extended function timeouts for PDF generation
- Puppeteer configuration for serverless environment
- Environment-specific browser selection

### PDF Generation
- **Production**: Uses @sparticuz/chromium for Vercel compatibility
- **Development**: Uses local Puppeteer installation
- **Fallback**: Manual PDF generation via browser print

### Environment Variables
Required for full functionality:
- `GEMINI_API_KEY`: Google Gemini AI API key
- `APIFY_TOKEN`: Apify API token
- `GMAIL_FROM`: Email address to send from
- `GMAIL_APP_PASSWORD`: Gmail app password

## 🎨 UI Components

Built with modern, accessible components:
- **Form Controls**: React Hook Form with Zod validation
- **Progress Tracking**: Multi-step progress indicator
- **File Handling**: Drag-and-drop upload support
- **Loading States**: Skeleton screens and spinners
- **Error Handling**: User-friendly error messages

## 🚀 Deployment

### Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Import to Vercel**
   - Connect your GitHub repository
   - Add environment variables
   - Deploy automatically

3. **Configure Environment**
   - Add `GEMINI_API_KEY` in Vercel dashboard
   - Set up email credentials (optional)

### Manual Deployment

```bash
npm run build
npm start
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Vercel](https://vercel.com) for hosting and deployment
- [Google Gemini](https://ai.google.dev/) for AI-powered content generation
- [Tailwind CSS](https://tailwindcss.com) for styling
- [Shadcn UI](https://www.shadcn.com/) for accessible components

## 📞 Support

If you have any questions or need help:

1. Check the [Issues](https://github.com/moeezs/just-apply/issues) page
2. Create a new issue with detailed information
3. Join our community discussions

---

**Made with ❤️ for job seekers everywhere**
