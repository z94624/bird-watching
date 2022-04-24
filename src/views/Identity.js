import { useState } from 'react';

import { useSprings, animated, to as interpolate } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import ReactCardFlip from 'react-card-flip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import './Identity.css';
import { butterflyInfos } from './../utils/identity-butterflies.js';
import { shuffleArray } from './../utils/tools.js';
// 蝴蝶照片集
const butterflyImages = butterflyInfos.map(info => {
	return {
		"feature": info.feature, // 辨識重點
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
				className="btn btn-outline-warning shuffleBtn"
				title="洗牌"
				onClick={onShuffling}
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-shuffle" viewBox="0 0 16 16">
					<path fillRule="evenodd" d="M0 3.5A.5.5 0 0 1 .5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.624 9.624 0 0 0 7.556 8a9.624 9.624 0 0 0 1.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.595 10.595 0 0 1 7 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 0 1 0-1H1c1.798 0 3.173-1.01 4.126-2.082A9.624 9.624 0 0 0 6.444 8a9.624 9.624 0 0 0-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 0 1-.5-.5z"/>
					<path d="M13 5.466V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192zm0 9v-3.932a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192z"/>
				</svg>
			</button>
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
							className="react-card-front-container"
							onContextMenu={e => onFlipping(e, pIdx)} // 右鍵翻轉
						>
							{/* 提示 */}
							<OverlayTrigger
								placement="auto"
								overlay={<Tooltip id={`hintTooltip-${pIdx}`}>【提示】{card["feature"]}</Tooltip>}
							>
								<span className="hintIcon">
									<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-info-circle-fill" viewBox="0 0 16 16">
										<path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
									</svg>
								</span>
							</OverlayTrigger>
						</animated.div>
						{/* 解答 */}
						<animated.div
							{...bind(pIdx)} // 偵測動作
							style={{
								transform: interpolate([rot, scale], trans)
							}}
							className="react-card-back-container"
							onContextMenu={e => onFlipping(e, pIdx)} // 右鍵翻轉
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
		</main>
	);
}

export default Identity;
