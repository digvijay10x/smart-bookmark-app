Smart Bookmark Manager

A real-time bookmark manager where users can save, organize, and access bookmarks with instant sync across tabs.

Live URL

https://smart-bookmark-app-dun-rho.vercel.app

Tech Stack

Next.js 15 (App Router)
Supabase (Auth, PostgreSQL, Realtime)
Tailwind CSS
TypeScript
Vercel

Features

-Google OAuth sign-in

-Add and delete bookmarks
-Private bookmarks per user (RLS)
-Real-time sync across tabs
-Mobile responsive design

Run Locally

Clone the repo
git clone https://github.com/YOUR_USERNAME/smart-bookmark-app.git

cd smart-bookmark-app

Install dependencies
npm install

Create .env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

Supabase setup

Create a Supabase project
Run SQL from supabase/migrations/001_create_bookmarks.sql
Enable Google provider

Start dev server
npm run dev

Key Learnings

-Avoid auth logic in root layout (redirect loops)
-Correct OAuth redirect URI configuration
-Realtime requires publication setup
-Middleware session refresh prevents silent expiry
-Separate Supabase clients for browser/server/middleware

Architecture

-Monolithic Next.js app
-Supabase as backend (auth, database, realtime)
-Row Level Security for data protection
-Middleware for centralized session handling
