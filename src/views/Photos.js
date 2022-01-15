import { useState } from 'react';

import Draggable from 'react-draggable';

import { itemsToRainbowSelectOptions } from './../utils/ytVideos_dataExtraction';
import { collectPhotosByDate } from './../utils/phMetadata_dataExtraction';
import { getItemsByKey } from './../utils/tools.js';
import './Photos.css';
import birdPhotosInfo from './../utils/birdPhotosInfo.json';

const Photos = () => {
	// 不重複照片日期
	const listDates = getItemsByKey(birdPhotosInfo, 'date');
	// 照片日期降冪
	const descendingDates = listDates.sort((a, b) => new Date(a).getTime() < new Date(b).getTime() ? 1 : -1);
	// 照片日期調整格式
	// const formattedDates = descendingDates.map(oldDate => {
	// 	let dateYMD = new Date(oldDate).toLocaleDateString('zh-tw').split('/');
	// 	let year = dateYMD[0];
	// 	let month = dateYMD[1].padStart(2, '0');
	// 	let day = dateYMD[2].padStart(2, '0');
	// 	return `${year}/${month}/${day}`;
	// });
	// 日期
	const [date, setDate] = useState(descendingDates[0]);
	const handleDateChange = e => {
		// let dateYMD = e.target.value.split('/');
		// let year = dateYMD[0];
		// let month = parseInt(dateYMD[1]);
		// let day = parseInt(dateYMD[2]);
		// setDate(`${month}/${day}/${year}`);
		setDate(e.target.value);
	}
	// 日期選項
	const dateSelect = itemsToRainbowSelectOptions(descendingDates, "phDateSelect", "日期", true, date, handleDateChange);
	// 該日期所有照片
	const photosOfDate = collectPhotosByDate(date);

	return (
		<main className="main h-100">
			{/* 相片容器 */}
			<div id="photosContainer" className="h-100">
				{/* 日期選擇容器 */}
				<div id="phDateSelectContainer">{dateSelect}</div>
				{/* 相片藝廊 */}
				<div id="phPhotosGallery" className="flex-wrap p-3">
				{/* 照片 */}
				{photosOfDate.map((photo, pIdx) => (
					// 可拖曳
					<Draggable
						key={`phPhoto-${pIdx}`}
						bounds="body"
					>
						{/* 拍立得 */}
						<div className="polaroid">
							{/* thumbnail: 檔案小；uc: 原檔 */}
							<img src={`https://drive.google.com/thumbnail?id=${photo}`} alt={photo} />
						</div>
					</Draggable>
				))}
				</div>
			</div>
		</main>
	);
}

export default Photos;
