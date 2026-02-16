"use client";

import { useBookmarks } from "@/hooks/useBookmarks";
import BookmarkCard from "./BookmarkCard";
import BookmarkForm from "./BookmarkForm";
import EmptyState from "@/components/ui/EmptyState";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function BookmarkList() {
  const { bookmarks, loading, addBookmark, deleteBookmark } = useBookmarks();

  return (
    <div className="flex flex-col gap-4">
      <BookmarkForm onAdd={addBookmark} />

      {loading ? (
        <LoadingSpinner />
      ) : bookmarks.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="flex flex-col gap-3">
          {bookmarks.map((bookmark) => (
            <BookmarkCard
              key={bookmark.id}
              bookmark={bookmark}
              onDelete={deleteBookmark}
            />
          ))}
        </div>
      )}
    </div>
  );
}
