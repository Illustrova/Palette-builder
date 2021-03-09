import * as E from "../constants/eventTypes.json";
/**
 * Input component
 *
 * @class Input
 */
class Input {
	/**
	 * Creates an instance of Input.
	 * @param {HTMLElement} el
	 * @param {EventEmitter} emitter
	 */
	constructor(el, emitter) {
		this.el = el;
		this._events = emitter;
		this.init();
	}

	/**
	 * Attach listeners
	 *
	 */
	init() {
		this._events.on(E.TOGGLE_DISABLED, ({ target }) =>
			this.toggleDisabled(target)
		);
	}

	/**
	 * Toggle "disabled" attribute
	 *
	 * @param {HTMLElement} target
	 */
	toggleDisabled(target) {
		if (this.el.matches(target)) {
			this.el.disabled = !this.el.disabled;
			if (!this.el.disabled) {
				this.el.select();
			}
		}
	}
}

export default Input;
