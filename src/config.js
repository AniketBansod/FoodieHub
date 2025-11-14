export const  IMG_CDN_URL = "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/";

// Centralize coordinates so we can change them (or make them dynamic) in one place.
// NOTE: replace these if your app should target a different default location.
export const LATITUDE = 28.4640087729816;
export const LONGITUDE = 77.02618695368315;

// Optional: point frontend to our backend (Render/local) to avoid CORS
// When deploying, set API_BASE_URL at build time (Parcel inlines process.env)
// For local dev, fall back to local backend if not provided.
const DEV_API = "http://localhost:8080";

function sanitizeBase(v) {
  if (!v) return "";
  // Trim and remove surrounding quotes if env accidentally set to "" or ''
  let s = String(v).trim().replace(/^['"]|['"]$/g, "");
  // Remove trailing slashes
  s = s.replace(/\/+$/, "");
  return s;
}

export const API_BASE_URL = (function () {
  const raw = process.env.API_BASE_URL;
  const cleaned = sanitizeBase(raw);
  if (cleaned) return cleaned;
  return process.env.NODE_ENV !== "production" ? DEV_API : "";
})();

