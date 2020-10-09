import { isObject } from "../utils/objectHelpers";
import { errorDict as ERRORS } from "../constants/errorDict";

/**
 * Custom error with human readable message
 *
 * @class UserFriendlyError
 * @extends {Error}
 */
class UserFriendlyError extends Error {
	/**
	 * Creates an instance of UserFriendlyError.
	 * @param {string} userMessage
	 * @param {object} userArgs
	 * @param {array} args - inherited from Error
	 */
	constructor(userMessage, userArgs, ...args) {
		super(...args);
		this.userMessage = this.setUserMessage(userMessage, userArgs);
		this.name = this.constructor.name;
	}

	/**
	 * Set user message
	 *
	 * @param {*} userMessage
	 * @param {*} userArgs
	 * @returns {*}
	 */
	setUserMessage(userMessage, userArgs) {
		if (!userMessage) {
			return ERRORS.DEFAULT;
		}
		if (isObject(userMessage)) {
			return Object.fromEntries(
				Object.entries(userMessage).map(([k, v]) => {
					v = v.replace(
						/%\w+%/g,
						(all) => userArgs[all.substring(1, all.length - 1)] || all
					);
					return [k, v];
				})
			);
		}
	}
}

export default UserFriendlyError;
