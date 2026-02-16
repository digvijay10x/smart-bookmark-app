"use client";

import { useAuth } from "@/hooks/useAuth";
import LogoutButton from "@/components/auth/LogoutButton";

export default function Header() {
  const { user } = useAuth();

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
        <h1 className="text-xl font-bold text-gray-800">📑 Smart Bookmarks</h1>
        <div className="flex items-center gap-3">
          {user && (
            <>
              <img
                src={user.user_metadata?.avatar_url}
                alt={user.user_metadata?.full_name}
                className="h-8 w-8 rounded-full"
              />
              <span className="text-sm font-medium text-gray-700">
                {user.user_metadata?.full_name}
              </span>
            </>
          )}
          <LogoutButton />
        </div>
      </div>
    </header>
  );
}
