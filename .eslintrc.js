module.exports = {
  env: {
    browser: true,
    node: true
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  plugins: ['react', 'import', 'import-alias', '@typescript-eslint', 'prettier'],
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-array-constructor': 'error',
    '@typescript-eslint/no-duplicate-imports': 'error',
    '@typescript-eslint/no-shadow': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/no-unused-expressions': 'off',
    'no-underscore-dangle': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'prettier/prettier': ['error', { printWidth: 100 }],
    'react/destructuring-assignment': 0,
    'react/jsx-key': 'error',
    'react-hooks/exhaustive-deps': 'off',
    // 如果是class私有方法，使用private, _xxx是不推荐的写法
    'no-plusplus': 0,
    'import/no-deprecated': 'error',
    // 'max-len': ['error', { code: 100 }],
    'import-alias/import-alias': [
      'error',
      {
        relativeDepth: 1,
        rootDir: __dirname,
        aliases: [
          {
            alias: '@',
            matcher: './src'
          }
        ]
      }
    ]
  },
  settings: {
    react: {
      version: 'detect'
    },
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts']
      }
    }
  }
};
