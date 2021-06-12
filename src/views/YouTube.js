import { useState } from 'react';

import { DatePicker } from 'react-rainbow-components';

const YouTube = () => {
	const [dateRange, setDateRange] = useState(new Date());

	return (
		<main>
			<div className="w-25 d-inline-block">
				<DatePicker
					selectionType="range"
					placeholder="單一日期 or 日期區間"
					value={dateRange}
					minDate={new Date(2020, 10, 26)}
					maxDate={new Date(2040, 11, 25)} // 依照 YouTube 賞鳥紀錄最新影片日期
					onChange={value => setDateRange(value)}
				/>
			</div>
			<div className="w-25 d-inline-block">
				
			</div>
		</main>
	);
}

export default YouTube;
