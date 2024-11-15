import Core from "../core";
import {ON_ENTER_APP} from "../Constants";

export default class UI {
	private core: Core;

	private doms: {
		/* 初始加载进度相关 */
		loading: HTMLElement;
		loading_complete: HTMLElement;

		/* 预览文案相关 */
		preview_tooltip: HTMLElement;
		preview_tips: HTMLElement;

		/* 画展详情相关 */
		boards_dialog: HTMLElement;
		boards_container: HTMLElement;
		boards_content: HTMLElement;
		boards_title: HTMLElement;
		boards_author: HTMLElement;
		boards_describe: HTMLElement;
		boards_img: HTMLImageElement;

		/* 帮助按钮 */
		help_btn: HTMLElement;

		/* 操作指引弹窗 */
		operating_intro: HTMLElement;
	};

	constructor() {
		this.core = new Core();

		this.doms = {
			loading: document.querySelector(".loading")!,
			loading_complete: document.querySelector(".loading-complete")!,
			preview_tooltip: document.querySelector(".preview-tooltip")!,
			preview_tips: document.querySelector(".preview-tips")!,
			boards_dialog: document.querySelector(".boards-info")!,
			boards_container: document.querySelector(".boards-info .boards-container")!,
			boards_content: document.querySelector(".boards-info .boards-container .content")!,
			boards_title: document.querySelector(".boards-container .info .title")!,
			boards_author: document.querySelector(".boards-container .info .author")!,
			boards_describe: document.querySelector(".boards-container .info .describe")!,
			boards_img: document.querySelector(".boards-container .img img")!,
			help_btn: document.querySelector(".help")!,
			operating_intro: document.querySelector(".operating-intro")!,
		};

		document.body.addEventListener("click", this.handleClick.bind(this));
	}

	handleClick(e: MouseEvent) {
		if (e.target instanceof HTMLElement) {
			// 定义一套对应元素click响应事件的策略
			const MAP_EVENT = [
				{
					verify: () => {
						return (e.target as HTMLElement).classList.contains("start");
					},
					handler: this.onClickEnterApp.bind(this)
				},
				{
					verify: () => {
						return this._isBInA(["boards-info-close", "boards-info"], (e.target as HTMLElement).classList.value.split(" "));
					},
					handler: this.hideBoardsBox.bind(this)
				},
				{
					verify: () => {
						return (e.target as HTMLElement).classList.contains("help");
					},
					handler: this.showHelp.bind(this)
				},
				{
					verify: () => {
						return this._isBInA(["operating-intro-close", "operating-intro", "operating-intro-img"], (e.target as HTMLElement).classList.value.split(" "));
					},
					handler: this.hideHelp.bind(this)
				}
			];

			const event = MAP_EVENT.find(item => item.verify());
			if (event) {
				event.handler();
			}
		}
	}

	onClickEnterApp() {
		this.doms.loading_complete.classList.remove("display-none");
		this.doms.loading_complete.remove();
		this.core.$emit(ON_ENTER_APP);
	}

	showHelp() {
		this.doms.operating_intro.classList.remove("display-none");
	}

	hideHelp() {
		this.doms.operating_intro.classList.add("display-none");
	}

	showBoardsBox(title: string, author: string, describe: string, img_src: string) {
		if (this.doms.boards_dialog.style.visibility === "visible") return;
		this.doms.boards_dialog.style.visibility = "visible";
		this.doms.boards_container.classList.remove("hide");
		this.doms.boards_title.innerText = title;
		this.doms.boards_author.innerText = author;
		this.doms.boards_describe.innerHTML = describe;
		this.doms.boards_img.src = img_src;
		this.doms.boards_content.scrollTo({top: 0, left: 0, behavior: "smooth"});
	}

	hideBoardsBox() {
		this.doms.boards_dialog.style.visibility = "hidden";
		this.doms.boards_container.classList.add("hide");
		this.doms.boards_title.textContent = "";
		this.doms.boards_author.textContent = "";
		this.doms.boards_describe.textContent = "";
		this.doms.boards_img.src = "";
	}

	showPreviewTooltip(msg: string, show_preview_tips = true) {
		this.doms.preview_tooltip.classList.remove("hide");
		if (show_preview_tips) {
			this.doms.preview_tips.classList.remove("hide");
		}
		if (this.doms.preview_tooltip.innerText === msg) return;
		this.doms.preview_tooltip.innerText = msg;
	}

	hidePreviewTooltip() {
		this.doms.preview_tooltip.classList.add("hide");
		this.doms.preview_tips.classList.add("hide");
	}

	updateLoadingProgress(loading_text: string) {
		const progress = this.doms.loading.querySelector(".progress");
		progress && (progress.textContent = loading_text);
	}

	removeLoading() {
		this.doms.loading.remove();
	}

	showLoadingConfirm() {
		this.doms.loading_complete.classList.remove("display-none");
	}

	private _isBInA(A: string[], B: string[]) {
		return B.some(name => A.includes(name));
	}
}
