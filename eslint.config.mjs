import globals from 'globals';
import pluginJs from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import tseslint from 'typescript-eslint';

export default [
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node }
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPluginPrettierRecommended,
  {
    files: ['src/**/*.ts', 'framework/**/*.ts'],
    languageOptions: {
      parser: tseslint.parser,  
      parserOptions: {
        project: './tsconfig.json', 
        tsconfigRootDir: import.meta.dirname
      }
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_' 
      }],
      '@typescript-eslint/no-explicit-any': 'warn' //  предупреждение, а не ошибка
    }
  },
  {
    ignores: [
      'reports/**',
      'coverage/**',
      'dist/**',
      'build/**',
      'node_modules/**',
      '**/*.config.js',
      '**/*.config.cjs',
      'jest.setup.ts',
      'babel.config.cjs',
      'eslint.config.mjs',
      'jest-html-reporters-attach/**'
    ]
  }
];