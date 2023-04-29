export const toKebabCase = (string) =>
  string
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();

export const toSnakeCase = (string) =>
  string
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map((x) => x.toLowerCase())
    .join("_");

const convertSectionSchemaToTranslationStrings = (schema, options = {}) => {
  const { translationStringRoot, contentCountMap = new Map() } = options;
  const filteredTranslationRoot = translationStringRoot.filter(Boolean);

  return Object.keys(schema).reduce((acc, curKey) => {
    switch (curKey) {
      case "name":
      case "label":
      case "info":
        return {
          ...acc,
          [curKey]: [...filteredTranslationRoot, curKey].join("."),
        };

      case "content":
        const contentType = filteredTranslationRoot.pop();
        const newKey = `${contentType}__${contentCountMap.get(contentType)}`;
        contentCountMap.set(contentType, contentCountMap.get(contentType) + 1);

        filteredTranslationRoot.push(newKey);

        return {
          ...acc,
          [curKey]: [...filteredTranslationRoot, curKey].join("."),
        };

      case "options":
        return {
          ...acc,
          [curKey]: schema[curKey].map((item, i) => {
            return convertSectionSchemaToTranslationStrings(item, {
              translationStringRoot: [
                ...filteredTranslationRoot,
                `${curKey}__${i + 1}`,
                item?.id || item?.type,
              ],
            });
          }),
        };

      case "settings":
      case "blocks":
        const newCountMap = new Map([
          ["header", 1],
          ["paragraph", 1],
        ]);
        return {
          ...acc,
          [curKey]: schema[curKey].map((item) => {
            return convertSectionSchemaToTranslationStrings(item, {
              translationStringRoot: [
                ...filteredTranslationRoot,
                curKey,
                item?.id || item?.type,
              ],
              contentCountMap: newCountMap,
            });
          }),
        };

      default:
        return { ...acc, [curKey]: schema[curKey] };
    }
  }, {});
};

const getSectionSchemaLocale = (object) => {
  const contentCountMap = new Map([
    ["header", 1],
    ["paragraph", 1],
  ]);

  return Object.keys(object).reduce((acc, curKey) => {
    const objectKey = object[curKey]?.id || object[curKey]?.type || curKey;

    switch (curKey) {
      case "name":
      case "label":
        return { ...acc, [objectKey]: object[curKey] };
      case "content":
        return { ...acc, [curKey]: object[curKey] };
      case "settings":
      case "blocks":
        return {
          ...acc,
          [objectKey]: object[curKey].reduce((acc, cur) => {
            const newKey = cur?.id || cur?.type;
            if (contentCountMap.has(newKey)) {
              const newKeyCount = `${newKey}__${contentCountMap.get(newKey)}`;
              contentCountMap.set(newKey, contentCountMap.get(newKey) + 1);

              return { ...acc, [newKeyCount]: getSectionSchemaLocale(cur) };
            } else {
              return { ...acc, [newKey]: getSectionSchemaLocale(cur) };
            }
          }, {}),
        };
      case "options":
        return { ...acc, ...getOptionsSettingsSchema(object[curKey], curKey) };
      default:
        return { ...acc };
    }
  }, {});
};

const getOptionsSettingsSchema = (obj, name) => {
  return obj.reduce((acc, cur, curIndex) => {
    return { ...acc, [`${name}__${curIndex + 1}`]: cur?.label };
  }, {});
};

export const shopifySchemaTranslate = (
  schema,
  sectionName = "section_name"
) => {
  const translationRoot = ["t:sections", sectionName];

  const schemaTranslation = convertSectionSchemaToTranslationStrings(schema, {
    translationStringRoot: translationRoot,
  });
  const sectionSchemaLocale = getSectionSchemaLocale(schema, sectionName);

  const sectionSchemaTranslation = {
    [sectionName]: sectionSchemaLocale,
  };

  return [schemaTranslation, sectionSchemaTranslation];
};
