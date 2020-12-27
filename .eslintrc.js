module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb',
    'plugin:react-hooks/recommended',
    'prettier',
    'prettier/react'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'prettier',
    'react',
    '@typescript-eslint',
  ],
  settings: {
    'import/extensions': ['.ts', '.tsx', 'js', 'scss'],
  },
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    quotes: ['error', 'single'],
    indent: ['error', 4],
    'no-multi-spaces': ['error'],
    '@typescript-eslint/no-unused-vars': 'error',
    "react/jsx-filename-extension": [1, { "extensions": [".ts", ".tsx"] }],
    'import/prefer-default-export': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 2,
    'react/react-in-jsx-scope': 'off',
    'import/no-unresolved': 'off',
    'arrow-body-style': 'off',
    'react/prop-types': 'warn',
    "import/no-extraneous-dependencies": ["error", { "devDependencies": true }],
  },
};
