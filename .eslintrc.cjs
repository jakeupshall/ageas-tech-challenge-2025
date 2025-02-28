module.exports = {
  parserOptions: {
    project: ['./tsconfig.eslint.json'],
  },
  plugins: ['@typescript-eslint', 'react-hooks'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
  ],
  rules: {
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['../*'],
            message: 'Should only use absolute paths.',
          },
        ],
      },
    ],
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: [
          'parameter',
          'typeProperty',
          'variable',
          'classProperty',
          'parameterProperty',
        ],
        types: ['boolean'],
        format: ['PascalCase'],
        prefix: ['is', 'should', 'has', 'can', 'did', 'does', 'will'],
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
  },
};
