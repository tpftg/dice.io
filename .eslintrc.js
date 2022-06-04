module.exports = {
  "extends": "eslint:recommended",
  "env": {
    "browser": true,
    "node": true,
    "es6": true,
  },
  "rules": {
    "no-console": "off",
    "space-before-function-paren": ["error", {
      "anonymous": "always",
      "named": "never",
      "asyncArrow": "always"
    }]
  },
  "parserOptions": {
    "ecmaVersion": 8,
    "sourceType": "module"
  }
}
