import { useState } from 'react';

import { DatePicker } from 'react-rainbow-components';

import { getItems, itemsToRainbowMultiSelectOptions, vidsToVideoCards } from './../utils/ytVideos_dataExtraction';
import ScrollTopArrow from './../components/ScrollTopArrow';
import './YouTube.css';
// Rainbow MultiSelect 的輸出簡化為值陣列
const multiSelectOutputToValues = multiSelectOutput => {
	return multiSelectOutput.reduce((arr, ele) => {
		return arr.concat([ele.value]);
	}, []);
}
// 捲動頁面立即暫停所有播放中的影片
const pauseVideos = playingVideos => {
	for (let i = 0; i < playingVideos.length; i++) {
		playingVideos[i].pauseVideo();
	}
}
// 收集播放中的影片
var playingVideos = []; // 播放中的影片清單
const handleVideoPlay = target => { // 當影片播放
	playingVideos.push(target); // 加入播放中影片
}
const handleVideoStop = target => { // 當影片暫停或結束
	let index = playingVideos.indexOf(target);
	playingVideos.splice(index, 1); // 從播放中影片清單移除
}

const YouTube = ({scrollToElement}) => {
	// 使用者設定所有篩選參數的值
	var userDates = [], userLocations = [], userBirds = [];
	const handleUserChange = () => {
		let filterVids = [], filterDates = [], filterLocations = [], filterBirds = [];
		for (let i = 0; i < fullVids.length; i++) { // 從所有影片來篩選
			let fullVid = fullVids[i], fullDate = fullDates[i], fullLocation = fullLocations[i], fullBird = fullBirds[i];
			if ((!userDates.length || userDates.includes(fullDate)) && (!userLocations.length || userLocations.includes(fullLocation)) && (!userBirds.length || userBirds.includes(fullBird))) { // (若無設定篩選則通過 || 若有則篩選)
				filterVids.push(fullVid);
				filterDates.push(fullDate);
				filterLocations.push(fullLocation);
				filterBirds.push(fullBird);
			}
		}
		// 經過篩選後剩下的影片
		let filterVideoCards = vidsToVideoCards(filterVids, filterDates, filterLocations, filterBirds, handleVideoPlay, handleVideoStop);
		setVideoCards(filterVideoCards);
	}
	// 篩選參數：日期
	const [dateRange, setDateRange] = useState(new Date());
	// 篩選參數：地點
	const [locations, setLocations] = useState([]); // 多選地點清單
	const handleLocationsChange = userLocationObjects => {
		setLocations(userLocationObjects); // 更新地點篩選值(物件陣列)
		userLocations = multiSelectOutputToValues(userLocationObjects); // 更新地點篩選值(值陣列)
		handleUserChange(); // 更新符合的影片
	}
	const listLocations = getItems('location'); // 不重複地點
	const locationMultiSelect = itemsToRainbowMultiSelectOptions(listLocations, "ytLocationMultiSelect", "地點", locations, handleLocationsChange, "賞鳥地點"); // 地點篩選選項
	// 篩選參數：鳥種
	const [birds, setBirds] = useState([]); // 多選鳥種清單
	const listBirds = getItems('bird'); // 不重複鳥種
	const birdMultiSelect = itemsToRainbowMultiSelectOptions(listBirds, "ytBirdMultiSelect", "鳥種", birds, setBirds, "觀賞鳥種"); // 鳥種篩選選項
	// 影片列表
	const fullVids = getItems('vid', true); // 所有重複影片 ID
	const fullDates = getItems('date', true); // 所有重複日期
	const fullLocations = getItems('location', true); // 所有重複地點
	const fullBirds = getItems('bird', true); // 所有重複鳥種
	const fullVideos = vidsToVideoCards(fullVids, fullDates, fullLocations, fullBirds, handleVideoPlay, handleVideoStop); // 所有重複影片
	const [videoCards, setVideoCards] = useState(fullVideos);
	// 滾動至頂按鈕
	const [showScroll, setShowScroll] = useState(false); // 顯示狀態
	const handleScrollTop = target => { // 改變顯示狀態
		if (!showScroll && target.scrollTop > 500) { // 頁面捲動 500px 後，顯示按鈕
			setShowScroll(true);
		} else if (showScroll && target.scrollTop <= 500) { // 頁面捲動接近頂端，隱藏按鈕
			setShowScroll(false);
		}
	}
	// 最新日期作為日期篩選上限
	const latestDateYMD = fullDates[0][0].split('-');
	const latestYear = parseInt(latestDateYMD[0]);
	const latestMonth = parseInt(latestDateYMD[1]);
	const latestDay = parseInt(latestDateYMD[2]);

	return (
		<main className="h-100" onScroll={e => {
			handleScrollTop(e.target);
			pauseVideos(playingVideos);
		}}>
			{/* 篩選參數區域 */}
			<div className="sortPanel w-100 d-inline-flex justify-content-evenly pb-3 sticky-top row">
				<div className="col-sm-4">
					{/* 日期選擇器 */}
					<DatePicker
						id="ytDatePicker"
						formatStyle="medium" // 顯示於框格中的日期格式；small, medium, large
						label="日期" // 標題
						labelAlignment="left" // 標題位置；left, center, right
						hideLabel={false} // 標題顯示；boolean
						isCentered={true} // 框格中的提示位置；boolean
						locale="tw" // 地區；預設為瀏覽器語言
						maxDate={new Date(latestYear, latestMonth-1, latestDay)} // 依照 YouTube 賞鳥紀錄最新影片日期
						minDate={new Date(2020, 10, 26)} // 第一部影片日期
						onChange={value => setDateRange(value)} // 更新日期狀態
						placeholder="單一日期 或 日期區間" // 框格中的提示內容
						selectionType="range" // 日期模式；single, range
						value={dateRange} // 日期的值
					/>
				</div>
				<div className="col-sm-4">
					{locationMultiSelect}
				</div>
				<div className="col-sm-4">
					{birdMultiSelect}
				</div>
			</div>
			{/* 影片區域 */}
			<div id="ytVideosContainer">
				{videoCards}
			</div>
			{/* 滾動至頂按鈕 */}
			<ScrollTopArrow showScroll={showScroll} scrollToElement={() => scrollToElement(document.getElementById("ytVideosContainer"))} />
		</main>
	);
}

export default YouTube;
