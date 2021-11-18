import { useMemo } from 'react';

import { Chart } from 'react-chartjs-2';
import zoomPlugin from 'chartjs-plugin-zoom';

import { dataMergedByKeys } from './../utils/ebMetadata_dataExtraction';

import Lifer from './EBirdChartsChart_Lifer.js';
import Succession from './EBirdChartsChart_Succ.js';
import Hotspot from './EBirdChartsChart_Hot.js';
import MNBS from './EBirdChartsChart_MNBS.js';

Chart.register(zoomPlugin);

const EBirdChartsChart = ({ avatarIndex }) => {
	// 圖表需要的資料
	let chartData = useMemo(() => dataMergedByKeys(avatarIndex, ["Submission_ID"], ["Common_Name", "Count"], ["Date", "Time", "Location"], true, false), [avatarIndex]);
	//console.log(chartData);
	// 所有日期地點
	let dupInfos = chartData.reduce((obj, ele) => {
		obj["locations"] = [...obj["locations"], ele["Location"][0]];
		obj["dates"] = [...obj["dates"], ele["Date"][0]];
		return obj;
	}, {locations: [], dates: []});
	const {
		locations, // (重複)所有地點
		dates // (重複)所有日期
	} = dupInfos;
	// (不重複)所有地點
	let nonDupLocations = [...new Set(locations)];

	return (
		<div id="chartTab" className="container-fluid" aria-labelledby="chart">
			{/* 鳥種數隨時間累計 */}
			<div className="row mt-3 chart">
				<Lifer chartData={chartData} dates={dates} />
			</div>
			{/* 鳥隻數隨時間變化 */}
			<div className="row mt-3 chart">
				<Succession chartData={chartData} locations={locations} nonDupLocations={nonDupLocations} />
			</div>
			{/* 所有地點的賞鳥次數 */}
			<div className="row mt-3 chart">
				<Hotspot locations={locations} />
			</div>
			{/* 所有年份在各個月份的鳥種數 */}
			<div className="row mt-3 chart">
				<MNBS chartData={chartData} dates={dates} />
			</div>
		</div>
	);
}

export default EBirdChartsChart;
