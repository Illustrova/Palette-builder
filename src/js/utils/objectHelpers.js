/**
 * Modify deeply nested property, which matches a custom condition.
 * Generic function which accepts function-validator of the condition and function-modifier
 *
 * @param {object} obj
 * @param {function} isToBeModified - Boolean function which accepts 2 arguments - current key and value and returns Boolean if the current record should be modified or not
 * @param {function} modifyEntry - Function which modifies the entry, accepts key and value as arguments and returns entry as an array [key, value].
 * @returns {object}
 * @see https://stackoverflow.com/questions/55857148/filter-reduce-nested-object-recursively
 */
export const modifyNestedProperties = (obj, isToBeModified, modifyEntry) => {
	if (Object(obj) !== obj) return obj;
	else if (Array.isArray(obj))
		return obj.map((o) =>
			modifyNestedProperties(o, isToBeModified, modifyEntry)
		);

	let result = Object.fromEntries(
		Object.entries(obj).map(([k, v]) =>
			isToBeModified(k, v)
				? modifyEntry(k, v)
				: [k, modifyNestedProperties(v, isToBeModified, modifyEntry)]
		)
	);
	return JSON.parse(JSON.stringify(result)); // cleanup undefined properties, if any
};
/**
 * Remove all blank props at any level of nested object.
 * Empty tring and empty object are also considered as blank values
 *
 * @param {object} obj
 * @returns {object}
 */
export const removeBlankProps = (obj) => {
	return modifyNestedProperties(
		obj,
		isBlankProp,
		() => [] //returning blank array instead of entry removes property and value
	);

	function isBlankProp(k, v) {
		if (v && v.constructor === Object && Object.keys(v).length > 0) {
			return Object.entries(v).every(([childKey, childVal]) =>
				isBlankProp(childKey, childVal)
			);
		}
		return (
			v === null ||
			v === undefined ||
			v === "" ||
			(v.constructor === Object && Object.keys(v).length === 0) ||
			(v.constructor === Object &&
				Object.keys(v).length > 0 &&
				JSON.parse(JSON.stringify(v)).length === 0)
		);
	}
};

/**
 *
 *
 * @param {object} data - object to clone
 * @param {array} keys - keys to remove
 * @see https://stackoverflow.com/questions/55857148/filter-reduce-nested-object-recursively
 */
export const cloneWithoutKeys = (data, keys) =>
	modifyNestedProperties(
		data,
		(k) => keys.includes(k),
		() => []
	);

/**
 * Check if an argument is an Object
 *
 * @param {*} val
 * @returns {boolean}
 */
export const isObject = (val) => typeof val === "object" && !Array.isArray(val);

/**
 * Seal the object including all nested properties
 *
 * @param {object} object
 * @returns {object}
 */
export const deepSeal = (object) => {
	Object.getOwnPropertyNames(object).forEach((name) => {
		var prop = object[name];
		if (prop && typeof prop === "object") deepSeal(prop);
	});

	return Object.seal(object);
};
