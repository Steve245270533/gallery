import mitt from "mitt";

export default class Emitter {
	private emitter_instance: ReturnType<typeof mitt>;

	constructor() {
		this.emitter_instance = mitt();
	}

	$on(name: string, handler: (...args: any[]) => void) {
		this.emitter_instance.on(name, handler);
	}

	$emit(name: string, ...args: any[]) {
		this.emitter_instance.emit(name, args);
	}

	$off(name: string, handler?: (...args: any[]) => void) {
		this.emitter_instance.off(name, handler);
	}
}
