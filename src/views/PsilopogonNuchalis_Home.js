import { useRef, useEffect } from 'react';

import { gsap } from "gsap";
import ScrollTrigger from 'gsap/ScrollTrigger';

import { Youtube, Facebook, Instagram } from './../components/SocialMedia';

import seaTurtle from './../images/seaTurtle.png';

gsap.registerPlugin(ScrollTrigger);
// 社群媒體清單
const socialMediaSize = "32";
const socialMediaFill = "#005477";
const socialMedias = [
	{id: "pnHomeInstagram", component: (<Instagram size={socialMediaSize} fill="url(#pnHomeInstagramRG)" radialGradientID="pnHomeInstagramRG" stopColor={socialMediaFill} />), href: "https://www.instagram.com/fenwenlin/"},
	{id: "pnHomeFacebook", component: (<Facebook size={socialMediaSize} fill={socialMediaFill} />), href: "https://www.facebook.com/profile.php?id=100009152306483"},
	{id: "pnHomeYoutube", component: (<Youtube size={socialMediaSize} fill={socialMediaFill} />), href: "https://www.youtube.com/c/smoBEEUniverse"}
];

const PsilopogonNuchalisHome = ({ main }) => {
	// Targeting elements
	const seaTurtleRef = useRef();
	// In order to avoid targeting a null element
	useEffect(() => {
		gsap.to(seaTurtleRef.current, {
			x: 500,
			duration: 5,
			scrollTrigger: {
				scroller: main.current,
				trigger: seaTurtleRef.current,
				markers: true
			}
		});
	}, []);

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
			<div id="pnHomeSeaTurtle" ref={seaTurtleRef}>
				<img src={seaTurtle} />
			</div>
			{/* Credit */}
			<footer id="pnHomeCredit">
				<a href='https://www.freepik.com/vectors/background'>Creative_hat</a>
			</footer>
		</div>
	);
}

export default PsilopogonNuchalisHome;
