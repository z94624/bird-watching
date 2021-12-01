import { useState, useRef } from 'react';

import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { Line } from 'react-chartjs-2';

import { getRandomColor } from './../utils/tools';
import { ResetZoomButton, FullScreenButton } from './../components/ToolBox';

const Succession = ({ chartData, locations, nonDupLocations }) => {
	// Succession 地點
	const [succLocation, setSuccLocation] = useState(nonDupLocations[0]);
	const handleSuccLocationChange = () => {
		setSuccLocation(document.getElementById("succLocationSelect").value);
	}
	// 該地點筆數
	let succLocationNum = locations.filter(location => location === succLocation).length;
	// Succession 需要的資料
	let succLocationIdx = 0; // 該地點第幾筆
	let succRawData = chartData.reduce((obj, ele) => {
		let eleLocation = ele["Location"][0];
		if (eleLocation === succLocation) { // 該地點
			succLocationIdx += 1;
			obj["dates"] = [...obj["dates"], ele["Date"]];
			let eleNames = ele["Common_Name"]; // 該筆所有鳥種
			let eleCounts = ele["Count"]; // 該筆所有鳥種數
			for (let i = 0; i < eleNames.length; i++) { // 每一鳥種
				let eleName = eleNames[i]; // 鳥種
				let eleCount = eleCounts[i]; // 數量
				let objCounts = obj["succBirds"][eleName]; // 已登錄數量
				if (!objCounts) { // 未登錄過
					obj["succBirds"][eleName] = [...new Array(succLocationIdx-1).fill(0), eleCount];
				} else { // 後續登錄
					obj["succBirds"][eleName] = [...objCounts, ...new Array(succLocationIdx-1-objCounts.length).fill(0), eleCount];
				}
			}
		}
		return obj;
	}, {"dates": [], "succBirds": {}});
	// 所有鳥種數量檢查補零
	let succBirds = succRawData["succBirds"];
	for (const name of Object.keys(succBirds)) { // 每一鳥種
		succBirds[name] = [...succBirds[name], ...new Array(succLocationNum-succBirds[name].length).fill(0)];
	}
	// Succession 圖表資料
	let succData = {
		labels: succRawData["dates"], // x-axis
		datasets: Object.entries(succRawData["succBirds"]).reduce((arr, [name, counts]) => {
			let color = getRandomColor(); // 隨機顏色
			let dataset = {
				label: name,
				data: counts,
				fill: "start",
				backgroundColor: color.replace(",1)", ",.1)"),
				borderColor: color,
				yAxisID: "y-axis-1"
			}
			return [...arr, dataset];
		}, [])
	}
	// Succession 圖表設定
	let succOptions = {
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
	// Succession 重設縮放
	const succRef = useRef(null);
	// Succession 全螢幕處理器
	const succFSHandler = useFullScreenHandle();

	return (
		<>
			<div style={{position: "relative"}}>
				{/* 標題 */}
				<h6 className="text-white text-start mb-2 chartTitle">
					<span className="border border-white border-3 p-1 chartTitleContent">鳥隻數隨時間變化</span>
					<span className="text-muted fst-italic text-decoration-underline ms-2">✶Ctrl+滑鼠滾輪進行縮放</span>
				</h6>
				{/* 小工具 */}
				<div className="btn-group position-absolute top-0 end-0" role="group" aria-label="succession">
					<ResetZoomButton refObj={succRef} absolutePosition={false} />
					<FullScreenButton fullscreenHandler={succFSHandler} absolutePosition={false} />
				</div>
			</div>
			<FullScreen handle={succFSHandler} className="chartFullscreen">
				{/* Succession 單選地點 */}
				<select
					id="succLocationSelect"
					className="form-select form-select-sm"
					onChange={handleSuccLocationChange}
				>
				{nonDupLocations.map((location, lIdx) => {
					return (
						<option key={`succLocationOption-${lIdx}`} value={location}>{location}</option>
					);
				})}
				</select>
				{/* Succession */}
				<Line data={succData} options={succOptions} ref={succRef} />
			</FullScreen>
		</>
	);
}

export default Succession;
