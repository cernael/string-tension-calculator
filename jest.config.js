module.exports = {
  rootDir: __dirname,
  displayName: 'website',
  collectCoverageFrom: ['src/**/*.{js,jsx,mjs}'],
  setupFiles: ['<rootDir>/packages/website/config/polyfills.js'],
  testMatch: ['<rootDir>/**/__tests__/**/*.{js,jsx,mjs}'],
  testEnvironment: 'node',
  testURL: 'http://localhost',
  transform: {
    '^.+\\.(js|jsx|mjs)$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.css$': '<rootDir>/packages/website/config/jest/cssTransform.js',
    '^(?!.*\\.(js|jsx|mjs|css|json)$)':
      '<rootDir>/packages/website/config/jest/fileTransform.js',
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$'],
  moduleNameMapper: {
    '^react-native$': 'react-native-web',
  },
  moduleFileExtensions: [
    'web.js',
    'js',
    'json',
    'web.jsx',
    'jsx',
    'node',
    'mjs',
  ],
};
