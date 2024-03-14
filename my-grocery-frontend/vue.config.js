module.exports = {
  transpileDependencies: ["body-parser"], // Add your dependencies here
  configureWebpack: {
    resolve: {
      alias: {
        "@components": "src/components",
      },
    },
  },
  devServer: {
    compress: true,
    disableHostCheck: true,
    proxy: {
      "/api": {
        target: "https://my-grocery-app-hlai3cv5za-uc.a.run.app",
        changeOrigin: true, // Add this line
        secure: false, // Add this line if your backend server uses self-signed SSL certificates
        pathRewrite: { "^/api": "" }, // Add this line if your API doesn't have a '/api' prefix
      },
    },
  },
};
