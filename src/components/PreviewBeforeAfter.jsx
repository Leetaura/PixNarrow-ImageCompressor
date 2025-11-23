"use client";

export default function PreviewBeforeAfter({ original, compressed }) {
  if (!original) return null;

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  return (
    <div className="mt-6">
      <h3 className="text-base font-semibold mb-3 dark:text-white">Preview</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Original */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-medium text-sm text-gray-700 dark:text-gray-300">Original</span>
            <span className="text-xs font-semibold text-gray-900 dark:text-white">{formatSize(original.size)}</span>
          </div>
          <div className="relative rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
            <img src={URL.createObjectURL(original)} className="w-full h-auto max-h-64 object-cover" alt="Original" />
          </div>
        </div>

        {/* Compressed */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-medium text-sm text-gray-700 dark:text-gray-300">Compressed</span>
            {compressed && <span className="text-xs font-semibold text-green-600 dark:text-green-400">{formatSize(compressed.size)}</span>}
          </div>
          <div className="relative rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
            {compressed ? (
              <>
                <img src={URL.createObjectURL(compressed)} className="w-full h-auto max-h-64 object-cover" alt="Compressed" />
                {/* Compression Badge */}
                <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">-{Math.round((1 - compressed.size / original.size) * 100)}%</div>
              </>
            ) : (
              <div className="w-full h-64 flex items-center justify-center text-gray-400">
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
