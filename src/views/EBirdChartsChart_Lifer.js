import { useRef } from 'react';

import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { Line } from 'react-chartjs-2';

import { ResetZoomButton, FullScreenButton } from './../components/ToolBox';

const Lifer = ({ chartData, dates }) => {
	// Lifer 需要的資料
	let liferRawData = chartData.reduce((obj, ele, idx) => {
		let newBS = ele["Common_Name"];
		let oldBS = obj["birdSpecies"];
		// 該筆出現新紀錄鳥種
		let diffBirdSpecies = newBS.filter(nbs => !oldBS.includes(nbs));
		obj["birdSpecies"] = [...oldBS, ...diffBirdSpecies];
		obj["accuBirdNumbers"] = [...obj["accuBirdNumbers"], oldBS.length+diffBirdSpecies.length];
		obj["diffBirdNumbers"] = [...obj["diffBirdNumbers"], diffBirdSpecies.length];
		obj["eachBirdNumbers"] = [...obj["eachBirdNumbers"], newBS.length];
		return obj;
	}, {"birdSpecies": [], "accuBirdNumbers": [], "diffBirdNumbers": [], "eachBirdNumbers": []});
	// Lifer 圖表資料
	let liferData = {
		labels: dates, // x-axis
		datasets: [
			{
				label: "生涯鳥種",
				data: liferRawData["accuBirdNumbers"], // y-axis
				fill: "start", // 塗滿風格；start, end, origin
				backgroundColor: "rgba(255, 99, 132, .1)",
				borderColor: "rgba(255, 99, 132, 1)",
				yAxisID: "y-axis-1"
			},
			{
				label: "解鎖鳥種",
				data: liferRawData["diffBirdNumbers"], // y-axis
				fill: "start", // 塗滿風格；start, end, origin
				backgroundColor: "rgba(115, 234, 255, .1)",
				borderColor: "rgba(115, 234, 255, 1)",
				yAxisID: "y-axis-2"
			},
			{
				label: "觀察鳥種",
				data: liferRawData["eachBirdNumbers"], // y-axis
				fill: "start", // 塗滿風格；start, end, origin
				backgroundColor: "rgba(149, 255, 146, .1)",
				borderColor: "rgba(149, 255, 146, 1)",
				yAxisID: "y-axis-2"
			}
		]
	}
	// Lifer 圖表設定
	let liferOptions = {
		scales: {
			yAxes: [
				{
					type: "linear",
					display: true,
					id: "y-axis-1"
				},
				{
					type: "linear",
					display: true,
					id: "y-axis-2"
				}
			]
		},
		plugins: {
			zoom: {
				zoom: {
					wheel: { // Mouse wheel
						enabled: true,
						modifierKey: 'ctrl' // Modifier key required for zooming via mouse wheel
					},
					drag: { // Drag-to-zoom
						enabled: true,
						borderColor: 'white',
						borderWidth: 1
					},
					pinch: { // pinch
						enabled: true
					},
					mode: 'x' // Allowed zoom directions；x, y, xy
				},
				pan: {},
				limits: {}
			}
		}
	}
	// lifer 重設縮放
	const liferRef = useRef(null);
	// Lifer 全螢幕處理器
	const liferFSHandler = useFullScreenHandle();
	if (liferFSHandler.active) {
		liferOptions["maintainAspectRatio"] = false; // 全螢幕時可以 100% 佔滿
	} else {
		liferOptions["maintainAspectRatio"] = true;
	}

	return (
		<>
			<div style={{position: "relative"}}>
				{/* 標題 */}
				<h6 className="text-white text-start m-0 chartTitle">
					<span className="border border-white border-3 p-1 chartTitleContent">鳥種數隨時間累計</span>
					<span className="text-muted fst-italic text-decoration-underline ms-2">✶Ctrl+滑鼠滾輪進行縮放</span>
				</h6>
				{/* 小工具 */}
				<div className="btn-group position-absolute top-0 end-0" role="group" aria-label="lifer">
					<ResetZoomButton refObj={liferRef} absolutePosition={false} />
					<FullScreenButton fullscreenHandler={liferFSHandler} absolutePosition={false} />
				</div>
			</div>
			<FullScreen handle={liferFSHandler} className="chartFullscreen">
				{/* Lifer */}
				<Line data={liferData} options={liferOptions} ref={liferRef} />
			</FullScreen>
		</>
	);
}

export default Lifer;
