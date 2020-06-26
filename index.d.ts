import * as Ajv from 'ajv';

type function = () => unknown

ajvSanitizer(ajv: Ajv, extraSanitizers: function[]): Ajv

export default ajvSanitizer;
