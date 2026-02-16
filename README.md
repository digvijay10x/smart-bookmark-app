# Smart Bookmark Manager

A real-time bookmark manager where users can save, organize, and access their bookmarks from anywhere — with instant sync across tabs.

## Live URL

[https://smart-bookmark-app.vercel.app](https://smart-bookmark-app.vercel.app)
_(will be updated after deployment)_

## Tech Stack

- **Next.js 15** (App Router)
- **Supabase** (Auth, PostgreSQL Database, Realtime)
- **Tailwind CSS** (Styling)
- **TypeScript**
- **Vercel** (Deployment)

## Features

- Google OAuth sign-in (no email/password)
- Add and delete bookmarks (URL + title)
- Bookmarks are private per user (Row Level Security)
- Real-time sync across multiple tabs without page refresh
- Mobile responsive design

## How to Run Locally

1. Clone the repo:

```bash
   git clone https://github.com/YOUR_USERNAME/smart-bookmark-app.git
   cd smart-bookmark-app
```

2. Install dependencies:

```bash
   npm install
```

3. Create a `.env.local` file and add your Supabase credentials:

```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Set up Supabase:
   - Create a new project in Supabase
   - Run the SQL in `supabase/migrations/001_create_bookmarks.sql` in the SQL Editor
   - Enable Google provider under Authentication > Sign In / Providers

5. Run the dev server:

```bash
   npm run dev
```

## Problems Faced & Solutions

### 1. Redirect Loop on Landing Page (ERR_TOO_MANY_REDIRECTS)

The root layout (`src/app/layout.tsx`) accidentally had auth-guard logic that redirected unauthenticated users to `/` — which itself was wrapped by the same layout, causing an infinite redirect loop. The fix was keeping the root layout clean (no auth checks) and handling auth redirection only in the middleware for protected routes like `/dashboard`.

### 2. OAuth Redirect URI Mismatch

Google OAuth requires the redirect URI to match exactly. The authorized redirect URI in Google Cloud Console must point to Supabase's callback endpoint (`https://<project-ref>.supabase.co/auth/v1/callback`), not to the app's `/auth/callback` route. The app's callback route only handles the code exchange after Supabase processes the OAuth flow.

### 3. Supabase Realtime Requires Explicit Setup

Real-time subscriptions don't work out of the box. The `bookmarks` table must be explicitly added to the `supabase_realtime` publication using `ALTER PUBLICATION supabase_realtime ADD TABLE public.bookmarks`. Without this, the client subscribes but never receives events.

### 4. Middleware Session Refresh is Essential

Without middleware refreshing the session cookie on every request, the auth session silently expires after about an hour. This was solved by using `@supabase/ssr`'s `createServerClient` in middleware to call `getUser()` on every request, which keeps the session alive.

### 5. Three Separate Supabase Clients Needed

The App Router requires three different Supabase client configurations: one for browser/client components (`createBrowserClient`), one for server components using `cookies()` from `next/headers`, and one for middleware that reads/writes cookies via the request/response objects. Using the wrong client in the wrong context causes silent auth failures.

## Architecture Decisions

- **Monolithic Next.js**: Chose a single Next.js app over separate frontend/backend since Supabase handles the entire backend (auth, database, realtime). No need for a custom API layer.
- **Row Level Security over API-level auth**: RLS policies enforce data privacy at the database level. Even if application code has bugs, users can never access each other's bookmarks because the database itself enforces ownership checks.
- **Middleware for session management**: Rather than checking auth in every page/component, the middleware handles session refresh globally and protects routes centrally.
