import globals from 'globals';
import pluginJs from '@eslint/js';
import tsEslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';


export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
  { languageOptions: { globals: globals.browser } },
  { ignores: ['dist', 'node_modules'] },
  pluginJs.configs.recommended,
  eslintConfigPrettier,
  ...tsEslint.configs.recommended,
  {
    rules: {
      'no-console': 'warn',
      'quotes': [2, 'single'],
      'semi': [2, 'always'],
      'object-curly-spacing': [2, 'always'],
      'comma-spacing': [2, { before: false, after: true }],
      'object-shorthand': [2, 'always'],
      '@typescript-eslint/no-unused-vars': ['error', { 'varsIgnorePattern': '^_' }],
    },
  },
];