// eslint.config.js
export default [
  {
    ignores: ['node_modules/', 'dist/', '*.min.js'] // Add directories or files to ignore
  },
  {
    extends: 'eslint:recommended',
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2020,
      parser: 'babel-eslint'
    },
    rules: {
      // Add your rules here (or extend from existing configurations)
      'no-console': 'warn',
      semi: ['error', 'always']
      // other rules...
    }
  }
];
