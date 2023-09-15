import Alpine from "alpinejs";
import { shopifySchemaTranslate } from "../src/shopifySchemaTranslate";
import { initialValue } from "./sampleData";
import hljs from "highlight.js/lib/core";
import json from "highlight.js/lib/languages/json";

import "highlight.js/styles/atom-one-dark.css";

window.Alpine = Alpine;

Alpine.data("RootApp", () => ({
  inputSchema: initialValue,

  init() {
    hljs.registerLanguage("json", json);
  },

  results() {
    try {
      if (!this.inputSchema) return "";
      const schema = JSON.parse(this.inputSchema);

      const jsonConverted = shopifySchemaTranslate(schema);

      return jsonConverted;
    } catch (error) {
      console.error(error);
    }
  },

  get schemaResults() {
    try {
      const resultsString = JSON.stringify(this.results()[0], null, 2) || "";
      return hljs.highlight(resultsString, { language: "json" }).value;
    } catch (error) {
      console.error(error);
      return;
    }
  },

  get translatedResults() {
    try {
      const resultsString = JSON.stringify(this.results()[1], null, 2) || "";
      return hljs.highlight(resultsString, { language: "json" }).value;
    } catch (error) {
      console.error(error);
      return;
    }
  },
}));

Alpine.start();
