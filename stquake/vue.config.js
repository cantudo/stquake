module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    disableHostCheck: true
  }
  //chainWebpack: config => config.resolve.set('symlinks', false)
}
