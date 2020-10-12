import * as E from "../constants/eventTypes.json";

/**
 * Wrapper class around LocalStorage
 *
 * @class StorageManager
 */
class StorageManager {
	/**
	 * Creates an instance of Exporter.
	 * @param {EventEmitter} emitter
	 */
	constructor(emitter) {
		this._events = emitter;
		this.init();
	}

	/**
	 * Setup listeners
	 *
	 */
	init() {
		this._events.on(E.STORAGE_ADD, (key, value) =>
			this.addToStorage(key, value)
		);
		this._events.on(E.STORAGE_REMOVE, (key) => this.removeFromStorage(key));
		this._events.on(E.RESET_PALETTE, () => this.clearStorage());

		this._events.emit(E.STORAGE_IMPORT, this.getStoredData());
	}

	/**
	 * Add a single item
	 *
	 * @param {string} key
	 * @param {string} value
	 */
	addToStorage(key, value) {
		localStorage.setItem(key, value);
	}

	/**
	 * Remove a single item
	 *
	 * @param {string} key
	 */
	removeFromStorage(key) {
		localStorage.removeItem(key);
	}

	/**
	 * Remove all items
	 *
	 */
	clearStorage() {
		localStorage.clear();
	}

	/**
	 * Retrieve all data
	 *
	 * @returns {object}
	 */
	getStoredData() {
		return { ...localStorage };
	}
}

export default StorageManager;
