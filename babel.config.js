module.exports = {
  presets: ["module:metro-react-native-babel-preset", "module:react-native-dotenv"],
  env: {
    production: {},
  },
  plugins: [
    [
      "@babel/plugin-proposal-decorators",
      {
        legacy: true,
      },
    ],
    ["@babel/plugin-proposal-optional-catch-binding"],
       [
             'module-resolver',
            {
              roots: ['./app'],
              extensions: ['.js', '.ts', '.tsx', '.json'],
           alias: {
             "@assets": "./app/assets/index"  ,
             "@components": "./app/components",
             "@i18n": "./app/i18n/index",
             "@navigation": "./app/navigation/index",
             "@screens": "./app/screens",
             "@models": "./app/models",
             "@api": "./app/services/api/index",
             "@stores": "./app/stores",
             "@theme": "./app/theme/index",
             "@utils": "./app/utils",
             "@storage": "./app/utils/storage/index",
             "@environment": "./app/environment"
           }
       }
     ]
  ],
}
