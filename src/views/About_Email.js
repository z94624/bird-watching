const AboutEmail = () => {
	return (
		<div id="abEmail" className="h-100 text-white p-5">
			<div className="d-flex justify-content-start align-items-center">
				<svg xmlns="http://www.w3.org/2000/svg" width="87" height="87" fill="currentColor" className="bi bi-envelope me-4" viewBox="0 0 16 16">
					<path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
				</svg>
				<h1 className="bold-900">Contact Me</h1>
			</div>
			<div className="row my-5">
				<div className="col col-8">
					<div className="mb-4 row">
						<label htmlFor="abEmailName" className="col-sm-2 col-form-label">Name</label>
						<div className="col-sm-10">
							<input type="text" className="form-control form-control-lg" id="abEmailName" />
						</div>
					</div>
					<div className="mb-4 row">
						<label htmlFor="abEmailEmail" className="col-sm-2 col-form-label">Email</label>
						<div className="col-sm-10">
							<input type="email" className="form-control form-control-lg" id="abEmailEmail" />
						</div>
					</div>
					<div className="mb-4 row">
						<label htmlFor="abEmailSubject" className="col-sm-2 col-form-label">Subject</label>
						<div className="col-sm-10">
							<input type="text" className="form-control form-control-lg" id="abEmailSubject" />
						</div>
					</div>
					<div className="mb-4 row">
						<label htmlFor="abEmailMessage" className="col-sm-2 col-form-label">Message</label>
						<div className="col-sm-10">
							<textarea className="form-control form-control-lg" id="abEmailMessage" rows="5" />
						</div>
					</div>
				</div>
				<div className="col col-4">

				</div>
			</div>
		</div>
	);
}

export default AboutEmail;
