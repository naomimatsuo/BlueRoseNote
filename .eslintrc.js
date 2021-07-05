module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  globals: {
    "$": false,
    "jQuery": false
  },
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    'eol-last': 0,
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/max-attributes-per-line': 'off',
    'semi': 'off',
    'no-unused-vars': 'off',
    'vue/html-self-closing': ['error', {
      'html': {
        'void': 'always'
      }
    }]
  }
}
