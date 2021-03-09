import { capitalize } from "../utils/helpers";
import * as objectUtils from "../utils/objectHelpers";
import { createSchema } from "../utils/schema";

import * as E from "../constants/eventTypes.json";
import * as syntax from "../constants/syntax.json";
import * as C from "../constants/common.json";

/**
 * App's export functionality
 *
 * @class Exporter
 */
class Exporter {
	/**
	 * Creates an instance of Exporter.
	 * @param {EventEmitter} emitter
	 */
	constructor(emitter) {
		this._events = emitter;
		this.options = {
			hexaToRgba: true,
			hexLowerCase: true,
			// elementAsScope: true, // possibly TODO
		};
		this.syntaxRules = syntax;
		this.init();
	}

	/**
	 * Attach listeners
	 *
	 */
	init() {
		this.schema = createSchema();

		this._events.on(
			E.EXPORTER_CREATE_OUTPUT,
			(selectedPalette, fileformat, colorFormat) => {
				this.collectData(selectedPalette, colorFormat);
				this.displayOutput(fileformat, colorFormat);
			}
		);
		this._events.on(
			E.CHANGE_OPTIONS,
			// exclude indent options
			({ name, value }) =>
				name !== "useTabs" &&
				name != "numSpaces" &&
				this.setOptions(name, value)
		);
	}

	/**
	 * Update exporting options
	 *
	 * @param {*} prop
	 * @param {*} value
	 */
	setOptions(prop, value) {
		this.options[prop] = value;
		this.displayOutput(this.fileformat, this.colorFormat);
	}

	/**
	 * Collect data from palette elements to schema object.
	 * Sets collectedData property
	 *
	 * @param {Array.<HTMLElement>} paletteItems
	 */
	collectData(paletteItems) {
		let data = Object.seal(Object.assign({}, this.schema)); //deep copy
		for (let item of paletteItems) {
			const { element, family, member, shift } = item.dataset;
			data[element][family][member + (shift ? `-${shift}` : "")] = [
				"hexa",
				"rgba",
				"hsla",
			].reduce((obj, key) => {
				return { ...obj, [key]: item.dataset[`color${capitalize(key)}`] };
			}, {});
		}
		const cleanData = objectUtils.removeBlankProps(data);
		this.collectedData = JSON.parse(JSON.stringify(cleanData));
	}

	/**
	 * Emit show output event
	 *
	 * @param {string} fileformat
	 * @param {string} colorFormat
	 */
	displayOutput(fileformat, colorFormat) {
		this._events.emit(
			E.MODAL_SHOW_OUTPUT,
			fileformat,
			this.getOutput(fileformat, colorFormat)
		);
	}

	/**
	 * Create output data
	 *
	 * @param {string} fileformat
	 * @param {string} colorFormat
	 * @returns {function}
	 */
	getOutput(fileformat, colorFormat) {
		this.fileformat = fileformat;
		this.colorFormat = colorFormat;
		const data = JSON.parse(JSON.stringify(this.collectedData)); // deep copy!

		switch (fileformat) {
			case "css":
			case "scss":
			case "sass":
			case "styl":
				return this.asStylesheet(data, colorFormat, fileformat);
			case "json":
			default:
				return this.asJSON(data, colorFormat);
		}
	}

	/**
	 * Prepare data as stylesheet
	 *
	 * @param {object} rawdata
	 * @param {string} colorFormat
	 * @param {string} lang
	 * @returns {string}
	 */
	asStylesheet(rawdata, colorFormat, lang) {
		const data = this.applyOptions(rawdata, this.options, colorFormat);
		const {
			variablePrefix,
			lineEnding,
			// braceOpen,
			// braceClose,
			assignmentOperator,
		} = this.syntaxRules[lang];

		const createVariableName = (start, newKey) => {
			return start ? `${start}-${newKey}` : variablePrefix + newKey;
		};

		const createDeclarations = (data = {}, head = "", indent = "") => {
			return Object.entries(data)
				.reduce((resultArr, [key, value]) => {
					let variableName = createVariableName(head, key);
					return objectUtils.isObject(value) &&
						!Object.keys(value).includes(colorFormat)
						? resultArr.concat(createDeclarations(value, variableName, indent))
						: resultArr.concat(
								`${indent}${variableName}${assignmentOperator}${value[colorFormat]}${lineEnding}\n`
						  );
				}, [])
				.join("");
		};

		return createDeclarations(data);
	}

	/**
	 * Prepare data as JSON
	 *
	 * @param {object} rawdata
	 * @param {string} colorFormat
	 * @returns {string} - valid JSON string
	 */
	asJSON(rawdata, colorFormat) {
		const data = this.applyOptions(rawdata, this.options, colorFormat);
		// Filter out color formats
		const result = objectUtils.modifyNestedProperties(
			data,
			(k, v) => Object.keys(v).includes(colorFormat),
			(k, v) => [k, v[colorFormat]]
		);
		return JSON.stringify(result, null, 2);
	}

	/**
	 * Process data according provided options
	 *
	 * @param {object} rawdata
	 * @param {object} options
	 * @param {string} colorFormat
	 * @returns {object}
	 */
	applyOptions(rawdata, options, colorFormat) {
		let data = rawdata;

		if (colorFormat === "hexa") {
			// Convert all 8-digit hexa codes to rgba
			if (options.hexaToRgba) {
				data = objectUtils.modifyNestedProperties(
					data,
					(k, v) =>
						objectUtils.isObject(v) &&
						Object.keys(v).includes("hexa") &&
						(v.hexa.length === 5 || v.hexa.length === 9),
					(k, v) => {
						v.hexa = v.rgba;
						return [k, v];
					}
				);
			}
			// Transform hex values to lowercase
			if (options.hexLowerCase) {
				data = objectUtils.modifyNestedProperties(
					data,
					(k) => k === "hexa",
					(k, v) => [k, v.toLowerCase()]
				);
			}
		}

		// Apply color format, goes after all options
		data = objectUtils.cloneWithoutKeys(
			data,
			C.COLORFORMATS.filter((f) => f !== colorFormat)
		);
		return data;
	}
}

export default Exporter;
