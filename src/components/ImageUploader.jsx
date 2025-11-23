"use client";

import { useRef, useState } from "react";

export default function ImageUploader({ onSelect }) {
  const inputRef = useRef();
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      onSelect(file);
    }
  };

  return (
    <div className="w-full">
      <input ref={inputRef} type="file" accept="image/*" onChange={(e) => onSelect(e.target.files[0])} className="hidden" />

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => inputRef.current.click()}
        className={`
          border-2 border-dashed rounded-lg p-12 text-center cursor-pointer
          transition-all duration-200
          ${isDragging ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : "border-gray-300 dark:border-gray-600 hover:border-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700/50"}
        `}
      >
        <div className="flex flex-col items-center gap-3">
          {/* Icon */}
          <div className="relative">
            <svg className="w-16 h-16 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
            </svg>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full"></div>
          </div>

          {/* Text */}
          <div>
            <p className="text-gray-700 dark:text-gray-300">
              Drop your image here, or <span className="text-blue-500 font-medium">browse</span>
            </p>
            <p className="text-sm text-gray-400 mt-1">Supports: JPG, JPEG2000, PNG</p>
          </div>
        </div>
      </div>
    </div>
  );
}
