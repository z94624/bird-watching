import Avatar from 'react-avatar';

import { infos } from './ebird-ebirders.js';
/*
 * 取得所有 eBirders 的某項資訊
 * key: eBirder 資訊欄位
 * duplicate: 重不重複
 */
export const getItems = (key, duplicate=false) => {
	// 收集所有資料
	let items = infos.reduce((arr, ele) => 
		arr.concat([ele[key]])
	, []);
	// 取不重複
	if (!duplicate) {
		items = [...(new Set(items))];
	}
	return items;
}
/*
 * 產生 React Rainbow Components 人物頭像圖示清單
 * 輸出：Avatar Component 列表
 */
export const eBirderInfosToRainbowAvatars = (handleAvatarIndexChange) => {
	return (
		<div id="ebAvatars" className="text-center">
			{infos.map((info, iIdx) => { // 對於每位 eBirder
				return (
					<Avatar
						key={`ebAvatar-${iIdx}`}
						className="eBirder"
						name={info['name']}
						value={iIdx.toString()}
						alt={info['name']}
						title={info['name']}
						size="100%" // 圖像大小
						round={true} // border-radius；number, true(100%), false(0%)
						src={info['avatar']} // 載入照片
						style={{padding: "10px"}}
						onClick={() => {handleAvatarIndexChange(iIdx);}}
					/>
				);
			})}
		</div>
	);
}
