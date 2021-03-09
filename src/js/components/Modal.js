import Prism from "prismjs";
import { saveAs } from "file-saver";

import { selectText } from "../utils/helpers";

import * as CN from "../constants/classNames.json";
import * as E from "../constants/eventTypes.json";

/**
 * Modal component
 * Displays code output or error message
 *
 * @class Modal
 */
class Modal {
	/**
	 * Creates an instance of Modal.
	 * @param {HTMLElement} el
	 * @param {EventEmitter} emitter
	 */
	constructor(el, emitter) {
		this.el = el;
		this.codeEl = el.querySelector("." + CN.MODAL_CODE);
		this.headerEl = el.querySelector(`.${CN.MODAL_HEADER}`);
		this.errorHeaderEl = el.querySelector(
			`.${CN.MODAL_MESSAGE} .${CN.MODAL_MESSAGE_HEADING}`
		);
		this.errorTextEl = el.querySelector(
			`.${CN.MODAL_MESSAGE} .${CN.MODAL_MESSAGE_TEXT}`
		);
		this.filenameInput = el.querySelector(`.${CN.MODAL_FILENAME_INPUT}`);

		this._events = emitter;
		this.indent = {
			useTabs: false,
			numSpaces: 2,
		};
		this.init();
	}

	/**
	 * Attach listeners
	 *
	 */
	init() {
		this._events.on(E.MODAL_SHOW_OUTPUT, (fileformat, data) => {
			this.fileformat = fileformat;
			this.data = data;
			this.filename = `colors.${this.fileformat.toLowerCase()}`;
			this.setContent(this.data);
			this.show();
		});
		this._events.on(E.MODAL_SHOW_ERROR, (error) => {
			this.showError(error);
		});
		this._events.on(E.COPY_OUTPUT, ({ target }) => this.copyOutput(target));
		this._events.on(E.SAVE_OUTPUT, () => this.saveOutput(this.codeEl));
		this._events.on(E.CHANGE_FILENAME, ({ value }) => this.setFilename(value));
		this._events.on(E.CHANGE_OPTIONS, ({ name, value }) => {
			if (name === "useTabs" || name === "numSpaces") this.indent[name] = value;
			this.setContent(this.data);
		});
		this._events.on(E.MODAL_HIDE, () => this.hide());
	}

	/**
	 * Show modal and precent scroll on body
	 *
	 */
	show() {
		this.el.classList.add(CN.MODAL_SHOW);
		document.body.classList.add(CN.NO_SCROLL);
		this.el.focus();
	}

	/**
	 * Hide modal and allow scroll
	 *
	 */
	hide() {
		this.el.classList.remove(CN.MODAL_SHOW, CN.MODAL_ERROR);
		document.body.classList.remove(CN.NO_SCROLL);
	}

	/**
	 * Display modal with error message
	 *
	 * @param {UserFriendlyError} error
	 */
	showError(error) {
		this.el.classList.add(CN.MODAL_ERROR);
		this.errorHeaderEl.innerHTML = error.userMessage.header;
		this.errorTextEl.innerHTML = error.userMessage.text;
		this.show();
	}

	/**
	 * Display app output content
	 *
	 * @param {string} data
	 */
	setContent(data) {
		this.toggleLoader();
		this.displayFilename(this.filename);

		let code = document.createElement("code"); // according prism.js docs it's recommended to wrap <code> with <pre> tag
		code.classList.add(
			`language-${this.fileformat == "styl" ? "stylus" : this.fileformat}`
		);
		code.style.tabSize = "inherit"; // needed for setTabSize method. to override Prism css
		code.innerHTML = data;

		this.setTabSize(this.indent.numSpaces);
		Prism.plugins.NormalizeWhitespace.setDefaults(this.getWhitespaceConfig());
		Prism.highlightElement(code);

		this.clearContent();
		this.codeEl.appendChild(code);

		this.toggleLoader();
	}

	/**
	 * Show/hide loader while code is being processed
	 *
	 */
	toggleLoader() {
		this.codeEl.classList.toggle(CN.MODAL_CODE_LOADING);
	}

	/**
	 * Create Prism config from component's indent options
	 *
	 * @returns {object} config to pass into Prism.js instance
	 */
	getWhitespaceConfig() {
		let result = { "remove-trailing": true, "spaces-to-tabs": 2 };
		this.indent.useTabs
			? Object.assign(result, {
					"tabs-to-spaces": null,
			  }) && this.setTabSize(this.indent.numSpaces)
			: Object.assign(result, {
					"tabs-to-spaces": this.indent.numSpaces,
			  });
		return result;
	}

	/**
	 * Set tab size in CSS
	 *
	 * @param {Number} size
	 */
	setTabSize(size) {
		this.codeEl.style.tabSize = size;
	}

	/**
	 * Copy target node content to clipboard
	 *
	 * @param {HTMLElement} target
	 */
	copyOutput(target) {
		const textToCopy = document.querySelector(`.${target}`);
		selectText(textToCopy);
		document.execCommand(`copy`);
	}

	/**
	 * Save target node content to a file
	 *
	 * @param {HTMLElement} target
	 */
	saveOutput(target) {
		const fileformat = this.fileformat.toLowerCase();
		const filename = this.filename;
		const textToSave = target.textContent;
		let file = new File([textToSave], filename, {
			type: `${this.resolveMimeType(fileformat)};charset=utf-8`,
		});
		saveAs(file);
	}

	resolveMimeType(fileformat) {
		switch (fileformat) {
			case "json":
				return "application/json";
			case "css":
				return "text/css";
			default:
				return "text/plain";
		}
	}

	/**
	 * Clear modal contents
	 *
	 */
	clearContent() {
		const code = this.codeEl.querySelector("code");
		code ? this.codeEl.removeChild(code) : null;

		this.errorHeaderEl.innerHTML = "";
		this.errorTextEl.innerHTML = "";
	}

	/**
	 * Set filename which will be used for export
	 *
	 * @param {string} filename
	 */
	setFilename(filename) {
		this.filename = `${filename}`;
	}

	/**
	 * Update filename in input element
	 *
	 * @param {string} filename
	 */
	displayFilename(filename) {
		this.filenameInput.value = filename;
	}
}

export default Modal;
