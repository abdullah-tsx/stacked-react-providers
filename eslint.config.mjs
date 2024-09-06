import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin"; // Correct import for typescript-eslint plugin
import pluginReact from "eslint-plugin-react";
import eslintConfigPrettier from "eslint-config-prettier";
import pluginPrettier from "eslint-plugin-prettier";

export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: { globals: globals.browser } },
  
  pluginJs.configs.recommended,

  ...tseslint.configs.recommended,
  
  pluginReact.configs.flat.recommended,
  
  {
    plugins: { prettier: pluginPrettier },
    rules: {
      "prettier/prettier": "error"
    },
  },
  
  eslintConfigPrettier,
];