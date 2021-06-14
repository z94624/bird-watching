import { useState } from 'react';

import { DatePicker, Select } from 'react-rainbow-components';

import { getItems, itemsToRainbowOptions } from './../utils/ytVideos_dataExtraction';

const YouTube = () => {
	const [dateRange, setDateRange] = useState(new Date());

	const locations = getItems('location');
	const locationOptions = itemsToRainbowOptions(locations);

	const birds = getItems('bird');
	const birdOptions = itemsToRainbowOptions(birds);

	return (
		<main className="h-100">
			<div className="w-25 d-inline-block">
				<DatePicker
					formatStyle="medium"
					hideLabel={true}
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
			<div className="w-25 d-inline-block">
				<Select
					hideLabel={true}
					id="ytLocationSelect"
					options={locationOptions}
				/>
			</div>
			<div className="w-25 d-inline-block">
				<Select
					hideLabel={true}
					id="ytBirdSelect"
					options={birdOptions}
				/>
			</div>
		</main>
	);
}

export default YouTube;
