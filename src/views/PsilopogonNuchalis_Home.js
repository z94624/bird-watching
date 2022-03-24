import { Youtube, Facebook, Instagram } from './../components/SocialMedia';

import seaTurtle from './../images/seaTurtle.png';
// 社群媒體清單
const socialMediaSize = "32";
const socialMediaFill = "#005477";
const socialMedias = [
	{id: "pnHomeInstagram", component: (<Instagram size={socialMediaSize} fill="url(#pnHomeInstagramRG)" radialGradientID="pnHomeInstagramRG" stopColor={socialMediaFill} />), href: "https://www.instagram.com/fenwenlin/"},
	{id: "pnHomeFacebook", component: (<Facebook size={socialMediaSize} fill={socialMediaFill} />), href: "https://www.facebook.com/profile.php?id=100009152306483"},
	{id: "pnHomeYoutube", component: (<Youtube size={socialMediaSize} fill={socialMediaFill} />), href: "https://www.youtube.com/c/smoBEEUniverse"}
];

const PsilopogonNuchalisHome = () => {
	return (
		<div id="pnHome" className="h-100 d-flex flex-column align-items-center justify-content-center">
			{/* 首頁內容 */}
			<div id="pnHomeContainer">
				<h1 id="pnHomeTitle" className="text-ocean bold-900">林芬雯</h1>
				<hr />
				{/* 社群媒體 */}
				<ul id="pnHomeSocialMedia" className="nav justify-content-center mt-3">
				{socialMedias.map(({id, component, href}, sIdx) => (
					<li key={`pnHomeSocialMedia-${sIdx}`} id={id} className="nav-item">
						<a className="nav-link" href={href} target="_blank" rel="noopener noreferrer">
							{component}
						</a>
					</li>
				))}
				</ul>
			</div>
			{/* 海洋動物 */}
			<img id="pnHomeSeaTurtle" src={seaTurtle} />
			{/* Credit */}
			<footer id="pnHomeCredit">
				<a href='https://www.freepik.com/vectors/background'>Creative_hat</a>
			</footer>
		</div>
	);
}

export default PsilopogonNuchalisHome;
