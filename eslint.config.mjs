import antfu from '@antfu/eslint-config'

export default antfu({
  vue: true,
  typescript: true,
  ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**', '**/dist-electron/**'],
  gitignore: true,
  stylistic: true,
  rules: {
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: {
          max: 2,
        },
        multiline: {
          max: 1,
        },
      },
    ],
    'ts/no-redeclare': 'off',
    'ts/consistent-type-definitions': ['error', 'type'],
    'no-console': ['warn'],
    'antfu/no-top-level-await': ['off'],
    'node/prefer-global/process': ['off'],
    'perfectionist/sort-imports': [
      'error',
      {
        tsconfig: {
          rootDir: '.',
        },
      },
    ],
    'unicorn/filename-case': [
      'error',
      {
        case: 'kebabCase',
        ignore: ['README.md', 'App.vue'],
      },
    ],
  },
})
