import * as syntax from "../constants/syntax.json";

/**
 * Capitalize string
 *
 * @param {string} s
 * @returns {string}
 */
export const capitalize = (s) => {
	if (typeof s !== "string") return "";
	return s.charAt(0).toUpperCase() + s.toLowerCase().slice(1);
};

/**
 * Remove syntax prefix from the variable
 *
 * @param {string} variable - a string with variable name including prefix
 * @param {string} lang - syntax to resolve (SASS/SCSS/STYLUS etc)
 * @returns {string}
 */
export const removeVariablePrefix = (variable, lang) =>
	variable.replace(syntax[lang].variablePrefix, "");

/**
 * Select all text inside the node
 *
 * @param {HTMLElement} node
 * @see https://stackoverflow.com/a/987376
 */
export const selectText = (node) => {
	if (document.body.createTextRange) {
		const range = document.body.createTextRange();
		range.moveToElementText(node);
		range.select();
	} else if (window.getSelection) {
		const selection = window.getSelection();
		const range = document.createRange();
		range.selectNodeContents(node);
		selection.removeAllRanges();
		selection.addRange(range);
	} else {
		// eslint-disable-next-line no-console
		console.warn("Could not select text in node: Unsupported browser.");
	}
};
