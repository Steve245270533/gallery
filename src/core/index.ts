import {ACESFilmicToneMapping, Clock, Color, PerspectiveCamera, Scene, SRGBColorSpace, WebGLRenderer} from "three";
import World from "../world";
import Emitter from "../utils/Emitter";
import Loader from "../loader";
import ControlManage from "../controlManage";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import UI from "../ui";

let instance: Core | null = null;

export default class Core extends Emitter {
	scene!: Scene;
	renderer!: WebGLRenderer;
	camera!: PerspectiveCamera;
	clock!: Clock;
	orbit_controls!: OrbitControls;

	ui!: UI;
	control_manage!: ControlManage;
	loader!: Loader;
	world!: World;

	constructor() {
		super();

		// Singleton
		if (instance) {
			return instance;
		}
		// eslint-disable-next-line @typescript-eslint/no-this-alias
		instance = this;

		this.scene = new Scene();
		this.renderer = new WebGLRenderer({antialias: true});
		this.camera = new PerspectiveCamera();
		this.clock = new Clock();
		this.orbit_controls = new OrbitControls(this.camera, this.renderer.domElement);

		this._initScene();
		this._initCamera();
		this._initRenderer();
		this._initResponsiveResize();

		this.ui = new UI();
		this.control_manage = new ControlManage();
		this.loader = new Loader();
		this.world = new World();
	}

	render() {
		this.renderer.setAnimationLoop(() => {
			this.renderer.render(this.scene, this.camera);
			const delta_time = Math.min(0.05, this.clock.getDelta());
			this.world.update(delta_time);
			this.orbit_controls.update();
		});
	}

	private _initScene() {
		this.scene.background = new Color(0x000000);
	}

	private _initCamera() {
		this.camera.fov = 55;
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.near = 0.1;
		this.camera.far = 1000;
		this.camera.position.set(0, 0, 3);
		this.camera.updateProjectionMatrix();
	}

	private _initRenderer() {
		this.renderer.shadowMap.enabled = true;
		this.renderer.outputColorSpace = SRGBColorSpace;
		this.renderer.toneMapping = ACESFilmicToneMapping;
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.renderer.domElement.style.position = "absolute";
		this.renderer.domElement.style.zIndex = "1";
		this.renderer.domElement.style.top = "0px";
		document.querySelector("#app")?.appendChild(this.renderer.domElement);
	}

	private _initResponsiveResize() {
		window.addEventListener("resize", () => {
			this.camera.aspect = window.innerWidth / window.innerHeight;
			this.camera.updateProjectionMatrix();
			this.renderer.setSize(window.innerWidth, window.innerHeight);
			this.renderer.setPixelRatio(window.devicePixelRatio);
		});
	}
}
