import { useState, useRef } from 'react';

import { DatePicker, Select } from 'react-rainbow-components';

import { getItems, itemsToRainbowOptions, vidsToVideoCards } from './../utils/ytVideos_dataExtraction';
import ScrollTopArrow from './../components/ScrollTopArrow';
import './YouTube.css';

const YouTube = () => {
	const [dateRange, setDateRange] = useState(new Date());

	const locations = getItems('location');
	const locationOptions = itemsToRainbowOptions(locations);

	const birds = getItems('bird');
	const birdOptions = itemsToRainbowOptions(birds);

	const vids = getItems('vid');
	const fullDates = getItems('date', true);
	const fullLocations = getItems('location', true);
	const fullBirds = getItems('bird', true);
	const videoCards = vidsToVideoCards(vids, fullDates, fullLocations, fullBirds);

	const [showScroll, setShowScroll] = useState(false);
	// useRef for ytMain?
	const handleScrollTop = () => {
		let ytMain = document.getElementById("ytMain");
		if (!showScroll && ytMain.scrollTop > 400) {
			setShowScroll(true);
		} else if (showScroll && ytMain.scrollTop <= 400) {
			setShowScroll(false);
		}
	}

	return (
		<main id="ytMain" className="h-100" onScroll={handleScrollTop}>
			<div className="sortPanel w-100 d-inline-flex justify-content-evenly my-3 pb-3 sticky-top">
				<div className="w-25">
					<DatePicker
						formatStyle="medium"
						label="日期"
						labelAlignment="left"
						hideLabel={false}
						id="ytDatePicker"
						isCentered={true}
						locale="tw"
						maxDate={new Date(2040, 11, 25)} // 依照 YouTube 賞鳥紀錄最新影片日期
						minDate={new Date(2020, 10, 26)}
						onChange={value => setDateRange(value)}
						placeholder="單一日期 或 日期區間"
						selectionType="range"
						value={dateRange}
					/>
				</div>
				<div className="w-25">
					<Select
						label="地點"
						labelAlignment="left"
						hideLabel={false}
						id="ytLocationSelect"
						options={locationOptions}
					/>
				</div>
				<div className="w-25">
					<Select
						label="鳥種"
						labelAlignment="left"
						hideLabel={false}
						id="ytBirdSelect"
						options={birdOptions}
					/>
				</div>
			</div>
			
			{videoCards}

			<ScrollTopArrow showScroll={showScroll} />
		</main>
	);
}

export default YouTube;
