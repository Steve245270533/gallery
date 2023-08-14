import Core from "../core";
import {ON_KEY_DOWN, ON_KEY_UP} from "../Constants";

type Keys = "KeyW" | "KeyS" | "KeyA" | "KeyD" | "Space";

type KeySets = Keys[]

type KeyStatus = {
	[key in Keys]: boolean;
};

export default class Control {
	private core: Core;
	key_status: KeyStatus = {
		"KeyW": false,
		"KeyS": false,
		"KeyA": false,
		"KeyD": false,
		"Space": false
	};
	is_enabled =  false;
	private key_sets: KeySets = ["KeyW", "KeyS", "KeyA", "KeyD", "Space"];
	private handleKeyDown: OmitThisParameter<(event: KeyboardEvent) => void>;
	private handleKeyUp: OmitThisParameter<(event: KeyboardEvent) => void>;

	constructor() {
		this.core = new Core();
		this.handleKeyDown = this.onKeyDown.bind(this);
		this.handleKeyUp = this.onKeyUp.bind(this);
		this._bindEvent();
	}

	private _bindEvent() {
		document.addEventListener("keydown", this.handleKeyDown);
		document.addEventListener("keyup", this.handleKeyUp);
	}

	onKeyDown(event: KeyboardEvent) {
		if (this.isAllowKey(event.code) && this.is_enabled) {
			this.key_status[event.code] = true;
			this.core.$emit(ON_KEY_DOWN, event.code);
		}
	}

	onKeyUp(event: KeyboardEvent) {
		if (this.isAllowKey(event.code) && this.is_enabled) {
			this.key_status[event.code] = false;
			this.core.$emit(ON_KEY_UP, event.code);
		}
	}

	// 判断是否为允许的键盘key
	isAllowKey(key: string): key is Keys {
		return this.key_sets.includes(key as Keys);
	}

	disabled() {
		this.is_enabled = false;
	}

	enabled() {
		this.is_enabled = true;
	}
}
