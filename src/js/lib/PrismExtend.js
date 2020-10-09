import { namedColors } from "../constants/cssNamedColors";

/**
 * Helper function to create regex
 *
 * @param {string} str
 * @param {object} replacements
 * @param {string} flags
 * @returns {RegExp}
 * @see https://github.com/Aljen014/dabblet/blob/e1b0805d6e20b0e34b7bf5df86b38d92261a8740/code/code-highlight.js
 */
RegExp.create = function (str, replacements, flags) {
	for (var id in replacements) {
		var replacement = replacements[id],
			idRegExp = RegExp("{{" + id + "}}", "gi");

		if (replacement.source) {
			replacement = replacement.source.replace(/^\^|\$$/g, "");
		}

		//  Don't add extra parentheses if they already exist
		str = str.replace(
			RegExp("\\(" + idRegExp.source + "\\)", "gi"),
			"(" + replacement + ")"
		);

		str = str.replace(idRegExp, "(?:" + replacement + ")");
	}

	return RegExp(str, flags);
};

const number = /-?\d*\.?\d+/;
export const colorToken = {
	pattern: RegExp.create(
		"\\b{{keyword}}\\b|\\b{{func}}\\B|\\B{{hex}}\\b",
		{
			keyword: RegExp("^" + namedColors.join("|") + "$"),
			func: RegExp.create(
				"^(?:rgb|hsl)a?\\((?:\\s*{{number}}%?\\s*,?\\s*){3,4}\\)$",
				{
					number: number,
				}
			),
			hex: /^#(?:[0-9a-f]{3,4}){1,2}$/i,
		},
		"ig"
	),
	greedy: true,
};

/**
 * Create custom parsers for Prism
 *
 * @param {Prism} Prism - Prism.js instance
 */
const createParsers = (Prism) => {
	/***********
	 * CSS
	 **********/
	Prism.languages.cssParser = Prism.languages.extend("css", {});
	Prism.languages.insertBefore("cssParser", "selector", {
		"variable-declaration": {
			pattern: /--[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*[:](.*?);/,
			inside: {
				variable: Prism.languages.css.variable,
				color: colorToken,
				punctuation: Prism.languages.css.punctuation,
			},
			greedy: true,
		},
		color: colorToken,
	});

	/***********
	 * SCSS
	 **********/
	Prism.languages.scssParser = Prism.languages.extend("scss", {});

	Prism.languages.insertBefore("scssParser", "selector", {
		"variable-declaration": {
			pattern: /\$[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*[:](.*?);/,
			inside: {
				variable: Prism.languages.scss.variable,
				punctuation: Prism.languages.scss.punctuation,
				color: colorToken,
			},
			greedy: true,
		},
		color: colorToken,
	});

	/***********
	 * SASS
	 **********/
	Prism.languages.sassParser = Prism.languages.extend("sass", {});
	Prism.languages.insertBefore("sassParser", "variable-line", {
		"variable-declaration": {
			pattern: Prism.languages.sass["variable-line"].pattern,
			inside: Object.assign(Prism.languages.sass["variable-line"].inside, {
				color: colorToken,
				...Prism.languages.sass["variable-line"].inside,
			}),
		},
		variable: /\$[-\w]+|#\{\$[-\w]+\}/,
		color: colorToken,
	});

	/***********
	 * STYLUS
	 **********/
	Prism.languages.stylParser = Prism.languages.extend("stylus", {
		color: colorToken,
	});

	// Keep only necessary tokens inside
	Prism.languages.stylParser["variable-declaration"].inside = {
		variable: Prism.languages.stylus["variable-declaration"].inside.variable,
		color: Prism.languages.stylParser.color,
		punctuation: Prism.languages.stylus.punctuation,
		operator:
			Prism.languages.stylus["variable-declaration"].inside.rest.operator,
	};
};
export default createParsers;
