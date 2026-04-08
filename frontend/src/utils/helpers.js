const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001'
const PLACEHOLDER_IMAGE = 'https://placehold.co/400x500?text=No+Image'

export const getImageUrl = (img) => {
    if (!img || typeof img !== 'string') return PLACEHOLDER_IMAGE
    if (img.startsWith('http') || img.startsWith('data:image')) return img
    if (img.startsWith('/uploads')) return `${API_BASE_URL}${img}`
    return img; // Cho trường hợp /src/assets/...
}

export default getImageUrl