import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 2021, // or the version you are using
        sourceType: "module", // allows the use of import/export
        ecmaFeatures: {
          jsx: true, // enables JSX support
        },
      },
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
];