import { useState } from 'react';

import { DatePicker } from 'react-rainbow-components';

import { getItemsByKey } from './../utils/tools.js';
import './Photos.css';
import birdPhotosInfo from './../utils/birdPhotosInfo.json';

const Photos = () => {
	// 篩選參數：日期
	const [userDate, setUserDate] = useState(new Date()); // 單選日期或日期區間
	const handleDateChange = userDate => {
		setUserDate(userDate); // 更新日期篩選值(物件陣列)
		//handleUserChange(); // 更新符合的影片
	}
	// 不重複照片日期
	const listDates = getItemsByKey(birdPhotosInfo, 'date');
	// 降冪照片日期
	const descendingDates = listDates.sort((a, b) => new Date(a).getTime() < new Date(b).getTime() ? 1 : -1);
	// 最新日期作為日期篩選上限
	const latestDateYMD = descendingDates[0].split('/');
	const latestYear = parseInt(latestDateYMD[2]);
	const latestMonth = parseInt(latestDateYMD[0]);
	const latestDay = parseInt(latestDateYMD[1]);

	return (
		<main className="main h-100">
			{/* 相片容器 */}
			<div id="photosContainer" className="h-100">
				{/* 日期選擇器 */}
				<DatePicker
					id="phDatePicker"
					formatStyle="large" // 顯示於框格中的日期格式；small, medium, large
					label="日期" // 標題
					labelAlignment="left" // 標題位置；left, center, right
					hideLabel={true} // 標題顯示；boolean
					isCentered={true} // 框格中的提示位置；boolean
					locale="tw" // 地區；預設為瀏覽器語言
					maxDate={new Date(latestYear, latestMonth-1, latestDay)} // 依照 YouTube 賞鳥紀錄最新影片日期
					minDate={new Date(2019, 9, 17)} // 第一部影片日期
					onChange={value => handleDateChange(value)} // 更新日期狀態
					placeholder="請選擇日期" // 框格中的提示內容
					selectionType="single" // 日期模式；single, range
					value={userDate} // 日期的值
				/>
			</div>
		</main>
	);
}

export default Photos;