export const convertSectionSchemaToTranslationStrings: SectionSchemaToTranslatedSchema =
  (schema, options) => {
    const { translationStringRoot, contentCountMap = new Map() } = options;
    const filteredTranslationRoot = translationStringRoot.filter(Boolean);

    return Object.keys(schema).reduce((acc, schemaKey) => {
      switch (schemaKey) {
        case "name":
        case "label":
        case "info":
          return {
            ...acc,
            [schemaKey]: [...filteredTranslationRoot, schemaKey].join("."),
          };

        case "settings":
        case "blocks":
          const newCountMap = new Map([
            ["header", 1],
            ["paragraph", 1],
          ]);

          return {
            ...acc,
            [schemaKey]: schema[schemaKey].map((item) => {
              return convertSectionSchemaToTranslationStrings(item, {
                translationStringRoot: [
                  ...filteredTranslationRoot,
                  schemaKey,
                  item?.id || item?.type,
                ],
                contentCountMap: newCountMap,
              });
            }),
          };

        case "content":
          // Content Type from Header & Paragraph
          const contentType = filteredTranslationRoot.pop();
          const newKey = `${contentType}__${contentCountMap.get(contentType)}`;

          contentCountMap.set(
            contentType,
            contentCountMap.get(contentType) + 1
          );
          filteredTranslationRoot.push(newKey);

          return {
            ...acc,
            [schemaKey]: [...filteredTranslationRoot, schemaKey].join("."),
          };

        case "options":
          return {
            ...acc,
            [schemaKey]: schema[schemaKey].map((item, i: number) => {
              return convertSectionSchemaToTranslationStrings(item, {
                translationStringRoot: [
                  ...filteredTranslationRoot,
                  `${schemaKey}__${i + 1}`,
                  item?.id || item?.type,
                ],
              });
            }),
          };

        case "presets":
          const [firstPreset, ...rest] = schema[schemaKey];
          const { name, ...restFirst } = firstPreset;

          return {
            ...acc,
            [schemaKey]: [
              {
                name: [...filteredTranslationRoot, schemaKey, "name"].join("."),
                ...restFirst,
              },
              ...rest,
            ],
          };

        case "class":
        case "tag":
        case "enabled_on":
        case "disabled_on":
          return { ...acc}
        default:
          return { ...acc, [schemaKey]: schema[schemaKey] };
      }
    }, {});
  };
