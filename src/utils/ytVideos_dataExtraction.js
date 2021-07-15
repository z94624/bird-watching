import { MultiSelect, Option } from 'react-rainbow-components';

import youTubeVideosData from './youtube-videos.json';
import YoutubeVideo from './../components/YoutubeVideo';
/*
 * 取得所有影片的某項資訊
 * key: 影片資訊欄位
 * duplicate: 重不重複
 * chunk: 配合 BS Grid System 進行資料分組
 * (chunk=false) 輸出：[a, b, c, ...]
 * (chunk=true) 輸出：[[a, b, c], [...], ...]
 */
export const getItems = (key, duplicate=false, chunk = false) => {
	// 收集所有資料
	let items = youTubeVideosData.reduce((arr, ele) => 
		arr.concat([ele[key]])
	, []);
	// 取不重複
	if (!duplicate) {
		items = [...(new Set(items))];
	}
	// 資料分組
	if (chunk) {
		items = arrayToChunks(items, 6);
	}
	return items;
}
/*
 * 陣列元素分組
 * arr: 一階陣列
 * size: 每組元素個數
 * 輸出：二階陣列
 */
const arrayToChunks = (arr, size) => {
	var chunkedArray = [];
	while (arr.length) {
		chunkedArray.push(arr.splice(0, size));
	}
	return chunkedArray;
}
/*
 * 產生 React Rainbow Components 選單的選項
 * items: 一階陣列資料
 * 輸出：產生選項所需資料
 */
export const itemsToRainbowSelectOptions = (items) => {
	let allOption = { value: "*全部", label: "*全部" }; // 預設值
	return items.reduce((arr, ele) => 
		arr.concat([{ value: ele, label: ele }])
	, [allOption]);
}
/*
 * 產生 React Rainbow Components 多選選單的選項
 * items: 一階陣列資料
 * 輸出：產生多選選項
 */
export const itemsToRainbowMultiSelectOptions = (items, id, label, value, onChange, placeholder) => {
	return (
		<MultiSelect
			id={id}
			label={label}
			labelAlignment="left"
			hideLabel={false}
			isLoading={false} // 選項載入中圖示
			value={value}
			onChange={onChange}
			placeholder={placeholder}
			variant="default" // 篩選框 style；default, chip, bare
			chipVariant="brand" // 選擇結果 style；base, neutral, outline-brand, brand
			showCheckbox
		>
			{items.map((item, iIdx) => (
				<Option key={`ytMultiSelect-${iIdx}`} name={`option-${iIdx}`} label={item} value={item} />
			))}
		</MultiSelect>
	);
}
/*
 * 建立所有影片卡片
 * vids: 所有影片 ID
 * dates: 所有影片日期
 * locations: 所有影片地點
 * birds: 所有影片鳥種
 * 輸出：Responsive YouTube Video Cards
 */
export const vidsToVideoCards = (vids, dates, locations, birds, handleVideoPlay, handleVideoStop) => { // 暫時 birds/dates，可改其他做 header
	return (
		<div id="ytVideosContainer">
			{/* 每列的影片 */}
			{vids.map((row, rIdx) => (
				<div key={`ytVideo-row-${rIdx}`} className="row m-2">
				{/* 每支影片 */}
				{row.map((vid, vIdx) => {
					let date = dates[rIdx][vIdx];
					let location = locations[rIdx][vIdx];
					let bird = birds[rIdx][vIdx];
					return (
						<div key={`ytVideo-${vIdx}`} className={`ytVideoContainer col-lg-2 col-md-4 col-sm-6 p-2 ${date} ${location} ${bird}`}>
							<div className="card">
								<div className="card-header"> {/* 影片標題 */}
									{date + " / " + location + " / " + bird}
								}
								</div>
								<div className="card-body p-0"> {/* 影片內容 */}
									<YoutubeVideo videoId={vid} videoLid="" handleVideoPlay={handleVideoPlay} handleVideoStop={handleVideoStop} />
								</div>
							</div>
						</div>
					);
				})}
				</div>
			))}
		</div>
	);
}
