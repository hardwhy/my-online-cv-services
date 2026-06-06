# 🚀 Web CV Services

Welcome to the heart of the portfolio! 💖 This repository houses the backend services and shared logic that power the PDF generation and content management for your professional web CV.

## 🏗️ What's inside?

This project uses **Nx** to keep everything organized and speedy! ⚡️

### 📱 Applications
- **[pdf-service](https://github.com/hardwhy/my-online-cv-services/tree/main/apps/pdf-service)**: The star of the show! 🌟 It uses **Playwright** to turn your beautiful React components into professional PDF resumes.

### 📦 Shared Packages
- **[cv-renderer](https://github.com/hardwhy/my-online-cv-services/tree/main/packages/cv-renderer)**: The logic for turning data into CV templates. 🎨
- **[shared-services](https://github.com/hardwhy/my-online-cv-services/tree/main/packages/shared-services)**: Helpers for talking to Supabase and fetching your portfolio content. 🔗
- **[shared-types](https://github.com/hardwhy/my-online-cv-services/tree/main/packages/shared-types)**: The source of truth for all data structures. 📐

## 🛠️ Local Development

Getting started is as easy as pie! 🥧

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Fire up the development server**:
    ```bash
    npm run dev
    ```
    Your service will be hanging out at `http://localhost:4100`! 🎈

## 🚢 Deployment (Render)

This service is Docker-ready! 🐳

When deploying to **Render**, make sure you have these environment variables set:
- `SUPABASE_URL` 🌐
- `SUPABASE_ANON_KEY` 🔑
- `PDF_ALLOWED_ORIGINS` 🔓 (Comma-separated URLs of your frontend)

> **Pro Tip:** Since we use Chromium for PDF generation, make sure your Render plan has at least **512MB RAM**! 🧠

## 🤝 Contributing

Feel free to add more templates or improve the rendering logic! Every little bit helps make this CV even more awesome. ✨

Happy coding! 💻🌈
