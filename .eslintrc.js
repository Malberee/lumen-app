// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    '@feature-sliced/eslint-config/rules/public-api',
    '@feature-sliced/eslint-config/rules/layers-slices',
    'expo',
    'prettier',
  ],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'no-console': 'error',
    'react/display-name': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        prefer: 'type-imports',
        fixStyle: 'inline-type-imports',
      },
    ],
  },
  ignorePatterns: ['/dist/*'],
}
