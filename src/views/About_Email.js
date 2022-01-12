import { useState, useRef } from 'react';

import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { Alert } from 'react-bootstrap';

import paperplane from "./../images/paperplane.svg";
import emailSendingIcon from "./../images/loading/Interwind-1s-200px.gif";
import mail from "./../images/mail.svg";
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
			<div className="row mt-3">
				{/* 聯絡欄位 */}
				<div className="col col-8">
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
							<button type="submit" className="btn btn-outline-light p-1" disabled={emailSending && true}>
							{emailSending ? (<img src={emailSendingIcon} alt="SENDING" width="auto" height="50" />) : (<img src={paperplane} alt="SEND" width="auto" height="50" />)}
							</button>
						</div>
					</form>
				</div>
				{/* 聯絡相關 */}
				<aside className="col col-4 text-start">
					<iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FAgeOfMagicGame&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId" width="auto" height="100%" style={{border:"none",overflow:"hidden"}} scrolling="no" frameBorder="0" allowFullScreen={true} allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
				</aside>
			</div>
			{/* 寄信成功訊息 */}
			<div id="abEmailSuccessAlert">
				<Alert show={emailSuccessAlertShow} variant="success" onClose={() => setEmailSuccessAlertShow(false)} transition={true}>
					<img className="me-2" src={mail} alt="MAIL" width="auto" height="35" />
					信件已成功寄出！
				</Alert>
			</div>
		</div>
	);
}

export default AboutEmail;
