const AboutExperiance = () => {
	return (
		<div id="abExp" className="row h-auto bg-light px-3">
			{/* 學歷 */}
			<div id="abExpEducation" className="row mt-5 mb-3">
				<div className="abExpHeader col col-md-3">
					<span className="border-bottom border-dark border-3 fs-5 bold-900 py-2">EDUCATION</span>
				</div>
				<div className="col col-md-9 text-start">
					<h2 className="bold-900">National Central University</h2>
					<p className="fst-italic">Master Degree at Graduate Institute of Astronomy (2016 - 2019)</p>
					<h5>Master's Thesis</h5>
					<ul>
						<li>"Lulin Widefield Telescope (LWT): a Robotic Telescope for the Near-Earth Object Follow-up Observation"</li>
						<li>[Github] <a className="fw-bold" href="https://github.com/z94624/LWT-AutomationProject" target="_blank" rel="noopener noreferrer">LWT-AutomationProject</a></li>
						<li>[Skills via Python] Web crawler, web browser automation, Windows GUI automation, sending email, optical/spectral image processing, instrumentation</li>
					</ul>
					<h5>Work</h5>
					<p>Observatory docent, telescope installation</p>
					<h5>Club</h5>
					<p>Judo</p>
				</div>
			</div>
			{/* 經歷 */}
			<div id="abExpWork" className="my-3">
				<div className="abExpHeader col col-md-3">
					<span className="border-bottom border-dark border-3 fs-5 bold-900 py-2">WORK</span>
				</div>
				<div className="col col-md-9 text-start">
					
				</div>
			</div>
			{/* 技能 */}
			<div id="abExpSkill" className="mb-5 mt-3">
				<div className="abExpHeader col col-md-3">
					<span className="border-bottom border-dark border-3 fs-5 bold-900 py-2">SKILLS</span>
				</div>
				<div className="col col-md-9 text-start">
					
				</div>
			</div>
		</div>
	);
}

export default AboutExperiance;
