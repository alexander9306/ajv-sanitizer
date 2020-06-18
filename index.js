/* eslint-disable no-param-reassign */
const ajvSanitizer = (ajv, extraSanitizers) => {
  const extendedSanitizers = {
    ...extraSanitizers,
  };

  ajv.addKeyword('sanitize', {
    modifying: true,
    compile: function compile(schema) {
      let sanitize;

      if (typeof schema === 'string') {
        sanitize = extendedSanitizers[schema];
      }

      if (typeof schema === 'function') {
        sanitize = schema;
      }

      if (!sanitize && !Array.isArray(schema)) {
        throw new TypeError('Unknown sanitizer');
      }

      return (data, currentDataPath, parentDataObject, propertyName) => {
        if (!propertyName && propertyName !== 0) throw new TypeError('Data must be a property of an object');
        if (Array.isArray(schema)) {
          schema.forEach((v) => {
            sanitize = extendedSanitizers[v];
            if (typeof sanitize !== 'undefined' && Object.prototype.toString.call(sanitize) === '[object Function]') data = sanitize(data);
          });
          parentDataObject[propertyName] = data;
        } else {
          parentDataObject[propertyName] = sanitize(data);
        }
        return true;
      };
    },
    errors: false,
  });

  return ajv;
};

module.exports = ajvSanitizer;