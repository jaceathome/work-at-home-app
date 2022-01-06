const path = require('path');

module.exports = {
  outputDir: path.resolve(__dirname, '../public'),
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    hot: true,
    liveReload: true
  },
  configureWebpack: {
    devServer: {
      proxy: {
        "/api": {
          target: "http://localhost:3000"
        }
      }
    }
  }
}
