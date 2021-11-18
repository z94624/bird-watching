import { useState, useMemo } from 'react';

import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import { Pie } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Modal } from 'react-bootstrap';

import { dataMergedByKeys } from './../utils/ebMetadata_dataExtraction';
import { getRandomColor } from './../utils/tools';
// 時間軸節點圖示
import timelineImg from './../images/timeline-icon.png';
// 第 ? 點
import point1 from './../images/point/point1.png';
import point2 from './../images/point/point2.png';
import point3 from './../images/point/point3.png';

const EBirdChartsTimeline = ({ avatarIndex }) => {
	// 資訊卡需要的資料
	let cardData = useMemo(() => dataMergedByKeys(avatarIndex, ["Submission_ID"], ["Common_Name", "Count"], ["Location", "Date", "Time", "Number_of_Observers", "Breeding_Code", "Observation_Details"], true), [avatarIndex]);
	// 鳥種圓餅圖 Modal
	const [modalInfo, setModalInfo] = useState({modalShow: false});
	const {modalShow, modalTitle, modalBody} = modalInfo; // Modal 狀態與內容
	const handleModalClose = () => setModalInfo({ // Modal 關閉
		...modalInfo,
		modalShow: false
	});
	const handleModalInfoChange = (location, datetime, names, counts) => { // 變更 Modal 內容
		let borderColors = names.reduce((arr) => {
			return [...arr, getRandomColor()];
		}, []);
		let backgroundColors = borderColors.reduce((arr, ele) => {
			return [...arr, ele.replace(",1)", ",.2)")];
		}, []);
		// 圓餅圖資料
		const pieData = {
			labels: names,
			datasets: [
				{
					label: "鳥種圓餅圖",
					data: counts,
					backgroundColor: backgroundColors,
					borderColor: borderColors,
					borderWidth: 2
				}
			]
		}
		const pieOptions = {
			plugins: {
				legend: { // 圖例
					display: false
				},
				datalabels: { // 區塊名稱
					color: '#fff',
					formatter: (value, context) => {
						return `${context.chart.data.labels[context.dataIndex]}`;
					},
					anchor: 'end',
					align: 'start',
					offset: 10
				}
			}
		}
		// 更換成該筆觀察資料
		setModalInfo({
			...modalInfo,
			modalShow: true,
			modalTitle: <h4>{location.split('(')[0]}<sub className="text-muted">({datetime})</sub></h4>,
			modalBody: <Pie data={pieData} plugins={[ChartDataLabels]} options={pieOptions} />
		})
	}
	
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
					<div className="btn-group btn-group-sm timelineBirdBtnGroup mt-2" role="group">
					{Common_Name.map((name, nIdx) => (
						<button key={`ebBird-${nIdx}`} type="button" className="btn btn-outline-info">{`${name}(${Count[nIdx]})`}</button>
					))}
					{/* 鳥種圓餅圖 Modal 按鈕 */}
					<button type="button" className="btn btn-outline-warning" onClick={() => {handleModalInfoChange(Location[0], datetime, Common_Name, Count)}}>鳥種圓餅圖</button>
					</div>
				</VerticalTimelineElement>
			))}
			</VerticalTimeline>
			{/* 鳥種圓餅圖 Modal */}
			<Modal
				show={modalShow}
				onHide={handleModalClose}
				centered // 垂直置中
				fullscreen={false} // true,sm-down,md-down,lg-down,xl-down,xxl-down
				scrollable={false} // Allows scrolling the <Modal.Body> instead of the entire Modal when overflowing.
				contentClassName="bg-dark text-white" // 暗色系背景
			>
				<Modal.Header closeButton closeVariant="white">
					<Modal.Title>{modalTitle}</Modal.Title>
				</Modal.Header>
				<Modal.Body>{modalBody}</Modal.Body>
			</Modal>
		</div>
	);
}

export default EBirdChartsTimeline;
