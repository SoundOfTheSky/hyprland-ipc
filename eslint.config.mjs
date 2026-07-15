// @ts-check
import skyEslintConfig from '@softsky/configs/eslint.config.mjs'

/** @type {import("typescript-eslint").Config} */
export default [
  ...skyEslintConfig,
  {
    rules: {
      'import-x/no-unresolved': 0,
      '@typescript-eslint/no-unsafe-member-access': 0,
    },
  },
]
