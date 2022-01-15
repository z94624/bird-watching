import { Select, MultiSelect, Option } from 'react-rainbow-components';
import FadeIn from 'react-fade-in';

import YoutubeVideo from './../components/YoutubeVideo';
/*
 * 產生 React Rainbow Components 選單的選項
 * items: 一階陣列資料
 * 輸出：產生選項所需資料
 */
export const itemsToRainbowSelectOptions = (items, id, label, hideLabel=false, value, onChange, hasDefault=false) => {
	let allOption = { value: "*全部", label: "*全部" }; // 預設值
	let options = items.reduce((arr, ele) => 
		arr.concat([{ value: ele, label: ele }])
	, []);
	return (
		<Select
			id={id}
			label={label}
			labelAlignment="left"
			hideLabel={hideLabel}
			options={hasDefault ? [...options, allOption] : options}
			value={value}
			onChange={onChange}
			variant="default" // 篩選框 style；default, shaded
		/>
	);
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
		<FadeIn className="d-flex flex-row flex-wrap justify-content-center py-2" childClassName="ytVideoContainer m-2" delay="77" transitionDuration="777" wrapperTag="div" childTag="div" visible={true}>
		{/* 所有影片為了百葉窗動畫放在一起 */}
		{vids.map((vid, vIdx) => {
			let date = dates[vIdx];
			let location = locations[vIdx];
			let bird = birds[vIdx];
			return (
				<div key={`ytVideo-${vIdx}`} className={`${date} ${location} ${bird}`}>
					<div className="card">
						<div className="card-header"> {/* 影片標題 */}
							{date + " / " + location + " / " + bird}
						</div>
						<div className="card-body p-0"> {/* 影片內容 */}
							<YoutubeVideo videoId={vid} videoLid="" handleVideoPlay={handleVideoPlay} handleVideoStop={handleVideoStop} />
						</div>
					</div>
				</div>
			);
		})}
		</FadeIn>
	);
}
