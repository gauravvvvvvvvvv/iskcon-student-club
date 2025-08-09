# ISKCON Student Club Website

A beautiful website for the ISKCON Student Club built with Next.js, React, and Tailwind CSS.

## Getting Started

### Prerequisites

First, you need to install Node.js on your system:

1. Go to [nodejs.org](https://nodejs.org/)
2. Download and install the LTS version for Windows
3. Restart your terminal/PowerShell after installation

### Installation

Once Node.js is installed, follow these steps:

1. Navigate to the project directory:
   ```bash
   cd iskconstudentclub
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the website.

## Project Structure

```
iskconstudentclub/
├── src/
│   └── app/
│       ├── globals.css      # Global styles with Tailwind CSS
│       ├── layout.tsx       # Root layout component
│       └── page.tsx         # Homepage component
├── package.json             # Project dependencies
├── next.config.mjs          # Next.js configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── README.md               # This file
```

## Features

- 🎨 Beautiful responsive design with Tailwind CSS
- ⚡ Fast performance with Next.js 14
- 📱 Mobile-friendly layout
- 🔧 TypeScript for better development experience
- 🎯 SEO optimized

## Current Homepage Features

- Welcome header with ISKCON branding
- Three feature cards highlighting:
  - Spiritual Growth
  - Community
  - Learning
- Call-to-action button
- Footer with copyright information

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

### Quick Deploy to Vercel

1. **Push to GitHub** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up/Login with your GitHub account
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will automatically detect it's a Next.js project
   - Click "Deploy"

3. **Your site will be live** in under a minute!

### Manual Deployment Steps

If you prefer manual deployment:

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy from your project directory:
   ```bash
   cd iskconstudentclub
   vercel
   ```

3. Follow the prompts and your site will be deployed!

## Contributing

Feel free to contribute to this project by submitting issues or pull requests!
