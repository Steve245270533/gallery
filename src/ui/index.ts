import Core from "../core";
import {ON_PLAY_AUDIO} from "../Constants";

export default class UI {
	core: Core;

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
	boards_close_btn: HTMLElement;

	constructor() {
		this.core = new Core();

		this.preview_tooltip = document.querySelector("#preview-tooltip")!;
		this.preview_tips = document.querySelector("#preview-tips")!;

		this.boards_dialog = document.querySelector("#boards-info")!;
		this.boards_container = document.querySelector("#boards-info .boards-container")!;
		this.boards_content = document.querySelector("#boards-info .boards-container .content")!;
		this.boards_title = document.querySelector(".boards-container .info .title")!;
		this.boards_author = document.querySelector(".boards-container .info .author")!;
		this.boards_describe = document.querySelector(".boards-container .info .describe")!;
		this.boards_img = document.querySelector(".boards-container .img img")!;
		this.boards_close_btn = document.querySelector("#boards-info .boards-container .close")!;

		this.boards_close_btn.addEventListener("click", this.hideBoardsBox.bind(this));
	}

	showBoardsBox(title: string, author: string, describe: string, img_src: string) {
		if (this.boards_dialog.style.visibility === "visible") return;
		this.boards_dialog.style.visibility = "visible";
		this.boards_container.style.opacity = "1";
		this.boards_title.innerText = title;
		this.boards_author.innerText = author;
		this.boards_describe.innerHTML = describe;
		this.boards_img.src = img_src;
		this.boards_content.scrollTo({top: 0, left: 0, behavior: "smooth"});
	}

	hideBoardsBox(e: any) {
		this.boards_dialog.style.visibility = "hidden";
		this.boards_container.style.opacity = "0";
		this.boards_title.innerText = "";
		this.boards_author.innerText = "";
		this.boards_describe.innerHTML = "";
		this.boards_img.src = "";
		// 阻止冒泡，防止被window上的raycaster处理
		e.stopPropagation();
	}

	showPreviewTooltip(msg: string, show_preview_tips = true) {
		this.preview_tooltip.style.opacity = "1";
		if (show_preview_tips) {
			this.preview_tips.style.opacity = "1";
		}
		if (this.preview_tooltip.innerText === msg) return;
		this.preview_tooltip.innerText = msg;
	}

	hidePreviewTooltip() {
		this.preview_tooltip.style.opacity = "0";
		this.preview_tips.style.opacity = "0";
	}

	createLoading() {
		const div = document.createElement("div");
		div.className = "loading";
		div.innerHTML = `
			<div>
				<p>
					<span>加载资源中</span>
					<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="48px" height="60px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50" xml:space="preserve">
					    <rect x="0" y="7.6416" width="4" height="14.7168" fill="#ffffff" opacity="0.2">
					        <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0s" dur="0.6s" repeatCount="indefinite"></animate>
					        <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0s" dur="0.6s" repeatCount="indefinite"></animate>
					        <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0s" dur="0.6s" repeatCount="indefinite"></animate>
					    </rect>
					    <rect x="8" y="5.1416" width="4" height="19.7168" fill="#ffffff" opacity="0.2">
					        <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.15s" dur="0.6s" repeatCount="indefinite"></animate>
					        <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite"></animate>
					        <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite"></animate>
					    </rect>
					    <rect x="16" y="7.3584" width="4" height="15.2832" fill="#ffffff" opacity="0.2">
					        <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.3s" dur="0.6s" repeatCount="indefinite"></animate>
					        <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite"></animate>
					        <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite"></animate>
					    </rect>
					</svg>
				</p>
				<div class="progress"></div>
			</div>
		`;
		document.body.appendChild(div);
	}

	updateLoadingProgress(loading_text: string) {
		const progress = document.querySelector(".loading .progress");
		progress && (progress.innerHTML = loading_text);
	}

	removeElement(name: string) {
		const div = document.querySelector(name);
		div?.remove();
	}

	createLoadingConfirm() {
		const div = document.createElement("div");
		div.className = "loading-complete";
		div.innerHTML = `
			<div>
				<p>
					加载完成
					<svg t="1677233206130" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2675" width="24" height="24"><path d="M537.6 102.4c73.5744 0 142.336 20.6848 200.704 56.576 15.872 9.6256 16.7936 23.1424 2.9696 40.5504-14.08 16.2816-43.008 13.2608-86.8352-9.216l-0.0512 0.0512a318.1568 318.1568 0 1 0 104.8064 524.3904h0.3584c19.456-26.7776 40.5504-40.192 63.1296-40.2432l6.8096 0.4096c24.064 4.4032 30.4128 16.6912 19.0464 36.864l0.2048-0.3584-0.1536 0.1536-0.0512 0.2048h-0.1024l-7.936 10.5984A384 384 0 1 1 537.6 102.4z m332.288 201.0112a33.28 33.28 0 0 1 0 47.104l-276.48 276.48a31.2832 31.2832 0 0 1-0.512 0.4608l-3.584 3.584a30.72 30.72 0 0 1-43.4176 0l-1.8432-1.792-0.4096-0.512-135.3216-135.2704a30.72 30.72 0 0 1 0-43.4176l3.584-3.584a30.72 30.72 0 0 1 43.4688 0l112.2304 112.128 255.232-255.1808a33.28 33.28 0 0 1 47.104 0z" fill="#ffffff" p-id="2676"></path></svg>
				</p>
				<div class="start">进入展馆</div>
			</div>
		`;
		document.body.appendChild(div);
		(div.children[0].children[1] as HTMLElement).onclick = () => {
			div.remove();
			this.core.$emit(ON_PLAY_AUDIO);
		};
	}
}
