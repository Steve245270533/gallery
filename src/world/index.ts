import Core from "../core";
import Environment from "../environment";
import Character from "../character";
import Css3DRenderer from "../css3DRenderer";
import Audio from "../audio";
import RayCasterControls from "../rayCasterControls";
import {ON_CLICK_RAY_CAST, ON_HIDE_TOOLTIP, ON_LOAD_MODEL_FINISH, ON_LOAD_PROGRESS, ON_ENTER_APP, ON_SHOW_TOOLTIP} from "../Constants";
import {Object3D} from "three";

export default class World {
	private core: Core;
	private environment: Environment;
	private character: Character;
	private css_3d_renderer: Css3DRenderer;
	private audio: Audio;
	private ray_caster_controls: RayCasterControls;

	constructor() {
		this.core = new Core();

		this.core.$on(ON_LOAD_PROGRESS, this._handleLoadProgress.bind(this));
		this.core.$on(ON_LOAD_MODEL_FINISH, this._onLoadModelFinish.bind(this));
		this.core.$on(ON_CLICK_RAY_CAST, this._onClickRayCast.bind(this));
		this.core.$on(ON_SHOW_TOOLTIP, this._onShowTooltip.bind(this));
		this.core.$on(ON_HIDE_TOOLTIP, this._onHideTooltip.bind(this));
		this.core.$on(ON_ENTER_APP, this._onEnterApp.bind(this));

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
			this.ray_caster_controls.updateTooltipRayCast(this.environment.raycast_objects);
		}
	}

	/*
	* 点击进入展馆后的回调
	* */
	private _onEnterApp() {
		this.audio.playAudio();
		// 进入后才允许控制键盘
		this.core.control_manage.enabled();
	}

	private async _onLoadModelFinish() {
		// 场景模型加载完毕后开始加载音频
		await this.audio.createAudio();

		// 音频加载完毕后移除加载进度UI，显示进入确认UI
		this.core.ui.removeLoading();
		this.core.ui.showLoadingConfirm();

		// 场景模型加载完毕后将场景中需要光线投射检测的物体传入给rayCasterControls
		this.ray_caster_controls.bindClickRayCastObj(this.environment.raycast_objects);
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
