module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        "appId": "com.example.app",
        "win" : {
          "icon" : "src/assets/images/app_icon.png",
        },
        "linux" : {
          "target" : "deb",
          "maintainer" : "LamasaTech",
          "vendor" : "LamasaTech",
          "executableName" : "VisiPoint version 5",
          "category" : "Utility",
          "icon" : "./src/assets/images/Icon-256x256.png",
        },
        "productName" : "VisiPoint version 5"
      }
    },
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    }
  }
}
