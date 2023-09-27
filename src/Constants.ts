/*
* Model Resources
* */
export const COLLISION_SCENE_URL = new URL("./assets/models/scene_collision.glb", import.meta.url).href;
export const STATIC_SCENE_URL = new URL("./assets/models/scene_desk_obj.glb", import.meta.url).href;

/*
* Texture Resources
* */
export const BOARD_TEXTURES = [
	new URL("./assets/boards/1.png", import.meta.url).href,
	new URL("./assets/boards/2.png", import.meta.url).href,
	new URL("./assets/boards/3.jpg", import.meta.url).href,
	new URL("./assets/boards/4.jpg", import.meta.url).href,
	new URL("./assets/boards/5.png", import.meta.url).href,
	new URL("./assets/boards/6.png", import.meta.url).href,
	new URL("./assets/boards/7.png", import.meta.url).href,
	new URL("./assets/boards/8.jpg", import.meta.url).href,
	new URL("./assets/boards/9.jpg", import.meta.url).href,
	new URL("./assets/boards/10.png", import.meta.url).href
];

/*
* Audio Resources
* */
export const AUDIO_URL = new URL("./assets/audio/我记得.m4a", import.meta.url).href;

/*
* Intro
* */
export const BOARDS_INFO: Record<string, {title: string, author: string, describe: string}> = {
	1: {
		title: "《小橘贝》",
		author: "小雅",
		describe: `
		它站在画面中央，静静地凝视着观众，柔和的橘色将它的柔软毛发和灵动眼眸妩媚地勾勒出来。<br>
		小猫的小耳朵微微竖起，似乎在倾听着什么，身体略微前倾，展现出它对周围世界的好奇和敏感。<br>
		画面的背景色以淡蓝色为主，这种色彩营造了温馨轻柔的氛围，让人仿佛置身于阳光明媚的午后时光中。<br>
		整个画作细致精致、色彩明亮而温暖，带给人们一种温馨、亲切的感受。
		`
	},
	2: {
		title: "《微光》",
		author: "小雅",
		describe: `
		微小的星光和银河组成了一个神秘的宇宙世界，让人感到无限的遐想和想象。<br>
		当你凝视着这幅画时，你会感受到无边无际的深邃和宁静。<br>
		你仿佛置身于一个没有噪音、没有烦扰的夜空中。在这个宁静的空间里，你可以看到银河中微光闪烁的样子。<br>
		这些微光似乎是夜空中唯一的生命体，它们微弱却坚定地发出光芒，点亮着整个银河系。<br>
		这些微光是如此的纤细而又强大，仿佛在无边的黑暗中，只有它们才能给人带来希望和力量。
		`
	},
	3: {
		title: "《天鹅》",
		author: "小雅",
		describe: `
		湖面静谧如镜，微风拂过，泛起一圈圈细微的涟漪，仿佛为优雅的白色天鹅们铺上了一层晶莹剔透的纱帐。<br>
		其中一只白羽如雪的天鹅在水中自由自在地舞动着优美的姿态，如同一位华丽的舞者在水上翩翩起舞。<br>
		纯白色羽毛在阳光的照射下，闪烁着淡淡的光晕，如同珍珠一般璀璨夺目。
		`
	},
	4: {
		title: "《山中小屋》",
		author: "小雅",
		describe: `
		宁静而恬淡，远山隐现于云雾中，仿佛是一幅梦幻般的画卷。<br>
		小屋在山脚下宁静地伫立，墙体洁白，屋顶泛着淡淡的阳光，使得小屋与周围的环境相互映衬。<br>
		流露出一种自然的和谐之美。
		`
	},
	5: {
		title: "《太空人》",
		author: "小雅",
		describe: `
		太空人身披着黑夜在星罗棋布的宇宙中漫游。<br>
		虽说现在已经是太空时代，人类早就可以坐太空飞船去月球，<br>
		但却永远无法探索别人内心的宇宙。
		`
	},
	6: {
		title: "《粉色海洋》",
		author: "小雅",
		describe: `
		粉色云朵蓬松如棉花糖展开眼前，弯月微笑在缝隙间，月光柔和，清雅动人。<br>
		紫色天空如梦，星辉闪烁，默默倾听，轻轻地，微风拂面，悄悄地，生命在流动。
		`
	},
	7: {
		title: "《风平浪静》",
		author: "小雅",
		describe: `
		撑一条船，离开岸边一百米，风平浪静，彩霞慢慢淡下去。<br>
		撑一条船，离开岸边两百米，风平浪静，夜晚轻轻呼唤你。<br>
		撑一条船，离开岸边三百米，风平浪静，大鱼笑我傻兮兮。<br>
		撑一条船 离开岸边四百米，风平浪静，星儿闪闪笑眯眯。<br>
		撑一条船 离开岸边五百米，风平浪静，海龟向我挥手臂。
		`
	},
	8: {
		title: "《向日葵》",
		author: "小雅",
		describe: `
		阳光照耀，金黄的花盘。<br>
		宛如一盏明灯，指引前行。<br>
		向日葵，你是信仰，你是力量，你是光辉，你是坚毅，你是忠诚，你是爱慕，你是美丽。
		`
	},
	9: {
		title: "《花·虎·蝶》",
		author: "小雅",
		describe: `
		一段奇妙的相遇，是自由和勇气的结合，是一份神秘而又动人的韵味。<br>
		在这片色彩斑斓的花海之中，一只带着蝴蝶翅膀的老虎，骑着踏板车，<br>
		它像是一道闪电，划破了这片美好的天地。<br>
		翅膀轻轻地振动，仿佛随时可以飞离这片美好的天地，飞向更广阔的天空。
		`
	},
	10: {
		title: "《豚》",
		author: "小雅",
		describe: `
		所有的转折隐藏在密集的鸟群中，天空与海洋都无法察觉，怀着美梦却可以看见。<br>
		摸索颠倒的一瞬间，所有的怀念隐藏在相似的日子里，心里的蜘蛛模仿人类张灯结彩
		`
	}
};

/*
* Computer Iframe SRC
* */
export const IFRAME_SRC = new URL("/universe/index.html", import.meta.url).href;

/*
* Events
* */
export const ON_LOAD_PROGRESS = "on-load-progress";
export const ON_LOAD_MODEL_FINISH = "on-load-model-finish";
export const ON_CLICK_RAY_CAST = "on-click-ray-cast";
export const ON_SHOW_TOOLTIP = "on-show-tooltip";
export const ON_HIDE_TOOLTIP = "on-hide-tooltip";
export const ON_KEY_DOWN = "on-key-down";
export const ON_KEY_UP = "on-key-up";
export const ON_ENTER_APP = "on-enter-app";
