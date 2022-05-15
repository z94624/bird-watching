import { useState } from 'react';

import { useSprings, animated, to as interpolate } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import ReactCardFlip from 'react-card-flip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import './Identity.css';
import { butterflyInfos } from './../utils/identity-butterflies.js';
import { shuffleArray } from './../utils/tools.js';
import { itemsToRainbowSelectOptions } from './../utils/ytVideos_dataExtraction';
// 蝴蝶照片集
const butterflyCards = butterflyInfos.map(info => {
	return {
		"butterfly": info.butterfly, // 照片
		"isFlipped": false // 翻轉狀態
	};
});
/*
 * https://react-spring.io/common/props
 * 載入牌組
 */
const inHand = () => ({ // 起始狀態
	x: 0,
	y: -1000,
	rotation: 0,
	scale: 1.5
});
const onTable = (i) => ({ // 結束狀態
	x: (-30) + Math.random() * 60, // 橫向飄移
	y: (-30) + Math.random() * 60, // 縱向飄移
	rotation: (-15) + Math.random() * 30, // 轉動角度介於正負 x 度
	scale: 1, // 原大小
	delay: i * 30 // 每張間隔(越多張要越短，不會載入很久)
});
// 每張卡牌擺放狀態
const transformation = (r, s) => (`perspective(1500px) rotateX(30deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`);

const Identity = () => {
	// 資料庫
	const [database, setDatabase] = useState("蝴蝶");
	const handleDatabaseChange = userDatabase => {
		setDatabase(userDatabase.target.value);
	}
	const databaseSelect = itemsToRainbowSelectOptions(["蝴蝶", "鳥"], "idDatabaseSelect", "資料庫", undefined, database, handleDatabaseChange, undefined);
	// 牌組
	const [cards, setCards] = useState(butterflyCards);
	const cardDeckSize = cards.length;
	const onShuffling = () => { // 洗牌
		// 步驟一：拿起牌組
		gone.clear();
		api.start(i => ({...inHand(i), delay: Math.random() * cardDeckSize * 30})); // 隨機收集
		setTimeout(() => {
			// 步驟二：洗牌
			let shuffledCards = shuffleArray(butterflyCards);
			setCards([...shuffledCards]);
			// 步驟三：洗完後重新發牌
			api.start(i => onTable(i));
		}, cardDeckSize * 50);
	}
	const onFlipping = (e, sIdx) => { // 翻轉
		e.preventDefault(); // 避免選單跳出
		// 除了該張卡牌其他蓋牌，重置套牌後，幾乎還可以不洗牌重新測驗
		let newCards = cards.map((card, cIdx) => cIdx === sIdx ? {...card, "isFlipped": !card.isFlipped} : card.isFlipped ? {...card, "isFlipped": false} : card);
		setCards([...newCards]);
	}
	// 不在牌組中的卡牌們
	const [gone] = useState(() => new Set());
	// 每張卡牌一個 Spring(創建多組 Spring)
	const [springs, api] = useSprings(cardDeckSize, i => ({
		...onTable(i), // Animates to...
		from: inHand(i), // Base values(optional)
		/*
		 * https://react-spring.io/common/configs
		 * 模擬卡牌落地因氣流而浮動且影響下層卡牌震動
		 */
		config: { round: true }
	}));
	/*
	 * Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
	 * const bind = useDrag((state) => doSomethingWith(state), config)
	 * state: https://use-gesture.netlify.app/docs/state/
	 * config: https://use-gesture.netlify.app/docs/options/
	 */
	const bind = useDrag(({
		args: [sIdx],
		movement: [mx, my], // displacement between offset and lastOffset
		velocity: [vx], // momentum of the gesture per axis (in px/ms)
		direction: [dx], // direction per axis; 1(右), 0(不動), -1(左)
		active // true when the gesture is active; true(操作中), false(不操作)
	}) => {
		const escape = vx > 0.3; // 卡牌的逃逸速度
		let isGone = false;
		if (!active && escape) { // 當放開且達逃逸速度，該卡牌可飛走
			gone.add(sIdx);
			isGone = true;
		}
		// Update springs with new props
		api.start(i => {
			if (i !== sIdx) {return;} // 只改變該卡牌的 Spring 資料
			const x = isGone ? window.innerWidth * dx : active ? mx : 0; // 達逃逸速度，往左飛或往右飛；未達逃逸速度，拉多少動多少，放開回歸原位
			const rotation = mx / 87 + (isGone ? 10 * vx * dx : 0); // 丟得越用力，轉動程度越大
			const y = active ? my : 0; // 抓取的卡牌向上位移
			const scale = active ? 1.3 : 1; // 抓取的卡牌往上抬升
			return {
				x,
				y,
				rotation,
				scale,
				delay: undefined,
				config: {
					round: false,
					tension: active ? 800 : isGone ? 200 : 500,
					friction: 50
				}
			};
		});
		// 若所有卡牌都飛走了
		if (!active && gone.size === cardDeckSize) {
			onShuffling(); // 洗牌重新測驗
		}
	});

	return (
		<main id="idMain" className="h-100">
			{/* 參數區 */}
			<div id="idSortPanel" className="w-100 d-inline-flex justify-content-evenly row">
				{/* 資料庫 */}
				<div className="col-sm-4">
					{databaseSelect}
				</div>
				{/* 分科 */}
				<div className="col-sm-4">
					
				</div>
				{/* 洗牌按鈕 */}
				<div className="col-sm-4">
					<button
						type="button"
						className="btn btn-outline-warning shuffleBtn"
						title="洗牌"
						onClick={onShuffling}
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-shuffle" viewBox="0 0 16 16">
							<path fillRule="evenodd" d="M0 3.5A.5.5 0 0 1 .5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.624 9.624 0 0 0 7.556 8a9.624 9.624 0 0 0 1.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.595 10.595 0 0 1 7 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 0 1 0-1H1c1.798 0 3.173-1.01 4.126-2.082A9.624 9.624 0 0 0 6.444 8a9.624 9.624 0 0 0-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 0 1-.5-.5z"/>
							<path d="M13 5.466V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192zm0 9v-3.932a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192z"/>
						</svg>
					</button>
				</div>
			</div>
			{/* 牌組容器 */}
			<div id="idCardDeckContainer">
				{/* 牌組 */}
				{springs.map(({ x, y, rotation, scale }, sIdx) => {
					let card = cards[sIdx];
					// 該蝴蝶其他資訊
					let butterflyOthers = butterflyInfos.find(info => info.butterfly === card["butterfly"]);
					let sexColor = butterflyOthers["sex"] === "♂" ? "primary" : "danger";
					return (
						// 卡牌容器
						<animated.div
							key={`idAnimatedDiv-${sIdx}`}
							style={{ x, y }}
						>
							{/* 翻轉功能 */}
							<ReactCardFlip isFlipped={card["isFlipped"]}>
								{/* 卡牌 */}
								<animated.div
									{...bind(sIdx)} // 偵測動作[<div {...bind(arg)} />]
									style={{
										transform: interpolate([rotation, scale], transformation),
										backgroundImage: `url(${card["butterfly"]})`
									}}
									className="react-card-front-container"
									onContextMenu={e => onFlipping(e, sIdx)} // 右鍵翻轉
								>
									{/* 編號 */}
									<span className="idNumbering">{`${cardDeckSize - sIdx}/${cardDeckSize}`}</span>
									{/* 提示 */}
									<OverlayTrigger
										placement="auto"
										overlay={<Tooltip id={`hintTooltip-${sIdx}`}>【提示】{butterflyOthers["feature"]}</Tooltip>}
									>
										<span className="idHintIcon">
											<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-info-circle-fill" viewBox="0 0 16 16">
												<path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
											</svg>
										</span>
									</OverlayTrigger>
								</animated.div>
								{/* 解答 */}
								<animated.div
									{...bind(sIdx)} // 偵測動作
									style={{
										transform: interpolate([rotation, scale], transformation)
									}}
									className="react-card-back-container"
									onContextMenu={e => onFlipping(e, sIdx)} // 右鍵翻轉
								>
									<a className="react-card-back-content gradient-border" href={butterflyOthers["href"]} target="_blank" rel="noopener noreferrer" role="button">
										<h1 className="bold-900">{butterflyOthers["name_chi"]}</h1>
										<h6>{butterflyOthers["name_latin"]}</h6>
										<h3><span className={`badge rounded-pill bg-${sexColor}`}>{butterflyOthers["sex"]}</span></h3>
									</a>
								</animated.div>
							</ReactCardFlip>
						</animated.div>
					);
				})}
			</div>
		</main>
	);
}

export default Identity;
