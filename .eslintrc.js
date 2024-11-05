module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended", "airbnb-base", "prettier"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.js", ".eslintrc.cjs"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
  },
  rules: {
    // Allow identifiers starting with an underscore, specifically for _id
    "id-match": [
      "error",
      "^_?id$|^[a-z]+([A-Z][a-z]+)*$",
      { onlyDeclarations: true },
    ],
    // Allow underscore dangle only for _id
    "no-underscore-dangle": ["error", { allow: ["_id"] }],
  },
};
