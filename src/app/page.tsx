import LoginButton from "@/components/auth/LoginButton";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <div className="text-5xl mb-4">📑</div>
        <h1 className="text-4xl font-bold text-gray-900">
          Smart Bookmark Manager
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          Save, organize, and access your bookmarks from anywhere in real time.
        </p>
        <div className="mt-8 flex justify-center">
          <LoginButton />
        </div>
      </div>
    </main>
  );
}
