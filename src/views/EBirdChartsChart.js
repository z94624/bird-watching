import { Line } from 'react-chartjs-2';

import { dataMergedByKeys } from './../utils/ebMetadata_dataExtraction';

const EBirdChartsChart = ({ avatarIndex }) => {
	// 圖表需要的資料
	let chartData = dataMergedByKeys(avatarIndex, ["Submission_ID"], ["Common_Name"], ["Date", "Time"], true, false);
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
	// 生涯鳥種數 圖表資料
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
				yAxisID: "y-axis-3"
			}
		]
	}
	// 生涯鳥種數 圖表設定
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
				},
				{
					type: "linear",
					display: true,
					id: "y-axis-3"
				}
			]
		}
	}

	return (
		<div id="chartTab" className="container-fluid" aria-labelledby="chart">
			{/* 生涯鳥種數 */}
			<div className="row">
				<Line data={liferData} options={liferOptions} />
			</div>
		</div>
	);
}

export default EBirdChartsChart;
