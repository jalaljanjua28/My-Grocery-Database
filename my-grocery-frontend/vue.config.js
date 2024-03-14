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
    proxy: {
      "/api": {
        target: "https://my-grocery-app-hlai3cv5za-uc.a.run.app",
        secure: false, // Add this line if your backend server uses self-signed SSL certificates
      },
    },
  },
};
