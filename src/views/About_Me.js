import Avatar from 'react-avatar';

import headshot from './../images/headshot.JPG';
// 網頁開發工具
const programmingTools = [
	"Python",
	"JAVA", "JSP",
	"HTML",
	"CSS", "SCSS",
	"JS","JQuery", "Bootstrap", "REACT",
	"GIT", "Solr", "MySQL"
];
// 自學語言
const speakingLanguages = ["英文", "法文", "阿拉伯文", "西班牙文", "日文"];

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
					size="150px" // 圖像大小
					round={true} // border-radius；number, true(100%), false(0%)
					src={headshot} // 載入照片
				/>
			</div>
			{/* 簡介 */}
			<div className="col-md-8 text-white">
				{/* 關於我 */}
				<div id="abMeAboutme" className="my-5 text-start">
					<h2 className="bold-900">About Me</h2>
					<div id="abMeAboutmeContent" className="p-1">
						<p className="m-1">
							因為<a className="a-dark" href="https://www.books.com.tw/products/0010172837" target="_blank" rel="noopener noreferrer">《愛因斯坦的方程式》</a>，踏上天文之路；<br />
							因為天文的碼農生活，踏上軟體工程師之路；<br />
							因為荒野保護協會的淡水河鳥類調查課程，踏上賞鳥之路。
						</p>
						<div className="my-1">
						{programmingTools.map((tool, tIdx) => (
							<span key={`abMeAboutme-${tIdx}`} className="badge bg-secondary m-1">{tool}</span>
						))}
						</div>
						<div className="my-1">
						{speakingLanguages.map((lang, lIdx) => (
							<span key={`abMeAboutme-${lIdx}`} className="badge bg-secondary m-1">{lang}</span>
						))}
						</div>
					</div>
				</div>
				<div className="row my-5">
					{/* 聯絡資訊 */}
					<div id="abMeContact" className="col col-md-6 text-start">
						<h2 className="bold-900">Contact Details</h2>
						<div id="abMeContactContent" className="p-1">
							<p className="m-1">
								黃健峯 / smoBEE / 紫嘯鶇<br />
								11529 台北市南港區研究院路二段128號<br />
								歷史語言研究所 數位文化中心<br />
								+886 983-356-536<br />
								z94624@gmail.com
							</p>
						</div>
					</div>
					{/* 下載履歷 */}
					<div id="abMeResume" className="col col-md-6">
						<a id="abMeResumeButton" className="btn btn-outline-info btn-lg" href="https://www.cakeresume.com/s--pr8NZaeW9nEDqxTlCm0oZg--/smoBEE" target="_blank" rel="noopener noreferrer" role="button">
							<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
								<path fillRule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
								<path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
							</svg>
							<span className="bold-900 pull-right ms-2">RESUME</span>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AboutMe;
