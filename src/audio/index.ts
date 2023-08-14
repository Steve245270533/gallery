import {Mesh, MeshBasicMaterial, PlaneGeometry, PositionalAudio, AudioListener} from "three";
import Core from "../core";
import {PositionalAudioHelper} from "three/examples/jsm/helpers/PositionalAudioHelper";
import {AUDIO_URL} from "../Constants";

export default class Audio {
	private core: Core;
	private audio_mesh: Mesh | undefined;
	private positional_audio: PositionalAudio | undefined;

	constructor() {
		this.core = new Core();
	}

	async createAudio() {
		this.audio_mesh = new Mesh(new PlaneGeometry(1, 1), new MeshBasicMaterial({color: 0xff0000}));
		this.audio_mesh.position.set(-15.9, 4.49, 36.42);
		this.audio_mesh.visible = false;
		this.core.scene.add(this.audio_mesh);

		const listener = new AudioListener();

		this.core.camera.add(listener);
		this.positional_audio = new PositionalAudio(listener);
		this.audio_mesh.add(this.positional_audio);

		const buffer = await this.core.loader.audio_loader.loadAsync(AUDIO_URL);
		this.positional_audio.setBuffer(buffer);
		this.positional_audio.setVolume(0.8);
		this.positional_audio.setRefDistance(2);
		this.positional_audio.setDirectionalCone(180, 230, 0.5);
		this.positional_audio.setLoop(true);

		const helper = new PositionalAudioHelper(this.positional_audio);
		this.positional_audio.add(helper);

		return Promise.resolve();
	}

	playAudio() {
		this.positional_audio?.play();
	}
}
