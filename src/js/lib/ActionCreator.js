const defaultTriggers = {
	click: ["BUTTON", "A", "LABEL", "DIV"],
	change: ["FORM", "INPUT"],
	blur: ["INPUT", "LABEL"],
};

/**
 * Action Creator.
 * Listens for the events, creates events arguments object and passes it further to the components
 *
 * @class ActionCreator
 * @see https://gist.github.com/qborreda/ece17b03009442277064
 */
class ActionCreator {
	/**
	 * Creates an instance of ActionCreator.
	 * @param {HTMLElement} container
	 * @param {EventEmitter} emitter
	 */
	constructor(container, emitter) {
		this.container = container;
		this.forms = this.container.getElementsByTagName("form");
		this._events = emitter;
		this.init();
	}

	/**
	 * Attaches listeners
	 *
	 * @memberof ActionCreator
	 */
	init() {
		["click", "change", "blur"].forEach((eventName) =>
			this.container.addEventListener(eventName, (e) => this.handleEvent(e))
		);
	}

	/**
	 * Create arguments object from and emit action
	 *
	 * @param {Event} e
	 */
	handleEvent(e) {
		const node = e.target;
		const eventName = e.type;
		const action = e.target.dataset.action;

		if (!this.isValidTrigger(node, eventName)) return;

		let value = this.resolveInputValue(node);
		let actionArgs = {
			trigger: node, // event target
			value: value, // value (for inputs)
			name: node.name, //name (for form elements)
			target: node.dataset.target, // target element, if specified as data-target attribute
			data: node.dataset.actionData, // custom data ppassed in data-action-data attribute
			file: node.files ? node.files[0] : undefined, // first uploaded file in case node is a file input
		};

		this._events.emit(action, actionArgs);
		// e.preventDefault();
	}

	/**
	 * Parse input value to proper type depending on the input type
	 *
	 * @param {HTMLElement} node
	 * @returns {Boolean|Number|String}
	 */
	resolveInputValue(node) {
		if (node.type === "checkbox") return node.checked;
		else if (node.type === "number") return parseInt(node.value);
		else return node.value;
	}

	/**
	 * Validate event trigger to avoid emittig non-existing/unnecessary actions
	 *
	 * @param {HTMLElement} node
	 * @param {string} eventName
	 * @return {boolean}
	 */

	isValidTrigger(node, eventName) {
		// node has data-action attribute
		if (!node.hasAttribute("data-action")) return false;
		// node has custom trigger specified which matches with event
		if (
			node.hasAttribute("data-action-trigger") &&
			node.dataset.actionTrigger === eventName
		) {
			return true;
		}
		// if node has no custom trigger specified: validate against default triggers
		if (defaultTriggers[eventName].includes(node.nodeName)) return true;
		return false;
	}
}
export default ActionCreator;
