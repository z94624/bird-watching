import { useRef } from 'react';

import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { Line } from 'react-chartjs-2';

import { sortObjectByValue } from './../utils/tools';
import { ResetZoomButton, FullScreenButton } from './../components/ToolBox';

const Hotspot = ({ locations }) => {
	// Hotspot 需要的資料 且 依次數降冪排序
	let hotRawData = sortObjectByValue(locations.reduce((obj, ele) => {
		let zhLocation = ele.split("(")[0]; // 中文地名
		if (obj.hasOwnProperty(zhLocation)) {
			obj[zhLocation] = obj[zhLocation] + 1;
		} else {
			obj[zhLocation] = 1;
		}
		return obj;
	}, {}));
	// Hotspot 圖表資料
	let hotData = {
		labels: Object.keys(hotRawData), // x-axis
		datasets: [
			{
				label: "在地鳥導",
				data: Object.values(hotRawData), // y-axis
				fill: "start", // 塗滿風格；start, end, origin
				backgroundColor: "rgba(255, 99, 132, .1)",
				borderColor: "rgba(255, 99, 132, 1)",
				yAxisID: "y-axis-1"
			}
		]
	}
	// Hotspot 圖表設定
	let hotOptions = {
		scales: {
			yAxes: [
				{
					type: "linear",
					display: true,
					id: "y-axis-1"
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
				}
			}
		}
	}
	// Hotspot 重設縮放
	const hotRef = useRef(null);
	// Hotspot 全螢幕處理器
	const hotFSHandler = useFullScreenHandle();

	return (
		<>
			<div style={{position: "relative"}}>
				{/* 標題 */}
				<h6 className="text-white text-start m-0 chartTitle">
					<span className="border border-white border-3 p-1 chartTitleContent">所有地點的賞鳥次數</span>
					<span className="text-muted fst-italic text-decoration-underline ms-2">✶Ctrl+滑鼠滾輪進行縮放</span>
				</h6>
				{/* 小工具 */}
				<div className="btn-group position-absolute top-0 end-0" role="group" aria-label="hotspot">
					<ResetZoomButton refObj={hotRef} absolutePosition={false} />
					<FullScreenButton fullscreenHandler={hotFSHandler} absolutePosition={false} />
				</div>
			</div>
			<FullScreen handle={hotFSHandler}>
				{/* Hotspot */}
				<Line data={hotData} options={hotOptions} ref={hotRef} />
			</FullScreen>
		</>
	);
}

export default Hotspot;
