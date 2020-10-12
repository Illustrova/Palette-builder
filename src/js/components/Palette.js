import invert from "invert-color";
import UserFriendlyError from "../lib/UserFriendlyError";
import { errorDict as ERRORS } from "../constants/errorDict";

import * as CN from "../constants/classNames.json";
import * as E from "../constants/eventTypes.json";
import * as C from "../constants/common.json";

/**
 * Palette component
 * Stores and displays all color data
 *
 * @class Palette
 */
class Palette {
	/**
	 * Creates an instance of Palette.
	 * @param {HTMLElement} el
	 * @param {EventEmitter} emitter
	 */
	constructor(el, emitter) {
		this.el = el;
		this._events = emitter;

		this.activeItem = null;
		this.colorFormat = "hexa";
		this.fileformat = "json";
		this.paletteItems = el.querySelectorAll(".palette__item");
		this.init();
	}

	/**
	 * Attach listeners
	 *
	 */
	init() {
		this._events.on(E.SET_ACTIVE_PALETTE_ITEM, ({ trigger }) => {
			this.setActiveItem(trigger);
		});

		this._events.on(E.SET_COLOR_IN_PALETTE, (colorObj) => {
			this.setColorToItem(colorObj, this.activeItem);
		});
		this._events.on(E.RESET_COLOR, () =>
			this.resetColorToItem(this.activeItem)
		);
		this._events.on(E.SET_COLOR_FORMAT, ({ data }) =>
			this.setColorFormat(data)
		);
		this._events.on(E.SETUP_PALETTE, (data) => this.loadPalette(data));
		this._events.on(E.RESET_PALETTE, () => this.resetPalette());

		this._events.on(E.PALETTE_EXPORT, ({ data }) => this.sendToExport(data));
		this._events.on(E.STORAGE_IMPORT, (data) =>
			this.loadPaletteFromStorage(data)
		);
	}

	/**
	 * Load palette from imported data
	 *
	 * @param {object} data
	 */
	loadPalette(data) {
		let currentItem = this.activeItem; // Save currently active item
		Object.entries(data).forEach(([element, elementVal]) =>
			Object.entries(elementVal).forEach(([family, familyVal]) =>
				Object.entries(familyVal).forEach(([memberShift, color]) => {
					const member = memberShift.split(C.VARIABLE_NAME_SEPARATOR)[0];
					const shift = memberShift.split(C.VARIABLE_NAME_SEPARATOR)[1];
					this.loadColor(element, family, member, shift, color);
				})
			)
		);
		this.activeItem = currentItem; //set back currently active item
	}

	/**
	 * Load paltte from LocalStorage data object
	 *
	 * @param {object} data
	 */
	loadPaletteFromStorage(data) {
		Object.entries(data).forEach(([key, color]) => {
			var [element, family, member, shift] = [...key.split("-")];
			this.loadColor(element, family, member, shift, color);
		});
	}

	/**
	 * Load a single color into palette
	 *
	 * @param {string} element, family, member, shift
	 * @param {string} color
	 */
	loadColor(element, family, member, shift, color) {
		const item = this.el.querySelector(
			`[data-element='${element}'][data-family='${family}'][data-member='${member}']${
				shift ? "[data-shift='" + shift + "']" : "[data-shift='']"
			}`
		);
		this.activeItem = item;
		this._events.emit(E.SET_COLOR, color);
	}
	/**
	 * Prepare palette data for export
	 *
	 * @param {string} fileformat
	 * @returns {Event}
	 */
	sendToExport(fileformat) {
		this.fileformat = fileformat;
		let selectedPalette = this.getPaletteItems();
		return selectedPalette.length < 1
			? this._events.emit(
					E.MODAL_SHOW_ERROR,
					new UserFriendlyError(ERRORS.EMPTY_PALETTE)
			  )
			: this._events.emit(
					E.EXPORTER_CREATE_OUTPUT,
					selectedPalette,
					fileformat,
					this.colorFormat
			  );
	}

	/**
	 * Clear palette
	 *
	 */
	resetPalette() {
		let selectedPalette = this.getPaletteItems();
		[...selectedPalette].forEach((item) => this.resetColorToItem(item));
	}

	/**
	 * Change color format (HEXA/RGBA/HSLA)
	 *
	 * @param {string} format
	 */
	setColorFormat(format) {
		this.colorFormat = format;
		this.el.dataset.format = format;
	}

	/**
	 * Collect non-empty palette items to array
	 *
	 * @returns {array}
	 */
	getPaletteItems() {
		return [...this.paletteItems].filter((item) => {
			return item.dataset.colorHexa; // has any of data-color values set
		});
	}

	/**
	 * Set color value of given cell
	 *
	 * @param {string} color
	 * @param {HTMLElement} item
	 */
	setColorToItem(color, item) {
		let colorToInvert =
			color.hexa.length !== 7 ? color.hexa.substring(0, 7) : color.hexa;
		let invertedColor;

		try {
			invertedColor = invert(colorToInvert, true);
		} catch {
			invertedColor = "#000";
		}
		if (item) {
			item.style.backgroundColor = color[this.colorFormat];
			item.style.color = invertedColor;
			item.dataset.colorHexa = color.hexa;
			item.dataset.colorRgba = color.rgba;
			item.dataset.colorHsla = color.hsla;
		}
		const { element, family, member, shift } = item.dataset;
		this._events.emit(
			E.STORAGE_ADD,
			`${element}-${family}-${member}${shift ? "-" + shift : ""}`,
			color.rgba
		);
	}

	/**
	 * Reset color value
	 *
	 * @param {HTMLElement} item
	 */
	resetColorToItem(item) {
		if (item) {
			item.style.backgroundColor = "";
			item.style.color = "";
			item.dataset.colorHexa = "";
			item.dataset.colorRgba = "";
			item.dataset.colorHsla = "";
		}
		const { element, family, member, shift } = item.dataset;
		this._events.emit(
			E.STORAGE_REMOVE,
			`${element}-${family}-${member}${shift ? "-" + shift : ""}`
		);
	}

	/**
	 * Set item as active
	 *
	 * @param {HTMLElement} item
	 */
	setActiveItem(item) {
		this.activeItem && this.activeItem.classList.remove(CN.PALETTE_ITEM_ACTIVE);
		item.classList.add(CN.PALETTE_ITEM_ACTIVE);
		this.activeItem = item;
	}
}

module.exports = Palette;
