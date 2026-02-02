import { nextJsConfig } from '@repo/eslint-config/next-js';

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...nextJsConfig,
  {
    rules: {
      'max-lines': [
        'error',
        { max: 600, skipBlankLines: true, skipComments: true },
      ],
    },
  },
];
