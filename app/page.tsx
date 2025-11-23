"use client";

import { useState } from "react";
import ImageUploader from "@/src/components/ImageUploader";
import QualitySlider from "@/src/components/QualitySlider";
import PreviewBeforeAfter from "@/src/components/PreviewBeforeAfter";
import { compressImage } from "@/src/utils/compressImage";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState(75);
  const [compressedFile, setCompressedFile] = useState<File | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);

  async function handleCompress() {
    if (!file) return;
    setIsCompressing(true);
    const result = await compressImage(file, quality);
    setCompressedFile(result);
    setIsCompressing(false);
  }

  const compressionRate = file && compressedFile ? Math.round((1 - compressedFile.size / file.size) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-1 text-gray-900 dark:text-white">Image Compressor</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">Compress image files online for free</p>
        </div>

        {/* Main Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          {/* Upload Section */}
          {!file && (
            <div className="p-8">
              <ImageUploader onSelect={setFile} />
            </div>
          )}

          {/* Compression Result */}
          {compressedFile && (
            <div className="bg-linear-to-r from-blue-500 to-indigo-600 p-6 text-white text-center">
              <h2 className="text-xl font-semibold mb-3">Your IMAGE has been compressed!</h2>

              {/* Compression Badge */}
              <div className="inline-flex items-center gap-3 mb-3">
                <div className="relative">
                  <svg className="w-16 h-16" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="white" opacity="0.2" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="white" strokeWidth="8" strokeDasharray={`${(compressionRate / 100) * 251.2} 251.2`} strokeLinecap="round" transform="rotate(-90 50 50)" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl font-bold">{compressionRate}%</span>
                  </div>
                </div>
                <div className="text-left">
                  <p className="text-sm opacity-90">Your image is now {compressionRate}% smaller!</p>
                  <p className="text-base font-semibold">
                    {file && compressedFile && (
                      <>{(file.size / 1024).toFixed(2)} KB → {(compressedFile.size / 1024).toFixed(2)} KB</>
                    )}
                  </p>
                </div>
              </div>

              {/* Download Button */}
              <a href={URL.createObjectURL(compressedFile)} download={`compressed-${file?.name || 'image.jpg'}`} className="inline-flex items-center gap-2 px-5 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition shadow-lg text-sm">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12l-5-5h3V3h4v4h3l-5 5zm-7 3h14v2H3v-2z" />
                </svg>
                Download compressed IMAGE
              </a>
            </div>
          )}

          {/* Controls & Preview */}
          {file && (
            <div className="p-6">
              {/* Quality Slider - Always show when file exists */}
              <QualitySlider value={quality} onChange={setQuality} />

              <button
                onClick={handleCompress}
                disabled={isCompressing}
                className="mt-4 w-full py-2.5 px-6 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isCompressing ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Compressing...
                  </>
                ) : compressedFile ? (
                  "Re-compress with new quality"
                ) : (
                  "Compress Image"
                )}
              </button>

              {/* Preview */}
              <PreviewBeforeAfter original={file} compressed={compressedFile} />

              {/* Actions */}
              {compressedFile && (
                <div className="mt-4 flex gap-3 justify-center">
                  <button
                    onClick={() => {
                      setFile(null);
                      setCompressedFile(null);
                    }}
                    className="px-5 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition text-sm"
                  >
                    Compress Another
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
