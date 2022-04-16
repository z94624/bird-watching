import { useState } from 'react';

import { useSprings, animated, to as interpolate } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import ReactCardFlip from 'react-card-flip';

import './Identity.css';
import { butterflyInfos } from './../utils/identity-butterflies.js';
import { shuffleArray } from './../utils/tools.js';
// 蝴蝶照片集
const butterflyImages = butterflyInfos.map(info => {
	return {
		"butterfly": info.butterfly, // 照片
		"isFlipped": false // 翻轉狀態
	};
});
// 載入牌組
const from = (_i: number) => ({ // 起始狀態
	x: 0,
	y: -1000,
	rot: 0,
	scale: 1.5
});
const to = (i: number) => ({ // 結束狀態
	x: 0,
	y: i * (-4),
	rot: (-10) + Math.random() * 20,
	scale: 1,
	delay: i * 100,
});
// 每張卡牌擺放狀態
const trans = (r: number, s: number) => `perspective(1500px) rotateX(30deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`;

const Identity = () => {
	// 牌組
	const [cards, setCards] = useState(butterflyImages);
	const onShuffling = () => { // 洗牌
		let shuffledCards = shuffleArray(butterflyImages);
		setCards([...shuffledCards]);
	}
	const onFlipping = (e, pIdx) => { // 翻轉
		e.preventDefault(); // 避免選單跳出
		// 除了該張卡牌其他蓋牌，重置套牌後，幾乎還可以不洗牌重新測驗
		let newCards = cards.map((card, cIdx) => cIdx === pIdx ? {...card, "isFlipped": !card.isFlipped} : {...card, "isFlipped": false});
		setCards([...newCards]);
	}
	// 不在牌組中的卡牌們
	const [gone] = useState(() => new Set());
	// 每張卡牌一個 Spring
	const [props, api] = useSprings(cards.length, i => ({
		...to(i),
		from: from(i),
	}));
	// Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
	const bind = useDrag(({ args: [index], active, movement: [mx], direction: [xDir], velocity: [vx] }) => {
		const trigger = vx > 0.2; // 卡牌的逃逸速度
		if (!active && trigger) {gone.add(index);} // 當放開且達逃逸速度，該卡牌可飛走
		api.start(i => {
			if (index !== i) {return;} // 只改變該卡牌的 Spring 資料
			const isGone = gone.has(index); // 若該卡牌準備飛走
			const x = isGone ? (200 + window.innerWidth) * xDir : active ? mx : 0; // 往左飛或往右飛，否則回歸原位
			const rot = mx / 100 + (isGone ? xDir * 10 * vx : 0); // 丟得越用力，轉動程度越大
			const scale = active ? 1.1 : 1; // 抓取的卡牌往上抬升
			return {
				x,
				rot,
				scale,
				delay: undefined,
				config: { friction: 50, tension: active ? 800 : isGone ? 200 : 500 }
			};
		});
		// 若所有卡牌都飛走了
		if (!active && gone.size === cards.length) {
			setTimeout(() => {
				gone.clear();
				api.start(i => to(i)); // 所有卡牌回歸牌組中
			}, 600);
		}
	});

	return (
		<main id="idMain" className="h-100">
			{/* 洗牌按鈕 */}
			<button
				type="button"
				className="btn btn-outline-warning btn-lg shuffleBtn"
				onClick={onShuffling}
			>洗牌</button>
		{/* 牌組 */}
		{props.map(({ x, y, rot, scale }, pIdx) => {
			let card = cards[pIdx];
			// 該蝴蝶其他資訊
			let butterflyOthers = butterflyInfos.find(info => info.butterfly === card["butterfly"]);
			let sexColor = butterflyOthers["sex"] === "♂" ? "primary" : "danger";
			return (
				// 卡牌容器
				<animated.div
					key={`idAnimatedDiv-${pIdx}`}
					style={{ x, y }}>
					{/* 翻轉功能 */}
					<ReactCardFlip isFlipped={card["isFlipped"]}>
						{/* 卡牌 */}
						<animated.div
							{...bind(pIdx)} // 偵測動作
							style={{
								transform: interpolate([rot, scale], trans),
								backgroundImage: `url(${card["butterfly"]})`
							}}
							onContextMenu={e => onFlipping(e, pIdx)} // 右鍵翻轉
						/>
						{/* 解答 */}
						<animated.div
							{...bind(pIdx)} // 偵測動作
							style={{
								transform: interpolate([rot, scale], trans)
							}}
							className="react-card-back-container"
							onContextMenu={e => onFlipping(e, pIdx)} // 右鍵翻轉
						>
							<a className="btn btn-lg" href={butterflyOthers["href"]} target="_blank" rel="noopener noreferrer" role="button">
								<h1 className="bold-900">{butterflyOthers["name_chi"]}</h1>
								<h5>{butterflyOthers["name_latin"]}</h5>
								<h1><span className={`badge rounded-pill bg-${sexColor}`}>{butterflyOthers["sex"]}</span></h1>
							</a>
						</animated.div>
					</ReactCardFlip>
				</animated.div>
			);
		})}
		</main>
	);
}

export default Identity;
