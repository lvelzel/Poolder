module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "standard-with-typescript",
    "next",
    "next/core-web-vitals",
    "plugin:prettier/recommended",
    "prettier",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
  },
  plugins: ["prettier"],
  rules: {
    "@typescript-eslint/explicit-function-return-type": ["warn"],
    "@typescript-eslint/no-misused-promises": ["warn"],
    "@typescript-eslint/no-unused-vars": ["warn"],
    "@typescript-eslint/strict-boolean-expressions": ["warn"],
  },
};
