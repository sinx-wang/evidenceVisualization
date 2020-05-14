const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("*", {
      target: "http://118.178.19.149:8099",
      changeOrigin: true,
    })
  );
};
