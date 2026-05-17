import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import noComments from 'eslint-plugin-no-comments';
import prettierPlugin from 'eslint-plugin-prettier';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  globalIgnores(['dist', 'node_modules']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      prettier,
    ],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      prettier: prettierPlugin,
      'no-comments': noComments,
    },
    rules: {
      'prettier/prettier': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      'no-comments/disallowComments': [
        'error',
        {
          allow: [
            'istanbul ignore next',
            'eslint-disable-next-line @typescript-eslint/ban-types',
            'istanbul ignore file',
            'eslint-disable-next-line @typescript-eslint/ban-ts-comment',
            '@ts-ignore',
            '/',
          ],
        },
      ],
    },
  },
]);
