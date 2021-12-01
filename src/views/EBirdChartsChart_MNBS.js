import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { Bar } from 'react-chartjs-2';

import { getRandomColor } from './../utils/tools';
import { FullScreenButton } from './../components/ToolBox';

const MNBS = ({ chartData, dates }) => {
	// {2021:{1:[...],2:[...],...},2022:{...},...}
	let mnbsEmptyData = {};
	for (let year = dates[0].split('-')[0]; year <= dates[dates.length-1].split('-')[0]; year++) {
		let mnbs = {};
		for (let month = 1; month <= 12; month++) {
			mnbs[month] = [];
		}
		mnbsEmptyData[year] = mnbs;
	}
	// Monthly number of bird species 需要的資料
	let mnbsRawData = chartData.reduce((obj, ele) => {
		let dateElements = ele["Date"][0].split('-');
		let year = parseInt(dateElements[0]);
		let month = parseInt(dateElements[1]);
		obj[year][month] = [...obj[year][month], ...ele["Common_Name"]];
		return obj;
	}, mnbsEmptyData);
	// Monthly number of bird species 圖表資料
	let mnbsData = {
		labels: Array.from({length: 12}, (ele, idx) => {
		   return new Date(null, idx+1, null).toLocaleDateString("tw", {month: "short"});
		}), // x-axis
		datasets: Object.entries(mnbsRawData).reduce((arr, [year, mnbs]) => {
			let color = getRandomColor(); // 隨機顏色
			let dataset = { // 每一年所有月份資料
				label: year,
				data: Object.values(mnbs).map(bs => (new Set(bs)).size),
				backgroundColor: color.replace(",1)", ",.8)"),
				borderColor: color,
				borderWidth: 2
			}
			return [...arr, dataset];
		}, [])
	}
	// Monthly number of bird species 圖表設定
	let mnbsOptions = {
		scales: {
			yAxes: [
				{
					ticks: {
			        	beginAtZero: true,
			        }
				}
			]
		}
	}
	// Monthly number of bird species 全螢幕處理器
	const mnbsFSHandler = useFullScreenHandle();

	return (
		<>
			<div style={{position: "relative"}}>
				{/* 標題 */}
				<h6 className="text-white text-start m-0 chartTitle">
					<span className="border border-white border-3 p-1 chartTitleContent">所有年份在各個月份的鳥種數</span>
				</h6>
				{/* 小工具 */}
				<div className="btn-group position-absolute top-0 end-0" role="group" aria-label="mnbs">
					<FullScreenButton fullscreenHandler={mnbsFSHandler} absolutePosition={false} />
				</div>
			</div>
			<FullScreen handle={mnbsFSHandler} className="chartFullscreen">
				{/* Monthly number of bird species */}
				<Bar data={mnbsData} options={mnbsOptions} />
			</FullScreen>
		</>
	);
}

export default MNBS;
