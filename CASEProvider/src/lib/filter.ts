/**
 * Simple filter builder. This assumes a single expression in the filter.
 * @param filter
 */
export function constructFilter(filter: string, type: string = 'CfDocument') {
  const regex = /^(\w+)+(!=|>=|<=|=|>|<|~){1}(.+)*$/gm;
  const m = regex.exec(filter);
  if (!m) {
    throw new Error("Invalid filter expression");
  }
  const field = m[1];
  const operator = m[2] as FilterOperator;
  const value = m[3];

  // todo check that field exists in the model
  const fieldDef = FIELD_NAMES[type].find((f) => f.name === field);
  if (!fieldDef) {
    throw new Error(`Field ${field} does not exist in ${type} model`);
  }

  // transform to prisma operator
  const queryOperator = filterToQueryOperator(
    operator,
    fieldDef.type,
    fieldDef.multiple,
  );

  // clean value
  const cleanedValue = cleanValue(
    value.replace(/^[']|[']$/g, ""),
    fieldDef.type,
    fieldDef.multiple,
  );

  return {
    [field]: {
      [queryOperator]: cleanedValue,
    },
  };
}

/**
 * Maps a `FilterOperator` to its corresponding query operator string based on the field type and multiplicity.
 *
 * @param op - The filter operator to convert.
 * @param type - The type of the field (e.g., 'String', 'Int').
 * @param multiple - Whether the field is an array (multiple values).
 * @returns The query operator string corresponding to the filter operator.
 * @throws If an unsupported operator is used for a given type (e.g., `GreaterThan` for 'String' fields, or `Contains` for non-string fields).
 */
const filterToQueryOperator = (op: FilterOperator, type: string, multiple: boolean): string => {
    const isJsonQuery = (type === 'String' || type === 'Int') && multiple;
    switch (op) {
        case FilterOperator.Equals:
            return "equals";
        case FilterOperator.NotEquals:
            return "not";
        case FilterOperator.GreaterThan:
            if (type === 'String') {
                throw new Error("GreaterThan operator is not supported for String fields");
            }
            return "gt";
        case FilterOperator.GreaterThanOrEqual:
            if (type === 'String') {
                throw new Error("GreaterThan operator is not supported for String fields");
            }
            return "gte";
        case FilterOperator.LesserThan:
            if (type === 'String') {
                throw new Error("GreaterThan operator is not supported for String fields");
            }
            return "lt";
        case FilterOperator.LesserThanOrEqual:
            if (type === 'String') {
                throw new Error("GreaterThan operator is not supported for String fields");
            }
            return "lte";
        case FilterOperator.Contains:
            if (type !== 'String') {
                throw new Error("Contains operator is only supported for String fields");
            }
            return isJsonQuery ? "array_contains" : "contains";
    }
}

/**
 * Cleans and parses a given string value based on the specified type and multiplicity.
 *
 * @param givenValue - The input string value to be cleaned and parsed.
 * @param type - The expected data type of the value. Supported types are "Int", "Float", "Boolean", "DateTime", and "String".
 * @param multiple - Indicates whether the value should be treated as a list (multiple values).
 * @returns The cleaned and parsed value, with type depending on the `type` and `multiple` parameters:
 * - For `multiple` true, returns a string representing an array (e.g., "[value]").
 * - For `type` "Int", returns a number or array string.
 * - For `type` "Float", returns a number or array string.
 * - For `type` "Boolean", returns a boolean or array string.
 * - For `type` "DateTime", returns a Date object or array string.
 * - For `type` "String", returns a string or array string.
 * - For unknown types, returns the cleaned string value.
 */
const cleanValue = (givenValue: string, type: string, multiple: boolean): any => {
    const isJsonQuery = (type === 'String' || type === 'Int') && multiple;
    let value = givenValue.replace(/^[']|[']$/g, "");
    switch (type) {
        case "Int":
            return isJsonQuery ? `[${value}]` : parseInt(value);
        case "Float":
            return isJsonQuery ? `[${value}]` : parseFloat(value);
        case "Boolean":
            return isJsonQuery ? `[${value.toLowerCase() === "true"}]` : value.toLowerCase() === "true";
        case "DateTime":
            return isJsonQuery ? `[${value}]` : new Date(value);
        case "String":
            return isJsonQuery ? `[${value}]` : value;
        default:
            return value;
    }
}

/**
 * Represents the set of supported filter operators for querying data.
 *
 * @enum {string}
 * @property {string} Equals - Checks if two values are equal (`=`).
 * @property {string} NotEquals - Checks if two values are not equal (`!=`).
 * @property {string} GreaterThan - Checks if a value is greater than another (`>`).
 * @property {string} GreaterThanOrEqual - Checks if a value is greater than or equal to another (`>=`).
 * @property {string} LesserThan - Checks if a value is less than another (`<`).
 * @property {string} LesserThanOrEqual - Checks if a value is less than or equal to another (`<=`).
 * @property {string} Contains - Checks if a value contains another value (`~`).
 */
enum FilterOperator {
    Equals = "=",
    NotEquals = "!=",
    GreaterThan = ">",
    GreaterThanOrEqual = ">=",
    LesserThan = "<",
    LesserThanOrEqual = "<=",
    Contains = "~",
}


/**
 * Field definitions for each model
 * Used to validate filter fields and their types
 * Doesn't include relations
 */
const FIELD_NAMES: { [key: string]: {name: string, type: string, multiple:boolean}[] } = {
    ['CfDocument']: [
        {
            name: 'identifier',
            type: 'String',
            multiple: false
        },
        {
            name: 'uri',
            type: 'String',
            multiple: false
        },
        {
            name: 'frameworkType',
            type: 'String',
            multiple: false
        },
        {
            name: 'caseVersion',
            type: 'String',
            multiple: false
        },
        {
            name: 'creator',
            type: 'String',
            multiple: false
        },
        {
            name: 'title',
            type: 'String',
            multiple: false
        },
        {
            name: 'lastChangeDateTime',
            type: 'DateTime',
            multiple: false
        },
        {
            name: 'officialSourceUrl',
            type: 'String',
            multiple: false
        },
        {
            name: 'publisher',
            type: 'String',
            multiple: false
        },
        {
            name: 'description',
            type: 'String',
            multiple: false
        },
        {
            name: 'subject',
            type: 'String',
            multiple: false
        },
        {
            name: 'language',
            type: 'String',
            multiple: false
        },
        {
            name: 'version',
            type: 'String',
            multiple: false
        },
        {
            name: 'adoptionStatus',
            type: 'String',
            multiple: false
        },
        {
            name: 'statusStartDate',
            type: 'DateTime',
            multiple: false
        },
        {
            name: 'statusEndDate',
            type: 'DateTime',
            multiple: false
        },
        {
            name: 'notes',
            type: 'String',
            multiple: false
        },
    ],
};