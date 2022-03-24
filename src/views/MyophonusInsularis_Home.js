import { Github, Youtube, Facebook, Instagram, LinkedIn } from './../components/SocialMedia';
// 關鍵字清單
const keywords = [
	{word: "#紫嘯鶇", bgColor: "dark"},
	{word: "#前端工程師", bgColor: "danger"},
	{word: "#天文", bgColor: "primary"},
	{word: "#賞鳥", bgColor: "success"}
]
// 社群媒體清單
const socialMediaSize = "32";
const socialMediaFill = "white";
const socialMedias = [
	{id: "abHomeGithub", component: (<Github size={socialMediaSize} fill={socialMediaFill} />), href: "https://github.com/z94624"},
	{id: "abHomeYoutube", component: (<Youtube size={socialMediaSize} fill={socialMediaFill} />), href: "https://www.youtube.com/c/smoBEEUniverse"},
	{id: "abHomeFacebook", component: (<Facebook size={socialMediaSize} fill={socialMediaFill} />), href: "https://www.facebook.com/ressamperia/"},
	{id: "abHomeInstagram", component: (<Instagram size={socialMediaSize} fill="url(#abHomeInstagramRG)" radialGradientID="abHomeInstagramRG" />), href: "https://www.instagram.com/smobee_universe/"},
	{id: "abHomeLinkedin", component: (<LinkedIn size={socialMediaSize} fill={socialMediaFill} />), href: "https://www.linkedin.com/in/smobee/"}
];

const AboutHome = () => {
	return (
		<div id="abHome" className="h-100 d-flex flex-column align-items-center justify-content-center">
			{/* 首頁內容 */}
			<div id="abHomeContainer">
				<h1 id="abHomeTitle" className="text-white bold-900">黃健峯</h1>
				<div id="abHomeKeywords">
				{keywords.map(({word, bgColor}, kIdx) => (
					<span key={`abHomeKeywords-${kIdx}`} className={`badge rounded-pill bg-${bgColor} m-1`}>{word}</span>
				))}
				</div>
				<h3 id="abHomeDescription" className="text-white my-3">
					我熱愛學習了解新事物<br />
					浩瀚的宇宙，認識天體運行；神奇的大自然，認識生物多樣性<br />
					無法停止對這世界的好奇心，用心感受這世界萬物的存在
				</h3>
				<hr />
				{/* 社群媒體 */}
				<ul id="abHomeSocialMedia" className="nav justify-content-center mt-3">
				{socialMedias.map(({id, component, href}, sIdx) => (
					<li key={`abHomeSocialMedia-${sIdx}`} id={id} className="nav-item">
						<a className="nav-link" href={href} target="_blank" rel="noopener noreferrer">
							{component}
						</a>
					</li>
				))}
				</ul>
			</div>
		</div>
	);
}

export default AboutHome;
