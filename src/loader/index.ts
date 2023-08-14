import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {AudioLoader, DefaultLoadingManager, TextureLoader} from "three";
import Core from "../core";
import {ON_LOAD_PROGRESS} from "../Constants";

export default class Loader {
	gltf_loader: GLTFLoader;
	texture_loader: TextureLoader;
	audio_loader: AudioLoader;
	private core: Core;

	constructor() {
		this.core = new Core();
		this.gltf_loader = new GLTFLoader();
		this.texture_loader = new TextureLoader();
		this.audio_loader = new AudioLoader();

		DefaultLoadingManager.onProgress = (url, loaded, total) => {
			this.core.$emit(ON_LOAD_PROGRESS, {url, loaded, total});
		};
	}
}
