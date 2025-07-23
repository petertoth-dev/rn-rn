module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['module:react-native-dotenv'],
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@src': './src',
          '@components': './src/components',
          '@state': './src/state',
          '@app-types': './types',
        },
      },
    ],
  ]
};
