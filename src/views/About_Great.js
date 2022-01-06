import Avatar from 'react-avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';

import einstein from './../images/AlbertEinstein.jpg';
import hawking from './../images/StephenHawking.jpg';
import jane from './../images/JaneGoodall.jpg';

const AboutGreat = () => {
	return (
		<div id="abGreat" className="h-auto">
			{/* 愛因斯坦 */}
			<div id="abGreatEinsteinSection" className="abGreatFigure row p-3">
				{/* 頭像 */}
				<div className="col col-3 m-auto">
					<Avatar
						id="abGreatEinstein"
						name="Albert Einstein"
						alt="Albert Einstein"
						title="Albert Einstein"
						size="150px" // 圖像大小
						round={true} // border-radius；number, true(100%), false(0%)
						src={einstein} // 載入照片
					/>
				</div>
				{/* 名言 */}
				<div className="col col-9 d-flex flex-column justify-content-center text-white">
					<div className="col-10 align-self-center">
						<blockquote className="blockquote text-start fs-4" >
							<p>
								<FontAwesomeIcon icon={faQuoteLeft} className="me-2" />
								There are only two ways to live your life. One is as though nothing is a miracle. The other is as though everything is a miracle.
							</p>
						</blockquote>
					</div>
					<span className="col-5 fs-6 fst-italic align-self-end" >
						- Albert Einstein
					</span>
				</div>
			</div>
			{/* 霍金 */}
			<div id="abGreatHawkingSection" className="abGreatFigure row p-3">
				{/* 名言 */}
				<div className="col col-9 d-flex flex-column justify-content-center text-white">
					<div className="col-10 align-self-center">
						<blockquote className="blockquote text-start fs-4" >
							<p>
								<FontAwesomeIcon icon={faQuoteLeft} className="me-2" />
								However difficult life may seem, there is always something you can do, and succeed at. It matters that you don’t just give up.
							</p>
						</blockquote>
					</div>
					<span className="col-5 fs-6 fst-italic align-self-end" >
						- Stephen Hawking
					</span>
				</div>
				{/* 頭像 */}
				<div className="col col-3 m-auto">
					<Avatar
						id="abGreatHawking"
						name="Stephen Hawking"
						alt="Stephen Hawking"
						title="Stephen Hawking"
						size="150px" // 圖像大小
						round={true} // border-radius；number, true(100%), false(0%)
						src={hawking} // 載入照片
					/>
				</div>
			</div>
			{/* 珍古德 */}
			<div id="abGreatJaneSection" className="abGreatFigure row p-3">
				{/* 頭像 */}
				<div className="col col-3 m-auto">
					<Avatar
						id="abGreatJane"
						name="Jane Goodall"
						alt="Jane Goodall"
						title="Jane Goodall"
						size="150px" // 圖像大小
						round={true} // border-radius；number, true(100%), false(0%)
						src={jane} // 載入照片
					/>
				</div>
				{/* 名言 */}
				<div className="col col-9 d-flex flex-column justify-content-center text-white">
					<div className="col-10 align-self-center">
						<blockquote className="blockquote text-start fs-4" >
							<p>
								<FontAwesomeIcon icon={faQuoteLeft} className="me-2" />
								Only if we understand, can we care. Only if we care, we will help. Only if we help, we shall be saved.
							</p>
						</blockquote>
					</div>
					<span className="col-5 fs-6 fst-italic align-self-end" >
						- Jane Goodall
					</span>
				</div>
			</div>
		</div>
	);
}

export default AboutGreat;
