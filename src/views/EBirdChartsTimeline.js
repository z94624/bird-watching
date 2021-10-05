import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';

import { dataMergedByKeys } from './../utils/ebMetadata_dataExtraction';

const EBirdChartsTimeline = ({ avatarIndex }) => {
	// 資訊卡需要的資料
	let cardData = dataMergedByKeys(avatarIndex, ["Submission_ID"], ["Common_Name", "Count"], ["State_Province", "Location", "Date", "Time", "Number_of_Observers", "Breeding_Code", "Observation_Details"], true);
	
	return (
		<div id="timelineTab" aria-labelledby="timeline">
			{/* 時間線 */}
			<VerticalTimeline>
			{/* 資訊卡 */}
			{cardData.map(({Submission_ID, Date, Time, datetime, Location, State_Province, Number_of_Observers, Common_Name, Count, Breeding_Code, Observation_Details}, cIdx) => {
				let birds = Common_Name.map((name, nIdx) => [name, Count[nIdx]]).join(`|`);
				return (
					<VerticalTimelineElement
						key={`ebCard-${cIdx}`}
						className="vertical-timeline-element--work"
						contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
	    				contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
	    				date={datetime}
	    				iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
					>
						<h4 className="vertical-timeline-element-title">{Location}</h4>
						<h5 className="vertical-timeline-element-subtitle">{State_Province}</h5>
						<p>{birds}</p>
					</VerticalTimelineElement>
				)
			})}
			</VerticalTimeline>
		</div>
	);
}

export default EBirdChartsTimeline;
