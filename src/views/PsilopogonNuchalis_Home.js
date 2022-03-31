import { useRef, useEffect } from 'react';

import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

import { Instagram, Facebook, Youtube } from './../components/SocialMedia';
import BackgroundVideo from './../components/BackgroundVideo';

import seaTurtle from './../images/seaTurtle.png';
import vaquita from './../images/Vaquita.png';
import ocean from './../videos/ocean.mp4';

gsap.registerPlugin(ScrollTrigger);
// Browser Viewport
const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
// 社群媒體清單
const socialMediaSize = "32";
const socialMediaFill = "#005477";
const socialMedias = [
	{id: "pnHomeInstagram", component: (<Instagram size={socialMediaSize} fill="url(#pnHomeInstagramRG)" radialGradientID="pnHomeInstagramRG" stopColor={socialMediaFill} />), href: "https://www.instagram.com/fenwenlin/"},
	{id: "pnHomeFacebook", component: (<Facebook size={socialMediaSize} fill={socialMediaFill} />), href: "https://about.facebook.com/"},
	{id: "pnHomeYoutube", component: (<Youtube size={socialMediaSize} fill={socialMediaFill} />), href: "https://www.youtube.com/c/smoBEEUniverse"}
];

const PsilopogonNuchalisHome = ({ mainRef }) => {
	// Targeting elements
	const seaTurtleRef = useRef();
	const vaquitaRef = useRef();
	// In order to avoid targeting a null element
	useEffect(() => {
		const stTl = gsap.timeline({
			scrollTrigger: {
				scroller: mainRef.current,
				trigger: seaTurtleRef.current,
				scrub: 1,
				start: "top 70%",
				end: "bottom 30%",
				markers: false
			}
		});
		stTl.to(seaTurtleRef.current, {x: vw*(1/4), y: -5, rotation: -5});
		stTl.to(seaTurtleRef.current, {x: vw*(2/4), y: -20, rotation: -15});
		stTl.to(seaTurtleRef.current, {x: vw*(3/4), y: 5, rotation: 5});
		stTl.to(seaTurtleRef.current, {x: vw*(4/4), y: 20, rotation: 15});
	}, []);

	return (
		<div id="pnHome" className="h-100 d-flex flex-column align-items-center justify-content-center">
			{/* 首頁背景 */}
			<BackgroundVideo src={ocean} />
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
			<div id="pnHomeSeaTurtle" className="gsapDiv" ref={seaTurtleRef}>
				<img src={seaTurtle} />
			</div>
			<div id="pnHomeVaquita" className="gsapDiv" ref={vaquitaRef}>
				<img src={vaquita} />
			</div>
			{/* Credit */}
			<footer id="pnHomeCredit">
				<a href='https://www.freepik.com/vectors/background'>Creative_hat</a>
			</footer>
		</div>
	);
}

export default PsilopogonNuchalisHome;
