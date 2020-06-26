import * as Ajv from 'ajv';

interface ExtraSanitizers{

}
type function = () => unknown

ajvSanitizer(ajv: Ajv, extraSanitizers: function[]): Ajv