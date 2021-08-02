import { useState } from 'react';

import { Tabset, Tab } from 'react-rainbow-components';

const EBirdCharts = () => {
	const [selectedTab, setSelectedTab] = useState("map");
	const handleSelectedTabChange = (tabName) => {
		setSelectedTab(tabName);
	}

	const getTabContent = () => {
		if (selectedTab === "map") {
			return (<div id="mapTab" aria-labelledby="map" className="text-white">map</div>);
		}
		if (selectedTab === "timeline") {
			return (<div id="timelineTab" aria-labelledby="timeline" className="text-white">timeline</div>);
		}
	}

	return (
		<div>
			<Tabset
				id="ebTabset"
				activeTabName={selectedTab.toString()}
				fullWidth={false}
				variant="card"
				onSelect={e => handleSelectedTabChange(e)}
			>
				<Tab
					id="map"
					label="地圖"
					name="map"
					ariaControls="mapTab"
				/>
				<Tab
					id="timeline"
					label="時間軸"
					name="timeline"
					ariaControls="timelineTab"
				/>
			</Tabset>

			{getTabContent()}
		</div>
	);
}

export default EBirdCharts;
