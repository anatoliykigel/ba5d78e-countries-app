module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  extends: ['@nuxtjs/eslint-config-typescript'],
  plugins: [],
  rules: {
    'linebreak-style': ['error', (process.platform === 'win32' ? 'windows' : 'unix')],
    quotes: [
      'error',
      'single'
    ],
    semi: [
      'error',
      'always'
    ],
    curly: ['error', 'multi']
  }
};
