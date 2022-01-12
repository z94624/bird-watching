import { Accordion, AccordionSection } from 'react-rainbow-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faBook, faStar, faCrosshairs, faDumbbell, faLaptopCode, faFeather } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faPython, faBlackTie } from '@fortawesome/free-brands-svg-icons'

import ncu from "./../images/NCU.png";
import ncku from "./../images/NCKU.png";
import idl from "./../images/IDL.png";
import ascdc from "./../images/ASCDC.png";

import python from "./../images/language/Python.png";
import java from "./../images/language/Java.png";
import jsp from "./../images/language/JSP.png";
import html from "./../images/language/HTML.png";
import css from "./../images/language/CSS.png";
import scss from "./../images/language/Sass.png";
import js from "./../images/language/JS.png";
import jquery from "./../images/language/JQuery.png";
import bootstrap from "./../images/language/Bootstrap.png";
import react from "./../images/language/React.png";
import git from "./../images/language/GIT.png";
import solr from "./../images/language/Solr.png";
import mysql from "./../images/language/MySQL.png";

import ecopark from "./../images/ecoPark.png";
import ffeco from "./../images/ffEco.png";
import peacejudo from "./../images/peaceJudo.png";
// 研替團體
const ascdcGroups = [
	{name: "台北萬華青年公園志工隊", src: ecopark, group: "荒野保護協會"},
	{name: "淡水河流域同步鳥類調查", src: ffeco, group: "羽林生態公司"},
	{name: "和平柔道館", src: peacejudo, group: "和平柔道館"}
];
// 技能
const skills = [
	{name: "Python", src: python},
	{name: "Java", src: java},
	{name: "JSP", src: jsp},
	{name: "HTML", src: html},
	{name: "CSS", src: css},
	{name: "SCSS", src: scss},
	{name: "JS", src: js},
	{name: "JQuery", src: jquery},
	{name: "Bootstrap", src: bootstrap},
	{name: "React", src: react},
	{name: "GIT", src: git},
	{name: "Solr", src: solr},
	{name: "MySQL", src: mysql}
];

const AboutExperiance = () => {
	return (
		<div id="abExp" className="row h-auto bg-light">
			{/* 學歷 */}
			<div id="abExpEducation" className="row my-5">
				<div className="abExpHeader col col-md-3">
					<span className="border-bottom border-dark border-3 fs-4 bold-900 py-2">EDUCATION</span>
				</div>
				<div className="col col-md-9 text-start">
					{/* 碩士 */}
					<div className="pb-3">
						<div className="abExpTitle">
							<img className="float-start me-3" src={ncu} alt="NCU" width="auto" height="72" />
							<div>
								<h2 className="bold-900">National Central University</h2>
								<span className="fst-italic">Master Degree at Graduate Institute of Astronomy (2016 - 2019)</span>
							</div>
						</div>
						<div className="abExpContent mt-3">
							<Accordion>
								{/* 論文 */}
								<AccordionSection
									icon={<FontAwesomeIcon icon={faGraduationCap} />}
									label="Thesis"
									variant="error" // appearance；default, error
								>
									<div>
										<FontAwesomeIcon icon={faBook} className="me-3" />
										<a className="fst-italic a-dark" href="https://hdl.handle.net/11296/nucc5z" target="_blank" rel="noopener noreferrer">Lulin Widefield Telescope (LWT): a Robotic Telescope for the Near-Earth Object Follow-up Observation</a>
									</div>
									<div>
										<FontAwesomeIcon icon={faGithub} className="me-3" />
										<a className="a-dark" href="https://github.com/z94624/LWT-AutomationProject" target="_blank" rel="noopener noreferrer">LWT-AutomationProject</a>
									</div>
									<div>
										<FontAwesomeIcon icon={faPython} className="me-3" />
										Web crawler, browser automation, Windows GUI automation
									</div>
									<div>
										<FontAwesomeIcon icon={faStar} className="me-3" />
										Optical/spectral image processing, instrumentation
									</div>
								</AccordionSection>
								{/* 其他 */}
								<AccordionSection
									icon={<FontAwesomeIcon icon={faCrosshairs} />}
									label="Others"
								>
									<div>
										<FontAwesomeIcon icon={faBlackTie} className="me-3" />
										Observatory docent, telescope installation & maintenance
									</div>
									<div>
										<FontAwesomeIcon icon={faDumbbell} className="me-3" />
										Judo
									</div>
								</AccordionSection>
							</Accordion>
						</div>
					</div>
					{/* 學士 */}
					<div className="pt-3 border-top border-secondary">
						<div className="abExpTitle">
							<img className="float-start me-3" src={ncku} alt="NCKU" width="auto" height="72" />
							<div>
								<h2 className="bold-900">National Cheng Kung University</h2>
								<span className="fst-italic">Bachelor Degree at Department of Physics (2011 - 2016)</span>
							</div>
						</div>
						<div className="abExpContent mt-3">
							<Accordion>
								{/* 專題 */}
								<AccordionSection
									icon={<FontAwesomeIcon icon={faGraduationCap} />}
									label="Independent Study"
									variant="error"
								>
									<div>
										<FontAwesomeIcon icon={faBook} className="me-3" />
										<a className="fst-italic a-dark" href="https://docs.google.com/document/d/1rlD497WKrdk6kQL_quCJvjxiQLvtNbaT/edit?usp=sharing&ouid=101383435501656958708&rtpof=true&sd=true" target="_blank" rel="noopener noreferrer">Triangulation Positioning of Gigantic Jet</a>
									</div>
									<div>
										<img className="me-3" src={idl} alt="IDL" height="14" width="auto" />
										Positioning by Newton's method & bisection method
									</div>
								</AccordionSection>
								{/* 其他 */}
								<AccordionSection
									icon={<FontAwesomeIcon icon={faCrosshairs} />}
									label="Others"
								>
									<div>
										<FontAwesomeIcon icon={faBlackTie} className="me-3" />
										Earth Science Exhibition docent, Confucius Temple Cultural Festival volunteer, orphanage volunteer, representative of physics graduates, assistant of ASICS-NCKU
									</div>
									<div>
										<FontAwesomeIcon icon={faDumbbell} className="me-3" />
										Student Representative Training Workshop, astronomy, swimming & archery
									</div>
								</AccordionSection>
							</Accordion>
						</div>
					</div>
				</div>
			</div>
			{/* 經歷 */}
			<div id="abExpWork" className="row my-5">
				<div className="abExpHeader col col-md-3">
					<span className="border-bottom border-dark border-3 fs-4 bold-900 py-2">WORK</span>
				</div>
				<div className="col col-md-9 text-start">
					<div className="abExpTitle">
						<img className="float-start me-3" src={ascdc} alt="ASCDC" width="auto" height="72" />
						<div>
							<h2 className="bold-900">Academia Sinica Center for Digital Cultures</h2>
							<span className="fst-italic">Research and Development Substitute Services (2019 - 2022)</span>
						</div>
					</div>
					<div className="abExpContent mt-3">
						<Accordion>
							{/* 作品 */}
							<AccordionSection
								icon={<FontAwesomeIcon icon={faLaptopCode} />}
								label="Works"
								variant="error"
							>
								{/* https://react-rainbow.io/#/CarouselCard */}
							</AccordionSection>
							{/* 其他 */}
							<AccordionSection
								icon={<FontAwesomeIcon icon={faFeather} />}
								label="Others"
							>
								<div className="d-flex justify-content-between align-items-center flex-wrap">
								{ascdcGroups.map((group, gIdx) => (
									<div key={`abExpGroup-${gIdx}`}>
										<img className="me-3" src={group.src} alt={group.group} title={group.group} height="auto" width="50" />
										{group.name}
									</div>
								))}
								</div>
							</AccordionSection>
						</Accordion>
					</div>
				</div>
			</div>
			{/* 技能 */}
			<div id="abExpSkill" className="row my-5">
				<div className="abExpHeader col col-md-3">
					<span className="border-bottom border-dark border-3 fs-4 bold-900 py-2">SKILLS</span>
				</div>
				<div className="col col-md-9 d-flex justify-content-start align-items-center flex-wrap">
				{skills.map((skill, sIdx) => (
					<div key={`abExpSkill-${sIdx}`} className="abExpSkill p-3 m-3">
						<img src={skill.src} alt={skill.name} title={skill.name} width="auto" height="80" />
					</div>
				))}
				</div>
			</div>
		</div>
	);
}

export default AboutExperiance;
