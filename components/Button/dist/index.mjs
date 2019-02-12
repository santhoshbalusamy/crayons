function noop() {}

function assign(tar, src) {
	for (var k in src) tar[k] = src[k];
	return tar;
}

function exclude(src, prop) {
	const tar = {};
	for (const k in src) k === prop || (tar[k] = src[k]);
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

/* src/button.html generated by Svelte v2.15.3 */

function props(state) {
  Object.keys(state).forEach(key => {
    state[key] = state[key] === "" ? key : state[key];
  });
  return state;
}

function create_main_fragment(component, ctx) {
	var button, slot;

	var button_levels = [
		{ class: "fw-button" },
		ctx.props
	];

	var button_data = {};
	for (var i = 0; i < button_levels.length; i += 1) {
		button_data = assign(button_data, button_levels[i]);
	}

	return {
		c() {
			button = createElement("button");
			slot = createElement("slot");
			this.c = noop;
			setAttributes(button, button_data);
		},

		m(target, anchor) {
			insert(target, button, anchor);
			append(button, slot);
		},

		p(changed, ctx) {
			setAttributes(button, getSpreadUpdate(button_levels, [
				{ class: "fw-button" },
				(changed.props) && ctx.props
			]));
		},

		d(detach) {
			if (detach) {
				detachNode(button);
			}
		}
	};
}

class Button extends HTMLElement {
	constructor(options = {}) {
		super();
		init(this, options);
		this._state = assign({}, options.data);

		this._recompute({  }, this._state);
		this._intro = true;

		this._slotted = options.slots || {};

		this.attachShadow({ mode: 'open' });
		this.shadowRoot.innerHTML = `<style>:host([disabled]){cursor:not-allowed;pointer-events:none}.fw-button{padding:8px 18px;border:1px solid var(--theme-color, #02b875);color:#fff;border-radius:2px;background-color:var(--theme-color, #02b875);font-size:12px;font-weight:600;letter-spacing:0.5px;line-height:14px;text-align:center;text-transform:uppercase;box-shadow:inset 0 -1px 0 0 rgba(0, 0, 0, 0.12),
		      0 0 1px 0 rgba(24, 50, 71, 0.6), 0 1px 0 0 var(--theme-color, #02b875)}.fw-button:hover:not([disabled]){cursor:pointer;background-color:var(--theme-color, #02b875);filter:brightness(90%)}.fw-button:disabled{opacity:0.2;cursor:not-allowed}.fw-button[size="large"]{min-width:220px}.fw-button[size="icon"]{width:30px;height:30px;padding:0}</style>`;

		this._fragment = create_main_fragment(this, this._state);

		this._fragment.c();
		this._fragment.m(this.shadowRoot, null);

		if (options.target) this._mount(options.target, options.anchor);
	}

	static get observedAttributes() {
		return ["disabled","type","name","size"];
	}

	get disabled() {
		return this.get().disabled;
	}

	set disabled(value) {
		this.set({ disabled: value });
	}

	get type() {
		return this.get().type;
	}

	set type(value) {
		this.set({ type: value });
	}

	get name() {
		return this.get().name;
	}

	set name(value) {
		this.set({ name: value });
	}

	get size() {
		return this.get().size;
	}

	set size(value) {
		this.set({ size: value });
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

assign(Button.prototype, proto);
assign(Button.prototype, {
	_mount(target, anchor) {
		target.insertBefore(this, anchor);
	}
});

customElements.define("fw-button", Button);

Button.prototype._recompute = function _recompute(changed, state) {
	if (this._differs(state.props, (state.props = props(exclude(state, "props"))))) changed.props = true;
};

export default Button;
