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
git clone https://github.com/digvijay10x/smart-bookmark-app.git

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

Architecture

-Monolithic Next.js app
-Supabase as backend (auth, database, realtime)
-Row Level Security for data protection
-Middleware for centralized session handling

Challenges and how i solved them:
Challenge 1: Google OAuth Redirect Configuration
OAuth has two callbacks — Google redirects to Supabase, then Supabase redirects to our app. I initially pointed Google's redirect URI to my app instead of Supabase, breaking the flow.
Solution: Mapped out the two-callback flow. Set Google Console's redirect URI to supabase.co/auth/v1/callback, and configured Supabase's Site URL to point to my Vercel domain. Updated both when deploying to production. Reffered some YT videos.

Challenge 2: Securing User Data
User A should never see User B's bookmarks. Doing this at the API level is risky — one missed WHERE user_id = ? could leak data.
Solution: Used Row Level Security (RLS) instead of application-level checks. Wrote SQL policies for SELECT, INSERT, and DELETE that check auth.uid() = user_id. The database enforces privacy automatically, even if frontend code has bugs. Extra check, AI suggestion.

Challenge 3: Real-time Not Working
Added the real-time subscription code but changes weren't syncing across tabs.
Solution: Realized I hadn't enabled real-time on the table. Ran alter publication supabase_realtime add table public.bookmarks; in Supabase SQL editor.
