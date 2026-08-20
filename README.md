# Developer Portfolio — React + Vite

A modern, responsive personal developer portfolio website featuring a sleek glassmorphism UI design, smooth micro-animations, interactive project showcases, and technical skills display.

---

## ⚡ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 8](https://vitejs.dev/)
- **Linting & Code Quality**: [Oxlint](https://oxc.rs/)
- **Styling**: Vanilla CSS with custom variables, CSS Grid/Flexbox, dynamic animations, and Glassmorphism effects

---

## ✨ Features

- **Hero Section**: Bio, title, and quick call-to-actions.
- **Tech Stack & Skills Matrix**: Highlighting core languages, web frameworks, cybersecurity tools, and design software.
- **Project Showcase**: Detailed cards showcasing featured engineering & security projects.
- **Experience & Education Timeline**: Interactive history of academic background, hackathons, and roles.
- **Interactive UI**: Responsive navbar, theme accents, and contact forms.

---

## 📂 Project Structure

```
Portfolio/
├── index.html         # HTML entry point
├── package.json       # Project metadata & dependencies
├── vite.config.js     # Vite configuration
├── .oxlintrc.json     # Oxlint configuration
├── public/            # Static assets
└── src/
    ├── main.jsx       # Application bootstrap
    ├── App.jsx        # Core application layout & routing
    ├── index.css      # Design system, CSS variables, and global styles
    ├── assets/        # Visual assets & images
    └── components/    # Reusable UI components
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js `18.0.0` or higher
- npm `9.0.0` or higher

### Installation

```bash
# Navigate to the portfolio directory
cd Portfolio

# Install dependencies
npm install
```

### Development Commands

```bash
# Start local development server with Hot Module Replacement (HMR)
npm run dev

# Lint code using Oxlint
npm run lint

# Build production distribution package
npm run build

# Preview production build locally
npm run preview
```
