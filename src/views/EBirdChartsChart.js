import { Line } from 'react-chartjs-2';

import { dataMergedByKeys } from './../utils/ebMetadata_dataExtraction';

const EBirdChartsChart = ({ avatarIndex }) => {
	// 圖表需要的資料
	let chartData = dataMergedByKeys(avatarIndex, ["Submission_ID"], ["Common_Name"], ["Date", "Time"], true, false);
	// Lifer 需要的資料
	

	return (
		<div id="chartTab" className="container-fluid" aria-labelledby="chart">
			{/* 生涯鳥種數 */}
			<div className="row">
				<Line data={liferData} options={liferOptions} />
			</div>
		</div>
	);
}

export default EBirdChartsChart;
