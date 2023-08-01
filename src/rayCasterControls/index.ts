import Core from "../core";
import {Object3D, Raycaster, Vector2} from "three";
import {ON_CLICK_RAY_CAST, ON_HIDE_TOOLTIP, ON_SHOW_TOOLTIP} from "../Constants";

export default class RayCasterControls {
	core: Core;
	click_raycaster: Raycaster;
	tooltip_raycaster: Raycaster;
	hover_point: Vector2;
	mouse_point: Vector2;

	constructor() {
		this.core = new Core();

		this.click_raycaster = new Raycaster();
		this.click_raycaster.far = 18;

		this.tooltip_raycaster = new Raycaster();
		this.tooltip_raycaster.far = 15;

		this.hover_point = new Vector2(0, 0);
		this.mouse_point = new Vector2();
	}

	handleTooltipRayCast(raycast_objects: Object3D[] = []) {
		if (raycast_objects.length) {
			this.tooltip_raycaster.setFromCamera(this.hover_point, this.core.camera);
			const intersects = this.tooltip_raycaster.intersectObjects(raycast_objects);
			if (intersects.length && intersects[0].object.userData.title) {
				this.core.$emit(ON_SHOW_TOOLTIP, {msg: intersects[0].object.userData.title, show_preview_tips: !!intersects[0].object.userData.show_boards});
			} else {
				this.core.$emit(ON_HIDE_TOOLTIP);
			}
		}
	}

	bindClickRayCast(raycast_objects: Object3D[] = []) {
		// 事件的监听
		document.body.addEventListener("click", (event) => {
			this.mouse_point.x = (event.clientX / window.innerWidth) * 2 - 1;
			this.mouse_point.y = -((event.clientY / window.innerHeight) * 2 - 1);

			this.click_raycaster.setFromCamera(this.mouse_point, this.core.camera);
			const intersects = this.click_raycaster.intersectObjects(raycast_objects);

			if (intersects.length && intersects[0].object.userData.show_boards) {
				this.core.$emit(ON_CLICK_RAY_CAST, intersects[0].object);
			}
		});
	}
}
