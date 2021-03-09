import Pickr from "@simonwep/pickr";
import { capitalize } from "../utils/helpers";

import * as E from "../constants/eventTypes.json";
import * as CN from "../constants/classNames.json";

const config = {
	theme: "monolith",
	useAsButton: true,
	default: "#ffffffff",

	position: "bottom-middle",
	components: {
		palette: true,
		preview: true,
		opacity: true,
		hue: true,
		interaction: {
			hex: true,
			rgba: true,
			hsla: true,
			input: true,
			clear: true,
			save: true,
		},
	},
};

/**
 * Wrapping component on top of Pickr instance
 *
 * @class ColorPicker
 */
class ColorPicker {
	/**
	 * Creates an instance of ColorPicker.
	 * @param {HTMLElement} el
	 * @param {EventEmitter} emitter
	 */
	constructor(el, emitter) {
		this.el = el;
		this._events = emitter;
		this.colorFormat = "HEXA";
		this.init();
	}

	/**
	 * Attach listeners
	 *
	 */
	init() {
		// Create fresh instance
		this.pickr = this.createPickrInstance();
		this.setupPickrListeners();

		this._events.on(E.SET_COLOR, (colorString) => this.setColor(colorString));
		this._events.on(E.SET_ACTIVE_PALETTE_ITEM, ({ trigger }) => {
			this.show(trigger);
		});
		this._events.on(E.RESET_ACTIVE_PALETTE_ITEM, () => this.hide());
		this._events.on(E.COLORPICKER_HIDE, () => this.hide());
		this._events.on(E.COLORPICKER_SHOW, (item) => this.show(item));
		this._events.on(E.SET_COLOR_FORMAT, ({ data }) =>
			this.changeColorFormat(data)
		);

		this.el.addEventListener("keydown", (e) => {
			if (!e.code === "Tab") return;
			this.el.addEventListener(
				"focusout",
				({ relatedTarget }) => {
					if (!this.el.contains(relatedTarget)) {
						this._events.emit(E.SET_NEXT_FOCUSED_ITEM);
						this._events.emit(E.COLORPICKER_HIDE);
					}
				},
				{ once: true }
			);
		});
	}

	/**
	 * Create Pickr instance
	 *
	 */
	createPickrInstance() {
		const pickrContainer = this.el.querySelector(
			`.${CN.COLORPICKER_CONTAINER}`
		);
		return new Pickr(
			Object.assign(
				{
					el: this.el.querySelector(`.${CN.COLORPICKER_HIDDEN}`),
					container: pickrContainer,
				},
				config
			)
		);
	}

	/**
	 * Setup Pickr-specific listeners
	 *
	 */
	setupPickrListeners() {
		this.pickr.on("save", (color) => {
			// Save new color even if the user didn't change the preset value
			if (color) {
				this._events.emit(E.SET_COLOR_IN_PALETTE, this.getColorValues(color));
			}
			this.hide();
		});

		this.pickr.on("clear", () => {
			this._events.emit(E.RESET_COLOR);
		});

		// const pickr = this.pickr;
		// pickr
		// 	.on("init", (instance) => {
		// 		console.log("init", instance);
		// 	})
		// 	.on("hide", (instance) => {
		// 		console.log("hide", instance);
		// 	})
		// 	.on("show", (color, instance) => {
		// 		console.log("show", color, instance);
		// 	})
		// 	.on("save", (color, instance) => {
		// 		console.log("save", color, instance);
		// 	})
		// 	.on("clear", (instance) => {
		// 		console.log("clear", instance);
		// 	})
		// 	.on("change", (color, instance) => {
		// 		console.log("change", color, instance);
		// 	})
		// 	.on("changestop", (instance) => {
		// 		console.log("changestop", instance);
		// 	})
		// 	.on("cancel", (instance) => {
		// 		console.log("cancel", instance);
		// 	})
		// 	.on("swatchselect", (color, instance) => {
		// 		console.log("swatchselect", color, instance);
		// 	});
	}

	/**
	 * Pickr.show() wrapper
	 *
	 */
	show(item) {
		if (item.dataset.colorHexa) {
			this.setColor(item.dataset[`color${capitalize(this.colorFormat)}`]);
		}

		this.pickr.show();
		this.pickr._root.interaction.result.select();
	}

	/**
	 * Pickr.hide() wrapper
	 *
	 */
	hide() {
		this.pickr.hide();
	}

	/**
	 * Set color in color picker
	 *
	 * @param {string} colorString
	 */
	setColor(colorString) {
		this.pickr.setColor(colorString);
		this._events.emit(
			E.SET_COLOR_IN_PALETTE,
			this.getColorValues(this.pickr._color)
		);
	}

	/**
	 * Update color format in color picker
	 *
	 * @param {string} format
	 */
	changeColorFormat(format) {
		this.pickr.setColorRepresentation(format.toUpperCase());
	}

	/**
	 * Transform HSVaColorObject provided by Pickr into a custom JS object
	 *
	 * @param {HSVaColorObject} color
	 * @returns {object}
	 */
	getColorValues(color) {
		// round alpha value - missing feature in Pickr
		let alphaRounded = Math.round(color.a * 100) / 100;
		color.a = alphaRounded;

		let res = {
			hexa: color.toHEXA().toString(2),
			rgba: color.toRGBA().toString(2),
			hsla: color.toHSLA().toString(2),
		};
		return res;
	}
}

module.exports = ColorPicker;
