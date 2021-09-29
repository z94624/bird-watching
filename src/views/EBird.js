import { useState } from 'react';

import { Drawer } from 'react-rainbow-components';
import Avatar from 'react-avatar';

import { infos } from './../utils/ebird-ebirders.js';
import { eBirderInfosToRainbowAvatars } from './../utils/ebEbirders_dataExtraction';
import EBirdCharts from './EBirdCharts';
import Footer from './../components/Footer';
import './EBird.css';

const EBird = () => {
	// eBirder 抽屜的開合
	const [drawerOpen, setDrawerOpen] = useState(false);
	// 先從 LocalStorage 尋找是否有哪位 eBirder
	const storageAvatar = parseInt(localStorage.getItem('avatarIndex')) || 0;
	// eBirder 列表
	const [avatarIndex, setAvatarIndex] = useState(storageAvatar);
	const handleAvatarIndexChange = (index) => {
		setAvatarIndex(index);
		setDrawerOpen(false); // 選擇完 eBirder 後，收合 Drawer
		/*
         * localStorage 是瀏覽器提供給各網站的一個儲存空間
         * >>> Browser > Application > Local Storage
         * setItem(keyName, keyValue) / getItem(keyName) / removeItem(keyName) / clear()
         */
        localStorage.setItem('avatarIndex', index);
	}
	const avatars = eBirderInfosToRainbowAvatars(handleAvatarIndexChange);
	// eBirder 個人資料
	const eBirderInfo = infos[avatarIndex];

	return (
		<main className="h-100 px-3">
			<div id="ebDrawerContainer">
				{/* eBirder 抽屜開關 */}
				<div
					id="ebDrawerBtn"
					onClick={() => setDrawerOpen(true)}
				>
					<Avatar
						name={eBirderInfo['name']}
						alt={eBirderInfo['name']}
						title={eBirderInfo['name']}
						size="70"
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
			<EBirdCharts avatarIndex={avatarIndex} />

			<Footer />
		</main>
	);
}

export default EBird;
