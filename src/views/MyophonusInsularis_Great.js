import Avatar from 'react-avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';

import einstein from './../images/AlbertEinstein.jpg';
import hawking from './../images/StephenHawking.jpg';
import jane from './../images/JaneGoodall.jpg';
import sese from './../images/ChiefSeattle.jpg';
// 偉人
const greats = [
	{name: "Albert Einstein", briefName: "Einstein", src: einstein, quote: "There are only two ways to live your life. One is as though nothing is a miracle. The other is as though everything is a miracle."}, // 愛因斯坦
	{name: "Stephen Hawking", briefName: "Hawking", src: hawking, quote: "However difficult life may seem, there is always something you can do, and succeed at. It matters that you don’t just give up."}, // 霍金
	{name: "Chief Seattle", briefName: "SeSe", src: sese, quote: "All things share the same breath - the beast, the tree, the man. The air shares its spirit with all the life it supports."}, // 西雅圖酋長
	{name: "Jane Goodall", briefName: "Jane", src: jane, quote: "Only if we understand, can we care. Only if we care, we will help. Only if we help, we shall be saved."} // 珍古德
];

const AboutGreat = () => {
	return (
		<div id="abGreat" className="h-auto">
		{greats.map(({name, briefName, src, quote}, gIdx) => {
			if (gIdx % 2) {
				return (
					<div key={`abGreatGreat-${gIdx}`} id={`abGreat${briefName}Section`} className="abGreatFigure row px-3">
						{/* 名言 */}
						<div className="col-md-9 d-flex flex-column justify-content-center text-white px-5 py-3">
							<div className="col-md-12 align-self-center">
								<blockquote className="blockquote text-start fs-4" >
									<p>
										<FontAwesomeIcon icon={faQuoteLeft} className="me-2" />
										{quote}
									</p>
								</blockquote>
							</div>
							<span className="col-md-5 fs-6 fst-italic align-self-end" >
								- {name}
							</span>
						</div>
						{/* 頭像 */}
						<div className="col-md-3 m-auto p-3">
							<Avatar
								id={`abGreat${briefName}`}
								name={name}
								alt={name}
								title={name}
								size="150px" // 圖像大小
								round={true} // border-radius；number, true(100%), false(0%)
								src={src} // 載入照片
							/>
						</div>
					</div>
				);
			} else {
				return (
					<div key={`abGreatGreat-${gIdx}`} id={`abGreat${briefName}Section`} className="abGreatFigure row px-3">
						{/* 頭像 */}
						<div className="col-md-3 m-auto p-3">
							<Avatar
								id={`abGreat${briefName}`}
								name={name}
								alt={name}
								title={name}
								size="150px" // 圖像大小
								round={true} // border-radius；number, true(100%), false(0%)
								src={src} // 載入照片
							/>
						</div>
						{/* 名言 */}
						<div className="col-md-9 d-flex flex-column justify-content-center text-white px-5 py-3">
							<div className="col-md-12 align-self-center">
								<blockquote className="blockquote text-start fs-4" >
									<p>
										<FontAwesomeIcon icon={faQuoteLeft} className="me-2" />
										{quote}
									</p>
								</blockquote>
							</div>
							<span className="col-md-5 fs-6 fst-italic align-self-end" >
								- {name}
							</span>
						</div>
					</div>
				);
			}
		})}
		</div>
	);
}

export default AboutGreat;
