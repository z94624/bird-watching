import { useState } from 'react';

import { Tabset, Tab } from 'react-rainbow-components';

import EBirdChartsMap from './EBirdChartsMap';

const EBirdCharts = ({ avatarIndex }) => {
	// 選擇的分頁
	const [selectedTab, setSelectedTab] = useState("map");
	const handleSelectedTabChange = (tabName) => {
		setSelectedTab(tabName);
	}
	// 分頁的內容
	const getTabContent = () => {
		if (selectedTab === "map") { // 地圖分頁
			return (<EBirdChartsMap avatarIndex={avatarIndex} />);
		} else if (selectedTab === "timeline") { // 時間軸分頁
			return (<div id="timelineTab" aria-labelledby="timeline">timeline</div>);
		}
	}

	return (
		<div id="ebTabsetContainer">
			<Tabset
				id="ebTabset"
				activeTabName={selectedTab} // 分頁名字；<Tab name>
				fullWidth={false} // 是否伸展佔滿空間；true, false
				variant="line" // 分頁外觀；card, line
				onSelect={(e, tabName) => handleSelectedTabChange(tabName)}
			>
				{/* 留位置給 eBirder 抽屜開關 */}
				<Tab
					id="blank"
					label=""
					name="blank"
					ariaControls="blankTab"
					disabled={true}
				/>
				<Tab
					id="map" // 分頁內容的 aria-labelledby
					label="地圖" // 分頁顯示名稱
					name="map" // 給 <Tabset onSelect> 配對的
					ariaControls="mapTab" // 分頁內容的 id
				/>
				<Tab
					id="timeline"
					label="時間軸"
					name="timeline"
					ariaControls="timelineTab"
				/>
			</Tabset>
			{/* 分頁內容 */}
			{getTabContent()}
		</div>
	);
}

export default EBirdCharts;
