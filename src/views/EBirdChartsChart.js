import { Line } from 'react-chartjs-2';

import { dataMergedByKeys } from './../utils/ebMetadata_dataExtraction';

const EBirdChartsChart = ({ avatarIndex }) => {
	// 圖表需要的資料
	let chartData = dataMergedByKeys(avatarIndex, ["Submission_ID"], ["Common_Name"], ["Date", "Time"], true, false);
	// Lifer 需要的資料
	let liferRawData = chartData.reduce((obj, ele, idx) => {
		if (idx === 0) {
			obj["birdSpecies"] = ele["Common_Name"];
			obj["birdNumbers"] = [obj["birdSpecies"].length];
			obj["dates"] = [ele["datetime"]];
		} else {
			let diffBirdSpecies = ele["Common_Name"].filter(newBS => !obj["birdSpecies"].includes(newBS));
			obj["birdSpecies"] = [...obj["birdSpecies"], ...diffBirdSpecies];
			obj["birdNumbers"] = [...obj["birdNumbers"], obj["birdSpecies"].length];
			obj["dates"] = [...obj["dates"], ele["datetime"]];
		}
		return obj;
	}, {});
	let liferData = {
		labels: liferRawData["dates"],
		datasets: [
			{
				label: "生涯鳥種數",
				data: liferRawData["birdNumbers"],
				fill: false,
				backgroundColor: "rgb(255, 99, 132)",
				borderColor: "rgba(255, 99, 132, 0.2)"
			}
		]
	}
	let liferOptions = {
		scales: {
			yAxes: [
				{
					ticks: {
						beginAtZero: true
					}
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
