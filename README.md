# VP5 - Vue based admin template

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

SQLite3

````
npm i -g electron
npm i -g electron-rebuild
npm i -g sqlite3
electron-rebuild -f -w sqlite3
````

Last step on linux should be: (not tested yet)
```
./node_modules/.bin/electron-rebuild  -f -w sqlite3
```

Then

````
npm install
````