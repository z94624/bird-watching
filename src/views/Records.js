import { useState } from 'react';

import { itemsToRainbowSelectOptions } from './../utils/ytVideos_dataExtraction';
import { collectRecordsByBird } from './../utils/reMetadata_dataExtraction';
import { getItemsByKey } from './../utils/tools.js';
import './Records.css';
import birdRecordsInfo from './../utils/birdsInGoogleDrive/birdRecordsInfo.json';

const Records = () => {
	// 重複音檔鳥種
	const listBirds = getItemsByKey(birdRecordsInfo, 'bird', true);
	// 鳥種
	const [bird, setBird] = useState(listBirds[0]);
	const handleBirdChange = e => setBird(e.target.value);
	// 鳥種選項
	const birdSelect = itemsToRainbowSelectOptions(listBirds, "reBirdSelect", "鳥種", true, bird, handleBirdChange);
	// 該鳥種所有鳥音
	const recordsOfBird = collectRecordsByBird(bird);

	return (
		<main className="main h-100">
			{/* 鳥音容器 */}
			<div id="recordsContainer" className="h-100">
				{/* 鳥種選擇容器 */}
				<div id="reBirdSelectContainer" className="row">{birdSelect}</div>
				{/* 鳥音列表 */}
				<div id="reRecordsTable" className="row">
					
				</div>
			</div>
		</main>
	);
}

export default Records;