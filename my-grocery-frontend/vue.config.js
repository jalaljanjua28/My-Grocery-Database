module.exports = {
  transpileDependencies: ["body-parser"], // Add your dependencies here
  configureWebpack: {
    resolve: {
      alias: {
        "@components": "src/components",
      },
    },
  },
};
