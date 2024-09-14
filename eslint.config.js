// eslint.config.js
export default [
  {
    ignores: ['node_modules/', 'dist/', '*.min.js'] // Add directories or files to ignore
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2020
    },
    rules: {
      // Add your rules here (or extend from existing configurations)
      'no-console': 'warn',
      semi: ['error', 'always']
      // other rules...
    }
  }
];
