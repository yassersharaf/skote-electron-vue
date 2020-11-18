module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        "appId": "com.example.app",
        "icon": "./src/assets/icons/Icon-512.png",
        "win" : {
          "icon" : "src/assets/images/app_icon.png",
        },
        "linux" : {
          "target" : ["deb"],
          "maintainer" : "LamasaTech",
          "vendor" : "LamasaTech",
          "executableName" : "VisiPoint version 5",
          "category" : "Utility",
          "icon": "./src/assets/icons/",
          /*"extraResources": [
            "./assets/icons/**"
          ],*/
          "extraFiles": [
            {
              "from": "resources",
              "to": "resources",
              "filter": [
                "**/*"
              ]
            }
          ],
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
