import { basicSetup, EditorView } from "codemirror";
import { EditorState } from "@codemirror/state";
import { json } from "@codemirror/lang-json";
import { oneDark } from "@codemirror/theme-one-dark";

import { shopifySchemaTranslate } from "../src/lib/shopify-section-schema-translate";
import { initialValue } from "./sampleData";

const [initialTranslated, initialLocale] = shopifySchemaTranslate(
  JSON.parse(initialValue)
);

let localeEditor = new EditorView({
  doc: JSON.stringify(initialLocale, null, 2),
  extensions: [
    basicSetup,
    json(),
    oneDark,
    EditorState.readOnly.of(true),
  ],
  parent: document.querySelector("#locale-schema"),
});

let translatedEditor = new EditorView({
  doc: JSON.stringify(initialTranslated, null, 2),
  extensions: [
    basicSetup,
    json(),
    oneDark,
    EditorState.readOnly.of(true),
  ],
  parent: document.querySelector("#translated-schema"),
});

new EditorView({
  doc: initialValue,
  extensions: [
    basicSetup,
    json(),
    oneDark,
    EditorView.updateListener.of((view) => {
      if (!view.docChanged) return;

      const content = view.state.doc.toString();
      updateView(content);
    }),
  ],
  parent: document.querySelector("#main-editor"),
});

function updateView(content) {
  let localeString = "";
  let translatedString = "";

  try {
    const [translated, locale] = shopifySchemaTranslate(JSON.parse(content));

    localeString = JSON.stringify(locale, null, 2);
    translatedString = JSON.stringify(translated, null, 2);
  } catch (e) {
    localeString = "Schema is not valid";
    translatedString = "Schema is not valid";
  } finally {
    localeEditor.dispatch({
      changes: {
        from: 0,
        to: localeEditor.state.doc.length,
        insert: localeString,
      },
    });

    translatedEditor.dispatch({
      changes: {
        from: 0,
        to: translatedEditor.state.doc.length,
        insert: translatedString,
      },
    });
  }
}
