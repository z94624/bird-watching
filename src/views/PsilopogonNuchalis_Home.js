import { useRef, useEffect } from 'react';

import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

import { Instagram, Facebook, Youtube } from './../components/SocialMedia';
import BackgroundVideo from './../components/BackgroundVideo';

import seaTurtle from './../images/seaTurtle.png';
import vaquita from './../images/Vaquita.png';
import whaleShark from './../images/whaleShark.png';
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
	const whaleSharkRef = useRef();
	/*
	 * GSAP: In order to avoid targeting a null element
	 * Timeline Properties: https://greensock.com/docs/v3/GSAP/Timeline
	 * ScrollTrigger Properties: https://greensock.com/docs/v3/Plugins/ScrollTrigger
	 */
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
		stTl.to(seaTurtleRef.current, {x: vw*(2/3)});
		const vqTl = gsap.timeline({
			scrollTrigger: {
				scroller: mainRef.current,
				trigger: vaquitaRef.current,
				// "onEnter onLeave onEnterBack onLeaveBack"; play, pause, resume, reverse, restart, reset, complete, none
				toggleActions: "play reset play none",
				start: "top bottom",
				end: "bottom top",
				markers: false
			}
		});
		vqTl.to(vaquitaRef.current, {x: vw*(-2/5), duration: 5});
		const wsTl = gsap.timeline({
			scrollTrigger: {
				scroller: mainRef.current,
				trigger: whaleSharkRef.current,
				toggleActions: "play reset play none",
				start: "top bottom",
				end: "85% top",
				markers: false
			}
		});
		wsTl.to(whaleSharkRef.current, {x: 2000+vw, duration: 50, delay: 3});
	}, []);

	return (
		<div id="pnHome" className="h-100 d-flex flex-column align-items-center justify-content-center">
			{/* 首頁背景 */}
			<BackgroundVideo src={ocean} />
			{/* 首頁內容 */}
			<div id="pnHomeContainer">
				<h1 id="pnHomeTitle" className="text-ocean bold-900">林芬雯</h1>
				<span className="badge bg-primary fs-6 fst-italic text-wrap">As within, so without; as above, so below.</span>
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
			<div id="pnHomeWhaleShark" className="gsapDiv" ref={whaleSharkRef}>
				<img src={whaleShark} />
			</div>
		</div>
	);
}

export default PsilopogonNuchalisHome;
