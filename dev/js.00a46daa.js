// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"scss/main.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"scss/vendors/prism.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"js/constants/classNames.json":[function(require,module,exports) {
module.exports = {
  "NAVBAR": "nav",
  "MODAL": "modal",
  "INPUT": "input",
  "COLLAPSIBLE": "collapsible",
  "PALETTE": "palette",
  "PALETTE_ITEM_ACTIVE": "palette__item--active",
  "COLORPICKER": "colorpicker",
  "MODAL_HEADER": "modal__header",
  "MODAL_FILENAME_INPUT": "modal__filename",
  "MODAL_CODE": "modal__code",
  "MODAL_CODE_LOADING": "modal__code--loading",
  "MODAL_SHOW": "modal--shown",
  "MODAL_ERROR": "modal--error",
  "MODAL_MESSAGE": "modal__message",
  "MODAL_MESSAGE_HEADING": "modal__heading",
  "MODAL_MESSAGE_TEXT": "modal__text",
  "MODAL_BTN_COPY": "modal__btn--copy",
  "MODAL_BTN_DOWNLOAD": "modal__btn--download",
  "COLLAPSIBLE_SHOW": "collapsible--shown",
  "NO_SCROLL": "no-scroll",
  "COLORPICKER_CONTAINER": "colorpicker__container",
  "COLORPICKER_HIDDEN": "colorpicker__hidden"
};
},{}],"../node_modules/prismjs/components/prism-core.js":[function(require,module,exports) {
var global = arguments[3];
/// <reference lib="WebWorker"/>

var _self = (typeof window !== 'undefined')
	? window   // if in browser
	: (
		(typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope)
		? self // if in worker
		: {}   // if in node js
	);

/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 *
 * @license MIT <https://opensource.org/licenses/MIT>
 * @author Lea Verou <https://lea.verou.me>
 * @namespace
 * @public
 */
var Prism = (function (_self){

// Private helper vars
var lang = /\blang(?:uage)?-([\w-]+)\b/i;
var uniqueId = 0;


var _ = {
	/**
	 * By default, Prism will attempt to highlight all code elements (by calling {@link Prism.highlightAll}) on the
	 * current page after the page finished loading. This might be a problem if e.g. you wanted to asynchronously load
	 * additional languages or plugins yourself.
	 *
	 * By setting this value to `true`, Prism will not automatically highlight all code elements on the page.
	 *
	 * You obviously have to change this value before the automatic highlighting started. To do this, you can add an
	 * empty Prism object into the global scope before loading the Prism script like this:
	 *
	 * ```js
	 * window.Prism = window.Prism || {};
	 * Prism.manual = true;
	 * // add a new <script> to load Prism's script
	 * ```
	 *
	 * @default false
	 * @type {boolean}
	 * @memberof Prism
	 * @public
	 */
	manual: _self.Prism && _self.Prism.manual,
	disableWorkerMessageHandler: _self.Prism && _self.Prism.disableWorkerMessageHandler,

	/**
	 * A namespace for utility methods.
	 *
	 * All function in this namespace that are not explicitly marked as _public_ are for __internal use only__ and may
	 * change or disappear at any time.
	 *
	 * @namespace
	 * @memberof Prism
	 */
	util: {
		encode: function encode(tokens) {
			if (tokens instanceof Token) {
				return new Token(tokens.type, encode(tokens.content), tokens.alias);
			} else if (Array.isArray(tokens)) {
				return tokens.map(encode);
			} else {
				return tokens.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00a0/g, ' ');
			}
		},

		/**
		 * Returns the name of the type of the given value.
		 *
		 * @param {any} o
		 * @returns {string}
		 * @example
		 * type(null)      === 'Null'
		 * type(undefined) === 'Undefined'
		 * type(123)       === 'Number'
		 * type('foo')     === 'String'
		 * type(true)      === 'Boolean'
		 * type([1, 2])    === 'Array'
		 * type({})        === 'Object'
		 * type(String)    === 'Function'
		 * type(/abc+/)    === 'RegExp'
		 */
		type: function (o) {
			return Object.prototype.toString.call(o).slice(8, -1);
		},

		/**
		 * Returns a unique number for the given object. Later calls will still return the same number.
		 *
		 * @param {Object} obj
		 * @returns {number}
		 */
		objId: function (obj) {
			if (!obj['__id']) {
				Object.defineProperty(obj, '__id', { value: ++uniqueId });
			}
			return obj['__id'];
		},

		/**
		 * Creates a deep clone of the given object.
		 *
		 * The main intended use of this function is to clone language definitions.
		 *
		 * @param {T} o
		 * @param {Record<number, any>} [visited]
		 * @returns {T}
		 * @template T
		 */
		clone: function deepClone(o, visited) {
			visited = visited || {};

			var clone, id;
			switch (_.util.type(o)) {
				case 'Object':
					id = _.util.objId(o);
					if (visited[id]) {
						return visited[id];
					}
					clone = /** @type {Record<string, any>} */ ({});
					visited[id] = clone;

					for (var key in o) {
						if (o.hasOwnProperty(key)) {
							clone[key] = deepClone(o[key], visited);
						}
					}

					return /** @type {any} */ (clone);

				case 'Array':
					id = _.util.objId(o);
					if (visited[id]) {
						return visited[id];
					}
					clone = [];
					visited[id] = clone;

					(/** @type {Array} */(/** @type {any} */(o))).forEach(function (v, i) {
						clone[i] = deepClone(v, visited);
					});

					return /** @type {any} */ (clone);

				default:
					return o;
			}
		},

		/**
		 * Returns the Prism language of the given element set by a `language-xxxx` or `lang-xxxx` class.
		 *
		 * If no language is set for the element or the element is `null` or `undefined`, `none` will be returned.
		 *
		 * @param {Element} element
		 * @returns {string}
		 */
		getLanguage: function (element) {
			while (element && !lang.test(element.className)) {
				element = element.parentElement;
			}
			if (element) {
				return (element.className.match(lang) || [, 'none'])[1].toLowerCase();
			}
			return 'none';
		},

		/**
		 * Returns the script element that is currently executing.
		 *
		 * This does __not__ work for line script element.
		 *
		 * @returns {HTMLScriptElement | null}
		 */
		currentScript: function () {
			if (typeof document === 'undefined') {
				return null;
			}
			if ('currentScript' in document && 1 < 2 /* hack to trip TS' flow analysis */) {
				return /** @type {any} */ (document.currentScript);
			}

			// IE11 workaround
			// we'll get the src of the current script by parsing IE11's error stack trace
			// this will not work for inline scripts

			try {
				throw new Error();
			} catch (err) {
				// Get file src url from stack. Specifically works with the format of stack traces in IE.
				// A stack will look like this:
				//
				// Error
				//    at _.util.currentScript (http://localhost/components/prism-core.js:119:5)
				//    at Global code (http://localhost/components/prism-core.js:606:1)

				var src = (/at [^(\r\n]*\((.*):.+:.+\)$/i.exec(err.stack) || [])[1];
				if (src) {
					var scripts = document.getElementsByTagName('script');
					for (var i in scripts) {
						if (scripts[i].src == src) {
							return scripts[i];
						}
					}
				}
				return null;
			}
		},

		/**
		 * Returns whether a given class is active for `element`.
		 *
		 * The class can be activated if `element` or one of its ancestors has the given class and it can be deactivated
		 * if `element` or one of its ancestors has the negated version of the given class. The _negated version_ of the
		 * given class is just the given class with a `no-` prefix.
		 *
		 * Whether the class is active is determined by the closest ancestor of `element` (where `element` itself is
		 * closest ancestor) that has the given class or the negated version of it. If neither `element` nor any of its
		 * ancestors have the given class or the negated version of it, then the default activation will be returned.
		 *
		 * In the paradoxical situation where the closest ancestor contains __both__ the given class and the negated
		 * version of it, the class is considered active.
		 *
		 * @param {Element} element
		 * @param {string} className
		 * @param {boolean} [defaultActivation=false]
		 * @returns {boolean}
		 */
		isActive: function (element, className, defaultActivation) {
			var no = 'no-' + className;

			while (element) {
				var classList = element.classList;
				if (classList.contains(className)) {
					return true;
				}
				if (classList.contains(no)) {
					return false;
				}
				element = element.parentElement;
			}
			return !!defaultActivation;
		}
	},

	/**
	 * This namespace contains all currently loaded languages and the some helper functions to create and modify languages.
	 *
	 * @namespace
	 * @memberof Prism
	 * @public
	 */
	languages: {
		/**
		 * Creates a deep copy of the language with the given id and appends the given tokens.
		 *
		 * If a token in `redef` also appears in the copied language, then the existing token in the copied language
		 * will be overwritten at its original position.
		 *
		 * ## Best practices
		 *
		 * Since the position of overwriting tokens (token in `redef` that overwrite tokens in the copied language)
		 * doesn't matter, they can technically be in any order. However, this can be confusing to others that trying to
		 * understand the language definition because, normally, the order of tokens matters in Prism grammars.
		 *
		 * Therefore, it is encouraged to order overwriting tokens according to the positions of the overwritten tokens.
		 * Furthermore, all non-overwriting tokens should be placed after the overwriting ones.
		 *
		 * @param {string} id The id of the language to extend. This has to be a key in `Prism.languages`.
		 * @param {Grammar} redef The new tokens to append.
		 * @returns {Grammar} The new language created.
		 * @public
		 * @example
		 * Prism.languages['css-with-colors'] = Prism.languages.extend('css', {
		 *     // Prism.languages.css already has a 'comment' token, so this token will overwrite CSS' 'comment' token
		 *     // at its original position
		 *     'comment': { ... },
		 *     // CSS doesn't have a 'color' token, so this token will be appended
		 *     'color': /\b(?:red|green|blue)\b/
		 * });
		 */
		extend: function (id, redef) {
			var lang = _.util.clone(_.languages[id]);

			for (var key in redef) {
				lang[key] = redef[key];
			}

			return lang;
		},

		/**
		 * Inserts tokens _before_ another token in a language definition or any other grammar.
		 *
		 * ## Usage
		 *
		 * This helper method makes it easy to modify existing languages. For example, the CSS language definition
		 * not only defines CSS highlighting for CSS documents, but also needs to define highlighting for CSS embedded
		 * in HTML through `<style>` elements. To do this, it needs to modify `Prism.languages.markup` and add the
		 * appropriate tokens. However, `Prism.languages.markup` is a regular JavaScript object literal, so if you do
		 * this:
		 *
		 * ```js
		 * Prism.languages.markup.style = {
		 *     // token
		 * };
		 * ```
		 *
		 * then the `style` token will be added (and processed) at the end. `insertBefore` allows you to insert tokens
		 * before existing tokens. For the CSS example above, you would use it like this:
		 *
		 * ```js
		 * Prism.languages.insertBefore('markup', 'cdata', {
		 *     'style': {
		 *         // token
		 *     }
		 * });
		 * ```
		 *
		 * ## Special cases
		 *
		 * If the grammars of `inside` and `insert` have tokens with the same name, the tokens in `inside`'s grammar
		 * will be ignored.
		 *
		 * This behavior can be used to insert tokens after `before`:
		 *
		 * ```js
		 * Prism.languages.insertBefore('markup', 'comment', {
		 *     'comment': Prism.languages.markup.comment,
		 *     // tokens after 'comment'
		 * });
		 * ```
		 *
		 * ## Limitations
		 *
		 * The main problem `insertBefore` has to solve is iteration order. Since ES2015, the iteration order for object
		 * properties is guaranteed to be the insertion order (except for integer keys) but some browsers behave
		 * differently when keys are deleted and re-inserted. So `insertBefore` can't be implemented by temporarily
		 * deleting properties which is necessary to insert at arbitrary positions.
		 *
		 * To solve this problem, `insertBefore` doesn't actually insert the given tokens into the target object.
		 * Instead, it will create a new object and replace all references to the target object with the new one. This
		 * can be done without temporarily deleting properties, so the iteration order is well-defined.
		 *
		 * However, only references that can be reached from `Prism.languages` or `insert` will be replaced. I.e. if
		 * you hold the target object in a variable, then the value of the variable will not change.
		 *
		 * ```js
		 * var oldMarkup = Prism.languages.markup;
		 * var newMarkup = Prism.languages.insertBefore('markup', 'comment', { ... });
		 *
		 * assert(oldMarkup !== Prism.languages.markup);
		 * assert(newMarkup === Prism.languages.markup);
		 * ```
		 *
		 * @param {string} inside The property of `root` (e.g. a language id in `Prism.languages`) that contains the
		 * object to be modified.
		 * @param {string} before The key to insert before.
		 * @param {Grammar} insert An object containing the key-value pairs to be inserted.
		 * @param {Object<string, any>} [root] The object containing `inside`, i.e. the object that contains the
		 * object to be modified.
		 *
		 * Defaults to `Prism.languages`.
		 * @returns {Grammar} The new grammar object.
		 * @public
		 */
		insertBefore: function (inside, before, insert, root) {
			root = root || /** @type {any} */ (_.languages);
			var grammar = root[inside];
			/** @type {Grammar} */
			var ret = {};

			for (var token in grammar) {
				if (grammar.hasOwnProperty(token)) {

					if (token == before) {
						for (var newToken in insert) {
							if (insert.hasOwnProperty(newToken)) {
								ret[newToken] = insert[newToken];
							}
						}
					}

					// Do not insert token which also occur in insert. See #1525
					if (!insert.hasOwnProperty(token)) {
						ret[token] = grammar[token];
					}
				}
			}

			var old = root[inside];
			root[inside] = ret;

			// Update references in other language definitions
			_.languages.DFS(_.languages, function(key, value) {
				if (value === old && key != inside) {
					this[key] = ret;
				}
			});

			return ret;
		},

		// Traverse a language definition with Depth First Search
		DFS: function DFS(o, callback, type, visited) {
			visited = visited || {};

			var objId = _.util.objId;

			for (var i in o) {
				if (o.hasOwnProperty(i)) {
					callback.call(o, i, o[i], type || i);

					var property = o[i],
					    propertyType = _.util.type(property);

					if (propertyType === 'Object' && !visited[objId(property)]) {
						visited[objId(property)] = true;
						DFS(property, callback, null, visited);
					}
					else if (propertyType === 'Array' && !visited[objId(property)]) {
						visited[objId(property)] = true;
						DFS(property, callback, i, visited);
					}
				}
			}
		}
	},

	plugins: {},

	/**
	 * This is the most high-level function in Prism’s API.
	 * It fetches all the elements that have a `.language-xxxx` class and then calls {@link Prism.highlightElement} on
	 * each one of them.
	 *
	 * This is equivalent to `Prism.highlightAllUnder(document, async, callback)`.
	 *
	 * @param {boolean} [async=false] Same as in {@link Prism.highlightAllUnder}.
	 * @param {HighlightCallback} [callback] Same as in {@link Prism.highlightAllUnder}.
	 * @memberof Prism
	 * @public
	 */
	highlightAll: function(async, callback) {
		_.highlightAllUnder(document, async, callback);
	},

	/**
	 * Fetches all the descendants of `container` that have a `.language-xxxx` class and then calls
	 * {@link Prism.highlightElement} on each one of them.
	 *
	 * The following hooks will be run:
	 * 1. `before-highlightall`
	 * 2. All hooks of {@link Prism.highlightElement} for each element.
	 *
	 * @param {ParentNode} container The root element, whose descendants that have a `.language-xxxx` class will be highlighted.
	 * @param {boolean} [async=false] Whether each element is to be highlighted asynchronously using Web Workers.
	 * @param {HighlightCallback} [callback] An optional callback to be invoked on each element after its highlighting is done.
	 * @memberof Prism
	 * @public
	 */
	highlightAllUnder: function(container, async, callback) {
		var env = {
			callback: callback,
			container: container,
			selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
		};

		_.hooks.run('before-highlightall', env);

		env.elements = Array.prototype.slice.apply(env.container.querySelectorAll(env.selector));

		_.hooks.run('before-all-elements-highlight', env);

		for (var i = 0, element; element = env.elements[i++];) {
			_.highlightElement(element, async === true, env.callback);
		}
	},

	/**
	 * Highlights the code inside a single element.
	 *
	 * The following hooks will be run:
	 * 1. `before-sanity-check`
	 * 2. `before-highlight`
	 * 3. All hooks of {@link Prism.highlight}. These hooks will only be run by the current worker if `async` is `true`.
	 * 4. `before-insert`
	 * 5. `after-highlight`
	 * 6. `complete`
	 *
	 * @param {Element} element The element containing the code.
	 * It must have a class of `language-xxxx` to be processed, where `xxxx` is a valid language identifier.
	 * @param {boolean} [async=false] Whether the element is to be highlighted asynchronously using Web Workers
	 * to improve performance and avoid blocking the UI when highlighting very large chunks of code. This option is
	 * [disabled by default](https://prismjs.com/faq.html#why-is-asynchronous-highlighting-disabled-by-default).
	 *
	 * Note: All language definitions required to highlight the code must be included in the main `prism.js` file for
	 * asynchronous highlighting to work. You can build your own bundle on the
	 * [Download page](https://prismjs.com/download.html).
	 * @param {HighlightCallback} [callback] An optional callback to be invoked after the highlighting is done.
	 * Mostly useful when `async` is `true`, since in that case, the highlighting is done asynchronously.
	 * @memberof Prism
	 * @public
	 */
	highlightElement: function(element, async, callback) {
		// Find language
		var language = _.util.getLanguage(element);
		var grammar = _.languages[language];

		// Set language on the element, if not present
		element.className = element.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;

		// Set language on the parent, for styling
		var parent = element.parentElement;
		if (parent && parent.nodeName.toLowerCase() === 'pre') {
			parent.className = parent.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;
		}

		var code = element.textContent;

		var env = {
			element: element,
			language: language,
			grammar: grammar,
			code: code
		};

		function insertHighlightedCode(highlightedCode) {
			env.highlightedCode = highlightedCode;

			_.hooks.run('before-insert', env);

			env.element.innerHTML = env.highlightedCode;

			_.hooks.run('after-highlight', env);
			_.hooks.run('complete', env);
			callback && callback.call(env.element);
		}

		_.hooks.run('before-sanity-check', env);

		if (!env.code) {
			_.hooks.run('complete', env);
			callback && callback.call(env.element);
			return;
		}

		_.hooks.run('before-highlight', env);

		if (!env.grammar) {
			insertHighlightedCode(_.util.encode(env.code));
			return;
		}

		if (async && _self.Worker) {
			var worker = new Worker(_.filename);

			worker.onmessage = function(evt) {
				insertHighlightedCode(evt.data);
			};

			worker.postMessage(JSON.stringify({
				language: env.language,
				code: env.code,
				immediateClose: true
			}));
		}
		else {
			insertHighlightedCode(_.highlight(env.code, env.grammar, env.language));
		}
	},

	/**
	 * Low-level function, only use if you know what you’re doing. It accepts a string of text as input
	 * and the language definitions to use, and returns a string with the HTML produced.
	 *
	 * The following hooks will be run:
	 * 1. `before-tokenize`
	 * 2. `after-tokenize`
	 * 3. `wrap`: On each {@link Token}.
	 *
	 * @param {string} text A string with the code to be highlighted.
	 * @param {Grammar} grammar An object containing the tokens to use.
	 *
	 * Usually a language definition like `Prism.languages.markup`.
	 * @param {string} language The name of the language definition passed to `grammar`.
	 * @returns {string} The highlighted HTML.
	 * @memberof Prism
	 * @public
	 * @example
	 * Prism.highlight('var foo = true;', Prism.languages.javascript, 'javascript');
	 */
	highlight: function (text, grammar, language) {
		var env = {
			code: text,
			grammar: grammar,
			language: language
		};
		_.hooks.run('before-tokenize', env);
		env.tokens = _.tokenize(env.code, env.grammar);
		_.hooks.run('after-tokenize', env);
		return Token.stringify(_.util.encode(env.tokens), env.language);
	},

	/**
	 * This is the heart of Prism, and the most low-level function you can use. It accepts a string of text as input
	 * and the language definitions to use, and returns an array with the tokenized code.
	 *
	 * When the language definition includes nested tokens, the function is called recursively on each of these tokens.
	 *
	 * This method could be useful in other contexts as well, as a very crude parser.
	 *
	 * @param {string} text A string with the code to be highlighted.
	 * @param {Grammar} grammar An object containing the tokens to use.
	 *
	 * Usually a language definition like `Prism.languages.markup`.
	 * @returns {TokenStream} An array of strings and tokens, a token stream.
	 * @memberof Prism
	 * @public
	 * @example
	 * let code = `var foo = 0;`;
	 * let tokens = Prism.tokenize(code, Prism.languages.javascript);
	 * tokens.forEach(token => {
	 *     if (token instanceof Prism.Token && token.type === 'number') {
	 *         console.log(`Found numeric literal: ${token.content}`);
	 *     }
	 * });
	 */
	tokenize: function(text, grammar) {
		var rest = grammar.rest;
		if (rest) {
			for (var token in rest) {
				grammar[token] = rest[token];
			}

			delete grammar.rest;
		}

		var tokenList = new LinkedList();
		addAfter(tokenList, tokenList.head, text);

		matchGrammar(text, tokenList, grammar, tokenList.head, 0);

		return toArray(tokenList);
	},

	/**
	 * @namespace
	 * @memberof Prism
	 * @public
	 */
	hooks: {
		all: {},

		/**
		 * Adds the given callback to the list of callbacks for the given hook.
		 *
		 * The callback will be invoked when the hook it is registered for is run.
		 * Hooks are usually directly run by a highlight function but you can also run hooks yourself.
		 *
		 * One callback function can be registered to multiple hooks and the same hook multiple times.
		 *
		 * @param {string} name The name of the hook.
		 * @param {HookCallback} callback The callback function which is given environment variables.
		 * @public
		 */
		add: function (name, callback) {
			var hooks = _.hooks.all;

			hooks[name] = hooks[name] || [];

			hooks[name].push(callback);
		},

		/**
		 * Runs a hook invoking all registered callbacks with the given environment variables.
		 *
		 * Callbacks will be invoked synchronously and in the order in which they were registered.
		 *
		 * @param {string} name The name of the hook.
		 * @param {Object<string, any>} env The environment variables of the hook passed to all callbacks registered.
		 * @public
		 */
		run: function (name, env) {
			var callbacks = _.hooks.all[name];

			if (!callbacks || !callbacks.length) {
				return;
			}

			for (var i=0, callback; callback = callbacks[i++];) {
				callback(env);
			}
		}
	},

	Token: Token
};
_self.Prism = _;


// Typescript note:
// The following can be used to import the Token type in JSDoc:
//
//   @typedef {InstanceType<import("./prism-core")["Token"]>} Token

/**
 * Creates a new token.
 *
 * @param {string} type See {@link Token#type type}
 * @param {string | TokenStream} content See {@link Token#content content}
 * @param {string|string[]} [alias] The alias(es) of the token.
 * @param {string} [matchedStr=""] A copy of the full string this token was created from.
 * @class
 * @global
 * @public
 */
function Token(type, content, alias, matchedStr) {
	/**
	 * The type of the token.
	 *
	 * This is usually the key of a pattern in a {@link Grammar}.
	 *
	 * @type {string}
	 * @see GrammarToken
	 * @public
	 */
	this.type = type;
	/**
	 * The strings or tokens contained by this token.
	 *
	 * This will be a token stream if the pattern matched also defined an `inside` grammar.
	 *
	 * @type {string | TokenStream}
	 * @public
	 */
	this.content = content;
	/**
	 * The alias(es) of the token.
	 *
	 * @type {string|string[]}
	 * @see GrammarToken
	 * @public
	 */
	this.alias = alias;
	// Copy of the full string this token was created from
	this.length = (matchedStr || '').length | 0;
}

/**
 * A token stream is an array of strings and {@link Token Token} objects.
 *
 * Token streams have to fulfill a few properties that are assumed by most functions (mostly internal ones) that process
 * them.
 *
 * 1. No adjacent strings.
 * 2. No empty strings.
 *
 *    The only exception here is the token stream that only contains the empty string and nothing else.
 *
 * @typedef {Array<string | Token>} TokenStream
 * @global
 * @public
 */

/**
 * Converts the given token or token stream to an HTML representation.
 *
 * The following hooks will be run:
 * 1. `wrap`: On each {@link Token}.
 *
 * @param {string | Token | TokenStream} o The token or token stream to be converted.
 * @param {string} language The name of current language.
 * @returns {string} The HTML representation of the token or token stream.
 * @memberof Token
 * @static
 */
Token.stringify = function stringify(o, language) {
	if (typeof o == 'string') {
		return o;
	}
	if (Array.isArray(o)) {
		var s = '';
		o.forEach(function (e) {
			s += stringify(e, language);
		});
		return s;
	}

	var env = {
		type: o.type,
		content: stringify(o.content, language),
		tag: 'span',
		classes: ['token', o.type],
		attributes: {},
		language: language
	};

	var aliases = o.alias;
	if (aliases) {
		if (Array.isArray(aliases)) {
			Array.prototype.push.apply(env.classes, aliases);
		} else {
			env.classes.push(aliases);
		}
	}

	_.hooks.run('wrap', env);

	var attributes = '';
	for (var name in env.attributes) {
		attributes += ' ' + name + '="' + (env.attributes[name] || '').replace(/"/g, '&quot;') + '"';
	}

	return '<' + env.tag + ' class="' + env.classes.join(' ') + '"' + attributes + '>' + env.content + '</' + env.tag + '>';
};

/**
 * @param {string} text
 * @param {LinkedList<string | Token>} tokenList
 * @param {any} grammar
 * @param {LinkedListNode<string | Token>} startNode
 * @param {number} startPos
 * @param {RematchOptions} [rematch]
 * @returns {void}
 * @private
 *
 * @typedef RematchOptions
 * @property {string} cause
 * @property {number} reach
 */
function matchGrammar(text, tokenList, grammar, startNode, startPos, rematch) {
	for (var token in grammar) {
		if (!grammar.hasOwnProperty(token) || !grammar[token]) {
			continue;
		}

		var patterns = grammar[token];
		patterns = Array.isArray(patterns) ? patterns : [patterns];

		for (var j = 0; j < patterns.length; ++j) {
			if (rematch && rematch.cause == token + ',' + j) {
				return;
			}

			var patternObj = patterns[j],
				inside = patternObj.inside,
				lookbehind = !!patternObj.lookbehind,
				greedy = !!patternObj.greedy,
				lookbehindLength = 0,
				alias = patternObj.alias;

			if (greedy && !patternObj.pattern.global) {
				// Without the global flag, lastIndex won't work
				var flags = patternObj.pattern.toString().match(/[imsuy]*$/)[0];
				patternObj.pattern = RegExp(patternObj.pattern.source, flags + 'g');
			}

			/** @type {RegExp} */
			var pattern = patternObj.pattern || patternObj;

			for ( // iterate the token list and keep track of the current token/string position
				var currentNode = startNode.next, pos = startPos;
				currentNode !== tokenList.tail;
				pos += currentNode.value.length, currentNode = currentNode.next
			) {

				if (rematch && pos >= rematch.reach) {
					break;
				}

				var str = currentNode.value;

				if (tokenList.length > text.length) {
					// Something went terribly wrong, ABORT, ABORT!
					return;
				}

				if (str instanceof Token) {
					continue;
				}

				var removeCount = 1; // this is the to parameter of removeBetween

				if (greedy && currentNode != tokenList.tail.prev) {
					pattern.lastIndex = pos;
					var match = pattern.exec(text);
					if (!match) {
						break;
					}

					var from = match.index + (lookbehind && match[1] ? match[1].length : 0);
					var to = match.index + match[0].length;
					var p = pos;

					// find the node that contains the match
					p += currentNode.value.length;
					while (from >= p) {
						currentNode = currentNode.next;
						p += currentNode.value.length;
					}
					// adjust pos (and p)
					p -= currentNode.value.length;
					pos = p;

					// the current node is a Token, then the match starts inside another Token, which is invalid
					if (currentNode.value instanceof Token) {
						continue;
					}

					// find the last node which is affected by this match
					for (
						var k = currentNode;
						k !== tokenList.tail && (p < to || typeof k.value === 'string');
						k = k.next
					) {
						removeCount++;
						p += k.value.length;
					}
					removeCount--;

					// replace with the new match
					str = text.slice(pos, p);
					match.index -= pos;
				} else {
					pattern.lastIndex = 0;

					var match = pattern.exec(str);
				}

				if (!match) {
					continue;
				}

				if (lookbehind) {
					lookbehindLength = match[1] ? match[1].length : 0;
				}

				var from = match.index + lookbehindLength,
					matchStr = match[0].slice(lookbehindLength),
					to = from + matchStr.length,
					before = str.slice(0, from),
					after = str.slice(to);

				var reach = pos + str.length;
				if (rematch && reach > rematch.reach) {
					rematch.reach = reach;
				}

				var removeFrom = currentNode.prev;

				if (before) {
					removeFrom = addAfter(tokenList, removeFrom, before);
					pos += before.length;
				}

				removeRange(tokenList, removeFrom, removeCount);

				var wrapped = new Token(token, inside ? _.tokenize(matchStr, inside) : matchStr, alias, matchStr);
				currentNode = addAfter(tokenList, removeFrom, wrapped);

				if (after) {
					addAfter(tokenList, currentNode, after);
				}

				if (removeCount > 1) {
					// at least one Token object was removed, so we have to do some rematching
					// this can only happen if the current pattern is greedy
					matchGrammar(text, tokenList, grammar, currentNode.prev, pos, {
						cause: token + ',' + j,
						reach: reach
					});
				}
			}
		}
	}
}

/**
 * @typedef LinkedListNode
 * @property {T} value
 * @property {LinkedListNode<T> | null} prev The previous node.
 * @property {LinkedListNode<T> | null} next The next node.
 * @template T
 * @private
 */

/**
 * @template T
 * @private
 */
function LinkedList() {
	/** @type {LinkedListNode<T>} */
	var head = { value: null, prev: null, next: null };
	/** @type {LinkedListNode<T>} */
	var tail = { value: null, prev: head, next: null };
	head.next = tail;

	/** @type {LinkedListNode<T>} */
	this.head = head;
	/** @type {LinkedListNode<T>} */
	this.tail = tail;
	this.length = 0;
}

/**
 * Adds a new node with the given value to the list.
 * @param {LinkedList<T>} list
 * @param {LinkedListNode<T>} node
 * @param {T} value
 * @returns {LinkedListNode<T>} The added node.
 * @template T
 */
function addAfter(list, node, value) {
	// assumes that node != list.tail && values.length >= 0
	var next = node.next;

	var newNode = { value: value, prev: node, next: next };
	node.next = newNode;
	next.prev = newNode;
	list.length++;

	return newNode;
}
/**
 * Removes `count` nodes after the given node. The given node will not be removed.
 * @param {LinkedList<T>} list
 * @param {LinkedListNode<T>} node
 * @param {number} count
 * @template T
 */
function removeRange(list, node, count) {
	var next = node.next;
	for (var i = 0; i < count && next !== list.tail; i++) {
		next = next.next;
	}
	node.next = next;
	next.prev = node;
	list.length -= i;
}
/**
 * @param {LinkedList<T>} list
 * @returns {T[]}
 * @template T
 */
function toArray(list) {
	var array = [];
	var node = list.head.next;
	while (node !== list.tail) {
		array.push(node.value);
		node = node.next;
	}
	return array;
}


if (!_self.document) {
	if (!_self.addEventListener) {
		// in Node.js
		return _;
	}

	if (!_.disableWorkerMessageHandler) {
		// In worker
		_self.addEventListener('message', function (evt) {
			var message = JSON.parse(evt.data),
				lang = message.language,
				code = message.code,
				immediateClose = message.immediateClose;

			_self.postMessage(_.highlight(code, _.languages[lang], lang));
			if (immediateClose) {
				_self.close();
			}
		}, false);
	}

	return _;
}

// Get current script and highlight
var script = _.util.currentScript();

if (script) {
	_.filename = script.src;

	if (script.hasAttribute('data-manual')) {
		_.manual = true;
	}
}

function highlightAutomaticallyCallback() {
	if (!_.manual) {
		_.highlightAll();
	}
}

if (!_.manual) {
	// If the document state is "loading", then we'll use DOMContentLoaded.
	// If the document state is "interactive" and the prism.js script is deferred, then we'll also use the
	// DOMContentLoaded event because there might be some plugins or languages which have also been deferred and they
	// might take longer one animation frame to execute which can create a race condition where only some plugins have
	// been loaded when Prism.highlightAll() is executed, depending on how fast resources are loaded.
	// See https://github.com/PrismJS/prism/issues/2102
	var readyState = document.readyState;
	if (readyState === 'loading' || readyState === 'interactive' && script && script.defer) {
		document.addEventListener('DOMContentLoaded', highlightAutomaticallyCallback);
	} else {
		if (window.requestAnimationFrame) {
			window.requestAnimationFrame(highlightAutomaticallyCallback);
		} else {
			window.setTimeout(highlightAutomaticallyCallback, 16);
		}
	}
}

return _;

})(_self);

if (typeof module !== 'undefined' && module.exports) {
	module.exports = Prism;
}

// hack for components to work correctly in node.js
if (typeof global !== 'undefined') {
	global.Prism = Prism;
}

// some additional documentation/types

/**
 * The expansion of a simple `RegExp` literal to support additional properties.
 *
 * @typedef GrammarToken
 * @property {RegExp} pattern The regular expression of the token.
 * @property {boolean} [lookbehind=false] If `true`, then the first capturing group of `pattern` will (effectively)
 * behave as a lookbehind group meaning that the captured text will not be part of the matched text of the new token.
 * @property {boolean} [greedy=false] Whether the token is greedy.
 * @property {string|string[]} [alias] An optional alias or list of aliases.
 * @property {Grammar} [inside] The nested grammar of this token.
 *
 * The `inside` grammar will be used to tokenize the text value of each token of this kind.
 *
 * This can be used to make nested and even recursive language definitions.
 *
 * Note: This can cause infinite recursion. Be careful when you embed different languages or even the same language into
 * each another.
 * @global
 * @public
*/

/**
 * @typedef Grammar
 * @type {Object<string, RegExp | GrammarToken | Array<RegExp | GrammarToken>>}
 * @property {Grammar} [rest] An optional grammar object that will be appended to this grammar.
 * @global
 * @public
 */

/**
 * A function which will invoked after an element was successfully highlighted.
 *
 * @callback HighlightCallback
 * @param {Element} element The element successfully highlighted.
 * @returns {void}
 * @global
 * @public
*/

/**
 * @callback HookCallback
 * @param {Object<string, any>} env The environment variables of the hook.
 * @returns {void}
 * @global
 * @public
 */

},{}],"../node_modules/prismjs/components/prism-css.js":[function(require,module,exports) {
(function (Prism) {

	var string = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/;

	Prism.languages.css = {
		'comment': /\/\*[\s\S]*?\*\//,
		'atrule': {
			pattern: /@[\w-]+[\s\S]*?(?:;|(?=\s*\{))/,
			inside: {
				'rule': /^@[\w-]+/,
				'selector-function-argument': {
					pattern: /(\bselector\s*\((?!\s*\))\s*)(?:[^()]|\((?:[^()]|\([^()]*\))*\))+?(?=\s*\))/,
					lookbehind: true,
					alias: 'selector'
				},
				'keyword': {
					pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
					lookbehind: true
				}
				// See rest below
			}
		},
		'url': {
			// https://drafts.csswg.org/css-values-3/#urls
			pattern: RegExp('\\burl\\((?:' + string.source + '|' + /(?:[^\\\r\n()"']|\\[\s\S])*/.source + ')\\)', 'i'),
			greedy: true,
			inside: {
				'function': /^url/i,
				'punctuation': /^\(|\)$/,
				'string': {
					pattern: RegExp('^' + string.source + '$'),
					alias: 'url'
				}
			}
		},
		'selector': RegExp('[^{}\\s](?:[^{};"\']|' + string.source + ')*?(?=\\s*\\{)'),
		'string': {
			pattern: string,
			greedy: true
		},
		'property': /[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,
		'important': /!important\b/i,
		'function': /[-a-z0-9]+(?=\()/i,
		'punctuation': /[(){};:,]/
	};

	Prism.languages.css['atrule'].inside.rest = Prism.languages.css;

	var markup = Prism.languages.markup;
	if (markup) {
		markup.tag.addInlined('style', 'css');

		Prism.languages.insertBefore('inside', 'attr-value', {
			'style-attr': {
				pattern: /\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,
				inside: {
					'attr-name': {
						pattern: /^\s*style/i,
						inside: markup.tag.inside
					},
					'punctuation': /^\s*=\s*['"]|['"]\s*$/,
					'attr-value': {
						pattern: /.+/i,
						inside: Prism.languages.css
					}
				},
				alias: 'language-css'
			}
		}, markup.tag);
	}

}(Prism));

},{}],"../node_modules/prismjs/components/prism-css-extras.js":[function(require,module,exports) {
(function (Prism) {

	var string = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/;
	var selectorInside;

	Prism.languages.css.selector = {
		pattern: Prism.languages.css.selector,
		inside: selectorInside = {
			'pseudo-element': /:(?:after|before|first-letter|first-line|selection)|::[-\w]+/,
			'pseudo-class': /:[-\w]+/,
			'class': /\.[-\w]+/,
			'id': /#[-\w]+/,
			'attribute': {
				pattern: RegExp('\\[(?:[^[\\]"\']|' + string.source + ')*\\]'),
				greedy: true,
				inside: {
					'punctuation': /^\[|\]$/,
					'case-sensitivity': {
						pattern: /(\s)[si]$/i,
						lookbehind: true,
						alias: 'keyword'
					},
					'namespace': {
						pattern: /^(\s*)[-*\w\xA0-\uFFFF]*\|(?!=)/,
						lookbehind: true,
						inside: {
							'punctuation': /\|$/
						}
					},
					'attr-name': {
						pattern: /^(\s*)[-\w\xA0-\uFFFF]+/,
						lookbehind: true
					},
					'attr-value': [
						string,
						{
							pattern: /(=\s*)[-\w\xA0-\uFFFF]+(?=\s*$)/,
							lookbehind: true
						}
					],
					'operator': /[|~*^$]?=/
				}
			},
			'n-th': [
				{
					pattern: /(\(\s*)[+-]?\d*[\dn](?:\s*[+-]\s*\d+)?(?=\s*\))/,
					lookbehind: true,
					inside: {
						'number': /[\dn]+/,
						'operator': /[+-]/
					}
				},
				{
					pattern: /(\(\s*)(?:even|odd)(?=\s*\))/i,
					lookbehind: true
				}
			],
			'combinator': />|\+|~|\|\|/,

			// the `tag` token has been existed and removed.
			// because we can't find a perfect tokenize to match it.
			// if you want to add it, please read https://github.com/PrismJS/prism/pull/2373 first.

			'punctuation': /[(),]/,
		}
	};

	Prism.languages.css['atrule'].inside['selector-function-argument'].inside = selectorInside;

	Prism.languages.insertBefore('css', 'property', {
		'variable': {
			pattern: /(^|[^-\w\xA0-\uFFFF])--[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*/i,
			lookbehind: true
		}
	});

	var unit = {
		pattern: /(\b\d+)(?:%|[a-z]+\b)/,
		lookbehind: true
	};
	// 123 -123 .123 -.123 12.3 -12.3
	var number = {
		pattern: /(^|[^\w.-])-?\d*\.?\d+/,
		lookbehind: true
	};

	Prism.languages.insertBefore('css', 'function', {
		'operator': {
			pattern: /(\s)[+\-*\/](?=\s)/,
			lookbehind: true
		},
		// CAREFUL!
		// Previewers and Inline color use hexcode and color.
		'hexcode': {
			pattern: /\B#(?:[\da-f]{1,2}){3,4}\b/i,
			alias: 'color'
		},
		'color': [
			/\b(?:AliceBlue|AntiqueWhite|Aqua|Aquamarine|Azure|Beige|Bisque|Black|BlanchedAlmond|Blue|BlueViolet|Brown|BurlyWood|CadetBlue|Chartreuse|Chocolate|Coral|CornflowerBlue|Cornsilk|Crimson|Cyan|DarkBlue|DarkCyan|DarkGoldenRod|DarkGr[ae]y|DarkGreen|DarkKhaki|DarkMagenta|DarkOliveGreen|DarkOrange|DarkOrchid|DarkRed|DarkSalmon|DarkSeaGreen|DarkSlateBlue|DarkSlateGr[ae]y|DarkTurquoise|DarkViolet|DeepPink|DeepSkyBlue|DimGr[ae]y|DodgerBlue|FireBrick|FloralWhite|ForestGreen|Fuchsia|Gainsboro|GhostWhite|Gold|GoldenRod|Gr[ae]y|Green|GreenYellow|HoneyDew|HotPink|IndianRed|Indigo|Ivory|Khaki|Lavender|LavenderBlush|LawnGreen|LemonChiffon|LightBlue|LightCoral|LightCyan|LightGoldenRodYellow|LightGr[ae]y|LightGreen|LightPink|LightSalmon|LightSeaGreen|LightSkyBlue|LightSlateGr[ae]y|LightSteelBlue|LightYellow|Lime|LimeGreen|Linen|Magenta|Maroon|MediumAquaMarine|MediumBlue|MediumOrchid|MediumPurple|MediumSeaGreen|MediumSlateBlue|MediumSpringGreen|MediumTurquoise|MediumVioletRed|MidnightBlue|MintCream|MistyRose|Moccasin|NavajoWhite|Navy|OldLace|Olive|OliveDrab|Orange|OrangeRed|Orchid|PaleGoldenRod|PaleGreen|PaleTurquoise|PaleVioletRed|PapayaWhip|PeachPuff|Peru|Pink|Plum|PowderBlue|Purple|Red|RosyBrown|RoyalBlue|SaddleBrown|Salmon|SandyBrown|SeaGreen|SeaShell|Sienna|Silver|SkyBlue|SlateBlue|SlateGr[ae]y|Snow|SpringGreen|SteelBlue|Tan|Teal|Thistle|Tomato|Transparent|Turquoise|Violet|Wheat|White|WhiteSmoke|Yellow|YellowGreen)\b/i,
			{
				pattern: /\b(?:rgb|hsl)\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*\)\B|\b(?:rgb|hsl)a\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*,\s*(?:0|0?\.\d+|1)\s*\)\B/i,
				inside: {
					'unit': unit,
					'number': number,
					'function': /[\w-]+(?=\()/,
					'punctuation': /[(),]/
				}
			}
		],
		// it's important that there is no boundary assertion after the hex digits
		'entity': /\\[\da-f]{1,8}/i,
		'unit': unit,
		'number': number
	});

})(Prism);

},{}],"../node_modules/prismjs/components/prism-scss.js":[function(require,module,exports) {
Prism.languages.scss = Prism.languages.extend('css', {
	'comment': {
		pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,
		lookbehind: true
	},
	'atrule': {
		pattern: /@[\w-]+(?:\([^()]+\)|[^(])*?(?=\s+[{;])/,
		inside: {
			'rule': /@[\w-]+/
			// See rest below
		}
	},
	// url, compassified
	'url': /(?:[-a-z]+-)?url(?=\()/i,
	// CSS selector regex is not appropriate for Sass
	// since there can be lot more things (var, @ directive, nesting..)
	// a selector must start at the end of a property or after a brace (end of other rules or nesting)
	// it can contain some characters that aren't used for defining rules or end of selector, & (parent selector), or interpolated variable
	// the end of a selector is found when there is no rules in it ( {} or {\s}) or if there is a property (because an interpolated var
	// can "pass" as a selector- e.g: proper#{$erty})
	// this one was hard to do, so please be careful if you edit this one :)
	'selector': {
		// Initial look-ahead is used to prevent matching of blank selectors
		pattern: /(?=\S)[^@;{}()]?(?:[^@;{}()]|#\{\$[-\w]+\})+(?=\s*\{(?:\}|\s|[^}]+[:{][^}]+))/m,
		inside: {
			'parent': {
				pattern: /&/,
				alias: 'important'
			},
			'placeholder': /%[-\w]+/,
			'variable': /\$[-\w]+|#\{\$[-\w]+\}/
		}
	},
	'property': {
		pattern: /(?:[\w-]|\$[-\w]+|#\{\$[-\w]+\})+(?=\s*:)/,
		inside: {
			'variable': /\$[-\w]+|#\{\$[-\w]+\}/
		}
	}
});

Prism.languages.insertBefore('scss', 'atrule', {
	'keyword': [
		/@(?:if|else(?: if)?|for|each|while|import|extend|debug|warn|mixin|include|function|return|content)/i,
		{
			pattern: /( +)(?:from|through)(?= )/,
			lookbehind: true
		}
	]
});

Prism.languages.insertBefore('scss', 'important', {
	// var and interpolated vars
	'variable': /\$[-\w]+|#\{\$[-\w]+\}/
});

Prism.languages.insertBefore('scss', 'function', {
	'placeholder': {
		pattern: /%[-\w]+/,
		alias: 'selector'
	},
	'statement': {
		pattern: /\B!(?:default|optional)\b/i,
		alias: 'keyword'
	},
	'boolean': /\b(?:true|false)\b/,
	'null': {
		pattern: /\bnull\b/,
		alias: 'keyword'
	},
	'operator': {
		pattern: /(\s)(?:[-+*\/%]|[=!]=|<=?|>=?|and|or|not)(?=\s)/,
		lookbehind: true
	}
});

Prism.languages.scss['atrule'].inside.rest = Prism.languages.scss;

},{}],"../node_modules/prismjs/components/prism-sass.js":[function(require,module,exports) {
(function(Prism) {
	Prism.languages.sass = Prism.languages.extend('css', {
		// Sass comments don't need to be closed, only indented
		'comment': {
			pattern: /^([ \t]*)\/[\/*].*(?:(?:\r?\n|\r)\1[ \t]+.+)*/m,
			lookbehind: true
		}
	});

	Prism.languages.insertBefore('sass', 'atrule', {
		// We want to consume the whole line
		'atrule-line': {
			// Includes support for = and + shortcuts
			pattern: /^(?:[ \t]*)[@+=].+/m,
			inside: {
				'atrule': /(?:@[\w-]+|[+=])/m
			}
		}
	});
	delete Prism.languages.sass.atrule;


	var variable = /\$[-\w]+|#\{\$[-\w]+\}/;
	var operator = [
		/[+*\/%]|[=!]=|<=?|>=?|\b(?:and|or|not)\b/,
		{
			pattern: /(\s+)-(?=\s)/,
			lookbehind: true
		}
	];

	Prism.languages.insertBefore('sass', 'property', {
		// We want to consume the whole line
		'variable-line': {
			pattern: /^[ \t]*\$.+/m,
			inside: {
				'punctuation': /:/,
				'variable': variable,
				'operator': operator
			}
		},
		// We want to consume the whole line
		'property-line': {
			pattern: /^[ \t]*(?:[^:\s]+ *:.*|:[^:\s]+.*)/m,
			inside: {
				'property': [
					/[^:\s]+(?=\s*:)/,
					{
						pattern: /(:)[^:\s]+/,
						lookbehind: true
					}
				],
				'punctuation': /:/,
				'variable': variable,
				'operator': operator,
				'important': Prism.languages.sass.important
			}
		}
	});
	delete Prism.languages.sass.property;
	delete Prism.languages.sass.important;

	// Now that whole lines for other patterns are consumed,
	// what's left should be selectors
	Prism.languages.insertBefore('sass', 'punctuation', {
		'selector': {
			pattern: /([ \t]*)\S(?:,?[^,\r\n]+)*(?:,(?:\r?\n|\r)\1[ \t]+\S(?:,?[^,\r\n]+)*)*/,
			lookbehind: true
		}
	});

}(Prism));
},{}],"../node_modules/prismjs/components/prism-less.js":[function(require,module,exports) {
/* FIXME :
 :extend() is not handled specifically : its highlighting is buggy.
 Mixin usage must be inside a ruleset to be highlighted.
 At-rules (e.g. import) containing interpolations are buggy.
 Detached rulesets are highlighted as at-rules.
 A comment before a mixin usage prevents the latter to be properly highlighted.
 */

Prism.languages.less = Prism.languages.extend('css', {
	'comment': [
		/\/\*[\s\S]*?\*\//,
		{
			pattern: /(^|[^\\])\/\/.*/,
			lookbehind: true
		}
	],
	'atrule': {
		pattern: /@[\w-]+?(?:\((?:[^(){}]|\([^(){}]*\))*\)|[^(){};])*?(?=\s*\{)/,
		inside: {
			'punctuation': /[:()]/
		}
	},
	// selectors and mixins are considered the same
	'selector': {
		pattern: /(?:@\{[\w-]+\}|[^{};\s@])(?:@\{[\w-]+\}|\((?:[^(){}]|\([^(){}]*\))*\)|[^(){};@])*?(?=\s*\{)/,
		inside: {
			// mixin parameters
			'variable': /@+[\w-]+/
		}
	},

	'property': /(?:@\{[\w-]+\}|[\w-])+(?:\+_?)?(?=\s*:)/i,
	'operator': /[+\-*\/]/
});

Prism.languages.insertBefore('less', 'property', {
	'variable': [
		// Variable declaration (the colon must be consumed!)
		{
			pattern: /@[\w-]+\s*:/,
			inside: {
				"punctuation": /:/
			}
		},

		// Variable usage
		/@@?[\w-]+/
	],
	'mixin-usage': {
		pattern: /([{;]\s*)[.#](?!\d)[\w-]+.*?(?=[(;])/,
		lookbehind: true,
		alias: 'function'
	}
});

},{}],"../node_modules/prismjs/components/prism-stylus.js":[function(require,module,exports) {
(function (Prism) {
	var unit = {
		pattern: /(\b\d+)(?:%|[a-z]+)/,
		lookbehind: true
	};
	// 123 -123 .123 -.123 12.3 -12.3
	var number = {
		pattern: /(^|[^\w.-])-?\d*\.?\d+/,
		lookbehind: true
	};

	var inside = {
		'comment': {
			pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,
			lookbehind: true
		},
		'url': {
			pattern: /url\((["']?).*?\1\)/i,
			greedy: true
		},
		'string': {
			pattern: /("|')(?:(?!\1)[^\\\r\n]|\\(?:\r\n|[\s\S]))*\1/,
			greedy: true
		},
		'interpolation': null, // See below
		'func': null, // See below
		'important': /\B!(?:important|optional)\b/i,
		'keyword': {
			pattern: /(^|\s+)(?:(?:if|else|for|return|unless)(?=\s+|$)|@[\w-]+)/,
			lookbehind: true
		},
		'hexcode': /#[\da-f]{3,6}/i,
		'color': [
			/\b(?:AliceBlue|AntiqueWhite|Aqua|Aquamarine|Azure|Beige|Bisque|Black|BlanchedAlmond|Blue|BlueViolet|Brown|BurlyWood|CadetBlue|Chartreuse|Chocolate|Coral|CornflowerBlue|Cornsilk|Crimson|Cyan|DarkBlue|DarkCyan|DarkGoldenRod|DarkGr[ae]y|DarkGreen|DarkKhaki|DarkMagenta|DarkOliveGreen|DarkOrange|DarkOrchid|DarkRed|DarkSalmon|DarkSeaGreen|DarkSlateBlue|DarkSlateGr[ae]y|DarkTurquoise|DarkViolet|DeepPink|DeepSkyBlue|DimGr[ae]y|DodgerBlue|FireBrick|FloralWhite|ForestGreen|Fuchsia|Gainsboro|GhostWhite|Gold|GoldenRod|Gr[ae]y|Green|GreenYellow|HoneyDew|HotPink|IndianRed|Indigo|Ivory|Khaki|Lavender|LavenderBlush|LawnGreen|LemonChiffon|LightBlue|LightCoral|LightCyan|LightGoldenRodYellow|LightGr[ae]y|LightGreen|LightPink|LightSalmon|LightSeaGreen|LightSkyBlue|LightSlateGr[ae]y|LightSteelBlue|LightYellow|Lime|LimeGreen|Linen|Magenta|Maroon|MediumAquaMarine|MediumBlue|MediumOrchid|MediumPurple|MediumSeaGreen|MediumSlateBlue|MediumSpringGreen|MediumTurquoise|MediumVioletRed|MidnightBlue|MintCream|MistyRose|Moccasin|NavajoWhite|Navy|OldLace|Olive|OliveDrab|Orange|OrangeRed|Orchid|PaleGoldenRod|PaleGreen|PaleTurquoise|PaleVioletRed|PapayaWhip|PeachPuff|Peru|Pink|Plum|PowderBlue|Purple|Red|RosyBrown|RoyalBlue|SaddleBrown|Salmon|SandyBrown|SeaGreen|SeaShell|Sienna|Silver|SkyBlue|SlateBlue|SlateGr[ae]y|Snow|SpringGreen|SteelBlue|Tan|Teal|Thistle|Tomato|Transparent|Turquoise|Violet|Wheat|White|WhiteSmoke|Yellow|YellowGreen)\b/i,
			{
				pattern: /\b(?:rgb|hsl)\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*\)\B|\b(?:rgb|hsl)a\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*,\s*(?:0|0?\.\d+|1)\s*\)\B/i,
				inside: {
					'unit': unit,
					'number': number,
					'function': /[\w-]+(?=\()/,
					'punctuation': /[(),]/
				}
			}
		],
		'entity': /\\[\da-f]{1,8}/i,
		'unit': unit,
		'boolean': /\b(?:true|false)\b/,
		'operator': [
			// We want non-word chars around "-" because it is
			// accepted in property names.
			/~|[+!\/%<>?=]=?|[-:]=|\*[*=]?|\.{2,3}|&&|\|\||\B-\B|\b(?:and|in|is(?: a| defined| not|nt)?|not|or)\b/
		],
		'number': number,
		'punctuation': /[{}()\[\];:,]/
	};

	inside['interpolation'] = {
		pattern: /\{[^\r\n}:]+\}/,
		alias: 'variable',
		inside: {
			'delimiter': {
				pattern: /^{|}$/,
				alias: 'punctuation'
			},
			rest: inside
		}
	};
	inside['func'] = {
		pattern: /[\w-]+\([^)]*\).*/,
		inside: {
			'function': /^[^(]+/,
			rest: inside
		}
	};

	Prism.languages.stylus = {
		'atrule-declaration': {
			pattern: /(^\s*)@.+/m,
			lookbehind: true,
			inside: {
				'atrule': /^@[\w-]+/,
				rest: inside
			}
		},
		'variable-declaration': {
			pattern: /(^[ \t]*)[\w$-]+\s*.?=[ \t]*(?:(?:\{[^}]*\}|.+)|$)/m,
			lookbehind: true,
			inside: {
				'variable': /^\S+/,
				rest: inside
			}
		},

		'statement': {
			pattern: /(^[ \t]*)(?:if|else|for|return|unless)[ \t]+.+/m,
			lookbehind: true,
			inside: {
				'keyword': /^\S+/,
				rest: inside
			}
		},

		// A property/value pair cannot end with a comma or a brace
		// It cannot have indented content unless it ended with a semicolon
		'property-declaration': {
			pattern: /((?:^|\{)([ \t]*))(?:[\w-]|\{[^}\r\n]+\})+(?:\s*:\s*|[ \t]+)[^{\r\n]*(?:;|[^{\r\n,](?=$)(?!(?:\r?\n|\r)(?:\{|\2[ \t]+)))/m,
			lookbehind: true,
			inside: {
				'property': {
					pattern: /^[^\s:]+/,
					inside: {
						'interpolation': inside.interpolation
					}
				},
				rest: inside
			}
		},



		// A selector can contain parentheses only as part of a pseudo-element
		// It can span multiple lines.
		// It must end with a comma or an accolade or have indented content.
		'selector': {
			pattern: /(^[ \t]*)(?:(?=\S)(?:[^{}\r\n:()]|::?[\w-]+(?:\([^)\r\n]*\))?|\{[^}\r\n]+\})+)(?:(?:\r?\n|\r)(?:\1(?:(?=\S)(?:[^{}\r\n:()]|::?[\w-]+(?:\([^)\r\n]*\))?|\{[^}\r\n]+\})+)))*(?:,$|\{|(?=(?:\r?\n|\r)(?:\{|\1[ \t]+)))/m,
			lookbehind: true,
			inside: {
				'interpolation': inside.interpolation,
				'comment': inside.comment,
				'punctuation': /[{},]/
			}
		},

		'func': inside.func,
		'string': inside.string,
		'comment': {
			pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,
			lookbehind: true,
			greedy: true
		},
		'interpolation': inside.interpolation,
		'punctuation': /[{}()\[\];:.]/
	};
}(Prism));

},{}],"../node_modules/prismjs/components/prism-json.js":[function(require,module,exports) {
// https://www.json.org/json-en.html
Prism.languages.json = {
	'property': {
		pattern: /"(?:\\.|[^\\"\r\n])*"(?=\s*:)/,
		greedy: true
	},
	'string': {
		pattern: /"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,
		greedy: true
	},
	'comment': {
		pattern: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/,
		greedy: true
	},
	'number': /-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
	'punctuation': /[{}[\],]/,
	'operator': /:/,
	'boolean': /\b(?:true|false)\b/,
	'null': {
		pattern: /\bnull\b/,
		alias: 'keyword'
	}
};

Prism.languages.webmanifest = Prism.languages.json;

},{}],"../node_modules/prismjs/components/prism-jsonp.js":[function(require,module,exports) {
Prism.languages.jsonp = Prism.languages.extend('json', {
	'punctuation': /[{}[\]();,.]/
});

Prism.languages.insertBefore('jsonp', 'punctuation', {
	'function': /[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*\()/
});

},{}],"../node_modules/prismjs/components/prism-json5.js":[function(require,module,exports) {
(function (Prism) {

	var string = /("|')(?:\\(?:\r\n?|\n|.)|(?!\1)[^\\\r\n])*\1/

	Prism.languages.json5 = Prism.languages.extend('json', {
		'property': [
			{
				pattern: RegExp(string.source + '(?=\\s*:)'),
				greedy: true
			},
			{
				pattern: /[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*:)/,
				alias: 'unquoted'
			}
		],
		'string': {
			pattern: string,
			greedy: true
		},
		'number': /[+-]?\b(?:NaN|Infinity|0x[a-fA-F\d]+)\b|[+-]?(?:\b\d+\.?\d*|\B\.\d+)(?:[eE][+-]?\d+\b)?/
	});

}(Prism));

},{}],"../node_modules/prismjs/plugins/show-invisibles/prism-show-invisibles.css":[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../node_modules/prismjs/plugins/show-invisibles/prism-show-invisibles.js":[function(require,module,exports) {
var global = arguments[3];
(function () {

	if (
		typeof self !== 'undefined' && !self.Prism ||
		typeof global !== 'undefined' && !global.Prism
	) {
		return;
	}


	var invisibles = {
		'tab': /\t/,
		'crlf': /\r\n/,
		'lf': /\n/,
		'cr': /\r/,
		'space': / /
	};


	/**
	 * Handles the recursive calling of `addInvisibles` for one token.
	 *
	 * @param {Object|Array} tokens The grammar or array which contains the token.
	 * @param {string|number} name The name or index of the token in `tokens`.
	 */
	function handleToken(tokens, name) {
		var value = tokens[name];

		var type = Prism.util.type(value);
		switch (type) {
			case 'RegExp':
				var inside = {};
				tokens[name] = {
					pattern: value,
					inside: inside
				};
				addInvisibles(inside);
				break;

			case 'Array':
				for (var i = 0, l = value.length; i < l; i++) {
					handleToken(value, i);
				}
				break;

			default: // 'Object'
				var inside = value.inside || (value.inside = {});
				addInvisibles(inside);
				break;
		}
	}

	/**
	 * Recursively adds patterns to match invisible characters to the given grammar (if not added already).
	 *
	 * @param {Object} grammar
	 */
	function addInvisibles(grammar) {
		if (!grammar || grammar['tab']) {
			return;
		}

		// assign invisibles here to "mark" the grammar in case of self references
		for (var name in invisibles) {
			if (invisibles.hasOwnProperty(name)) {
				grammar[name] = invisibles[name];
			}
		}

		for (var name in grammar) {
			if (grammar.hasOwnProperty(name) && !invisibles[name]) {
				if (name === 'rest') {
					addInvisibles(grammar['rest']);
				} else {
					handleToken(grammar, name);
				}
			}
		}
	}

	Prism.hooks.add('before-highlight', function (env) {
		addInvisibles(env.grammar);
	});
})();

},{}],"../node_modules/prismjs/plugins/normalize-whitespace/prism-normalize-whitespace.js":[function(require,module,exports) {
(function() {

var assign = Object.assign || function (obj1, obj2) {
	for (var name in obj2) {
		if (obj2.hasOwnProperty(name))
			obj1[name] = obj2[name];
	}
	return obj1;
}

function NormalizeWhitespace(defaults) {
	this.defaults = assign({}, defaults);
}

function toCamelCase(value) {
	return value.replace(/-(\w)/g, function(match, firstChar) {
		return firstChar.toUpperCase();
	});
}

function tabLen(str) {
	var res = 0;
	for (var i = 0; i < str.length; ++i) {
		if (str.charCodeAt(i) == '\t'.charCodeAt(0))
			res += 3;
	}
	return str.length + res;
}

NormalizeWhitespace.prototype = {
	setDefaults: function (defaults) {
		this.defaults = assign(this.defaults, defaults);
	},
	normalize: function (input, settings) {
		settings = assign(this.defaults, settings);

		for (var name in settings) {
			var methodName = toCamelCase(name);
			if (name !== "normalize" && methodName !== 'setDefaults' &&
					settings[name] && this[methodName]) {
				input = this[methodName].call(this, input, settings[name]);
			}
		}

		return input;
	},

	/*
	 * Normalization methods
	 */
	leftTrim: function (input) {
		return input.replace(/^\s+/, '');
	},
	rightTrim: function (input) {
		return input.replace(/\s+$/, '');
	},
	tabsToSpaces: function (input, spaces) {
		spaces = spaces|0 || 4;
		return input.replace(/\t/g, new Array(++spaces).join(' '));
	},
	spacesToTabs: function (input, spaces) {
		spaces = spaces|0 || 4;
		return input.replace(RegExp(' {' + spaces + '}', 'g'), '\t');
	},
	removeTrailing: function (input) {
		return input.replace(/\s*?$/gm, '');
	},
	// Support for deprecated plugin remove-initial-line-feed
	removeInitialLineFeed: function (input) {
		return input.replace(/^(?:\r?\n|\r)/, '');
	},
	removeIndent: function (input) {
		var indents = input.match(/^[^\S\n\r]*(?=\S)/gm);

		if (!indents || !indents[0].length)
			return input;

		indents.sort(function(a, b){return a.length - b.length; });

		if (!indents[0].length)
			return input;

		return input.replace(RegExp('^' + indents[0], 'gm'), '');
	},
	indent: function (input, tabs) {
		return input.replace(/^[^\S\n\r]*(?=\S)/gm, new Array(++tabs).join('\t') + '$&');
	},
	breakLines: function (input, characters) {
		characters = (characters === true) ? 80 : characters|0 || 80;

		var lines = input.split('\n');
		for (var i = 0; i < lines.length; ++i) {
			if (tabLen(lines[i]) <= characters)
				continue;

			var line = lines[i].split(/(\s+)/g),
			    len = 0;

			for (var j = 0; j < line.length; ++j) {
				var tl = tabLen(line[j]);
				len += tl;
				if (len > characters) {
					line[j] = '\n' + line[j];
					len = tl;
				}
			}
			lines[i] = line.join('');
		}
		return lines.join('\n');
	}
};

// Support node modules
if (typeof module !== 'undefined' && module.exports) {
	module.exports = NormalizeWhitespace;
}

// Exit if prism is not loaded
if (typeof Prism === 'undefined') {
	return;
}

Prism.plugins.NormalizeWhitespace = new NormalizeWhitespace({
	'remove-trailing': true,
	'remove-indent': true,
	'left-trim': true,
	'right-trim': true,
	/*'break-lines': 80,
	'indent': 2,
	'remove-initial-line-feed': false,
	'tabs-to-spaces': 4,
	'spaces-to-tabs': 4*/
});

Prism.hooks.add('before-sanity-check', function (env) {
	var Normalizer = Prism.plugins.NormalizeWhitespace;

	// Check settings
	if (env.settings && env.settings['whitespace-normalization'] === false) {
		return;
	}

	// Check classes
	if (!Prism.util.isActive(env.element, 'whitespace-normalization', true)) {
		return;
	}

	// Simple mode if there is no env.element
	if ((!env.element || !env.element.parentNode) && env.code) {
		env.code = Normalizer.normalize(env.code, env.settings);
		return;
	}

	// Normal mode
	var pre = env.element.parentNode;
	if (!env.code || !pre || pre.nodeName.toLowerCase() !== 'pre') {
		return;
	}

	var children = pre.childNodes,
	    before = '',
	    after = '',
	    codeFound = false;

	// Move surrounding whitespace from the <pre> tag into the <code> tag
	for (var i = 0; i < children.length; ++i) {
		var node = children[i];

		if (node == env.element) {
			codeFound = true;
		} else if (node.nodeName === "#text") {
			if (codeFound) {
				after += node.nodeValue;
			} else {
				before += node.nodeValue;
			}

			pre.removeChild(node);
			--i;
		}
	}

	if (!env.element.children.length || !Prism.plugins.KeepMarkup) {
		env.code = before + env.code + after;
		env.code = Normalizer.normalize(env.code, env.settings);
	} else {
		// Preserve markup for keep-markup plugin
		var html = before + env.element.innerHTML + after;
		env.element.innerHTML = Normalizer.normalize(html, env.settings);
		env.code = env.element.textContent;
	}
});

}());

},{}],"../node_modules/prismjs/themes/prism.css":[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"js/constants/cssNamedColors.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.namedColors = void 0;
//  CSS colors
var namedColors = ["aliceblue", "antiquewhite", "aqua", "aquamarine", "azure", "beige", "bisque", "black", "blanchedalmond", "blue", "blueviolet", "brown", "burlywood", "cadetblue", "chartreuse", "chocolate", "coral", "cornflowerblue", "cornsilk", "crimson", "cyan", "darkblue", "darkcyan", "darkgoldenrod", "darkgray", "darkgreen", "darkgrey", "darkkhaki", "darkmagenta", "darkolivegreen", "darkorange", "darkorchid", "darkred", "darksalmon", "darkseagreen", "darkslateblue", "darkslategray", "darkslategrey", "darkturquoise", "darkviolet", "deeppink", "deepskyblue", "dimgray", "dimgrey", "dodgerblue", "firebrick", "floralwhite", "forestgreen", "fuchsia", "gainsboro", "ghostwhite", "gold", "goldenrod", "gray", "green", "greenyellow", "grey", "honeydew", "hotpink", "indianred", "indigo", "ivory", "khaki", "lavender", "lavenderblush", "lawngreen", "lemonchiffon", "lightblue", "lightcoral", "lightcyan", "lightgoldenrodyellow", "lightgray", "lightgreen", "lightgrey", "lightpink", "lightsalmon", "lightseagreen", "lightskyblue", "lightslategray", "lightslategrey", "lightsteelblue", "lightyellow", "lime", "limegreen", "linen", "magenta", "maroon", "mediumaquamarine", "mediumblue", "mediumorchid", "mediumpurple", "mediumseagreen", "mediumslateblue", "mediumspringgreen", "mediumturquoise", "mediumvioletred", "midnightblue", "mintcream", "mistyrose", "moccasin", "navajowhite", "navy", "oldlace", "olive", "olivedrab", "orange", "orangered", "orchid", "palegoldenrod", "palegreen", "paleturquoise", "palevioletred", "papayawhip", "peachpuff", "peru", "pink", "plum", "powderblue", "purple", "red", "rosybrown", "royalblue", "saddlebrown", "salmon", "sandybrown", "seagreen", "seashell", "sienna", "silver", "skyblue", "slateblue", "slategray", "slategrey", "snow", "springgreen", "steelblue", "tan", "teal", "thistle", "tomato", "transparent", "turquoise", "violet", "wheat", "white", "whitesmoke", "yellow", "yellowgreen"];
exports.namedColors = namedColors;
},{}],"js/lib/PrismExtend.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.colorToken = void 0;

var _cssNamedColors = require("../constants/cssNamedColors");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Helper function to create regex
 *
 * @param {string} str
 * @param {object} replacements
 * @param {string} flags
 * @returns {RegExp}
 * @see https://github.com/Aljen014/dabblet/blob/e1b0805d6e20b0e34b7bf5df86b38d92261a8740/code/code-highlight.js
 */
RegExp.create = function (str, replacements, flags) {
  for (var id in replacements) {
    var replacement = replacements[id],
        idRegExp = RegExp("{{" + id + "}}", "gi");

    if (replacement.source) {
      replacement = replacement.source.replace(/^\^|\$$/g, "");
    } //  Don't add extra parentheses if they already exist


    str = str.replace(RegExp("\\(" + idRegExp.source + "\\)", "gi"), "(" + replacement + ")");
    str = str.replace(idRegExp, "(?:" + replacement + ")");
  }

  return RegExp(str, flags);
};

var number = /-?\d*\.?\d+/;
var colorToken = {
  pattern: RegExp.create("\\b{{keyword}}\\b|\\b{{func}}\\B|\\B{{hex}}\\b", {
    keyword: RegExp("^" + _cssNamedColors.namedColors.join("|") + "$"),
    func: RegExp.create("^(?:rgb|hsl)a?\\((?:\\s*{{number}}%?\\s*,?\\s*){3,4}\\)$", {
      number: number
    }),
    hex: /^#(?:[0-9a-f]{3,4}){1,2}$/i
  }, "ig"),
  greedy: true
};
/**
 * Create custom parsers for Prism
 *
 * @param {Prism} Prism - Prism.js instance
 */

exports.colorToken = colorToken;

var createParsers = function createParsers(Prism) {
  /***********
   * CSS
   **********/
  Prism.languages.cssParser = Prism.languages.extend("css", {});
  Prism.languages.insertBefore("cssParser", "selector", {
    "variable-declaration": {
      pattern: /--[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*[:](.*?);/,
      inside: {
        variable: Prism.languages.css.variable,
        color: colorToken,
        punctuation: Prism.languages.css.punctuation
      },
      greedy: true
    },
    color: colorToken
  });
  /***********
   * SCSS
   **********/

  Prism.languages.scssParser = Prism.languages.extend("scss", {});
  Prism.languages.insertBefore("scssParser", "selector", {
    "variable-declaration": {
      pattern: /\$[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*[:](.*?);/,
      inside: {
        variable: Prism.languages.scss.variable,
        punctuation: Prism.languages.scss.punctuation,
        color: colorToken
      },
      greedy: true
    },
    color: colorToken
  });
  /***********
   * SASS
   **********/

  Prism.languages.sassParser = Prism.languages.extend("sass", {});
  Prism.languages.insertBefore("sassParser", "variable-line", {
    "variable-declaration": {
      pattern: Prism.languages.sass["variable-line"].pattern,
      inside: Object.assign(Prism.languages.sass["variable-line"].inside, _objectSpread({
        color: colorToken
      }, Prism.languages.sass["variable-line"].inside))
    },
    variable: /\$[-\w]+|#\{\$[-\w]+\}/,
    color: colorToken
  });
  /***********
   * STYLUS
   **********/

  Prism.languages.stylParser = Prism.languages.extend("stylus", {
    color: colorToken
  }); // Keep only necessary tokens inside

  Prism.languages.stylParser["variable-declaration"].inside = {
    variable: Prism.languages.stylus["variable-declaration"].inside.variable,
    color: Prism.languages.stylParser.color,
    punctuation: Prism.languages.stylus.punctuation,
    operator: Prism.languages.stylus["variable-declaration"].inside.rest.operator
  };
};

var _default = createParsers;
exports.default = _default;
},{"../constants/cssNamedColors":"js/constants/cssNamedColors.js"}],"js/lib/EventEmitter.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Emit/Listen events
 *
 * @class EventEmitter
 * @see  https://gist.github.com/mudge/5830382#gistcomment-2623252
 */
var EventEmitter = /*#__PURE__*/function () {
  function EventEmitter() {
    _classCallCheck(this, EventEmitter);

    this.events = {};
  }

  _createClass(EventEmitter, [{
    key: "on",
    value: function on(event, listener) {
      var _this = this;

      if (_typeof(this.events[event]) !== "object") {
        this.events[event] = [];
      }

      this.events[event].push(listener);
      return function () {
        return _this.removeListener(event, listener);
      };
    }
  }, {
    key: "removeListener",
    value: function removeListener(event, listener) {
      if (_typeof(this.events[event]) === "object") {
        var idx = this.events[event].indexOf(listener);

        if (idx > -1) {
          this.events[event].splice(idx, 1);
        }
      }
    }
  }, {
    key: "emit",
    value: function emit(event) {
      var _this2 = this;

      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      if (_typeof(this.events[event]) === "object") {
        this.events[event].forEach(function (listener) {
          return listener.apply(_this2, args);
        });
      }
    }
  }, {
    key: "once",
    value: function once(event, listener) {
      var _this3 = this;

      var remove = this.on(event, function () {
        remove();

        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        listener.apply(_this3, args);
      });
    }
  }]);

  return EventEmitter;
}();

var _default = EventEmitter;
exports.default = _default;
},{}],"js/lib/ActionCreator.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var defaultTriggers = {
  click: ["BUTTON", "A", "LABEL", "DIV"],
  change: ["FORM", "INPUT"],
  blur: ["INPUT", "LABEL"]
};
/**
 * Action Creator.
 * Listens for the events, creates events arguments object and passes it further to the components
 *
 * @class ActionCreator
 * @see https://gist.github.com/qborreda/ece17b03009442277064
 */

var ActionCreator = /*#__PURE__*/function () {
  /**
   * Creates an instance of ActionCreator.
   * @param {HTMLElement} container
   * @param {EventEmitter} emitter
   */
  function ActionCreator(container, emitter) {
    _classCallCheck(this, ActionCreator);

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


  _createClass(ActionCreator, [{
    key: "init",
    value: function init() {
      var _this = this;

      ["click", "change", "blur"].forEach(function (eventName) {
        return _this.container.addEventListener(eventName, function (e) {
          return _this.handleEvent(e);
        });
      });
    }
    /**
     * Create arguments object from and emit action
     *
     * @param {Event} e
     */

  }, {
    key: "handleEvent",
    value: function handleEvent(e) {
      if (e.type == "blur") console.log(e.target);
      var node = e.target;
      var eventName = e.type;
      var action = e.target.dataset.action;
      if (!this.isValidTrigger(node, eventName)) return;
      var value = this.resolveInputValue(node);
      var actionArgs = {
        trigger: node,
        // event target
        value: value,
        // value (for inputs)
        name: node.name,
        //name (for form elements)
        target: node.dataset.target,
        // target element, if specified as data-target attribute
        data: node.dataset.actionData,
        // custom data ppassed in data-action-data attribute
        file: node.files ? node.files[0] : undefined // first uploaded file in case node is a file input

      };

      this._events.emit(action, actionArgs); // e.preventDefault();

    }
    /**
     * Parse input value to proper type depending on the input type
     *
     * @param {HTMLElement} node
     * @returns {Boolean|Number|String}
     */

  }, {
    key: "resolveInputValue",
    value: function resolveInputValue(node) {
      if (node.type === "checkbox") return node.checked;else if (node.type === "number") return parseInt(node.value);else return node.value;
    }
    /**
     * Validate event trigger to avoid emittig non-existing/unnecessary actions
     *
     * @param {HTMLElement} node
     * @param {string} eventName
     * @return {boolean}
     */

  }, {
    key: "isValidTrigger",
    value: function isValidTrigger(node, eventName) {
      // node has data-action attribute
      if (!node.hasAttribute("data-action")) return false; // node has custom trigger specified which matches with event

      if (node.hasAttribute("data-action-trigger") && node.dataset.actionTrigger === eventName) {
        return true;
      } // if node has no custom trigger specified: validate against default triggers


      if (defaultTriggers[eventName].includes(node.nodeName)) return true;
      return false;
    }
  }]);

  return ActionCreator;
}();

var _default = ActionCreator;
exports.default = _default;
},{}],"js/constants/syntax.json":[function(require,module,exports) {
module.exports = {
  "css": {
    "variablePrefix": "--",
    "lineEnding": ";",
    "braceOpen": "{",
    "braceClose": "}",
    "assignmentOperator": ": "
  },
  "scss": {
    "variablePrefix": "$",
    "lineEnding": ";",
    "braceOpen": "{",
    "braceClose": "}",
    "assignmentOperator": ": "
  },
  "sass": {
    "variablePrefix": "$",
    "lineEnding": "",
    "braceOpen": "",
    "braceClose": "",
    "assignmentOperator": ": "
  },
  "styl": {
    "variablePrefix": "$",
    "lineEnding": "",
    "braceOpen": "",
    "braceClose": "",
    "assignmentOperator": " = "
  }
};
},{}],"js/utils/helpers.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectText = exports.removeVariablePrefix = exports.capitalize = void 0;

var syntax = _interopRequireWildcard(require("../constants/syntax.json"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Capitalize string
 *
 * @param {string} s
 * @returns {string}
 */
var capitalize = function capitalize(s) {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.toLowerCase().slice(1);
};
/**
 * Remove syntax prefix from the variable
 *
 * @param {string} variable - a string with variable name including prefix
 * @param {string} lang - syntax to resolve (SASS/SCSS/STYLUS etc)
 * @returns {string}
 */


exports.capitalize = capitalize;

var removeVariablePrefix = function removeVariablePrefix(variable, lang) {
  return variable.replace(syntax[lang].variablePrefix, "");
};
/**
 * Select all text inside the node
 *
 * @param {HTMLElement} node
 * @see https://stackoverflow.com/a/987376
 */


exports.removeVariablePrefix = removeVariablePrefix;

var selectText = function selectText(node) {
  if (document.body.createTextRange) {
    var range = document.body.createTextRange();
    range.moveToElementText(node);
    range.select();
  } else if (window.getSelection) {
    var selection = window.getSelection();

    var _range = document.createRange();

    _range.selectNodeContents(node);

    selection.removeAllRanges();
    selection.addRange(_range);
  } else {
    // eslint-disable-next-line no-console
    console.warn("Could not select text in node: Unsupported browser.");
  }
};

exports.selectText = selectText;
},{"../constants/syntax.json":"js/constants/syntax.json"}],"js/utils/objectHelpers.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deepSeal = exports.isObject = exports.cloneWithoutKeys = exports.removeBlankProps = exports.modifyNestedProperties = void 0;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Modify deeply nested property, which matches a custom condition.
 * Generic function which accepts function-validator of the condition and function-modifier
 *
 * @param {object} obj
 * @param {function} isToBeModified - Boolean function which accepts 2 arguments - current key and value and returns Boolean if the current record should be modified or not
 * @param {function} modifyEntry - Function which modifies the entry, accepts key and value as arguments and returns entry as an array [key, value].
 * @returns {object}
 * @see https://stackoverflow.com/questions/55857148/filter-reduce-nested-object-recursively
 */
var modifyNestedProperties = function modifyNestedProperties(obj, isToBeModified, modifyEntry) {
  if (Object(obj) !== obj) return obj;else if (Array.isArray(obj)) return obj.map(function (o) {
    return modifyNestedProperties(o, isToBeModified, modifyEntry);
  });
  var result = Object.fromEntries(Object.entries(obj).map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        k = _ref2[0],
        v = _ref2[1];

    return isToBeModified(k, v) ? modifyEntry(k, v) : [k, modifyNestedProperties(v, isToBeModified, modifyEntry)];
  }));
  return JSON.parse(JSON.stringify(result)); // cleanup undefined properties, if any
};
/**
 * Remove all blank props at any level of nested object.
 * Empty tring and empty object are also considered as blank values
 *
 * @param {object} obj
 * @returns {object}
 */


exports.modifyNestedProperties = modifyNestedProperties;

var removeBlankProps = function removeBlankProps(obj) {
  return modifyNestedProperties(obj, isBlankProp, function () {
    return [];
  } //returning blank array instead of entry removes property and value
  );

  function isBlankProp(k, v) {
    if (v && v.constructor === Object && Object.keys(v).length > 0) {
      return Object.entries(v).every(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            childKey = _ref4[0],
            childVal = _ref4[1];

        return isBlankProp(childKey, childVal);
      });
    }

    return v === null || v === undefined || v === "" || v.constructor === Object && Object.keys(v).length === 0 || v.constructor === Object && Object.keys(v).length > 0 && JSON.parse(JSON.stringify(v)).length === 0;
  }
};
/**
 *
 *
 * @param {object} data - object to clone
 * @param {array} keys - keys to remove
 * @see https://stackoverflow.com/questions/55857148/filter-reduce-nested-object-recursively
 */


exports.removeBlankProps = removeBlankProps;

var cloneWithoutKeys = function cloneWithoutKeys(data, keys) {
  return modifyNestedProperties(data, function (k) {
    return keys.includes(k);
  }, function () {
    return [];
  });
};
/**
 * Check if an argument is an Object
 *
 * @param {*} val
 * @returns {boolean}
 */


exports.cloneWithoutKeys = cloneWithoutKeys;

var isObject = function isObject(val) {
  return _typeof(val) === "object" && !Array.isArray(val);
};
/**
 * Seal the object including all nested properties
 *
 * @param {object} object
 * @returns {object}
 */


exports.isObject = isObject;

var deepSeal = function deepSeal(object) {
  Object.getOwnPropertyNames(object).forEach(function (name) {
    var prop = object[name];
    if (prop && _typeof(prop) === "object") deepSeal(prop);
  });
  return Object.seal(object);
};

exports.deepSeal = deepSeal;
},{}],"js/constants/errorDict.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorDict = void 0;
var errorDict = {
  DEFAULT: {
    header: "Something went wrong!",
    text: "We are uncertain what exactly happened, so please check your internet connectionb and try again. If the bug repeats, please let me know at illustrova@gmail.com or submit an issue on Github."
  },
  JSONPARSE: {
    header: "Your JSON seems to be invalid",
    text: "An error happened when we tried to parse JSON. Please validate your file and try again."
  },
  INVALID_SCHEMA: {
    header: "Your file is not valid",
    text: "There was a problem with variable names in your file. Please check it after \"%KEY%\" and below"
  },
  INVALID_FILE: {
    header: "Your file is not valid",
    text: "There is a problem occured parsing your file, please validate it and try again."
  },
  WRONGEXT: {
    header: "You are trying to import unsupported file",
    text: ".%EXT% files cannot be imported. We currently support importing files with the following extensions: %FORMATS%."
  },
  EMPTY_PALETTE: {
    header: "Nothing to export :(",
    text: "Your palette is empty. Choose some colors first!"
  },
  EMPTY_SCHEMA: {
    header: "Nothing to import :(",
    text: "We didn't find any variables that can be imported in your file"
  },
  FILENOTREADABLE: {
    header: "Can't read your file :(",
    text: "Something is wrong with your file. Please check it and try again."
  },
  NOT_A_COLOR: {
    header: "Unexpected color value",
    text: 'A string "%COLOR%" doesn\'t look like a valid color. Please check and edit your file'
  }
};
exports.errorDict = errorDict;
},{}],"js/lib/UserFriendlyError.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectHelpers = require("../utils/objectHelpers");

var _errorDict = require("../constants/errorDict");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * Custom error with human readable message
 *
 * @class UserFriendlyError
 * @extends {Error}
 */
var UserFriendlyError = /*#__PURE__*/function (_Error) {
  _inherits(UserFriendlyError, _Error);

  var _super = _createSuper(UserFriendlyError);

  /**
   * Creates an instance of UserFriendlyError.
   * @param {string} userMessage
   * @param {object} userArgs
   * @param {array} args - inherited from Error
   */
  function UserFriendlyError(userMessage, userArgs) {
    var _this;

    _classCallCheck(this, UserFriendlyError);

    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.userMessage = _this.setUserMessage(userMessage, userArgs);
    _this.name = _this.constructor.name;
    return _this;
  }
  /**
   * Set user message
   *
   * @param {*} userMessage
   * @param {*} userArgs
   * @returns {*}
   */


  _createClass(UserFriendlyError, [{
    key: "setUserMessage",
    value: function setUserMessage(userMessage, userArgs) {
      if (!userMessage) {
        return _errorDict.errorDict.DEFAULT;
      }

      if ((0, _objectHelpers.isObject)(userMessage)) {
        return Object.fromEntries(Object.entries(userMessage).map(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              k = _ref2[0],
              v = _ref2[1];

          v = v.replace(/%\w+%/g, function (all) {
            return userArgs[all.substring(1, all.length - 1)] || all;
          });
          return [k, v];
        }));
      }
    }
  }]);

  return UserFriendlyError;
}( /*#__PURE__*/_wrapNativeSuper(Error));

var _default = UserFriendlyError;
exports.default = _default;
},{"../utils/objectHelpers":"js/utils/objectHelpers.js","../constants/errorDict":"js/constants/errorDict.js"}],"js/constants/common.json":[function(require,module,exports) {
module.exports = {
  "COLORFORMATS": ["hexa", "rgba", "hsla"],
  "FILEFORMATS": ["json", "scss", "sass", "styl", "css"],
  "FAMILIES": ["base", "faint", "accent", "complimentary", "critical", "warning", "success"],
  "MEMBERS": ["strong", "weak"],
  "ELEMENTS": ["back", "text", "line", "icon", "fancy"],
  "SHIFTS": ["up", "", "down"],
  "VARIABLE_NAME_SEPARATOR": "-"
};
},{}],"js/utils/schema.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSchema = createSchema;
exports.isValidSchema = isValidSchema;

var _objectHelpers = require("./objectHelpers");

var _UserFriendlyError = _interopRequireDefault(require("../lib/UserFriendlyError"));

var C = _interopRequireWildcard(require("../constants/common.json"));

var _errorDict = require("../constants/errorDict");

var _PrismExtend = require("../lib/PrismExtend");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var ELEMENTS = C.ELEMENTS;
var FAMILIES = C.FAMILIES;
var FAMILYMEMBERS = C.MEMBERS;
var SHIFTS = C.SHIFTS; // to simplify a particular case we pregenerate the array of shidts and nemebers which should be kept on the same level

var MEMBERS = FAMILYMEMBERS.flatMap(function (m) {
  return SHIFTS.map(function (s) {
    return m + (s.length > 0 ? "-" + s : "");
  });
});
var colorRegex = _PrismExtend.colorToken.pattern;
/**
 * Create a new empty and protected schema object
 *
 * @returns {object}
 */

function createSchema() {
  var schema = {};
  var propsArr = [ELEMENTS, FAMILIES, MEMBERS];

  (function addPropsToSchema(sch, index) {
    propsArr[index].forEach(function (p) {
      // Check if there will be one more level of properties
      var isLastLevel = index === propsArr.length - 1; // Add propertry to object

      Object.defineProperty(sch, p, {
        enumerable: true,
        writable: true,
        configurable: true,
        value: isLastLevel ? undefined : {}
      }); //  Recursively add properties of next level

      if (!isLastLevel) {
        addPropsToSchema(sch[p], index + 1);
      }
    });
  })(schema, 0);

  return (0, _objectHelpers.deepSeal)(schema);
}
/**
 * Check if an object matches the schema.
 * Throws an error if schema is not valid
 *
 * @param {object} obj
 * @returns {boolean}
 */


function isValidSchema(obj, sch) {
  if (Object.keys(obj).length < 1) throw new _UserFriendlyError.default(_errorDict.errorDict.EMPTY_SCHEMA);
  return function validateSchema(obj, sch) {
    var schema = sch || createSchema();
    var keys = Object.keys(obj);
    if (keys.length < 1) throw new _UserFriendlyError.default(_errorDict.errorDict.EMPTY_SCHEMA);
    return keys.every(function (key) {
      var val = obj[key];
      var schemaVal = schema[key];

      if (schemaVal) {
        if ((0, _objectHelpers.isObject)(val) && val !== null) {
          return validateSchema(val, schemaVal); // return the recursive call
        } else {
          throw new _UserFriendlyError.default(_errorDict.errorDict.INVALID_SCHEMA, {
            KEY: val
          });
        }
      } else {
        // key exist in schema but value is undefined : key does not exist in schema
        if (_typeof(val) === "object") {
          throw new _UserFriendlyError.default(_errorDict.errorDict.INVALID_SCHEMA, {
            KEY: JSON.stringify(val)
          });
        } // Value is a string, but not a color


        if (typeof val === "string" && !val.match(colorRegex)) {
          throw new _UserFriendlyError.default(_errorDict.errorDict.NOT_A_COLOR, {
            COLOR: val
          });
        }

        return true;
      }
    });
  }(obj, sch);
}
},{"./objectHelpers":"js/utils/objectHelpers.js","../lib/UserFriendlyError":"js/lib/UserFriendlyError.js","../constants/common.json":"js/constants/common.json","../constants/errorDict":"js/constants/errorDict.js","../lib/PrismExtend":"js/lib/PrismExtend.js"}],"js/constants/eventTypes.json":[function(require,module,exports) {
module.exports = {
  "SET_COLOR": "set_color",
  "SET_COLOR_IN_PALETTE": "set_color_in_palette",
  "RESET_COLOR": "reset_color",
  "SET_ACTIVE_PALETTE_ITEM": "set_active_palette_item",
  "RESET_ACTIVE_PALETTE_ITEM": "reset_active_palette_item",
  "SET_COLOR_FORMAT": "set_color_format",
  "PALETTE_EXPORT": "palette_export",
  "EXPORTER_CREATE_OUTPUT": "exporter_create_output",
  "MODAL_SHOW_OUTPUT": "modal_show",
  "MODAL_HIDE": "modal_hide",
  "MODAL_SHOW_ERROR": "modal_show_error",
  "COPY_OUTPUT": "copy_output",
  "SAVE_OUTPUT": "save_output",
  "TOGGLE_DISABLED": "toggle_disabled",
  "TOGGLE_COLLAPSIBLE": "toggle_collapsible",
  "CHANGE_OPTIONS": "change_options",
  "CHANGE_FILENAME": "change_filename",
  "IMPORT_FILE": "import_file",
  "SETUP_PALETTE": "setup_palette",
  "RESET_PALETTE": "reset_palette"
};
},{}],"js/lib/Importer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _helpers = require("../utils/helpers");

var objectUtils = _interopRequireWildcard(require("../utils/objectHelpers"));

var _schema = require("../utils/schema");

var C = _interopRequireWildcard(require("../constants/common.json"));

var E = _interopRequireWildcard(require("../constants/eventTypes.json"));

var _errorDict = require("../constants/errorDict");

var _UserFriendlyError = _interopRequireDefault(require("./UserFriendlyError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var separator = C.VARIABLE_NAME_SEPARATOR;
/**
 * Import functionality of the app.
 *
 * @class Importer
 */

var Importer = /*#__PURE__*/function () {
  /**
   * Creates an instance of Importer.
   * @param {EventEmitter} emitter
   * @param {Prism} Prism
   */
  function Importer(emitter, Prism) {
    _classCallCheck(this, Importer);

    this._events = emitter;
    this.prism = Prism;
    this.init();
  }
  /**
   * Attach listeners
   *
   */


  _createClass(Importer, [{
    key: "init",
    value: function init() {
      var _this = this;

      this.schema = (0, _schema.createSchema)();

      this._events.on(E.IMPORT_FILE, function (_ref) {
        var trigger = _ref.trigger,
            file = _ref.file;
        trigger.value = null; // clear value every time. otherwise input wouldn't accept the same file twice

        _this.loadFile(file);
      });
    }
    /**
     * Read file, uploaded to file input
     *
     * @param {*} file
     */

  }, {
    key: "loadFile",
    value: function loadFile(file) {
      var _this2 = this;

      if (file) {
        var fileExt = file.name.substr(file.name.lastIndexOf(".") + 1);
        var fr = new FileReader();

        fr.onloadend = function (e) {
          return _this2.importToPalette(e.target.result, fileExt);
        };

        fr.onerror = function () {
          throw new _UserFriendlyError.default(_errorDict.errorDict.FILENOTREADABLE);
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

  }, {
    key: "importToPalette",
    value: function importToPalette(text, fileExt) {
      try {
        var parsedData = this.parseFile(text, fileExt);

        this._events.emit(E.SETUP_PALETTE, parsedData);
      } catch (err) {
        var errorObject = err.constructor.name === "UserFriendlyError" ? err : new _UserFriendlyError.default(_errorDict.errorDict.DEFAULT, undefined, err) && // eslint-disable-next-line no-console
        console.error(err);

        this._events.emit(E.MODAL_SHOW_ERROR, errorObject);
      }

      this.schema = (0, _schema.createSchema)(); //cleanup schema after every import
    }
    /**
     * Validate file extension against the list of suported file types
     *
     * @param {string} ext
     */

  }, {
    key: "validateFileExt",
    value: function validateFileExt(ext) {
      if (!C.FILEFORMATS.includes(ext)) throw new _UserFriendlyError.default(_errorDict.errorDict.WRONGEXT, {
        EXT: ext,
        FORMATS: C.FILEFORMATS.join(", ")
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

  }, {
    key: "parseFile",
    value: function parseFile(file, ext) {
      this.validateFileExt(ext);
      var result;

      if (ext === "json") {
        try {
          result = JSON.parse(file);
        } catch (err) {
          throw new _UserFriendlyError.default(_errorDict.errorDict.JSONPARSE);
        }
      } else {
        // Parse stylesheet with Prism.js
        var tokens = this.prism.tokenize(file, this.prism.languages["".concat(ext, "Parser")]);
        var declarationTokens = tokens.filter(function (token) {
          return Object.prototype.hasOwnProperty.call(token, "type") && token.type === "variable-declaration";
        });
        result = Object.seal(Object.assign({}, this.schema)); //deep copy

        declarationTokens.forEach(function (token) {
          var tokenarr = token.content; // Check if token is Valid

          var hasInvalidTokens = !(tokenarr.some(function (t) {
            return t.type === "variable";
          }) && tokenarr.some(function (t) {
            return t.type === "color";
          }));
          if (hasInvalidTokens) throw new _UserFriendlyError.default(_errorDict.errorDict.INVALID_FILE);
          var variable = (0, _helpers.removeVariablePrefix)(tokenarr.find(function (t) {
            return t.type === "variable";
          }).content, ext);
          var value = tokenarr.find(function (t) {
            return t.type === "color";
          }).content;
          var path = variable.split(separator); // Skip variables which surely don't match (another naming)

          if (path.length < 3 || path.length > 4) return;
          var propertyPath = {
            element: C.ELEMENTS.includes(path[0]) && path[0] || undefined,
            family: C.FAMILIES.includes(path[1]) && path[1] || undefined,
            member: C.MEMBERS.includes(path[2]) && (path[3] ? C.SHIFTS.includes(path[3]) && "".concat(path[2], "-").concat(path[3]) : path[2]) || undefined
          }; // Validate variable names

          var isInvalidPath = Object.entries(propertyPath).find(function (_ref2) {
            var _ref3 = _slicedToArray(_ref2, 1),
                k = _ref3[0];

            return !k;
          });

          if (isInvalidPath) {
            throw new _UserFriendlyError.default(_errorDict.errorDict.INVALID_SCHEMA, {
              KEY: isInvalidPath
            });
          }

          if (propertyPath.element && propertyPath.family && propertyPath.member) result[propertyPath.element][propertyPath.family][propertyPath.member] = value;
        });
      }

      var data = objectUtils.removeBlankProps(Object.assign(this.schema, result));
      return (0, _schema.isValidSchema)(data) && data;
    }
  }]);

  return Importer;
}();

var _default = Importer;
exports.default = _default;
},{"../utils/helpers":"js/utils/helpers.js","../utils/objectHelpers":"js/utils/objectHelpers.js","../utils/schema":"js/utils/schema.js","../constants/common.json":"js/constants/common.json","../constants/eventTypes.json":"js/constants/eventTypes.json","../constants/errorDict":"js/constants/errorDict.js","./UserFriendlyError":"js/lib/UserFriendlyError.js"}],"js/lib/Exporter.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _helpers = require("../utils/helpers");

var objectUtils = _interopRequireWildcard(require("../utils/objectHelpers"));

var _schema = require("../utils/schema");

var E = _interopRequireWildcard(require("../constants/eventTypes.json"));

var syntax = _interopRequireWildcard(require("../constants/syntax.json"));

var C = _interopRequireWildcard(require("../constants/common.json"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * App's export functionality
 *
 * @class Exporter
 */
var Exporter = /*#__PURE__*/function () {
  /**
   * Creates an instance of Exporter.
   * @param {EventEmitter} emitter
   */
  function Exporter(emitter) {
    _classCallCheck(this, Exporter);

    this._events = emitter;
    this.options = {
      hexaToRgba: true,
      hexLowerCase: true // elementAsScope: true, // possibly TODO

    };
    this.syntaxRules = syntax;
    this.init();
  }
  /**
   * Attach listeners
   *
   */


  _createClass(Exporter, [{
    key: "init",
    value: function init() {
      var _this = this;

      this.schema = (0, _schema.createSchema)();

      this._events.on(E.EXPORTER_CREATE_OUTPUT, function (selectedPalette, fileformat, colorFormat) {
        _this.collectData(selectedPalette, colorFormat);

        _this.displayOutput(fileformat, colorFormat);
      });

      this._events.on(E.CHANGE_OPTIONS, // exclude indent options
      function (_ref) {
        var name = _ref.name,
            value = _ref.value;
        return name !== "useTabs" && name != "numSpaces" && _this.setOptions(name, value);
      });
    }
    /**
     * Update exporting options
     *
     * @param {*} prop
     * @param {*} value
     */

  }, {
    key: "setOptions",
    value: function setOptions(prop, value) {
      this.options[prop] = value;
      this.displayOutput(this.fileformat, this.colorFormat);
    }
    /**
     * Collect data from palette elements to schema object.
     * Sets collectedData property
     *
     * @param {Array.<HTMLElement>} paletteItems
     */

  }, {
    key: "collectData",
    value: function collectData(paletteItems) {
      var data = Object.seal(Object.assign({}, this.schema)); //deep copy

      var _iterator = _createForOfIteratorHelper(paletteItems),
          _step;

      try {
        var _loop = function _loop() {
          var item = _step.value;
          var _item$dataset = item.dataset,
              element = _item$dataset.element,
              family = _item$dataset.family,
              member = _item$dataset.member,
              shift = _item$dataset.shift;
          data[element][family][member + (shift ? "-".concat(shift) : "")] = ["hexa", "rgba", "hsla"].reduce(function (obj, key) {
            return _objectSpread(_objectSpread({}, obj), {}, _defineProperty({}, key, item.dataset["color".concat((0, _helpers.capitalize)(key))]));
          }, {});
        };

        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          _loop();
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      var cleanData = objectUtils.removeBlankProps(data);
      this.collectedData = JSON.parse(JSON.stringify(cleanData));
    }
    /**
     * Emit show output event
     *
     * @param {*} fileformat
     * @param {*} colorFormat
     */

  }, {
    key: "displayOutput",
    value: function displayOutput(fileformat, colorFormat) {
      this._events.emit(E.MODAL_SHOW_OUTPUT, fileformat, this.getOutput(fileformat, colorFormat));
    }
    /**
     * Create output data
     *
     * @param {string} fileformat
     * @param {string} colorFormat
     * @returns {function}
     */

  }, {
    key: "getOutput",
    value: function getOutput(fileformat, colorFormat) {
      this.fileformat = fileformat;
      this.colorFormat = colorFormat;
      var data = JSON.parse(JSON.stringify(this.collectedData)); // deep copy!

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

  }, {
    key: "asStylesheet",
    value: function asStylesheet(rawdata, colorFormat, lang) {
      var data = this.applyOptions(rawdata, this.options, colorFormat);
      var _this$syntaxRules$lan = this.syntaxRules[lang],
          variablePrefix = _this$syntaxRules$lan.variablePrefix,
          lineEnding = _this$syntaxRules$lan.lineEnding,
          assignmentOperator = _this$syntaxRules$lan.assignmentOperator;

      var createVariableName = function createVariableName(start, newKey) {
        return start ? "".concat(start, "-").concat(newKey) : variablePrefix + newKey;
      };

      var createDeclarations = function createDeclarations() {
        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var head = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
        var indent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
        return Object.entries(data).reduce(function (resultArr, _ref2) {
          var _ref3 = _slicedToArray(_ref2, 2),
              key = _ref3[0],
              value = _ref3[1];

          var variableName = createVariableName(head, key);
          return objectUtils.isObject(value) && !Object.keys(value).includes(colorFormat) ? resultArr.concat(createDeclarations(value, variableName, indent)) : resultArr.concat("".concat(indent).concat(variableName).concat(assignmentOperator).concat(value[colorFormat]).concat(lineEnding, "\n"));
        }, []).join("");
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

  }, {
    key: "asJSON",
    value: function asJSON(rawdata, colorFormat) {
      var data = this.applyOptions(rawdata, this.options, colorFormat); // Filter out color formats

      var result = objectUtils.modifyNestedProperties(data, function (k, v) {
        return Object.keys(v).includes(colorFormat);
      }, function (k, v) {
        return [k, v[colorFormat]];
      });
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

  }, {
    key: "applyOptions",
    value: function applyOptions(rawdata, options, colorFormat) {
      var data = rawdata;

      if (colorFormat === "hexa") {
        // Convert all 8-digit hexa codes to rgba
        if (options.hexaToRgba) {
          data = objectUtils.modifyNestedProperties(data, function (k, v) {
            return objectUtils.isObject(v) && Object.keys(v).includes("hexa") && (v.hexa.length === 5 || v.hexa.length === 9);
          }, function (k, v) {
            v.hexa = v.rgba;
            return [k, v];
          });
        } // Transform hex values to lowercase


        if (options.hexLowerCase) {
          data = objectUtils.modifyNestedProperties(data, function (k) {
            return k === "hexa";
          }, function (k, v) {
            return [k, v.toLowerCase()];
          });
        }
      } // Apply color format, goes after all options


      data = objectUtils.cloneWithoutKeys(data, C.COLORFORMATS.filter(function (f) {
        return f !== colorFormat;
      }));
      return data;
    }
  }]);

  return Exporter;
}();

var _default = Exporter;
exports.default = _default;
},{"../utils/helpers":"js/utils/helpers.js","../utils/objectHelpers":"js/utils/objectHelpers.js","../utils/schema":"js/utils/schema.js","../constants/eventTypes.json":"js/constants/eventTypes.json","../constants/syntax.json":"js/constants/syntax.json","../constants/common.json":"js/constants/common.json"}],"../node_modules/file-saver/dist/FileSaver.min.js":[function(require,module,exports) {
var define;
var global = arguments[3];
(function(a,b){if("function"==typeof define&&define.amd)define([],b);else if("undefined"!=typeof exports)b();else{b(),a.FileSaver={exports:{}}.exports}})(this,function(){"use strict";function b(a,b){return"undefined"==typeof b?b={autoBom:!1}:"object"!=typeof b&&(console.warn("Deprecated: Expected third argument to be a object"),b={autoBom:!b}),b.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a.type)?new Blob(["\uFEFF",a],{type:a.type}):a}function c(b,c,d){var e=new XMLHttpRequest;e.open("GET",b),e.responseType="blob",e.onload=function(){a(e.response,c,d)},e.onerror=function(){console.error("could not download file")},e.send()}function d(a){var b=new XMLHttpRequest;b.open("HEAD",a,!1);try{b.send()}catch(a){}return 200<=b.status&&299>=b.status}function e(a){try{a.dispatchEvent(new MouseEvent("click"))}catch(c){var b=document.createEvent("MouseEvents");b.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),a.dispatchEvent(b)}}var f="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof global&&global.global===global?global:void 0,a=f.saveAs||("object"!=typeof window||window!==f?function(){}:"download"in HTMLAnchorElement.prototype?function(b,g,h){var i=f.URL||f.webkitURL,j=document.createElement("a");g=g||b.name||"download",j.download=g,j.rel="noopener","string"==typeof b?(j.href=b,j.origin===location.origin?e(j):d(j.href)?c(b,g,h):e(j,j.target="_blank")):(j.href=i.createObjectURL(b),setTimeout(function(){i.revokeObjectURL(j.href)},4E4),setTimeout(function(){e(j)},0))}:"msSaveOrOpenBlob"in navigator?function(f,g,h){if(g=g||f.name||"download","string"!=typeof f)navigator.msSaveOrOpenBlob(b(f,h),g);else if(d(f))c(f,g,h);else{var i=document.createElement("a");i.href=f,i.target="_blank",setTimeout(function(){e(i)})}}:function(a,b,d,e){if(e=e||open("","_blank"),e&&(e.document.title=e.document.body.innerText="downloading..."),"string"==typeof a)return c(a,b,d);var g="application/octet-stream"===a.type,h=/constructor/i.test(f.HTMLElement)||f.safari,i=/CriOS\/[\d]+/.test(navigator.userAgent);if((i||g&&h)&&"object"==typeof FileReader){var j=new FileReader;j.onloadend=function(){var a=j.result;a=i?a:a.replace(/^data:[^;]*;/,"data:attachment/file;"),e?e.location.href=a:location=a,e=null},j.readAsDataURL(a)}else{var k=f.URL||f.webkitURL,l=k.createObjectURL(a);e?e.location=l:location.href=l,e=null,setTimeout(function(){k.revokeObjectURL(l)},4E4)}});f.saveAs=a.saveAs=a,"undefined"!=typeof module&&(module.exports=a)});

//# sourceMappingURL=FileSaver.min.js.map
},{}],"js/components/Modal.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _prismCore = _interopRequireDefault(require("prismjs/components/prism-core"));

require("prismjs/components/prism-css");

require("prismjs/components/prism-css-extras");

require("prismjs/components/prism-scss");

require("prismjs/components/prism-sass");

require("prismjs/components/prism-less");

require("prismjs/components/prism-stylus");

require("prismjs/components/prism-json");

require("prismjs/components/prism-jsonp");

require("prismjs/components/prism-json5");

require("prismjs/plugins/show-invisibles/prism-show-invisibles.css");

require("prismjs/plugins/show-invisibles/prism-show-invisibles");

require("prismjs/plugins/normalize-whitespace/prism-normalize-whitespace");

require("prismjs/themes/prism.css");

var _fileSaver = require("file-saver");

var _helpers = require("../utils/helpers");

var CN = _interopRequireWildcard(require("../constants/classNames.json"));

var E = _interopRequireWildcard(require("../constants/eventTypes.json"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Modal component
 * Displays code output or error message
 *
 * @class Modal
 */
var Modal = /*#__PURE__*/function () {
  /**
   * Creates an instance of Modal.
   * @param {HTMLElement} el
   * @param {EventEmitter} emitter
   */
  function Modal(el, emitter) {
    _classCallCheck(this, Modal);

    this.el = el;
    this.codeEl = el.querySelector("." + CN.MODAL_CODE);
    this.headerEl = el.querySelector(".".concat(CN.MODAL_HEADER));
    this.errorHeaderEl = el.querySelector(".".concat(CN.MODAL_MESSAGE, " .").concat(CN.MODAL_MESSAGE_HEADING));
    this.errorTextEl = el.querySelector(".".concat(CN.MODAL_MESSAGE, " .").concat(CN.MODAL_MESSAGE_TEXT));
    this.filenameInput = el.querySelector(".".concat(CN.MODAL_FILENAME_INPUT));
    this._events = emitter;
    this.indent = {
      useTabs: false,
      numSpaces: 2
    };
    this.init();
  }
  /**
   * Attach listeners
   *
   */


  _createClass(Modal, [{
    key: "init",
    value: function init() {
      var _this = this;

      this._events.on(E.MODAL_SHOW_OUTPUT, function (fileformat, data) {
        _this.fileformat = fileformat;
        _this.data = data;
        _this.filename = "colors.".concat(_this.fileformat.toLowerCase());

        _this.setContent(_this.data);

        _this.show();
      });

      this._events.on(E.MODAL_SHOW_ERROR, function (error) {
        _this.showError(error);
      });

      this._events.on(E.COPY_OUTPUT, function (_ref) {
        var target = _ref.target;
        return _this.copyOutput(target);
      });

      this._events.on(E.SAVE_OUTPUT, function () {
        return _this.saveOutput(_this.codeEl);
      });

      this._events.on(E.CHANGE_FILENAME, function (_ref2) {
        var value = _ref2.value;
        return _this.setFilename(value);
      });

      this._events.on(E.CHANGE_OPTIONS, function (_ref3) {
        var name = _ref3.name,
            value = _ref3.value;
        if (name === "useTabs" || name === "numSpaces") _this.indent[name] = value;

        _this.setContent(_this.data);
      });

      this._events.on(E.MODAL_HIDE, function () {
        return _this.hide();
      });
    }
    /**
     * Show modal and precent scroll on body
     *
     */

  }, {
    key: "show",
    value: function show() {
      this.el.classList.add(CN.MODAL_SHOW);
      document.body.classList.add(CN.NO_SCROLL);
    }
    /**
     * Hide modal and allow scroll
     *
     */

  }, {
    key: "hide",
    value: function hide() {
      this.el.classList.remove(CN.MODAL_SHOW, CN.MODAL_ERROR);
      document.body.classList.remove(CN.NO_SCROLL);
    }
    /**
     * Display modal with error message
     *
     * @param {UserFriendlyError} error
     */

  }, {
    key: "showError",
    value: function showError(error) {
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

  }, {
    key: "setContent",
    value: function setContent(data) {
      this.toggleLoader();
      this.displayFilename(this.filename);
      var code = document.createElement("code"); // according prism.js docs it's recommended to wrap <code> with <pre> tag

      code.classList.add("language-".concat(this.fileformat == "styl" ? "stylus" : this.fileformat));
      code.style.tabSize = "inherit"; // needed for setTabSize method. to override Prism css

      code.innerHTML = data;
      this.setTabSize(this.indent.numSpaces);

      _prismCore.default.plugins.NormalizeWhitespace.setDefaults(this.getWhitespaceConfig());

      _prismCore.default.highlightElement(code);

      this.clearContent();
      this.codeEl.appendChild(code);
      this.toggleLoader();
    }
    /**
     * Show/hide loader while code is being processed
     *
     */

  }, {
    key: "toggleLoader",
    value: function toggleLoader() {
      this.codeEl.classList.toggle(CN.MODAL_CODE_LOADING);
    }
    /**
     * Create Prism config from component's indent options
     *
     * @returns {object} config to pass into Prism.js instance
     */

  }, {
    key: "getWhitespaceConfig",
    value: function getWhitespaceConfig() {
      var result = {
        "remove-trailing": true,
        "spaces-to-tabs": 2
      };
      this.indent.useTabs ? Object.assign(result, {
        "tabs-to-spaces": null
      }) && this.setTabSize(this.indent.numSpaces) : Object.assign(result, {
        "tabs-to-spaces": this.indent.numSpaces
      });
      return result;
    }
    /**
     * Set tab size in CSS
     *
     * @param {Number} size
     */

  }, {
    key: "setTabSize",
    value: function setTabSize(size) {
      this.codeEl.style.tabSize = size;
    }
    /**
     * Copy target node content to clipboard
     *
     * @param {HTMLElement} target
     */

  }, {
    key: "copyOutput",
    value: function copyOutput(target) {
      var textToCopy = document.querySelector(".".concat(target));
      (0, _helpers.selectText)(textToCopy);
      document.execCommand("copy");
    }
    /**
     * Save target node content to a file
     *
     * @param {HTMLElement} target
     */

  }, {
    key: "saveOutput",
    value: function saveOutput(target) {
      var fileformat = this.fileformat.toLowerCase();
      var filename = this.filename;
      var textToSave = target.textContent;
      var file = new File([textToSave], filename, {
        type: "".concat(this.resolveMimeType(fileformat), ";charset=utf-8")
      });
      (0, _fileSaver.saveAs)(file);
    }
  }, {
    key: "resolveMimeType",
    value: function resolveMimeType(fileformat) {
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

  }, {
    key: "clearContent",
    value: function clearContent() {
      var code = this.codeEl.querySelector("code");
      code ? this.codeEl.removeChild(code) : null;
      this.errorHeaderEl.innerHTML = "";
      this.errorTextEl.innerHTML = "";
    }
    /**
     * Set filename which will be used for export
     *
     * @param {string} filename
     */

  }, {
    key: "setFilename",
    value: function setFilename(filename) {
      this.filename = "".concat(filename);
    }
    /**
     * Update filename in input element
     *
     * @param {string} filename
     */

  }, {
    key: "displayFilename",
    value: function displayFilename(filename) {
      this.filenameInput.value = filename;
    }
  }]);

  return Modal;
}();

var _default = Modal;
exports.default = _default;
},{"prismjs/components/prism-core":"../node_modules/prismjs/components/prism-core.js","prismjs/components/prism-css":"../node_modules/prismjs/components/prism-css.js","prismjs/components/prism-css-extras":"../node_modules/prismjs/components/prism-css-extras.js","prismjs/components/prism-scss":"../node_modules/prismjs/components/prism-scss.js","prismjs/components/prism-sass":"../node_modules/prismjs/components/prism-sass.js","prismjs/components/prism-less":"../node_modules/prismjs/components/prism-less.js","prismjs/components/prism-stylus":"../node_modules/prismjs/components/prism-stylus.js","prismjs/components/prism-json":"../node_modules/prismjs/components/prism-json.js","prismjs/components/prism-jsonp":"../node_modules/prismjs/components/prism-jsonp.js","prismjs/components/prism-json5":"../node_modules/prismjs/components/prism-json5.js","prismjs/plugins/show-invisibles/prism-show-invisibles.css":"../node_modules/prismjs/plugins/show-invisibles/prism-show-invisibles.css","prismjs/plugins/show-invisibles/prism-show-invisibles":"../node_modules/prismjs/plugins/show-invisibles/prism-show-invisibles.js","prismjs/plugins/normalize-whitespace/prism-normalize-whitespace":"../node_modules/prismjs/plugins/normalize-whitespace/prism-normalize-whitespace.js","prismjs/themes/prism.css":"../node_modules/prismjs/themes/prism.css","file-saver":"../node_modules/file-saver/dist/FileSaver.min.js","../utils/helpers":"js/utils/helpers.js","../constants/classNames.json":"js/constants/classNames.json","../constants/eventTypes.json":"js/constants/eventTypes.json"}],"../node_modules/@simonwep/pickr/dist/pickr.min.js":[function(require,module,exports) {
var define;
/*! Pickr 1.7.1 MIT | https://github.com/Simonwep/pickr */
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.Pickr=e():t.Pickr=e()}(window,(function(){return function(t){var e={};function o(n){if(e[n])return e[n].exports;var r=e[n]={i:n,l:!1,exports:{}};return t[n].call(r.exports,r,r.exports,o),r.l=!0,r.exports}return o.m=t,o.c=e,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)o.d(n,r,function(e){return t[e]}.bind(null,r));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="",o(o.s=1)}([function(t){t.exports=JSON.parse('{"a":"1.7.1"}')},function(t,e,o){"use strict";o.r(e);var n={};function r(t,e){var o=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),o.push.apply(o,n)}return o}function i(t){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{};e%2?r(Object(o),!0).forEach((function(e){s(t,e,o[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):r(Object(o)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))}))}return t}function s(t,e,o){return e in t?Object.defineProperty(t,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[e]=o,t}function c(t,e,o,n,r={}){e instanceof HTMLCollection||e instanceof NodeList?e=Array.from(e):Array.isArray(e)||(e=[e]),Array.isArray(o)||(o=[o]);for(const s of e)for(const e of o)s[t](e,n,i({capture:!1},r));return Array.prototype.slice.call(arguments,1)}o.r(n),o.d(n,"on",(function(){return a})),o.d(n,"off",(function(){return l})),o.d(n,"createElementFromString",(function(){return p})),o.d(n,"createFromTemplate",(function(){return u})),o.d(n,"eventPath",(function(){return h})),o.d(n,"resolveElement",(function(){return d})),o.d(n,"adjustableInputNumbers",(function(){return f}));const a=c.bind(null,"addEventListener"),l=c.bind(null,"removeEventListener");function p(t){const e=document.createElement("div");return e.innerHTML=t.trim(),e.firstElementChild}function u(t){const e=(t,e)=>{const o=t.getAttribute(e);return t.removeAttribute(e),o},o=(t,n={})=>{const r=e(t,":obj"),i=e(t,":ref"),s=r?n[r]={}:n;i&&(n[i]=t);for(const n of Array.from(t.children)){const t=e(n,":arr"),r=o(n,t?{}:s);t&&(s[t]||(s[t]=[])).push(Object.keys(r).length?r:n)}return n};return o(p(t))}function h(t){let e=t.path||t.composedPath&&t.composedPath();if(e)return e;let o=t.target.parentElement;for(e=[t.target,o];o=o.parentElement;)e.push(o);return e.push(document,window),e}function d(t){return t instanceof Element?t:"string"==typeof t?t.split(/>>/g).reduce((t,e,o,n)=>(t=t.querySelector(e),o<n.length-1?t.shadowRoot:t),document):null}function f(t,e=(t=>t)){function o(o){const n=[.001,.01,.1][Number(o.shiftKey||2*o.ctrlKey)]*(o.deltaY<0?1:-1);let r=0,i=t.selectionStart;t.value=t.value.replace(/[\d.]+/g,(t,o)=>o<=i&&o+t.length>=i?(i=o,e(Number(t),n,r)):(r++,t)),t.focus(),t.setSelectionRange(i,i),o.preventDefault(),t.dispatchEvent(new Event("input"))}a(t,"focus",()=>a(window,"wheel",o,{passive:!1})),a(t,"blur",()=>l(window,"wheel",o))}var b=o(0);const{min:v,max:m,floor:y,round:g}=Math;function _(t,e,o){e/=100,o/=100;const n=y(t=t/360*6),r=t-n,i=o*(1-e),s=o*(1-r*e),c=o*(1-(1-r)*e),a=n%6;return[255*[o,s,i,i,c,o][a],255*[c,o,o,s,i,i][a],255*[i,i,c,o,o,s][a]]}function w(t,e,o){const n=(2-(e/=100))*(o/=100)/2;return 0!==n&&(e=1===n?0:n<.5?e*o/(2*n):e*o/(2-2*n)),[t,100*e,100*n]}function O(t,e,o){const n=v(t/=255,e/=255,o/=255),r=m(t,e,o),i=r-n;let s,c;if(0===i)s=c=0;else{c=i/r;const n=((r-t)/6+i/2)/i,a=((r-e)/6+i/2)/i,l=((r-o)/6+i/2)/i;t===r?s=l-a:e===r?s=1/3+n-l:o===r&&(s=2/3+a-n),s<0?s+=1:s>1&&(s-=1)}return[360*s,100*c,100*r]}function A(t,e,o,n){return e/=100,o/=100,[...O(255*(1-v(1,(t/=100)*(1-(n/=100))+n)),255*(1-v(1,e*(1-n)+n)),255*(1-v(1,o*(1-n)+n)))]}function k(t,e,o){e/=100;const n=2*(e*=(o/=100)<.5?o:1-o)/(o+e)*100,r=100*(o+e);return[t,isNaN(n)?0:n,r]}function C(t){return O(...t.match(/.{2}/g).map(t=>parseInt(t,16)))}function j(t){t=t.match(/^[a-zA-Z]+$/)?function(t){if("black"===t.toLowerCase())return"#000";const e=document.createElement("canvas").getContext("2d");return e.fillStyle=t,"#000"===e.fillStyle?null:e.fillStyle}(t):t;const e={cmyk:/^cmyk[\D]+([\d.]+)[\D]+([\d.]+)[\D]+([\d.]+)[\D]+([\d.]+)/i,rgba:/^((rgba)|rgb)[\D]+([\d.]+)[\D]+([\d.]+)[\D]+([\d.]+)[\D]*?([\d.]+|$)/i,hsla:/^((hsla)|hsl)[\D]+([\d.]+)[\D]+([\d.]+)[\D]+([\d.]+)[\D]*?([\d.]+|$)/i,hsva:/^((hsva)|hsv)[\D]+([\d.]+)[\D]+([\d.]+)[\D]+([\d.]+)[\D]*?([\d.]+|$)/i,hexa:/^#?(([\dA-Fa-f]{3,4})|([\dA-Fa-f]{6})|([\dA-Fa-f]{8}))$/i},o=t=>t.map(t=>/^(|\d+)\.\d+|\d+$/.test(t)?Number(t):void 0);let n;t:for(const r in e){if(!(n=e[r].exec(t)))continue;const i=t=>!!n[2]==("number"==typeof t);switch(r){case"cmyk":{const[,t,e,i,s]=o(n);if(t>100||e>100||i>100||s>100)break t;return{values:A(t,e,i,s),type:r}}case"rgba":{const[,,,t,e,s,c]=o(n);if(t>255||e>255||s>255||c<0||c>1||!i(c))break t;return{values:[...O(t,e,s),c],a:c,type:r}}case"hexa":{let[,t]=n;4!==t.length&&3!==t.length||(t=t.split("").map(t=>t+t).join(""));const e=t.substring(0,6);let o=t.substring(6);return o=o?parseInt(o,16)/255:void 0,{values:[...C(e),o],a:o,type:r}}case"hsla":{const[,,,t,e,s,c]=o(n);if(t>360||e>100||s>100||c<0||c>1||!i(c))break t;return{values:[...k(t,e,s),c],a:c,type:r}}case"hsva":{const[,,,t,e,s,c]=o(n);if(t>360||e>100||s>100||c<0||c>1||!i(c))break t;return{values:[t,e,s,c],a:c,type:r}}}}return{values:null,type:null}}function S(t=0,e=0,o=0,n=1){const r=(t,e)=>(o=-1)=>e(~o?t.map(t=>Number(t.toFixed(o))):t),i={h:t,s:e,v:o,a:n,toHSVA(){const t=[i.h,i.s,i.v,i.a];return t.toString=r(t,t=>"hsva(".concat(t[0],", ").concat(t[1],"%, ").concat(t[2],"%, ").concat(i.a,")")),t},toHSLA(){const t=[...w(i.h,i.s,i.v),i.a];return t.toString=r(t,t=>"hsla(".concat(t[0],", ").concat(t[1],"%, ").concat(t[2],"%, ").concat(i.a,")")),t},toRGBA(){const t=[..._(i.h,i.s,i.v),i.a];return t.toString=r(t,t=>"rgba(".concat(t[0],", ").concat(t[1],", ").concat(t[2],", ").concat(i.a,")")),t},toCMYK(){const t=function(t,e,o){const n=_(t,e,o),r=n[0]/255,i=n[1]/255,s=n[2]/255,c=v(1-r,1-i,1-s);return[100*(1===c?0:(1-r-c)/(1-c)),100*(1===c?0:(1-i-c)/(1-c)),100*(1===c?0:(1-s-c)/(1-c)),100*c]}(i.h,i.s,i.v);return t.toString=r(t,t=>"cmyk(".concat(t[0],"%, ").concat(t[1],"%, ").concat(t[2],"%, ").concat(t[3],"%)")),t},toHEXA(){const t=function(t,e,o){return _(t,e,o).map(t=>g(t).toString(16).padStart(2,"0"))}(i.h,i.s,i.v),e=i.a>=1?"":Number((255*i.a).toFixed(0)).toString(16).toUpperCase().padStart(2,"0");return e&&t.push(e),t.toString=()=>"#".concat(t.join("").toUpperCase()),t},clone:()=>S(i.h,i.s,i.v,i.a)};return i}const P=t=>Math.max(Math.min(t,1),0);function E(t){const e={options:Object.assign({lock:null,onchange:()=>0,onstop:()=>0},t),_keyboard(t){const{options:o}=e,{type:n,key:r}=t;if(document.activeElement===o.wrapper){const{lock:o}=e.options,i="ArrowUp"===r,s="ArrowRight"===r,c="ArrowDown"===r,a="ArrowLeft"===r;if("keydown"===n&&(i||s||c||a)){let n=0,r=0;"v"===o?n=i||s?1:-1:"h"===o?n=i||s?-1:1:(r=i?-1:c?1:0,n=a?-1:s?1:0),e.update(P(e.cache.x+.01*n),P(e.cache.y+.01*r)),t.preventDefault()}else r.startsWith("Arrow")&&(e.options.onstop(),t.preventDefault())}},_tapstart(t){a(document,["mouseup","touchend","touchcancel"],e._tapstop),a(document,["mousemove","touchmove"],e._tapmove),t.cancelable&&t.preventDefault(),e._tapmove(t)},_tapmove(t){const{options:o,cache:n}=e,{lock:r,element:i,wrapper:s}=o,c=s.getBoundingClientRect();let a=0,l=0;if(t){const e=t&&t.touches&&t.touches[0];a=t?(e||t).clientX:0,l=t?(e||t).clientY:0,a<c.left?a=c.left:a>c.left+c.width&&(a=c.left+c.width),l<c.top?l=c.top:l>c.top+c.height&&(l=c.top+c.height),a-=c.left,l-=c.top}else n&&(a=n.x*c.width,l=n.y*c.height);"h"!==r&&(i.style.left="calc(".concat(a/c.width*100,"% - ").concat(i.offsetWidth/2,"px)")),"v"!==r&&(i.style.top="calc(".concat(l/c.height*100,"% - ").concat(i.offsetHeight/2,"px)")),e.cache={x:a/c.width,y:l/c.height};const p=P(a/c.width),u=P(l/c.height);switch(r){case"v":return o.onchange(p);case"h":return o.onchange(u);default:return o.onchange(p,u)}},_tapstop(){e.options.onstop(),l(document,["mouseup","touchend","touchcancel"],e._tapstop),l(document,["mousemove","touchmove"],e._tapmove)},trigger(){e._tapmove()},update(t=0,o=0){const{left:n,top:r,width:i,height:s}=e.options.wrapper.getBoundingClientRect();"h"===e.options.lock&&(o=t),e._tapmove({clientX:n+i*t,clientY:r+s*o})},destroy(){const{options:t,_tapstart:o,_keyboard:n}=e;l(document,["keydown","keyup"],n),l([t.wrapper,t.element],"mousedown",o),l([t.wrapper,t.element],"touchstart",o,{passive:!1})}},{options:o,_tapstart:n,_keyboard:r}=e;return a([o.wrapper,o.element],"mousedown",n),a([o.wrapper,o.element],"touchstart",n,{passive:!1}),a(document,["keydown","keyup"],r),e}function D(t={}){t=Object.assign({onchange:()=>0,className:"",elements:[]},t);const e=a(t.elements,"click",e=>{t.elements.forEach(o=>o.classList[e.target===o?"add":"remove"](t.className)),t.onchange(e)});return{destroy:()=>l(...e)}}function x(t,e){var o=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),o.push.apply(o,n)}return o}function L(t){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{};e%2?x(Object(o),!0).forEach((function(e){B(t,e,o[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):x(Object(o)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))}))}return t}function B(t,e,o){return e in t?Object.defineProperty(t,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[e]=o,t}
/*! NanoPop 1.3.0 MIT | https://github.com/Simonwep/nanopop */let F=(()=>{class t{constructor(e,o,{positionFlipOrder:n=t.defaultPositionFlipOrder,variantFlipOrder:r=t.defaultVariantFlipOrder,container:i=document.documentElement.getBoundingClientRect(),forceApplyOnFailure:s=!1,margin:c=8,position:a="bottom-start"}={}){this.o={positionFlipOrder:n,variantFlipOrder:r,reference:e,popper:o,position:a,container:i,forceApplyOnFailure:s,margin:c}}update(t=this.o,e=!1){const{container:o,reference:n,popper:r,margin:i,position:s,forceApplyOnFailure:c,variantFlipOrder:a,positionFlipOrder:l}=this.o=L(L({},this.o),t);r.style.left="0",r.style.top="0";const p=n.getBoundingClientRect(),u=r.getBoundingClientRect(),h={t:p.top-u.height-i,b:p.bottom+i,r:p.right+i,l:p.left-u.width-i},d={vm:-u.width/2+(p.left+p.width/2),vs:p.left,ve:p.left+p.width-u.width,hs:p.bottom-p.height,he:p.bottom-u.height,hm:p.bottom-p.height/2-u.height/2},[f,b="middle"]=s.split("-"),v=l[f],m=a[b],{top:y,left:g,bottom:_,right:w}=o;for(const t of v){const o="t"===t||"b"===t,n=h[t],[i,s]=o?["top","left"]:["left","top"],[c,a]=o?[u.height,u.width]:[u.width,u.height],[l,p]=o?[_,w]:[w,_],[f,b]=o?[y,g]:[g,y];if(e||!(n<f||n+c>l))for(const c of m){const l=d[(o?"v":"h")+c];if(e||!(l<b||l+a>p))return r.style[s]=l-u[s]+"px",r.style[i]=n-u[i]+"px",t+c}}return c?this.update(void 0,!0):null}}return t.version="1.3.0",t.defaultVariantFlipOrder={start:"sme",middle:"mse",end:"ems"},t.defaultPositionFlipOrder={top:"tbrl",right:"rltb",bottom:"btrl",left:"lrbt"},t})();function R(t,e){var o=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),o.push.apply(o,n)}return o}function H(t,e,o){return e in t?Object.defineProperty(t,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[e]=o,t}class N{constructor(t){H(this,"_initializingActive",!0),H(this,"_recalc",!0),H(this,"_nanopop",null),H(this,"_root",null),H(this,"_color",S()),H(this,"_lastColor",S()),H(this,"_swatchColors",[]),H(this,"_eventListener",{init:[],save:[],hide:[],show:[],clear:[],change:[],changestop:[],cancel:[],swatchselect:[]}),this.options=t=Object.assign(function(t){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{};e%2?R(Object(o),!0).forEach((function(e){H(t,e,o[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):R(Object(o)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))}))}return t}({},N.DEFAULT_OPTIONS),t);const{swatches:e,components:o,theme:n,sliders:r,lockOpacity:i,padding:s}=t;["nano","monolith"].includes(n)&&!r&&(t.sliders="h"),o.interaction||(o.interaction={});const{preview:c,opacity:a,hue:l,palette:p}=o;o.opacity=!i&&a,o.palette=p||c||a||l,this._preBuild(),this._buildComponents(),this._bindEvents(),this._finalBuild(),e&&e.length&&e.forEach(t=>this.addSwatch(t));const{button:u,app:h}=this._root;this._nanopop=new F(u,h,{margin:s}),u.setAttribute("role","button"),u.setAttribute("aria-label",this._t("btn:toggle"));const d=this;requestAnimationFrame((function e(){if(!h.offsetWidth&&h.parentElement!==t.container)return requestAnimationFrame(e);d.setColor(t.default),d._rePositioningPicker(),t.defaultRepresentation&&(d._representation=t.defaultRepresentation,d.setColorRepresentation(d._representation)),t.showAlways&&d.show(),d._initializingActive=!1,d._emit("init")}))}_preBuild(){const{options:t}=this;for(const e of["el","container"])t[e]=d(t[e]);this._root=(t=>{const{components:e,useAsButton:o,inline:n,appClass:r,theme:i,lockOpacity:s}=t.options,c=t=>t?"":'style="display:none" hidden',a=e=>t._t(e),l=u('\n      <div :ref="root" class="pickr">\n\n        '.concat(o?"":'<button type="button" :ref="button" class="pcr-button"></button>','\n\n        <div :ref="app" class="pcr-app ').concat(r||"",'" data-theme="').concat(i,'" ').concat(n?'style="position: unset"':"",' aria-label="').concat(a("ui:dialog"),'" role="window">\n          <div class="pcr-selection" ').concat(c(e.palette),'>\n            <div :obj="preview" class="pcr-color-preview" ').concat(c(e.preview),'>\n              <button type="button" :ref="lastColor" class="pcr-last-color" aria-label="').concat(a("btn:last-color"),'"></button>\n              <div :ref="currentColor" class="pcr-current-color"></div>\n            </div>\n\n            <div :obj="palette" class="pcr-color-palette">\n              <div :ref="picker" class="pcr-picker"></div>\n              <div :ref="palette" class="pcr-palette" tabindex="0" aria-label="').concat(a("aria:palette"),'" role="listbox"></div>\n            </div>\n\n            <div :obj="hue" class="pcr-color-chooser" ').concat(c(e.hue),'>\n              <div :ref="picker" class="pcr-picker"></div>\n              <div :ref="slider" class="pcr-hue pcr-slider" tabindex="0" aria-label="').concat(a("aria:hue"),'" role="slider"></div>\n            </div>\n\n            <div :obj="opacity" class="pcr-color-opacity" ').concat(c(e.opacity),'>\n              <div :ref="picker" class="pcr-picker"></div>\n              <div :ref="slider" class="pcr-opacity pcr-slider" tabindex="0" aria-label="').concat(a("aria:opacity"),'" role="slider"></div>\n            </div>\n          </div>\n\n          <div class="pcr-swatches ').concat(e.palette?"":"pcr-last",'" :ref="swatches"></div>\n\n          <div :obj="interaction" class="pcr-interaction" ').concat(c(Object.keys(e.interaction).length),'>\n            <input :ref="result" class="pcr-result" type="text" spellcheck="false" ').concat(c(e.interaction.input),' aria-label="').concat(a("aria:input"),'">\n\n            <input :arr="options" class="pcr-type" data-type="HEXA" value="').concat(s?"HEX":"HEXA",'" type="button" ').concat(c(e.interaction.hex),'>\n            <input :arr="options" class="pcr-type" data-type="RGBA" value="').concat(s?"RGB":"RGBA",'" type="button" ').concat(c(e.interaction.rgba),'>\n            <input :arr="options" class="pcr-type" data-type="HSLA" value="').concat(s?"HSL":"HSLA",'" type="button" ').concat(c(e.interaction.hsla),'>\n            <input :arr="options" class="pcr-type" data-type="HSVA" value="').concat(s?"HSV":"HSVA",'" type="button" ').concat(c(e.interaction.hsva),'>\n            <input :arr="options" class="pcr-type" data-type="CMYK" value="CMYK" type="button" ').concat(c(e.interaction.cmyk),'>\n\n            <input :ref="save" class="pcr-save" value="').concat(a("btn:save"),'" type="button" ').concat(c(e.interaction.save),' aria-label="').concat(a("aria:btn:save"),'">\n            <input :ref="cancel" class="pcr-cancel" value="').concat(a("btn:cancel"),'" type="button" ').concat(c(e.interaction.cancel),' aria-label="').concat(a("aria:btn:cancel"),'">\n            <input :ref="clear" class="pcr-clear" value="').concat(a("btn:clear"),'" type="button" ').concat(c(e.interaction.clear),' aria-label="').concat(a("aria:btn:clear"),'">\n          </div>\n        </div>\n      </div>\n    ')),p=l.interaction;return p.options.find(t=>!t.hidden&&!t.classList.add("active")),p.type=()=>p.options.find(t=>t.classList.contains("active")),l})(this),t.useAsButton&&(this._root.button=t.el),t.container.appendChild(this._root.root)}_finalBuild(){const t=this.options,e=this._root;if(t.container.removeChild(e.root),t.inline){const o=t.el.parentElement;t.el.nextSibling?o.insertBefore(e.app,t.el.nextSibling):o.appendChild(e.app)}else t.container.appendChild(e.app);t.useAsButton?t.inline&&t.el.remove():t.el.parentNode.replaceChild(e.root,t.el),t.disabled&&this.disable(),t.comparison||(e.button.style.transition="none",t.useAsButton||(e.preview.lastColor.style.transition="none")),this.hide()}_buildComponents(){const t=this,e=this.options.components,o=(t.options.sliders||"v").repeat(2),[n,r]=o.match(/^[vh]+$/g)?o:[],i=()=>this._color||(this._color=this._lastColor.clone()),s={palette:E({element:t._root.palette.picker,wrapper:t._root.palette.palette,onstop:()=>t._emit("changestop",t),onchange(o,n){if(!e.palette)return;const r=i(),{_root:s,options:c}=t,{lastColor:a,currentColor:l}=s.preview;t._recalc&&(r.s=100*o,r.v=100-100*n,r.v<0&&(r.v=0),t._updateOutput());const p=r.toRGBA().toString(0);this.element.style.background=p,this.wrapper.style.background="\n                        linear-gradient(to top, rgba(0, 0, 0, ".concat(r.a,"), transparent),\n                        linear-gradient(to left, hsla(").concat(r.h,", 100%, 50%, ").concat(r.a,"), rgba(255, 255, 255, ").concat(r.a,"))\n                    "),c.comparison?c.useAsButton||t._lastColor||(a.style.color=p):(s.button.style.color=p,s.button.classList.remove("clear"));const u=r.toHEXA().toString();for(const{el:e,color:o}of t._swatchColors)e.classList[u===o.toHEXA().toString()?"add":"remove"]("pcr-active");l.style.color=p}}),hue:E({lock:"v"===r?"h":"v",element:t._root.hue.picker,wrapper:t._root.hue.slider,onstop:()=>t._emit("changestop",t),onchange(o){if(!e.hue||!e.palette)return;const n=i();t._recalc&&(n.h=360*o),this.element.style.backgroundColor="hsl(".concat(n.h,", 100%, 50%)"),s.palette.trigger()}}),opacity:E({lock:"v"===n?"h":"v",element:t._root.opacity.picker,wrapper:t._root.opacity.slider,onstop:()=>t._emit("changestop",t),onchange(o){if(!e.opacity||!e.palette)return;const n=i();t._recalc&&(n.a=Math.round(100*o)/100),this.element.style.background="rgba(0, 0, 0, ".concat(n.a,")"),s.palette.trigger()}}),selectable:D({elements:t._root.interaction.options,className:"active",onchange(e){t._representation=e.target.getAttribute("data-type").toUpperCase(),t._recalc&&t._updateOutput()}})};this._components=s}_bindEvents(){const{_root:t,options:e}=this,o=[a(t.interaction.clear,"click",()=>this._clearColor()),a([t.interaction.cancel,t.preview.lastColor],"click",()=>{this._emit("cancel",this),this.setHSVA(...(this._lastColor||this._color).toHSVA(),!0)}),a(t.interaction.save,"click",()=>{!this.applyColor()&&!e.showAlways&&this.hide()}),a(t.interaction.result,["keyup","input"],t=>{this.setColor(t.target.value,!0)&&!this._initializingActive&&this._emit("change",this._color),t.stopImmediatePropagation()}),a(t.interaction.result,["focus","blur"],t=>{this._recalc="blur"===t.type,this._recalc&&this._updateOutput()}),a([t.palette.palette,t.palette.picker,t.hue.slider,t.hue.picker,t.opacity.slider,t.opacity.picker],["mousedown","touchstart"],()=>this._recalc=!0,{passive:!0})];if(!e.showAlways){const n=e.closeWithKey;o.push(a(t.button,"click",()=>this.isOpen()?this.hide():this.show()),a(document,"keyup",t=>this.isOpen()&&(t.key===n||t.code===n)&&this.hide()),a(document,["touchstart","mousedown"],e=>{this.isOpen()&&!h(e).some(e=>e===t.app||e===t.button)&&this.hide()},{capture:!0}))}if(e.adjustableNumbers){const e={rgba:[255,255,255,1],hsva:[360,100,100,1],hsla:[360,100,100,1],cmyk:[100,100,100,100]};f(t.interaction.result,(t,o,n)=>{const r=e[this.getColorRepresentation().toLowerCase()];if(r){const e=r[n],i=t+(e>=100?1e3*o:o);return i<=0?0:Number((i<e?i:e).toPrecision(3))}return t})}if(e.autoReposition&&!e.inline){let t=null;const n=this;o.push(a(window,["scroll","resize"],()=>{n.isOpen()&&(e.closeOnScroll&&n.hide(),null===t?(t=setTimeout(()=>t=null,100),requestAnimationFrame((function e(){n._rePositioningPicker(),null!==t&&requestAnimationFrame(e)}))):(clearTimeout(t),t=setTimeout(()=>t=null,100)))},{capture:!0}))}this._eventBindings=o}_rePositioningPicker(){const{options:t}=this;if(!t.inline){if(!this._nanopop.update({position:t.position,forceApplyOnFailure:!this._recalc})){const t=this._root.app,e=t.getBoundingClientRect();t.style.top="".concat((window.innerHeight-e.height)/2,"px"),t.style.left="".concat((window.innerWidth-e.width)/2,"px")}}}_updateOutput(){const{_root:t,_color:e,options:o}=this;if(t.interaction.type()){const n="to".concat(t.interaction.type().getAttribute("data-type"));t.interaction.result.value="function"==typeof e[n]?e[n]().toString(o.outputPrecision):""}!this._initializingActive&&this._recalc&&this._emit("change",e)}_clearColor(t=!1){const{_root:e,options:o}=this;o.useAsButton||(e.button.style.color="rgba(0, 0, 0, 0.15)"),e.button.classList.add("clear"),o.showAlways||this.hide(),this._lastColor=null,this._initializingActive||t||(this._emit("save",null),this._emit("clear",this))}_parseLocalColor(t){const{values:e,type:o,a:n}=j(t),{lockOpacity:r}=this.options,i=void 0!==n&&1!==n;return e&&3===e.length&&(e[3]=void 0),{values:!e||r&&i?null:e,type:o}}_t(t){return this.options.i18n[t]||N.I18N_DEFAULTS[t]}_emit(t,...e){this._eventListener[t].forEach(t=>t(...e,this))}on(t,e){return this._eventListener[t].push(e),this}off(t,e){const o=this._eventListener[t]||[],n=o.indexOf(e);return~n&&o.splice(n,1),this}addSwatch(t){const{values:e}=this._parseLocalColor(t);if(e){const{_swatchColors:t,_root:o}=this,n=S(...e),r=p('<button type="button" style="color: '.concat(n.toRGBA().toString(0),'" aria-label="').concat(this._t("btn:swatch"),'"/>'));return o.swatches.appendChild(r),t.push({el:r,color:n}),this._eventBindings.push(a(r,"click",()=>{this.setHSVA(...n.toHSVA(),!0),this._emit("swatchselect",n),this._emit("change",n)})),!0}return!1}removeSwatch(t){const e=this._swatchColors[t];if(e){const{el:o}=e;return this._root.swatches.removeChild(o),this._swatchColors.splice(t,1),!0}return!1}applyColor(t=!1){const{preview:e,button:o}=this._root,n=this._color.toRGBA().toString(0);return e.lastColor.style.color=n,this.options.useAsButton||(o.style.color=n),o.classList.remove("clear"),this._lastColor=this._color.clone(),this._initializingActive||t||this._emit("save",this._color),this}destroy(){this._eventBindings.forEach(t=>l(...t)),Object.keys(this._components).forEach(t=>this._components[t].destroy())}destroyAndRemove(){this.destroy();const{root:t,app:e}=this._root;t.parentElement&&t.parentElement.removeChild(t),e.parentElement.removeChild(e),Object.keys(this).forEach(t=>this[t]=null)}hide(){return this._root.app.classList.remove("visible"),this._emit("hide",this),this}show(){return this.options.disabled||(this._root.app.classList.add("visible"),this._rePositioningPicker(),this._emit("show",this)),this}isOpen(){return this._root.app.classList.contains("visible")}setHSVA(t=360,e=0,o=0,n=1,r=!1){const i=this._recalc;if(this._recalc=!1,t<0||t>360||e<0||e>100||o<0||o>100||n<0||n>1)return!1;this._color=S(t,e,o,n);const{hue:s,opacity:c,palette:a}=this._components;return s.update(t/360),c.update(n),a.update(e/100,1-o/100),r||this.applyColor(),i&&this._updateOutput(),this._recalc=i,!0}setColor(t,e=!1){if(null===t)return this._clearColor(e),!0;const{values:o,type:n}=this._parseLocalColor(t);if(o){const t=n.toUpperCase(),{options:r}=this._root.interaction,i=r.find(e=>e.getAttribute("data-type")===t);if(i&&!i.hidden)for(const t of r)t.classList[t===i?"add":"remove"]("active");return!!this.setHSVA(...o,e)&&this.setColorRepresentation(t)}return!1}setColorRepresentation(t){return t=t.toUpperCase(),!!this._root.interaction.options.find(e=>e.getAttribute("data-type").startsWith(t)&&!e.click())}getColorRepresentation(){return this._representation}getColor(){return this._color}getSelectedColor(){return this._lastColor}getRoot(){return this._root}disable(){return this.hide(),this.options.disabled=!0,this._root.button.classList.add("disabled"),this}enable(){return this.options.disabled=!1,this._root.button.classList.remove("disabled"),this}}H(N,"utils",n),H(N,"version",b.a),H(N,"I18N_DEFAULTS",{"ui:dialog":"color picker dialog","btn:toggle":"toggle color picker dialog","btn:swatch":"color swatch","btn:last-color":"use previous color","btn:save":"Save","btn:cancel":"Cancel","btn:clear":"Clear","aria:btn:save":"save and close","aria:btn:cancel":"cancel and close","aria:btn:clear":"clear and close","aria:input":"color input field","aria:palette":"color selection area","aria:hue":"hue selection slider","aria:opacity":"selection slider"}),H(N,"DEFAULT_OPTIONS",{appClass:null,theme:"classic",useAsButton:!1,padding:8,disabled:!1,comparison:!0,closeOnScroll:!1,outputPrecision:0,lockOpacity:!1,autoReposition:!0,container:"body",components:{interaction:{}},i18n:{},swatches:null,inline:!1,sliders:null,default:"#42445a",defaultRepresentation:null,position:"bottom-middle",adjustableNumbers:!0,showAlways:!1,closeWithKey:"Escape"}),H(N,"create",t=>new N(t));e.default=N}]).default}));
//# sourceMappingURL=pickr.min.js.map
},{}],"js/components/ColorPicker.js":[function(require,module,exports) {
"use strict";

var _pickr = _interopRequireDefault(require("@simonwep/pickr"));

var _helpers = require("../utils/helpers");

var E = _interopRequireWildcard(require("../constants/eventTypes.json"));

var CN = _interopRequireWildcard(require("../constants/classNames.json"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var config = {
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
      save: true
    }
  }
};
/**
 * Wrapping component on top of Pickr instance
 *
 * @class ColorPicker
 */

var ColorPicker = /*#__PURE__*/function () {
  /**
   * Creates an instance of ColorPicker.
   * @param {HTMLElement} el
   * @param {EventEmitter} emitter
   */
  function ColorPicker(el, emitter) {
    _classCallCheck(this, ColorPicker);

    this.el = el;
    this._events = emitter;
    this.colorFormat = "HEXA";
    this.init();
  }
  /**
   * Attach listeners
   *
   */


  _createClass(ColorPicker, [{
    key: "init",
    value: function init() {
      var _this = this;

      // Create fresh instance
      this.pickr = this.createPickrInstance();
      this.setupPickrListeners();

      this._events.on(E.SET_COLOR, function (colorString) {
        return _this.setColor(colorString);
      });

      this._events.on(E.SET_ACTIVE_PALETTE_ITEM, function (_ref) {
        var trigger = _ref.trigger;
        return _this.show(trigger);
      });

      this._events.on(E.RESET_ACTIVE_PALETTE_ITEM, function () {
        return _this.hide();
      });

      this._events.on(E.SET_COLOR_FORMAT, function (_ref2) {
        var data = _ref2.data;
        return _this.changeColorFormat(data);
      });
    }
    /**
     * Create Pickr instance
     *
     */

  }, {
    key: "createPickrInstance",
    value: function createPickrInstance() {
      var pickrContainer = this.el.querySelector(".".concat(CN.COLORPICKER_CONTAINER));
      return new _pickr.default(Object.assign({
        el: this.el.querySelector(".".concat(CN.COLORPICKER_HIDDEN)),
        container: pickrContainer
      }, config));
    }
    /**
     * Setup Pickr-specific listeners
     *
     */

  }, {
    key: "setupPickrListeners",
    value: function setupPickrListeners() {
      var _this2 = this;

      this.pickr.on("change", function (color) {
        if (color) {
          _this2._events.emit(E.SET_COLOR_IN_PALETTE, _this2.getColorValues(color));
        }
      });
      this.pickr.on("save", function (color) {
        // Save new color even if the user didn't change the preset value
        if (color) {
          _this2._events.emit(E.SET_COLOR_IN_PALETTE, _this2.getColorValues(color));
        }

        _this2.hide();
      });
      this.pickr.on("clear", function () {
        _this2._events.emit(E.RESET_COLOR);
      });
    }
    /**
     * Pickr.show() wrapper
     *
     */

  }, {
    key: "show",
    value: function show(item) {
      if (item.dataset.colorHexa) {
        this.setColor(item.dataset["color".concat((0, _helpers.capitalize)(this.colorFormat))]);
      }

      this.pickr.show();
    }
    /**
     * Pickr.hide() wrapper
     *
     */

  }, {
    key: "hide",
    value: function hide() {
      this.pickr.hide();
    }
    /**
     * Set color in color picker
     *
     * @param {string} colorString
     */

  }, {
    key: "setColor",
    value: function setColor(colorString) {
      this.pickr.setColor(colorString, true);
    }
    /**
     * Update color format in color picker
     *
     * @param {string} format
     */

  }, {
    key: "changeColorFormat",
    value: function changeColorFormat(format) {
      this.pickr.setColorRepresentation(format.toUpperCase());
    }
    /**
     * Transform HSVaColorObject provided by Pickr into a custom JS object
     *
     * @param {HSVaColorObject} color
     * @returns {object}
     */

  }, {
    key: "getColorValues",
    value: function getColorValues(color) {
      // round alpha value - missing feature in Pickr
      var alphaRounded = Math.round(color.a * 100) / 100;
      color.a = alphaRounded;
      var res = {
        hexa: color.toHEXA().toString(2),
        rgba: color.toRGBA().toString(2),
        hsla: color.toHSLA().toString(2)
      };
      return res;
    }
  }]);

  return ColorPicker;
}();

module.exports = ColorPicker;
},{"@simonwep/pickr":"../node_modules/@simonwep/pickr/dist/pickr.min.js","../utils/helpers":"js/utils/helpers.js","../constants/eventTypes.json":"js/constants/eventTypes.json","../constants/classNames.json":"js/constants/classNames.json"}],"../node_modules/invert-color/lib/invert.min.js":[function(require,module,exports) {
var define;
/*! @license https://github.com/onury/invert-color */
!function(r,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof define&&define.amd?define(n):r.invert=n()}(this,function(){"use strict";var t=Math.sqrt(1.05*.05)-.05,n=/^(?:[0-9a-f]{3}){1,2}$/i,i={black:"#000000",white:"#ffffff",threshold:t};function o(r){if("#"===r.slice(0,1)&&(r=r.slice(1)),!n.test(r))throw new Error('Invalid HEX color: "'+r+'"');return 3===r.length&&(r=r[0]+r[0]+r[1]+r[1]+r[2]+r[2]),[parseInt(r.slice(0,2),16),parseInt(r.slice(2,4),16),parseInt(r.slice(4,6),16)]}function f(r){if(!r)throw new Error("Invalid color value");return Array.isArray(r)?r:"string"==typeof r?o(r):[r.r,r.g,r.b]}function u(r,n,t){var e=!0===n?i:Object.assign({},i,n);return function(r){var n,t,e=[];for(n=0;n<r.length;n++)t=r[n]/255,e[n]=t<=.03928?t/12.92:Math.pow((t+.055)/1.055,2.4);return.2126*e[0]+.7152*e[1]+.0722*e[2]}(r)>e.threshold?t?o(e.black):e.black:t?o(e.white):e.white}function r(r,n){return void 0===n&&(n=!1),r=f(r),n?u(r,n):"#"+r.map(function(r){return n=(255-r).toString(16),void 0===t&&(t=2),(new Array(t).join("0")+n).slice(-t);var n,t}).join("")}return function(r){function n(r,n){r=f(r);var t,e=n?u(r,n,!0):r.map(function(r){return 255-r});return{r:(t=e)[0],g:t[1],b:t[2]}}r.asRGB=n,r.asRgbArray=function(r,n){return r=f(r),n?u(r,n,!0):r.map(function(r){return 255-r})},r.defaultThreshold=t,r.asRgbObject=n}(r||(r={})),r});
},{}],"js/components/Palette.js":[function(require,module,exports) {
"use strict";

var _invertColor = _interopRequireDefault(require("invert-color"));

var _UserFriendlyError = _interopRequireDefault(require("../lib/UserFriendlyError"));

var _errorDict = require("../constants/errorDict");

var CN = _interopRequireWildcard(require("../constants/classNames.json"));

var E = _interopRequireWildcard(require("../constants/eventTypes.json"));

var C = _interopRequireWildcard(require("../constants/common.json"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Palette component
 * Stores and displays all color data
 *
 * @class Palette
 */
var Palette = /*#__PURE__*/function () {
  /**
   * Creates an instance of Palette.
   * @param {HTMLElement} el
   * @param {EventEmitter} emitter
   */
  function Palette(el, emitter) {
    _classCallCheck(this, Palette);

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


  _createClass(Palette, [{
    key: "init",
    value: function init() {
      var _this = this;

      this._events.on(E.SET_ACTIVE_PALETTE_ITEM, function (_ref) {
        var trigger = _ref.trigger;

        _this.setActiveItem(trigger);
      });

      this._events.on(E.SET_COLOR_IN_PALETTE, function (colorObj) {
        _this.setColor(colorObj, _this.activeItem);
      });

      this._events.on(E.RESET_COLOR, function () {
        return _this.resetColor(_this.activeItem);
      });

      this._events.on(E.SET_COLOR_FORMAT, function (_ref2) {
        var data = _ref2.data;
        return _this.setColorFormat(data);
      });

      this._events.on(E.SETUP_PALETTE, function (data) {
        return _this.setupPalette(data);
      });

      this._events.on(E.RESET_PALETTE, function () {
        return _this.resetPalette();
      });

      this._events.on(E.PALETTE_EXPORT, function (_ref3) {
        var data = _ref3.data;
        return _this.sendToExport(data);
      });
    }
    /**
     * Create palette from imported data
     *
     * @param {object} data
     */

  }, {
    key: "setupPalette",
    value: function setupPalette(data) {
      var _this2 = this;

      var currentItem = this.activeItem; // Save currently active item

      Object.entries(data).forEach(function (_ref4) {
        var _ref5 = _slicedToArray(_ref4, 2),
            element = _ref5[0],
            elementVal = _ref5[1];

        return Object.entries(elementVal).forEach(function (_ref6) {
          var _ref7 = _slicedToArray(_ref6, 2),
              family = _ref7[0],
              familyVal = _ref7[1];

          return Object.entries(familyVal).forEach(function (_ref8) {
            var _ref9 = _slicedToArray(_ref8, 2),
                memberShift = _ref9[0],
                color = _ref9[1];

            var member = memberShift.split(C.VARIABLE_NAME_SEPARATOR)[0];
            var shift = memberShift.split(C.VARIABLE_NAME_SEPARATOR)[1];

            var item = _this2.el.querySelector("[data-element='".concat(element, "'][data-family='").concat(family, "'][data-member='").concat(member, "']").concat(shift ? "[data-shift='" + shift + "']" : ""));

            _this2.activeItem = item;

            _this2._events.emit(E.SET_COLOR, color);
          });
        });
      });
      this.activeItem = currentItem; //set back currently active item
    }
    /**
     * Prepare palette data for export
     *
     * @param {string} fileformat
     * @returns {Event}
     */

  }, {
    key: "sendToExport",
    value: function sendToExport(fileformat) {
      this.fileformat = fileformat;
      var selectedPalette = this.getPaletteItems();
      return selectedPalette.length < 1 ? this._events.emit(E.MODAL_SHOW_ERROR, new _UserFriendlyError.default(_errorDict.errorDict.EMPTY_PALETTE)) : this._events.emit(E.EXPORTER_CREATE_OUTPUT, selectedPalette, fileformat, this.colorFormat);
    }
    /**
     * Clear palette
     *
     */

  }, {
    key: "resetPalette",
    value: function resetPalette() {
      var _this3 = this;

      var selectedPalette = this.getPaletteItems();

      _toConsumableArray(selectedPalette).forEach(function (item) {
        return _this3.resetColor(item);
      });
    }
    /**
     * Change color format (HEXA/RGBA/HSLA)
     *
     * @param {string} format
     */

  }, {
    key: "setColorFormat",
    value: function setColorFormat(format) {
      this.colorFormat = format;
      this.el.dataset.format = format;
    }
    /**
     * Collect non-empty palette items to array
     *
     * @returns {array}
     */

  }, {
    key: "getPaletteItems",
    value: function getPaletteItems() {
      return _toConsumableArray(this.paletteItems).filter(function (item) {
        return item.dataset.colorHexa;
      });
    }
    /**
     * Set color value of given cell
     *
     * @param {string} color
     * @param {HTMLElement} item
     */

  }, {
    key: "setColor",
    value: function setColor(color, item) {
      var colorToInvert = color.hexa.length !== 7 ? color.hexa.substring(0, 7) : color.hexa;
      var invertedColor;

      try {
        invertedColor = (0, _invertColor.default)(colorToInvert, true);
      } catch (_unused) {
        invertedColor = "#000";
      }

      if (item) {
        item.style.backgroundColor = color[this.colorFormat];
        item.style.color = invertedColor;
        item.dataset.colorHexa = color.hexa;
        item.dataset.colorRgba = color.rgba;
        item.dataset.colorHsla = color.hsla;
      }
    }
    /**
     * Reset color value
     *
     * @param {HTMLElement} item
     */

  }, {
    key: "resetColor",
    value: function resetColor(item) {
      if (item) {
        item.style.backgroundColor = "";
        item.style.color = "";
        item.dataset.colorHexa = "";
        item.dataset.colorRgba = "";
        item.dataset.colorHsla = "";
      }
    }
    /**
     * Set item as active
     *
     * @param {HTMLElement} item
     */

  }, {
    key: "setActiveItem",
    value: function setActiveItem(item) {
      this.activeItem && this.activeItem.classList.remove(CN.PALETTE_ITEM_ACTIVE);
      item.classList.add(CN.PALETTE_ITEM_ACTIVE);
      this.activeItem = item;
    }
  }]);

  return Palette;
}();

module.exports = Palette;
},{"invert-color":"../node_modules/invert-color/lib/invert.min.js","../lib/UserFriendlyError":"js/lib/UserFriendlyError.js","../constants/errorDict":"js/constants/errorDict.js","../constants/classNames.json":"js/constants/classNames.json","../constants/eventTypes.json":"js/constants/eventTypes.json","../constants/common.json":"js/constants/common.json"}],"js/components/Input.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var E = _interopRequireWildcard(require("../constants/eventTypes.json"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Input component
 *
 * @class Input
 */
var Input = /*#__PURE__*/function () {
  /**
   * Creates an instance of Input.
   * @param {HTMLElement} el
   * @param {EventEmitter} emitter
   */
  function Input(el, emitter) {
    _classCallCheck(this, Input);

    this.el = el;
    this._events = emitter;
    this.init();
  }
  /**
   * Attach listeners
   *
   */


  _createClass(Input, [{
    key: "init",
    value: function init() {
      var _this = this;

      this._events.on(E.TOGGLE_DISABLED, function (_ref) {
        var target = _ref.target;
        return _this.toggleDisabled(target);
      });
    }
    /**
     * Toggle "disabled" attribute
     *
     * @param {HTMLElement} target
     */

  }, {
    key: "toggleDisabled",
    value: function toggleDisabled(target) {
      if (this.el.matches(target)) this.el.disabled = !this.el.disabled;
    }
  }]);

  return Input;
}();

var _default = Input;
exports.default = _default;
},{"../constants/eventTypes.json":"js/constants/eventTypes.json"}],"js/components/Collapsible.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var CN = _interopRequireWildcard(require("../constants/classNames.json"));

var E = _interopRequireWildcard(require("../constants/eventTypes.json"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Collapsible Panel Component
 *
 * @class Collapsible
 */
var Collapsible = /*#__PURE__*/function () {
  /**
   * Creates an instance of Collapsible.
   * @param {HTMLElement} el
   * @param {EventEmitter} emitter
   */
  function Collapsible(el, emitter) {
    _classCallCheck(this, Collapsible);

    this.el = el;
    this._events = emitter;
    this.init();
  }
  /**
   * Attach listeners
   *
   */


  _createClass(Collapsible, [{
    key: "init",
    value: function init() {
      var _this = this;

      this._events.on(E.TOGGLE_COLLAPSIBLE, function (targetId) {
        return _this.toggleCollapsible(targetId);
      });
    }
    /**
     * Show/hide target panel
     *
     * @param {string} targetId
     */

  }, {
    key: "toggleCollapsible",
    value: function toggleCollapsible(targetId) {
      if (this.el.id === targetId) return;
      this.el.classList.toggle(CN.COLLAPSIBLE_SHOW);
    }
  }]);

  return Collapsible;
}();

var _default = Collapsible;
exports.default = _default;
},{"../constants/classNames.json":"js/constants/classNames.json","../constants/eventTypes.json":"js/constants/eventTypes.json"}],"js/index.js":[function(require,module,exports) {
"use strict";

require("../scss/main.scss");

require("../scss/vendors/prism.css");

var CN = _interopRequireWildcard(require("./constants/classNames.json"));

var _prismCore = _interopRequireDefault(require("prismjs/components/prism-core"));

require("prismjs/components/prism-css");

require("prismjs/components/prism-css-extras");

require("prismjs/components/prism-scss");

require("prismjs/components/prism-sass");

require("prismjs/components/prism-less");

require("prismjs/components/prism-stylus");

require("prismjs/components/prism-json");

require("prismjs/components/prism-jsonp");

require("prismjs/components/prism-json5");

require("prismjs/plugins/show-invisibles/prism-show-invisibles.css");

require("prismjs/plugins/show-invisibles/prism-show-invisibles");

require("prismjs/plugins/normalize-whitespace/prism-normalize-whitespace");

require("prismjs/themes/prism.css");

var _PrismExtend = _interopRequireDefault(require("./lib/PrismExtend"));

var _EventEmitter = _interopRequireDefault(require("./lib/EventEmitter"));

var _ActionCreator = _interopRequireDefault(require("./lib/ActionCreator"));

var _Importer = _interopRequireDefault(require("./lib/Importer"));

var _Exporter = _interopRequireDefault(require("./lib/Exporter"));

var _Modal = _interopRequireDefault(require("./components/Modal"));

var _ColorPicker = _interopRequireDefault(require("./components/ColorPicker"));

var _Palette = _interopRequireDefault(require("./components/Palette"));

var _Input = _interopRequireDefault(require("./components/Input"));

var _Collapsible = _interopRequireDefault(require("./components/Collapsible"));

var _componentSelectors;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

(0, _PrismExtend.default)(_prismCore.default);
var componentSelectors = (_componentSelectors = {}, _defineProperty(_componentSelectors, CN.MODAL, _Modal.default), _defineProperty(_componentSelectors, CN.INPUT, _Input.default), _defineProperty(_componentSelectors, CN.COLLAPSIBLE, _Collapsible.default), _defineProperty(_componentSelectors, CN.PALETTE, _Palette.default), _defineProperty(_componentSelectors, CN.COLORPICKER, _ColorPicker.default), _componentSelectors);
document.addEventListener("DOMContentLoaded", function () {
  var eventEmitter = new _EventEmitter.default();
  var actionCreator = new _ActionCreator.default(document.querySelector("body"), eventEmitter);
  /** Generate components */

  var components = Object.keys(componentSelectors).map(function (sel) {
    var elements = document.getElementsByClassName(sel);
    return _toConsumableArray(elements).map(function (el) {
      return new componentSelectors[sel](el, eventEmitter);
    });
  });
  /** Activate import and export functionality */

  var importer = new _Importer.default(eventEmitter, _prismCore.default);
  var exporter = new _Exporter.default(eventEmitter);
});
},{"../scss/main.scss":"scss/main.scss","../scss/vendors/prism.css":"scss/vendors/prism.css","./constants/classNames.json":"js/constants/classNames.json","prismjs/components/prism-core":"../node_modules/prismjs/components/prism-core.js","prismjs/components/prism-css":"../node_modules/prismjs/components/prism-css.js","prismjs/components/prism-css-extras":"../node_modules/prismjs/components/prism-css-extras.js","prismjs/components/prism-scss":"../node_modules/prismjs/components/prism-scss.js","prismjs/components/prism-sass":"../node_modules/prismjs/components/prism-sass.js","prismjs/components/prism-less":"../node_modules/prismjs/components/prism-less.js","prismjs/components/prism-stylus":"../node_modules/prismjs/components/prism-stylus.js","prismjs/components/prism-json":"../node_modules/prismjs/components/prism-json.js","prismjs/components/prism-jsonp":"../node_modules/prismjs/components/prism-jsonp.js","prismjs/components/prism-json5":"../node_modules/prismjs/components/prism-json5.js","prismjs/plugins/show-invisibles/prism-show-invisibles.css":"../node_modules/prismjs/plugins/show-invisibles/prism-show-invisibles.css","prismjs/plugins/show-invisibles/prism-show-invisibles":"../node_modules/prismjs/plugins/show-invisibles/prism-show-invisibles.js","prismjs/plugins/normalize-whitespace/prism-normalize-whitespace":"../node_modules/prismjs/plugins/normalize-whitespace/prism-normalize-whitespace.js","prismjs/themes/prism.css":"../node_modules/prismjs/themes/prism.css","./lib/PrismExtend":"js/lib/PrismExtend.js","./lib/EventEmitter":"js/lib/EventEmitter.js","./lib/ActionCreator":"js/lib/ActionCreator.js","./lib/Importer":"js/lib/Importer.js","./lib/Exporter":"js/lib/Exporter.js","./components/Modal":"js/components/Modal.js","./components/ColorPicker":"js/components/ColorPicker.js","./components/Palette":"js/components/Palette.js","./components/Input":"js/components/Input.js","./components/Collapsible":"js/components/Collapsible.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61188" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/index.js"], null)