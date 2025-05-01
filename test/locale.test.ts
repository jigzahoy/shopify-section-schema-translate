import { describe, expect, it, vi } from "vitest";
import { shopifySchemaTranslate } from "../src/lib/shopify-section-schema-translate";

describe("schema to locale", () => {
  const SECTION_NAME = "section_name";

  it("section locale name", () => {
    const testData = {
      name: "Test Section",
    };

    const [_, translatedLocale] = shopifySchemaTranslate(
      testData,
      SECTION_NAME
    );

    expect(translatedLocale).toHaveProperty(SECTION_NAME);
    expect(translatedLocale).toEqual({
      section_name: {
        name: "Test Section",
      },
    });
  });
});
