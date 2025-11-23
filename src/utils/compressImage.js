import imageCompression from "browser-image-compression";

export async function compressImage(file, quality) {
  const options = {
    maxSizeMB: 5,
    maxWidthOrHeight: 2000,
    initialQuality: quality / 100,
  };

  try {
    const compressed = await imageCompression(file, options);
    return compressed;
  } catch (err) {
    console.error("Compression error:", err);
    return null;
  }
}
