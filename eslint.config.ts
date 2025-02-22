// @ts-check
import eslint from '@eslint/js';
import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';

export default tseslint.config(
  eslint.configs.recommended,
  js.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  { ignores: ['**/dist/**', '**/build/**', '**/node_modules/**'] },
  {
    plugins: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      'react-hooks': reactHooks as any,
      'react-refresh': reactRefresh,
      '@stylistic': stylistic
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_'}
      ],
      'no-console': 'warn',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-refresh/only-export-components': [
        'warn', { allowConstantExport: true }
      ],
      '@stylistic/indent': ['error', 2],
      '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],
      '@stylistic/space-in-parens': ['error', 'never'],
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/jsx-quotes': ['error', 'prefer-single'],
    },
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser
    }
  }
);