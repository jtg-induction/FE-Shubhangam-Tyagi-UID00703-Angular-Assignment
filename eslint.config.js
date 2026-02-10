const eslint = require('@eslint/js');
const { defineConfig } = require('eslint/config');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const importPlugin = require('eslint-plugin-import');
module.exports = defineConfig([
  {
    ignores: [
      '**/*.json',
      '.angular/**', // for cache
      'coverage/**', // for use at time of unit test
      'node_modules/**', // for packages
      '.vscode/**', // vs code config
      'docs/**', // for docs
    ],
    files: ['**/*.ts'],
    plugins: {
      import: importPlugin,
    },
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      tseslint.configs.stylistic,
      angular.configs.tsRecommended,
      eslintPluginPrettierRecommended,
    ],
    processor: angular.processInlineTemplates,
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
      },
    },
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
       "@typescript-eslint/no-explicit-any": "off",
      'import/no-unresolved': 'error',
      'import/no-duplicates': 'error',
      'import/no-cycle': ['error', { maxDepth: 1 }],
      'import/order': [
        'error',
        {
          groups: [
            'builtin', // for node js core modules
            'external', // for external libraries installed,
            'internal', // for project codes,
            'parent',
            'sibling',
            'index',
            'type',
          ],
        },
      ],
    },
  },
  {
    files: ['**/*.html'],
    extends: [angular.configs.templateRecommended, angular.configs.templateAccessibility],
    rules: {},
  },
]);
