import Avatar from 'react-avatar';

import headshot from './../images/headshot.JPG';

const AboutMe = () => {
	return (
		<div id="abMe" className="row h-auto">
			{/* 照片 */}
			<div className="col-md-4">
				<Avatar
					id="abMeHeadshot"
					className="mt-5"
					name="黃健峯"
					alt="黃健峯"
					title="黃健峯"
					size="100px" // 圖像大小
					round={true} // border-radius；number, true(100%), false(0%)
					src={headshot} // 載入照片
				/>
			</div>
			{/* 簡介 */}
			<div className="col-md-8 text-white">
				{/* 關於我 */}
				<div id="abMeAboutme" className="mt-5 text-start">
					<h2 className="bold-900">About Me</h2>
					<p>目前完成研究天文的夢想。<br />天文研究利用 Python 爬蟲與控制 Microsoft Windows GUI，也應用技術於日常。<br />自學 Machine Learning、JavaScript、Django、Java、PHP 與法西日阿文。對機器學習、網頁前後端及 APP 開發有興趣。</p>
				</div>
				<div className="row mb-5">
					{/* 聯絡資訊 */}
					<div id="abMeContact" className="col col-md-6 text-start">
						<h2 className="bold-900">Contact Details</h2>
						<p>
							黃健峯<br />
							11529 台北市南港區研究院路二段128號<br />
							歷史語言研究所 數位文化中心<br />
							0983-356-536<br />
							z94624@gmail.com
						</p>
					</div>
					{/* 下載履歷 */}
					<div id="abMeResume" className="col col-md-6">
						<a href="https://www.cakeresume.com/s--pr8NZaeW9nEDqxTlCm0oZg--/smoBEE" target="_blank" rel="noopener noreferrer">
							<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-file-earmark-arrow-down" viewBox="0 0 16 16">
								<path d="M8.5 6.5a.5.5 0 0 0-1 0v3.793L6.354 9.146a.5.5 0 1 0-.708.708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 10.293V6.5z"/>
								<path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/>
							</svg>
							Download Resume
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AboutMe;
