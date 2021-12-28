import { Accordion, AccordionSection } from 'react-rainbow-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faBook, faStar, faCrosshairs, faBriefcase, faDumbbell } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faPython } from '@fortawesome/free-brands-svg-icons'

import ncu from "./../images/NCU.png";
import ncku from "./../images/NCKU.png";

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
							<img className="float-start me-3" src={ncu} alt="NCU" width="75" height="auto" />
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

								<AccordionSection
									icon={<FontAwesomeIcon icon={faCrosshairs} />}
									label="Others"
								>
									<div>
										<FontAwesomeIcon icon={faBriefcase} className="me-3" />
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
							<img className="float-start me-3" src={ncku} alt="NCKU" width="75" height="auto" />
							<div>
								<h2 className="bold-900">National Cheng Kung University</h2>
								<span className="fst-italic">Bachelor Degree at Department of Physics (2011 - 2016)</span>
							</div>
						</div>
						<div className="abExpContent">

						</div>
					</div>
				</div>
			</div>
			{/* 經歷 */}
			<div id="abExpWork" className="my-5">
				<div className="abExpHeader col col-md-3">
					<span className="border-bottom border-dark border-3 fs-4 bold-900 py-2">WORK</span>
				</div>
				<div className="col col-md-9 text-start">
					
				</div>
			</div>
			{/* 技能 */}
			<div id="abExpSkill" className="my-5">
				<div className="abExpHeader col col-md-3">
					<span className="border-bottom border-dark border-3 fs-4 bold-900 py-2">SKILLS</span>
				</div>
				<div className="col col-md-9 text-start">
					
				</div>
			</div>
		</div>
	);
}

export default AboutExperiance;
