import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';

import { dataMergedByKeys } from './../utils/ebMetadata_dataExtraction';
// 時間軸節點圖示
import timelineImg from './../images/timeline-icon.png';
// 第 ? 點
import point1 from './../images/point/point1.png';
import point2 from './../images/point/point2.png';
import point3 from './../images/point/point3.png';

const EBirdChartsTimeline = ({ avatarIndex }) => {
	// 資訊卡需要的資料
	let cardData = dataMergedByKeys(avatarIndex, ["Submission_ID"], ["Common_Name", "Count"], ["Location", "Date", "Time", "Number_of_Observers", "Breeding_Code", "Observation_Details"], true);
	
	return (
		<div id="timelineTab" aria-labelledby="timeline">
			{/* 時間線 */}
			<VerticalTimeline>
			{/* 資訊卡 */}
			{cardData.map(({Submission_ID, Date, Time, datetime, Location, Number_of_Observers, Common_Name, Count, Breeding_Code, Observation_Details, timeline}, cIdx) => (
				<VerticalTimelineElement
					key={`ebCard-${cIdx}`}
					contentStyle={{ background: 'rgba(255, 255, 255, .1)', color: '#fff' }}// 內容箭頭樣式
    				date={datetime} // 時間點
    				iconStyle={{ background: '#fff' }} // 節點樣式
    				icon={(<img src={timelineImg} style={{ width: '100%', height: '100%' }} />)} // 節點圖示
				>
					{/* 地點 */}
					<h5 className="">【{Location}】</h5>
					{/* 額外資訊 */}
					<div className="d-flex justify-content-around">
						<div>
							<img className="point me-2" src={point1} alt="•" />
							<span className="align-middle">賞鳥人數：{Number_of_Observers}</span>
						</div>
						<div>
							<img className="point me-2" src={point2} alt="•" />
							<span className="align-middle">鳥類行為：{Breeding_Code && "無"}</span>
						</div>
						<div>
							<img className="point me-2" src={point3} alt="•" />
							<span className="align-middle">觀察紀錄：{Observation_Details && "無"}</span>
						</div>
					</div>
					{/* 鳥種 */}
					<div className="btn-group mt-2" role="group" style={{ flexWrap: "wrap" }}>
					{Common_Name.map((name, nIdx) => (
						<button key={`ebBird-${nIdx}`} type="button" className="btn btn-group-sm btn-outline-info">{`${name}(${Count[nIdx]})`}</button>
					))}
					</div>
				</VerticalTimelineElement>
			))}
			</VerticalTimeline>
		</div>
	);
}

export default EBirdChartsTimeline;
