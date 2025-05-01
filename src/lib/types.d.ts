interface Schema {
  [key: string]: any;
}

type TranslationRoot = Array<String>;

type SectionSchemaToTranslatedSchema = (
  schema: Schema,
  options: SectionSchemaToTranslatedSchemaOptions
) => {};

interface SectionSchemaToTranslatedSchemaOptions {
  translationStringRoot: TranslationRoot;
  contentCountMap?: Map<String, Number>;
}

type SectionSchemaToTranslatedSchema = (schema: Schema) => {};
