import * as CN from "../constants/classNames.json";
import * as E from "../constants/eventTypes.json";

/**
 * Collapsible Panel Component
 *
 * @class Collapsible
 */
class Collapsible {
	/**
	 * Creates an instance of Collapsible.
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
		this._events.on(E.TOGGLE_COLLAPSIBLE, (targetId) =>
			this.toggleCollapsible(targetId)
		);
	}

	/**
	 * Show/hide target panel
	 *
	 * @param {string} targetId
	 */
	toggleCollapsible(targetId) {
		if (this.el.id === targetId) return;
		this.el.classList.toggle(CN.COLLAPSIBLE_SHOW);
	}
}

export default Collapsible;
