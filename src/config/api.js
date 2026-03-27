export function getApiBaseUrl() {
  const usesProxy = process.env.REACT_APP_USE_PROXY === "true";

  if (process.env.NODE_ENV === "development" && usesProxy) {
    return "";
  }

  const base = process.env.REACT_APP_API_URL;

  if (!base) {
    throw new Error("REACT_APP_API_URL is not set");
  }

  return base.replace(/\/+$/, "");
}

export function apiUrl(path) {
  const base = getApiBaseUrl();
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}