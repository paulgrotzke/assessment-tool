module.exports = {
  ignorePatterns: ['.eslintrc.js'],
  globals: {
    __PATH_PREFIX__: true,
  },
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    'react/no-children-prop': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/prefer-as-const': 0,
    '@typescript-eslint/no-namespace': 0,
    '@typescript-eslint/no-empty-interface': 0,
    'prefer-const': 0,
    '@typescript-eslint/no-var-requires': 0,
  },
};
