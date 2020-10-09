import { removeVariablePrefix } from "../utils/helpers";
import * as objectUtils from "../utils/objectHelpers";
import { createSchema, isValidSchema } from "../utils/schema";

import * as C from "../constants/common.json";
import * as E from "../constants/eventTypes.json";
import { errorDict as ERRORS } from "../constants/errorDict";
import UserFriendlyError from "./UserFriendlyError";

const separator = C.VARIABLE_NAME_SEPARATOR;

/**
 * Import functionality of the app.
 *
 * @class Importer
 */
class Importer {
	/**
	 * Creates an instance of Importer.
	 * @param {EventEmitter} emitter
	 * @param {Prism} Prism
	 */
	constructor(emitter, Prism) {
		this._events = emitter;
		this.prism = Prism;
		this.init();
	}

	/**
	 * Attach listeners
	 *
	 */
	init() {
		this.schema = createSchema();
		this._events.on(E.IMPORT_FILE, ({ trigger, file }) => {
			trigger.value = null; // clear value every time. otherwise input wouldn't accept the same file twice
			this.loadFile(file);
		});
	}

	/**
	 * Read file, uploaded to file input
	 *
	 * @param {*} file
	 */
	loadFile(file) {
		if (file) {
			const fileExt = file.name.substr(file.name.lastIndexOf(".") + 1);
			var fr = new FileReader();
			fr.onloadend = (e) => this.importToPalette(e.target.result, fileExt);
			fr.onerror = () => {
				throw new UserFriendlyError(ERRORS.FILENOTREADABLE);
			};
			fr.readAsText(file);
		}
	}

	/**
	 * Core function which attempts to parse and resolve imported file.
	 * In case of success emits data to palette component
	 * In case of error, emits error to modal component
	 *
	 * @param {string} text - file contents
	 * @param {*} fileExt
	 */
	importToPalette(text, fileExt) {
		try {
			const parsedData = this.parseFile(text, fileExt);
			this._events.emit(E.SETUP_PALETTE, parsedData);
		} catch (err) {
			let errorObject =
				err.constructor.name === "UserFriendlyError"
					? err
					: new UserFriendlyError(ERRORS.DEFAULT, undefined, err) &&
					  // eslint-disable-next-line no-console
					  console.error(err);
			this._events.emit(E.MODAL_SHOW_ERROR, errorObject);
		}
		this.schema = createSchema(); //cleanup schema after every import
	}

	/**
	 * Validate file extension against the list of suported file types
	 *
	 * @param {string} ext
	 */
	validateFileExt(ext) {
		if (!C.FILEFORMATS.includes(ext))
			throw new UserFriendlyError(ERRORS.WRONGEXT, {
				EXT: ext,
				FORMATS: C.FILEFORMATS.join(", "),
			});
	}

	/**
	 * Parse file text to a schema object
	 * Utilizes Prism.tokenize() method
	 *
	 * @param {string} file
	 * @param {string} ext
	 * @returns {*}
	 */
	parseFile(file, ext) {
		this.validateFileExt(ext);
		let result;
		if (ext === "json") {
			try {
				result = JSON.parse(file);
			} catch (err) {
				throw new UserFriendlyError(ERRORS.JSONPARSE);
			}
		} else {
			// Parse stylesheet with Prism.js
			const tokens = this.prism.tokenize(
				file,
				this.prism.languages[`${ext}Parser`]
			);
			const declarationTokens = tokens.filter(
				(token) =>
					Object.prototype.hasOwnProperty.call(token, "type") &&
					token.type === "variable-declaration"
			);

			result = Object.seal(Object.assign({}, this.schema)); //deep copy

			declarationTokens.forEach((token) => {
				let tokenarr = token.content;
				// Check if token is Valid
				let hasInvalidTokens = !(
					tokenarr.some((t) => t.type === "variable") &&
					tokenarr.some((t) => t.type === "color")
				);
				if (hasInvalidTokens) throw new UserFriendlyError(ERRORS.INVALID_FILE);

				let variable = removeVariablePrefix(
					tokenarr.find((t) => t.type === "variable").content,
					ext
				);
				let value = tokenarr.find((t) => t.type === "color").content;

				let path = variable.split(separator);
				// Skip variables which surely don't match (another naming)
				if (path.length < 3 || path.length > 4) return;

				let propertyPath = {
					element: (C.ELEMENTS.includes(path[0]) && path[0]) || undefined,
					family: (C.FAMILIES.includes(path[1]) && path[1]) || undefined,
					member:
						(C.MEMBERS.includes(path[2]) &&
							(path[3]
								? C.SHIFTS.includes(path[3]) && `${path[2]}-${path[3]}`
								: path[2])) ||
						undefined,
				};

				// Validate variable names
				let isInvalidPath = Object.entries(propertyPath).find(([k]) => !k);
				if (isInvalidPath) {
					throw new UserFriendlyError(ERRORS.INVALID_SCHEMA, {
						KEY: isInvalidPath,
					});
				}

				if (propertyPath.element && propertyPath.family && propertyPath.member)
					result[propertyPath.element][propertyPath.family][
						propertyPath.member
					] = value;
			});
		}
		const data = objectUtils.removeBlankProps(
			Object.assign(this.schema, result)
		);
		return isValidSchema(data) && data;
	}
}
export default Importer;
