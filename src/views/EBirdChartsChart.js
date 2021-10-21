import { useState } from 'react';

import { Line } from 'react-chartjs-2';

import { dataMergedByKeys } from './../utils/ebMetadata_dataExtraction';

const EBirdChartsChart = ({ avatarIndex }) => {
	// 圖表需要的資料
	let chartData = dataMergedByKeys(avatarIndex, ["Submission_ID"], ["Common_Name", "Count"], ["Date", "Time", "Location"], true, false);
	//console.log(chartData);
	// (重複)所有地點
	let locations = chartData.reduce((arr, ele) => {
		return [...arr, ele["Location"][0]];
	}, []);
	// (不重複)所有地點
	let nonDupLocations = [...new Set(locations)];
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
		obj["dates"] = [...obj["dates"], ele["Date"]];
		return obj;
	}, {"birdSpecies": [], "accuBirdNumbers": [], "diffBirdNumbers": [], "eachBirdNumbers": [], "dates": []});
	// Lifer 圖表資料
	let liferData = {
		labels: liferRawData["dates"], // x-axis
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
		}
	}
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
	
	return (
		<div id="chartTab" className="container-fluid" aria-labelledby="chart">
			{/* 生涯鳥種數 */}
			<div className="row">
				<Line data={liferData} options={liferOptions} />
			</div>
			{/* 地點的鳥種數隨時變化 */}
			<div className="row">
				{/* Succession 單選地點 */}
				<select
					id="succLocationSelect"
					className="form-select"
					onChange={handleSuccLocationChange}
				>
				{nonDupLocations.map((location, lIdx) => {
					return (
						<option key={`succLocationOption-${lIdx}`} value={location}>{location}</option>
					);
				})}
				</select>
			</div>
		</div>
	);
}

export default EBirdChartsChart;
