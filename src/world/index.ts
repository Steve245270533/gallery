import Core from "../core";
import Environment from "../environment";
import Character from "../character";
import Css3DRenderer from "../css3DRenderer";
import Audio from "../audio";
import RayCasterControls from "../rayCasterControls";
import {
	ON_CLICK_RAY_CAST,
	ON_HIDE_TOOLTIP,
	ON_LOAD_MODEL_FINISH,
	ON_LOAD_PROGRESS,
	ON_SHOW_TOOLTIP
} from "../Constants";
import {Object3D} from "three";

export default class World {
	core: Core;
	environment: Environment;
	character: Character;
	css_3d_renderer: Css3DRenderer;
	audio: Audio;
	ray_caster_controls: RayCasterControls;

	constructor() {
		this.core = new Core();

		this.core.ui.createLoading();

		this.core.$on(ON_LOAD_PROGRESS, this._handleLoadProgress.bind(this));
		this.core.$on(ON_LOAD_MODEL_FINISH, this._onLoadModelFinish.bind(this));
		this.core.$on(ON_CLICK_RAY_CAST, this._onClickRayCast.bind(this));
		this.core.$on(ON_SHOW_TOOLTIP, this._onShowTooltip.bind(this));
		this.core.$on(ON_HIDE_TOOLTIP, this._onHideTooltip.bind(this));

		this.environment = new Environment();
		this.character = new Character({speed: 12});
		this.css_3d_renderer = new Css3DRenderer();
		this.audio = new Audio();
		this.ray_caster_controls = new RayCasterControls();
	}

	update(delta: number) {
		if (this.environment.collider && this.environment.is_load_finished) {
			this.css_3d_renderer.update();
			this.character.update(delta, this.environment.collider);
			this.ray_caster_controls.handleTooltipRayCast(this.environment.raycast_objects);
		}
	}

	private async _onLoadModelFinish() {
		await this.audio.createAudio();

		this.core.ui.removeElement(".loading");
		this.core.ui.createLoadingConfirm();
		this.ray_caster_controls.bindClickRayCast(this.environment.raycast_objects);
	}

	private _handleLoadProgress([{url, loaded, total}]: [{url: string, loaded: number, total: number}]) {
		const percentage = ((loaded / total) * 100).toFixed(2);
		if (/.*\.(blob|glb)$/i.test(url)) {
			this.core.ui.updateLoadingProgress(`${url.includes("collision") ? "加载碰撞场景模型" : "加载其他场景模型"}：${percentage}%`);
		}
		if (/.*\.(jpg|png|jpeg)$/i.test(url)) {
			this.core.ui.updateLoadingProgress("加载图片素材中...");
		}
		if (/.*\.(m4a|mp3)$/i.test(url)) {
			this.core.ui.updateLoadingProgress("加载声音资源中...");
		}
	}

	private _onClickRayCast([object]: [object: Object3D]) {
		this.core.ui.showBoardsBox(
			object.userData.title,
			object.userData.author,
			object.userData.describe,
			object.userData.src,
		);
	}

	private _onShowTooltip([{msg, show_preview_tips}]: [{ msg: string, show_preview_tips: boolean }]) {
		this.core.ui.showPreviewTooltip(msg, show_preview_tips);
	}

	private _onHideTooltip() {
		this.core.ui.hidePreviewTooltip();
	}
}
