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
			{cardData.map(({Submission_ID, Date, Time, datetime, Location, Number_of_Observers, Common_Name, Count, Breeding_Code, Observation_Details}, cIdx) => (
				<VerticalTimelineElement
					key={`ebCard-${cIdx}`}
					contentStyle={{ background: 'rgba(255, 255, 255, .1)', color: '#fff' }}// 內容箭頭樣式
    				date={datetime} // 時間點
    				iconStyle={{ background: '#fff' }} // 節點樣式
    				icon={(<img className="timelineNodeIcon" src={timelineImg} alt="" />)} // 節點圖示
				>
					{/* 地點 */}
					<h5>【{Location}】</h5>
					{/* 額外資訊 */}
					<div className="d-flex justify-content-around">
						<div>
							<img className="point me-2" src={point1} alt="•" />
							<span className="align-middle">人數：{Number_of_Observers}</span>
						</div>
						<div>
							<img className="point me-2" src={point2} alt="•" />
							<span className="align-middle">行為：{Breeding_Code && "無"}</span>
						</div>
						<div>
							<img className="point me-2" src={point3} alt="•" />
							<span className="align-middle">紀錄：{Observation_Details && "無"}</span>
						</div>
					</div>
					{/* 鳥種 */}
					<div className="btn-group timelineBirdBtnGroup mt-2" role="group">
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
