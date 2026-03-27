const { createProxyMiddleware } = require("http-proxy-middleware");

/**
 * Dev-only: proxy /api → backend so the browser talks to localhost:3000 (same origin).
 * Set REACT_APP_API_URL to your Railway (or local) API in .env.development.
 */
module.exports = function (app) {
  if (process.env.REACT_APP_USE_PROXY !== "true") {
    return;
  }
  const target = process.env.REACT_APP_API_URL;
  if (!target) {
    console.warn(
      "[setupProxy] REACT_APP_USE_PROXY=true but REACT_APP_API_URL is missing — proxy disabled"
    );
    return;
  }
  app.use(
    "/api",
    createProxyMiddleware({
      target,
      changeOrigin: true,
      secure: true,
      logLevel: "silent",
    })
  );
};
