import { useState } from 'react';

import { Drawer } from 'react-rainbow-components';
import Avatar from 'react-avatar';

import './EBird.css';
import avatar1 from './../images/avatar1.JPG';
import avatar2 from './../images/avatar2.JPG';

const EBird = () => {
	// eBirder 抽屜的開合
	const [drawerOpen, setDrawerOpen] = useState(false);

	return (
		<main className="h-100">
			<div id="ebDrawerContainer">
				{/* eBirder 抽屜開關 */}
				<div
					id="ebDrawerBtn"
					className="float-start"
					onClick={() => setDrawerOpen(true)}
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="rgba(1,182,245,1)" className="bi bi-person-circle" viewBox="0 0 16 16">
						<path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
						<path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
					</svg>
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
					<div id="ebAvatars" className="text-center">
						<Avatar
							className="eBirder"
							name="黃健峯"
							alt="黃健峯"
							title="黃健峯"
							color="#5EA9FF" // 文字圖像背景顏色；hexCode
							fgColor="#FFFFFF" // 文字圖像字體顏色；hexCode
							size="100%" // 圖像大小
							textSizeRatio={3} // 字體大小佔比=總大小/字體大小
							textMarginRatio={.15} // 字體 margin 比例
							round={true} // border-radius；number, true(100%), false(0%)
							src={avatar1} // 載入照片
							style={{padding: "10px"}}
							onClick={() => {}}
						/>
						<Avatar
							className="eBirder"
							name="林芬雯"
							alt="林芬雯"
							title="林芬雯"
							color="#F4B9FF"
							fgColor="#FFFFFF"
							size="100%"
							textSizeRatio={3}
							textMarginRatio={.15}
							round={true}
							src={avatar2}
							style={{padding: "10px"}}
							onClick={() => {}}
						/>
					</div>
				</Drawer>
			</div>
		</main>
	);
}

export default EBird;
