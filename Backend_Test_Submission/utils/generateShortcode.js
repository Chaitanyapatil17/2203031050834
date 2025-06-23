export function isValidURL(url) {
  try {
    new URL(url);
      return true;
  } catch {
    return false;
  }
}

export function   isValidShortcode(shortcode) {
  return /^[a-zA-Z0-9]{4,10}$/.test(shortcode);
}

export function generateUniqueShortcode(length = 6) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }return result;
}  