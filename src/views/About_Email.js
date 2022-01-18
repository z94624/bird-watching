import { useState, useRef } from 'react';

import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { Alert } from 'react-bootstrap';
import { FacebookProvider, Page } from 'react-facebook';

import emailSendingIcon from "./../images/loading/Interwind-1s-200px.gif";
// (Bootstrap + react-hook-form) input
const Input = ({ label, name, type, register, required, errors }) => (
	<>
		<label htmlFor={`abEmail${name}`} className="col-sm-2 col-form-label">
			{name}
			{required ? <sup className="requiredForm">*</sup> : <></>} {/* 必填符號 */}
		</label>
		<div className="col-sm-10">
			<input type={type} className="form-control form-control-lg" id={`abEmail${name}`} {...register(label, { required })} />
			{required && errors[label] ? <span className="errorForm">This field is required</span> : <></>} {/* 必填訊息 */}
		</div>
	</>
);
// (Bootstrap + react-hook-form) textarea
const Textarea = ({ label, name, rows, register, required, errors }) => (
	<>
		<label htmlFor={`abEmail${name}`} className="col-sm-2 col-form-label">
			{name}
			{required ? <sup className="requiredForm">*</sup> : <></>} {/* 必填符號 */}
		</label>
		<div className="col-sm-10">
			<textarea className="form-control form-control-lg" id={`abEmail${name}`} rows={rows} {...register(label, { required })} />
			{required && errors[label] ? <span className="errorForm">This field is required</span> : <></>} {/* 必填訊息 */}
		</div>
	</>
);

const AboutEmail = () => {
	// 表單
	const emailForm = useRef();
	const { register, handleSubmit, reset, formState: { errors } } = useForm();
	// 寄信
	const [emailSending, setEmailSending] = useState(false);
	const sendEmail = e => {
		emailjs.sendForm(process.env.REACT_APP_EMAILJS_SERVICE_ID, process.env.REACT_APP_EMAILJS_TEMPLATE_ID, emailForm.current, process.env.REACT_APP_EMAILJS_USER_ID)
		.then(response => {
			handleEmailSuccessAlertShow();
			//console.log('SUCCESS!', response.status, response.text);
		}, error => {
			console.log('FAILED...', error);
		});
	}
	const handleEmailSending = () => {
		setEmailSending(true);
		sendEmail();
	}
	// 信件寄出成功訊息
	const [emailSuccessAlertShow, setEmailSuccessAlertShow] = useState(false);
	const handleEmailSuccessAlertShow = () => {
		// 寄信完成
		setEmailSending(false);
		// EmailJS 重置
		reset();
		// 出現幾秒後自動消失
		setEmailSuccessAlertShow(true);
		setTimeout(() => {
			setEmailSuccessAlertShow(false);
		}, 2000);
	}

	return (
		<div id="abEmail" className="h-auto text-white p-5">
			{/* 聯絡標題 */}
			<div className="d-flex justify-content-start align-items-center">
				<svg xmlns="http://www.w3.org/2000/svg" width="87" height="87" fill="currentColor" className="bi bi-envelope me-4" viewBox="0 0 16 16">
					<path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
				</svg>
				<h1 className="bold-900">Contact Me</h1>
			</div>
			{/* 聯絡內容 */}
			<div className="row">
				{/* 聯絡欄位 */}
				<div className="col-md-6 col-lg-8 py-3">
					<form ref={emailForm} onSubmit={handleSubmit(handleEmailSending)}>
						<div className="mb-4 row">
							<Input label={process.env.REACT_APP_EMAILJS_FROM_NAME} name="Name" type="text" register={register} errors={errors} required />
						</div>
						<div className="mb-4 row">
							<Input label={process.env.REACT_APP_EMAILJS_FROM_EMAIL} name="Email" type="email" register={register} errors={errors} required />
						</div>
						<div className="mb-4 row">
							<Input label={process.env.REACT_APP_EMAILJS_SUBJECT} name="Subject" type="text" register={register} />
						</div>
						<div className="mb-4 row">
							<Textarea label={process.env.REACT_APP_EMAILJS_MESSAGE} name="Message" rows="5" register={register} errors={errors} required />
						</div>
						<div>
							<button type="submit" className="btn btn-outline-info w-100" disabled={emailSending && true}>
							{emailSending ? (<img src={emailSendingIcon} alt="SENDING" width="auto" height="40" />) : (<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
									<path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/>
								</svg>)}
							</button>
						</div>
					</form>
				</div>
				{/* 聯絡相關 */}
				<aside className="col-md-6 col-lg-4">
					<FacebookProvider appId={process.env.REACT_APP_FACEBOOK_APP_ID}>
						<Page href="https://www.facebook.com/RRGTaiwan" tabs="timeline"	 />
					</FacebookProvider>
				</aside>
			</div>
			{/* 寄信成功訊息 */}
			<div id="abEmailSuccessAlert">
				<Alert show={emailSuccessAlertShow} variant="success" onClose={() => setEmailSuccessAlertShow(false)} transition={true}>
					<svg className="me-2" xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-envelope-check" viewBox="0 0 16 16">
						<path d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2H2Zm3.708 6.208L1 11.105V5.383l4.708 2.825ZM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2-7-4.2Z"/>
						<path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-1.993-1.679a.5.5 0 0 0-.686.172l-1.17 1.95-.547-.547a.5.5 0 0 0-.708.708l.774.773a.75.75 0 0 0 1.174-.144l1.335-2.226a.5.5 0 0 0-.172-.686Z"/>
					</svg>
					信件已成功寄出！
				</Alert>
			</div>
		</div>
	);
}

export default AboutEmail;
