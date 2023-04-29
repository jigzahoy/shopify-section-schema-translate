import Alpine from "alpinejs";
import { shopifySchemaTranslate } from "../src/shopifySchemaTranslate";

window.Alpine = Alpine;

const initialValue = `{
  "name": "Slideshow",
  "tag": "section",
  "class": "slideshow",
  "limit": 1,
  "settings": [
    {
      "type": "header",
      "content": "Section Header 1"
    },
    {
      "type": "paragraph",
      "content": "This section will display your brand information."
    },
    {
      "type": "checkbox",
      "id": "show_announcement",
      "label": "Show announcement",
      "default": true
    }
  ]
}`;

Alpine.data("RootApp", () => ({
  inputSchema: initialValue,

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
      return JSON.stringify(this.results()[0], null, 2) || "";
    } catch (error) {
      console.error(error);
      return;
    }
  },

  get translatedResults() {
    try {
      return JSON.stringify(this.results()[1], null, 2) || "";
    } catch (error) {
      console.error(error);
      return;
    }
  },
}));

Alpine.start();
