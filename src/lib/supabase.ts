// Frontend-only utilities (no backend)
export const getImageUrl = (path: string) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  // For local images, return as-is
  return path;
};

export default {
  getImageUrl,
};
