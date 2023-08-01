import Core from "../core";
import Loader from "../loader";
import {
	BOARD_TEXTURES,
	BOARDS_INFO,
	COLLISION_SCENE_URL,
	ON_LOAD_MODEL_FINISH,
	ON_LOAD_PROGRESS,
	STATIC_SCENE_URL
} from "../Constants";
import {Group, Material, Mesh, MeshBasicMaterial, Object3D, SRGBColorSpace, Texture, PlaneGeometry} from "three";
import {isLight, isMesh} from "../utils/typeAssert";
import {MeshBVH, MeshBVHOptions, StaticGeometryGenerator} from "three-mesh-bvh";
import {Reflector} from "../lib/Reflector";

export default class Environment {
	core: Core;
	loader: Loader;
	collision_scene: Group | undefined;
	collider: Mesh | undefined;
	texture_boards: Record<string, Texture> = {};
	gallery_boards: Record<string, Mesh> = {};
	raycast_objects: Object3D[] = [];
	is_load_finished = false;

	constructor() {
		this.core = new Core();
		this.loader = this.core.loader;
		this._loadScenes();
	}

	private async _loadScenes() {
		try {
			await this._loadSceneAndCollisionDetection();
			await this._loadStaticScene();
			await this._loadBoardsTexture();
			this._configureGallery();
			this._createSpecularReflection();
			this.is_load_finished = true;
			this.core.$emit(ON_LOAD_MODEL_FINISH);
		} catch (e) {
			console.log(e);
		}
	}

	private async _loadBoardsTexture(): Promise<void> {
		for (let i = 0; i < BOARD_TEXTURES.length; i++) {
			this.texture_boards[i + 1] = await this.loader.texture_loader.loadAsync(BOARD_TEXTURES[i]);
		}

		for (const key in this.texture_boards) {
			this.texture_boards[key].colorSpace = SRGBColorSpace;
		}

		return Promise.resolve();
	}

	private _configureGallery() {
		for (const key in this.texture_boards) {
			(this.gallery_boards[`gallery${key}_board`].material as MeshBasicMaterial).map = this.texture_boards[key];
			this.gallery_boards[`gallery${key}_board`].userData = {
				name: this.gallery_boards[`gallery${key}_board`].name,
				title: BOARDS_INFO[key].title,
				author: BOARDS_INFO[key].author,
				describe: BOARDS_INFO[key].describe,
				index: key,
				src: this.texture_boards[key].image.src,
				show_boards: true
			};

			// 翻转贴图
			if ([4, 5, 6, 7, 9].includes(+key)) {
				this.gallery_boards[`gallery${key}_board`].rotation.y = -Math.PI / 2;
			}
			if (8 === +key) {
				this.gallery_boards[`gallery${key}_board`].rotation.y = Math.PI;
			}

			(this.gallery_boards[`gallery${key}_board`].material as MeshBasicMaterial).needsUpdate = true;
		}
	}

	// 产生地面镜面反射
	private _createSpecularReflection() {
		const mirror = new Reflector(new PlaneGeometry(100, 100), {
			textureWidth: window.innerWidth * window.devicePixelRatio,
			textureHeight: window.innerHeight * window.devicePixelRatio,
			color: 0xffffff,
		});
		if (mirror.material instanceof Material) {
			mirror.material.transparent = true;
		}
		mirror.rotation.x = -0.5 * Math.PI;
		this.core.scene.add(mirror);
	}

	// 加载不含碰撞其他的场景
	private _loadStaticScene(): Promise<void> {
		return new Promise(resolve => {
			this.loader.gltf_loader.load(STATIC_SCENE_URL, (gltf) => {
				this.core.scene.add(gltf.scene);
				gltf.scene.traverse(item => {
					if (item.name === "computer") {
						item.userData = {
							name: item.name,
							title: "噢，是远方 🏕",
						};
						this.raycast_objects.push(item);
					}
				});
				resolve();
			}, (event) => {
				this.core.$emit(ON_LOAD_PROGRESS, {url: STATIC_SCENE_URL, loaded: event.loaded, total: event.total});
			});
		});
	}

	// 加载含碰撞检测的场景
	private _loadSceneAndCollisionDetection(): Promise<void> {
		return new Promise(resolve => {
			this.loader.gltf_loader.load(COLLISION_SCENE_URL, (gltf) => {
				this.collision_scene = gltf.scene;

				this.collision_scene.updateMatrixWorld(true);

				this.collision_scene.traverse(item => {
					if (item.name === "home001" || item.name === "PointLight") {
						item.castShadow = true;
					}

					if (item.name.includes("PointLight") && isLight(item)) {
						item.intensity *= 2000;
					}

					if (item.name === "home002") {
						item.castShadow = true;
						item.receiveShadow = true;
					}

					// 提取出相框元素
					if (/gallery.*_board/.test(item.name) && isMesh(item)) {
						this.gallery_boards[item.name] = item;
					}

					this.raycast_objects.push(item);
				});

				const static_generator = new StaticGeometryGenerator(this.collision_scene);
				static_generator.attributes = ["position"];

				const merged_geometry = static_generator.generate();
				merged_geometry.boundsTree = new MeshBVH(merged_geometry, {lazyGeneration: false} as MeshBVHOptions);

				this.collider = new Mesh(merged_geometry);
				this.core.scene.add(this.collision_scene);

				resolve();
			}, (event) => {
				this.core.$emit(ON_LOAD_PROGRESS, {url: COLLISION_SCENE_URL, loaded: event.loaded, total: event.total});
			});
		});
	}
}
