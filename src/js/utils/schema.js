import { deepSeal, isObject } from "./objectHelpers";
import UserFriendlyError from "../lib/UserFriendlyError";
import * as C from "../constants/common.json";
import { errorDict as ERRORS } from "../constants/errorDict";
import { colorToken } from "../lib/PrismExtend";

const ELEMENTS = C.ELEMENTS;
const FAMILIES = C.FAMILIES;
const FAMILYMEMBERS = C.MEMBERS;
const SHIFTS = C.SHIFTS;
// to simplify a particular case we pregenerate the array of shidts and nemebers which should be kept on the same level
const MEMBERS = FAMILYMEMBERS.flatMap((m) =>
	SHIFTS.map((s) => m + (s.length > 0 ? "-" + s : ""))
);

const colorRegex = colorToken.pattern;
/**
 * Create a new empty and protected schema object
 *
 * @returns {object}
 */
export function createSchema() {
	let schema = {};
	const propsArr = [ELEMENTS, FAMILIES, MEMBERS];

	(function addPropsToSchema(sch, index) {
		propsArr[index].forEach((p) => {
			// Check if there will be one more level of properties
			let isLastLevel = index === propsArr.length - 1;
			// Add propertry to object
			Object.defineProperty(sch, p, {
				enumerable: true,
				writable: true,
				configurable: true,
				value: isLastLevel ? undefined : {},
			});
			//  Recursively add properties of next level
			if (!isLastLevel) {
				addPropsToSchema(sch[p], index + 1);
			}
		});
	})(schema, 0);
	return deepSeal(schema);
}

/**
 * Check if an object matches the schema.
 * Throws an error if schema is not valid
 *
 * @param {object} obj
 * @returns {boolean}
 */
export function isValidSchema(obj, sch) {
	if (Object.keys(obj).length < 1)
		throw new UserFriendlyError(ERRORS.EMPTY_SCHEMA);

	return (function validateSchema(obj, sch) {
		const schema = sch || createSchema();
		let keys = Object.keys(obj);

		if (keys.length < 1) throw new UserFriendlyError(ERRORS.EMPTY_SCHEMA);

		return keys.every((key) => {
			const val = obj[key];
			const schemaVal = schema[key];

			if (schemaVal) {
				if (isObject(val) && val !== null) {
					return validateSchema(val, schemaVal); // return the recursive call
				} else {
					throw new UserFriendlyError(ERRORS.INVALID_SCHEMA, { KEY: val });
				}
			} else {
				// key exist in schema but value is undefined : key does not exist in schema
				if (typeof val === "object") {
					throw new UserFriendlyError(ERRORS.INVALID_SCHEMA, {
						KEY: JSON.stringify(val),
					});
				}

				// Value is a string, but not a color
				if (typeof val === "string" && !val.match(colorRegex)) {
					throw new UserFriendlyError(ERRORS.NOT_A_COLOR, { COLOR: val });
				}
				return true;
			}
		});
	})(obj, sch);
}
