import globals from 'globals'
import pluginJs from '@eslint/js'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

export default [
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  eslintPluginPrettierRecommended,
  {
    ignores: [
      "reports/**",
      "coverage/**",
      "dist/**",
      "build/**",
      "node_modules/**",
      "**/*.config.js",
      "**/*.config.cjs",
      "jest.setup.ts",
      "babel.config.cjs",
      "eslint.config.mjs",
      "jest-html-reporters-attach/**"
    ]
  }
]
