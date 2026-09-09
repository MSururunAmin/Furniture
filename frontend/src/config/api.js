export const API_URL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";
export const API_ORIGIN = API_URL.replace(/\/api\/?$/, "");
export const STORAGE_URL =
  import.meta.env.VITE_STORAGE_URL || `${API_ORIGIN}/storage`;

export const getStorageUrl = (imagePath) => {
  if (!imagePath) return null;

  if (imagePath.startsWith("http")) {
    const imageUrl = new URL(imagePath);

    if (["localhost", "127.0.0.1"].includes(imageUrl.hostname)) {
      return `${API_ORIGIN}${imageUrl.pathname}`;
    }

    return imagePath;
  }

  return imagePath.startsWith("/storage/")
    ? `${API_ORIGIN}${imagePath}`
    : `${STORAGE_URL}/${imagePath}`;
};
