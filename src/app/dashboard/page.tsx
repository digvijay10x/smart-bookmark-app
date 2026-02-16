import Header from "@/components/ui/Header";
import BookmarkList from "@/components/bookmarks/BookmarkList";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-8">
        <BookmarkList />
      </main>
    </div>
  );
}
