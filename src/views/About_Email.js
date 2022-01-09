import { useForm } from "react-hook-form";
// (Bootstrap + react-hook-form) input
const Input = ({ label, type, register, required, errors }) => (
	<>
		<label htmlFor={`abEmail${label}`} className="col-sm-2 col-form-label">
			{label}
			{required ? <sup className="requiredForm">*</sup> : <></>} {/* 必填符號 */}
		</label>
		<div className="col-sm-10">
			<input type={type} className="form-control form-control-lg" id={`abEmail${label}`} {...register(label, { required })} />
			{required && errors[label] ? <span className="errorForm">This field is required</span> : <></>} {/* 必填訊息 */}
		</div>
	</>
);
// (Bootstrap + react-hook-form) textarea
const Textarea = ({ label, rows, register, required, errors }) => (
	<>
		<label htmlFor={`abEmail${label}`} className="col-sm-2 col-form-label">
			{label}
			{required ? <sup className="requiredForm">*</sup> : <></>} {/* 必填符號 */}
		</label>
		<div className="col-sm-10">
			<textarea className="form-control form-control-lg" id={`abEmail${label}`} rows={rows} {...register(label, { required })} />
			{required && errors[label] ? <span className="errorForm">This field is required</span> : <></>} {/* 必填訊息 */}
		</div>
	</>
);

const AboutEmail = () => {
	console.log(process.env.REACT_APP_EMAILJS_USER_ID);
	// 表單
	const { register, handleSubmit, formState: { errors } } = useForm();
	const onSubmit = data => console.log(data);

	return (
		<div id="abEmail" className="h-100 text-white p-5">
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
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="mb-4 row">
							<Input label="Name" type="text" register={register} errors={errors} required />
						</div>
						<div className="mb-4 row">
							<Input label="Email" type="email" register={register} errors={errors} required />
						</div>
						<div className="mb-4 row">
							<Input label="Subject" type="text" register={register} />
						</div>
						<div className="mb-4 row">
							<Textarea label="Message" rows="5" register={register} errors={errors} required />
						</div>
						<div>
							<button type="submit" className="btn btn-outline-info btn-lg">SEND</button>
						</div>
					</form>
				</div>
				{/* 聯絡相關 */}
				<div className="col col-4">

				</div>
			</div>
		</div>
	);
}

export default AboutEmail;
