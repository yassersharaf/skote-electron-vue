module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        "appId": "com.example.app",
        "publish": {
          "provider": "github",
          "url": "https://github.com/yassersharaf/skote-electron-vue"
        },
        "icon": "./src/assets/icons/Icon-512.png",
        "win" : {
          "icon" : "src/assets/images/app_icon.png",
        },
        "linux" : {
          "publish": ["github"],
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
            },
          ],
        },
        /*"mac": {
          "target" : ["dmg"],
          "icon": "./build/Icon-512.icns",
          "category": "public.app-category.utilities"
        },*/
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
