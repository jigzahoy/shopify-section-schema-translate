export const getSectionSchemaLocale = (schema) => {
  const contentCountMap = new Map([
    ["header", 1],
    ["paragraph", 1],
  ]);

  return Object.keys(schema).reduce((acc, curKey) => {
    const objectKey = schema[curKey]?.id || schema[curKey]?.type || curKey;

    switch (curKey) {
      case "name":
      case "label":
        return { ...acc, [objectKey]: schema[curKey] };
      case "content":
        return { ...acc, [curKey]: schema[curKey] };
      case "settings":
      case "blocks":
        return {
          ...acc,
          [objectKey]: schema[curKey].reduce((acc, cur) => {
            const newKey = cur?.id || cur?.type;

            if (contentCountMap.has(newKey)) {
              const newKeyCount = `${newKey}__${contentCountMap.get(newKey)}`;
              contentCountMap.set(newKey, contentCountMap.get(newKey) + 1);
              return { ...acc, [newKeyCount]: getSectionSchemaLocale(cur) };
            } else if (newKey === "@app") {
              return { ...acc };
            } else {
              return { ...acc, [newKey]: getSectionSchemaLocale(cur) };
            }
          }, {}),
        };
      case "options":
        return { ...acc, ...getOptionsSettingsSchema(schema[curKey], curKey) };

      case "presets":
        return {
          ...acc,
          [objectKey]: schema[curKey].reduce((acc, cur, i) => {
            if (i > 1) return { ...acc };
            return {
              ...acc,
              name: cur?.name,
            };
          }, {}),
        };
      default:
        return { ...acc };
    }
  }, {});
};

const getOptionsSettingsSchema = (obj, name) => {
  return obj.reduce((acc, cur, curIndex) => {
    return {
      ...acc,
      [`${name}__${curIndex + 1}`]: {
        label: cur?.label,
      },
    };
  }, {});
};
