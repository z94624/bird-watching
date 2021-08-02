import { useState } from 'react';

import { Drawer } from 'react-rainbow-components';
import Avatar from 'react-avatar';

import { infos } from './../utils/ebird-ebirders.js';
import { eBirderInfosToRainbowAvatars } from './../utils/ebEbirders_dataExtraction';
import EBirdCharts from './EBirdCharts';
import './EBird.css';

const EBird = () => {
	// eBirder 抽屜的開合
	const [drawerOpen, setDrawerOpen] = useState(false);
	// eBirder 列表
	const [avatarIndex, setAvatarIndex] = useState(0);
	const handleAvatarIndexChange = (index) => {
		setAvatarIndex(index);
		setDrawerOpen(false); // 選擇完 eBirder 後，收合 Drawer
	}
	const avatars = eBirderInfosToRainbowAvatars(handleAvatarIndexChange);
	// eBirder 個人資料
	const eBirderInfo = infos[avatarIndex];

	return (
		<main className="h-100">
			<div id="ebDrawerContainer">
				{/* eBirder 抽屜開關 */}
				<div
					id="ebDrawerBtn"
					className="float-start"
					onClick={() => setDrawerOpen(true)}
				>
					<Avatar
						name={eBirderInfo['name']}
						alt={eBirderInfo['name']}
						title={eBirderInfo['name']}
						size="50"
						round={true}
						src={eBirderInfo['avatar']}
					/>
				</div>
				{/* eBirder 抽屜 */}
				<Drawer
					id="ebDrawer"
					className="bg-dark"
					footer="" // 結尾；text, Component
					header="eBirders"
					hideCloseButton={false} // 關閉按鈕(叉叉)
					isOpen={drawerOpen} // 開合狀態
					size="small" // 寬度；small, medium, large, full
					slideFrom="left" // 從何方向展開；left, right
					onRequestClose={() => setDrawerOpen(false)} // 在"點擊叉叉"或"按 ESC"或"點擊抽屜外"的動作
				>
					{/* eBirders */}
					{avatars}
				</Drawer>
			</div>
			{/* 圖表區 */}
			<EBirdCharts />
		</main>
	);
}

export default EBird;
