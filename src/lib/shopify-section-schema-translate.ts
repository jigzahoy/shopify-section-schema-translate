import { getSectionSchemaLocale } from "./schema-to-locale";
import { convertSectionSchemaToTranslationStrings } from "./schema-to-translated";

export const shopifySchemaTranslate = (
  schema: Schema,
  sectionName = "section_name"
) => {

  const translationRoot: TranslationRoot = ["t:sections", sectionName];

  const schemaTranslation = convertSectionSchemaToTranslationStrings(schema, {
    translationStringRoot: translationRoot,
  });

  const sectionSchemaLocale = getSectionSchemaLocale(schema);
  const sectionSchemaTranslation = {
    [sectionName]: sectionSchemaLocale,
  };

  return [schemaTranslation, sectionSchemaTranslation];
};

