# 🌹 Rose Store Flowers - Project Overview
Welcome to the **Rose Store Flowers** frontend project!  
This document explains all the main dependencies, dev tools, and configurations used in this project and why they are important.
---

## Project Info:
- Name      : rose-app  
- Version   : 0.1.0  
- Framework : Next.js 14  
- Language  : TypeScript & React 18  
- Styling   : TailwindCSS  
- Package M : Yarn  
---

## Scripts:
- dev       : `next dev --turbo` - Start local development server with Turbo mode for fast refresh. 
- build     : `next build` - Build the app for production. 
- start     : `next start` - Start the production server. 
- lint      : `next lint` - Run ESLint to check for code quality and errors. 
---

## Dependencies:
1. UI / Components
  - `@radix-ui/react-alert-dialog`: Accessible and composable modal dialogs.  
  - `@radix-ui/react-slot`: Slot components for flexible composition.  
  - `lucide-react`: Icon library with lightweight, customizable icons.  

2. State & Data Fetching
  - `@tanstack/react-query`: Handles server state, caching, and synchronization for data fetching.  
  - `next-auth`: Authentication for Next.js (supports multiple providers).  
  - `next-intl`: Internationalization and localization for multi-language support.  

3. Forms & Validation
  - `react-hook-form`: Lightweight and performant forms library.  
  - `zod`: Type-safe schema validation for form data.  
  - `@hookform/devtools`: Developer tools for inspecting form states in React Hook Form.  

4. Styling
  - `tailwind-merge`: Merge Tailwind classes dynamically.  
  - `tailwindcss-animate`: Prebuilt animations using Tailwind utilities.  
  - `clsx`: Conditional class names for JSX components.  

5. Error Tracking
  - `@sentry/nextjs`: Real-time error tracking and monitoring for Next.js apps.  
---

## Dev Dependencies
1. Linting & Type Checking
  - `eslint` & `eslint-config-next`: Enforce code quality and consistency.  
  - `@types/*`: Type definitions for TypeScript.  

2. Styling Tools
  - `tailwindcss`, `postcss`, `autoprefixer`: Styling pipeline with Tailwind and PostCSS.  

3. Testing
  - `cypress`: End-to-end testing for QA and regression checks.  

4. Git Hooks
  - `husky`: Git hooks management (pre-commit, commit-msg, pre-push, etc.).  
  - `@commitlint/cli` & `@commitlint/config-conventional`: Enforce commit message conventions.  

5. Mock Data
  - `@faker-js/faker`: Generate fake data for testing and development.  

6. Development Tools
  - `typescript`: Type safety and autocomplete support.  
  - `@tanstack/react-query-devtools`: Debug React Query cache and state.  


