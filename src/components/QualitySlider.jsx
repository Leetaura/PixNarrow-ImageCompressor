"use client";

export default function QualitySlider({ value, onChange }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="font-semibold text-gray-700 dark:text-gray-300">Compression Level</label>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-blue-600">{value}</span>
          <span className="text-gray-500">%</span>
        </div>
      </div>
      <input
        type="range"
        min="1"
        max="100"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 rounded-lg appearance-none cursor-pointer slider"
        style={{
          background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${value}%, #e5e7eb ${value}%, #e5e7eb 100%)`,
        }}
      />
      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
        <span>Lower quality (smaller file)</span>
        <span>Higher quality (larger file)</span>
      </div>
    </div>
  );
}
