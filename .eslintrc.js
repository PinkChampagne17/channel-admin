module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "airbnb",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "jsx-a11y/anchor-is-valid": ["warn"],
    "no-unused-vars": ["warn"],
    "react/jsx-filename-extension": ["warn", { extensions: [".tsx", ".jsx"] }],
    "func-names": ["off"],
    "import/extensions": ["off"],
    "import/no-unresolved": ["off"],
    "import/prefer-default-export": ["off"],
    "react/jsx-no-bind": ["off"],
    "react/jsx-props-no-spreading": ["off"],
    "react/no-children-prop": ["off"],
    "react/require-default-props": ["off"],
  },
};
