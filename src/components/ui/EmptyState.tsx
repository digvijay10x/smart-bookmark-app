export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="text-5xl mb-4">📑</div>
      <h3 className="text-lg font-semibold text-gray-700">No bookmarks yet</h3>
      <p className="mt-1 text-sm text-gray-500">
        Add your first bookmark above to get started!
      </p>
    </div>
  );
}
