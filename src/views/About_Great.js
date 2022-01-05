import Avatar from 'react-avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';

import einstein from './../images/Einstein.jpg';

const AboutGreat = () => {
	return (
		<div id="abGreat" className="h-auto">
			{/* 愛因斯坦 */}
			<div id="abGreatEinsteinSection" className="abGreatFigure row p-3">
				{/* 頭像 */}
				<div className="col col-3 m-auto">
					<Avatar
						id="abGreatEinstein"
						name="Einstein"
						alt="Einstein"
						title="Einstein"
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
					<span className="fs-6 fst-italic align-self-end" >
						- Albert Einstein
					</span>
				</div>
			</div>
		</div>
	);
}

export default AboutGreat;
