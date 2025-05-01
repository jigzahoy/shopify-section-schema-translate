import {  describe, expect, it, vi } from "vitest";
import { shopifySchemaTranslate } from "../src/lib/shopify-section-schema-translate";

describe("schema to translation string", () => {
  const SECTION_NAME = "section_name";

  it("section name", () => {
    const testData = {
      name: "Test Section",
    };

    const [translatedSchema, _] = shopifySchemaTranslate(
      testData,
      SECTION_NAME
    );

    expect(translatedSchema).toEqual({
      name: "t:sections.section_name.name",
    });
  });

  it("does not have 'tag' & 'class' property", () => {
    const testData = {
      name: "Test Section",
      tag: "section",
      class: "section",
    };

    const [translatedSchema, _] = shopifySchemaTranslate(
      testData,
      SECTION_NAME
    );

    expect(translatedSchema).not.toHaveProperty("tag");
    expect(translatedSchema).not.toHaveProperty("class");
  });

  it("does not have 'enabled_on' & 'disabled_on' property", () => {
    const testData = {
      name: "Test Section",
      enabled_on: {
        templates: ["password"],
      },
      disabled_on: {
        templates: ["password"],
      },
    };

    const [translatedSchema, _] = shopifySchemaTranslate(
      testData,
      SECTION_NAME
    );

    expect(translatedSchema).not.toHaveProperty("enabled_on");
    expect(translatedSchema).not.toHaveProperty("disabled_on");
  });
});
