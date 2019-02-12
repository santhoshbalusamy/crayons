(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Alert = factory());
}(this, (function () { 'use strict';

	function noop() {}

	function assign(tar, src) {
		for (var k in src) tar[k] = src[k];
		return tar;
	}

	function append(target, node) {
		target.appendChild(node);
	}

	function insert(target, node, anchor) {
		target.insertBefore(node, anchor);
	}

	function detachNode(node) {
		node.parentNode.removeChild(node);
	}

	function createElement(name) {
		return document.createElement(name);
	}

	function createText(data) {
		return document.createTextNode(data);
	}

	function addListener(node, event, handler, options) {
		node.addEventListener(event, handler, options);
	}

	function removeListener(node, event, handler, options) {
		node.removeEventListener(event, handler, options);
	}

	function setAttribute(node, attribute, value) {
		if (value == null) node.removeAttribute(attribute);
		else node.setAttribute(attribute, value);
	}

	function setAttributes(node, attributes) {
		for (var key in attributes) {
			if (key === 'style') {
				node.style.cssText = attributes[key];
			} else if (key in node) {
				node[key] = attributes[key];
			} else {
				setAttribute(node, key, attributes[key]);
			}
		}
	}

	function setData(text, data) {
		text.data = '' + data;
	}

	function getSpreadUpdate(levels, updates) {
		var update = {};

		var to_null_out = {};
		var accounted_for = {};

		var i = levels.length;
		while (i--) {
			var o = levels[i];
			var n = updates[i];

			if (n) {
				for (var key in o) {
					if (!(key in n)) to_null_out[key] = 1;
				}

				for (var key in n) {
					if (!accounted_for[key]) {
						update[key] = n[key];
						accounted_for[key] = 1;
					}
				}

				levels[i] = n;
			} else {
				for (var key in o) {
					accounted_for[key] = 1;
				}
			}
		}

		for (var key in to_null_out) {
			if (!(key in update)) update[key] = undefined;
		}

		return update;
	}

	function blankObject() {
		return Object.create(null);
	}

	function destroy(detach) {
		this.destroy = noop;
		this.fire('destroy');
		this.set = noop;

		this._fragment.d(detach !== false);
		this._fragment = null;
		this._state = {};
	}

	function _differs(a, b) {
		return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
	}

	function fire(eventName, data) {
		var handlers =
			eventName in this._handlers && this._handlers[eventName].slice();
		if (!handlers) return;

		for (var i = 0; i < handlers.length; i += 1) {
			var handler = handlers[i];

			if (!handler.__calling) {
				try {
					handler.__calling = true;
					handler.call(this, data);
				} finally {
					handler.__calling = false;
				}
			}
		}
	}

	function flush(component) {
		component._lock = true;
		callAll(component._beforecreate);
		callAll(component._oncreate);
		callAll(component._aftercreate);
		component._lock = false;
	}

	function get() {
		return this._state;
	}

	function init(component, options) {
		component._handlers = blankObject();
		component._slots = blankObject();
		component._bind = options._bind;
		component._staged = {};

		component.options = options;
		component.root = options.root || component;
		component.store = options.store || component.root.store;

		if (!options.root) {
			component._beforecreate = [];
			component._oncreate = [];
			component._aftercreate = [];
		}
	}

	function on(eventName, handler) {
		var handlers = this._handlers[eventName] || (this._handlers[eventName] = []);
		handlers.push(handler);

		return {
			cancel: function() {
				var index = handlers.indexOf(handler);
				if (~index) handlers.splice(index, 1);
			}
		};
	}

	function set(newState) {
		this._set(assign({}, newState));
		if (this.root._lock) return;
		flush(this.root);
	}

	function _set(newState) {
		var oldState = this._state,
			changed = {},
			dirty = false;

		newState = assign(this._staged, newState);
		this._staged = {};

		for (var key in newState) {
			if (this._differs(newState[key], oldState[key])) changed[key] = dirty = true;
		}
		if (!dirty) return;

		this._state = assign(assign({}, oldState), newState);
		this._recompute(changed, this._state);
		if (this._bind) this._bind(changed, this._state);

		if (this._fragment) {
			this.fire("state", { changed: changed, current: this._state, previous: oldState });
			this._fragment.p(changed, this._state);
			this.fire("update", { changed: changed, current: this._state, previous: oldState });
		}
	}

	function _stage(newState) {
		assign(this._staged, newState);
	}

	function callAll(fns) {
		while (fns && fns.length) fns.shift()();
	}

	function _mount(target, anchor) {
		this._fragment[this._fragment.i ? 'i' : 'm'](target, anchor || null);
	}

	var proto = {
		destroy,
		get,
		fire,
		on,
		set,
		_recompute: noop,
		_set,
		_stage,
		_mount,
		_differs
	};

	/* src/alert.html generated by Svelte v2.15.3 */

	var methods = {
	  close() {
	    this.parentNode.removeChild(this);
	  },
	};

	function create_main_fragment(component, ctx) {
		var div1, text0, slot, text1, div0;

		var if_block = (ctx.title) && create_if_block(component, ctx);

		function click_handler(event) {
			component.close();
		}

		var div1_levels = [
			{ class: "fw-alert" },
			ctx.props
		];

		var div1_data = {};
		for (var i = 0; i < div1_levels.length; i += 1) {
			div1_data = assign(div1_data, div1_levels[i]);
		}

		return {
			c() {
				div1 = createElement("div");
				if (if_block) if_block.c();
				text0 = createText("\n\t");
				slot = createElement("slot");
				text1 = createText("\n  ");
				div0 = createElement("div");
				div0.textContent = "✗";
				this.c = noop;
				addListener(div0, "click", click_handler);
				div0.className = "close";
				setAttributes(div1, div1_data);
			},

			m(target, anchor) {
				insert(target, div1, anchor);
				if (if_block) if_block.m(div1, null);
				append(div1, text0);
				append(div1, slot);
				append(div1, text1);
				append(div1, div0);
			},

			p(changed, ctx) {
				if (ctx.title) {
					if (if_block) {
						if_block.p(changed, ctx);
					} else {
						if_block = create_if_block(component, ctx);
						if_block.c();
						if_block.m(div1, text0);
					}
				} else if (if_block) {
					if_block.d(1);
					if_block = null;
				}

				setAttributes(div1, getSpreadUpdate(div1_levels, [
					{ class: "fw-alert" },
					(changed.props) && ctx.props
				]));
			},

			d(detach) {
				if (detach) {
					detachNode(div1);
				}

				if (if_block) if_block.d();
				removeListener(div0, "click", click_handler);
			}
		};
	}

	// (2:2) {#if title}
	function create_if_block(component, ctx) {
		var div, text;

		return {
			c() {
				div = createElement("div");
				text = createText(ctx.title);
				div.className = "title";
			},

			m(target, anchor) {
				insert(target, div, anchor);
				append(div, text);
			},

			p(changed, ctx) {
				if (changed.title) {
					setData(text, ctx.title);
				}
			},

			d(detach) {
				if (detach) {
					detachNode(div);
				}
			}
		};
	}

	class Alert extends HTMLElement {
		constructor(options = {}) {
			super();
			init(this, options);
			this._state = assign({}, options.data);
			this._intro = true;

			this._slotted = options.slots || {};

			this.attachShadow({ mode: 'open' });
			this.shadowRoot.innerHTML = `<style>.fw-alert{width:350px;border-radius:2px;position:relative;padding:10px 20px;font-size:12px;color:#6F7C87;background-color:#FFFFFF;font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;box-shadow:inset 0 1px 1px 0 rgba(0,0,0,0.5),
		    0 0 1px 0 rgba(0,0,0,0.1),
		    0 1px 3px 0 rgba(0,0,0,0.1),
		    0 24px 19px 2px rgba(0,0,0,0.06)}.title{color:#183247;font-size:14px;font-weight:600;padding-bottom:5px}.close{position:absolute;top:10px;right:15px;font-size:18px;font-weight:600;cursor:pointer}</style>`;

			this._fragment = create_main_fragment(this, this._state);

			this._fragment.c();
			this._fragment.m(this.shadowRoot, null);

			if (options.target) this._mount(options.target, options.anchor);
		}

		static get observedAttributes() {
			return ["type","title"];
		}

		get type() {
			return this.get().type;
		}

		set type(value) {
			this.set({ type: value });
		}

		get title() {
			return this.get().title;
		}

		set title(value) {
			this.set({ title: value });
		}

		connectedCallback() {
			Object.keys(this._slotted).forEach(key => {
				this.appendChild(this._slotted[key]);
			});
		}

		attributeChangedCallback(attr, oldValue, newValue) {
			this.set({ [attr]: newValue });
		}
	}

	assign(Alert.prototype, proto);
	assign(Alert.prototype, methods);
	assign(Alert.prototype, {
		_mount(target, anchor) {
			target.insertBefore(this, anchor);
		}
	});

	customElements.define("fw-alert", Alert);

	return Alert;

})));
