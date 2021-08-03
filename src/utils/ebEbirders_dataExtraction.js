import Avatar from 'react-avatar';

import { infos } from './ebird-ebirders.js';
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
