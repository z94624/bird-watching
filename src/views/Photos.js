import { useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import SwiperCore, { EffectCoverflow, Navigation, Scrollbar, Keyboard, Mousewheel, Autoplay, Lazy, Zoom, Thumbs, FreeMode } from 'swiper';
import './../../node_modules/swiper/swiper-bundle.css';

import { itemsToRainbowSelectOptions } from './../utils/ytVideos_dataExtraction';
import { collectPhotosByDate } from './../utils/phMetadata_dataExtraction';
import { getItemsByKey } from './../utils/tools.js';
import './Photos.css';
import birdPhotosInfo from './../utils/birdPhotosInfo.json';

SwiperCore.use([EffectCoverflow, Navigation, Scrollbar, Keyboard, Mousewheel, Autoplay, Lazy, Zoom, Thumbs, FreeMode]);

const Photos = () => {
	// 不重複照片日期
	const listDates = getItemsByKey(birdPhotosInfo, 'date');
	// 照片日期降冪
	const descendingDates = listDates.sort((a, b) => new Date(a).getTime() < new Date(b).getTime() ? 1 : -1);
	// 日期
	const [date, setDate] = useState(descendingDates[0]);
	const handleDateChange = e => setDate(e.target.value);
	// 日期選項
	const dateSelect = itemsToRainbowSelectOptions(descendingDates, "phDateSelect", "日期", true, date, handleDateChange);
	// 該日期所有照片
	const photosOfDate = collectPhotosByDate(date);
	// 投影片預覽
	const [thumbsSwiper, setThumbsSwiper] = useState(null);

	return (
		<main className="main h-100">
			{/* 相片容器 */}
			<div id="photosContainer" className="h-100">
				{/* 日期選擇容器 */}
				<div id="phDateSelectContainer" className="row pb-1">{dateSelect}</div>
				{/* 相片藝廊 */}
				<div id="phPhotosGallery" className="row px-4">
					{/* 投影片播放 */}
					<Swiper
						id="swiperPlay"
						loop={true}
						effect="coverflow"
						coverflowEffect={{ depth: 100, modifier: 2, rotate: 50, scale: 1, slideShadows: true, stretch: 0 }}
						spaceBetween={10}
						navigation={true}
						scrollbar={{ draggable: true, hide: true, snapOnRelease: true }}
						keyboard={{ enabled: true, onlyInViewport: true, pageUpDown: true }}
						mousewheel
						autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
						lazy={{ loadOnTransitionStart: true, loadPrevNext: true }}
						zoom={{  }}
						thumbs={{ swiper: thumbsSwiper }}
					>
					{photosOfDate.map((photo, pIdx) => (
						<SwiperSlide key={`phSwiperPlay-${pIdx}`}>
							<div className="swiper-zoom-container">
								{/* thumbnail: 檔案小；uc: 原檔 */}
								<img className="swiper-lazy" data-src={`https://drive.google.com/uc?id=${photo}`} alt="" />
							</div>
							<div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
						</SwiperSlide>
					))}
					</Swiper>
					{/* 投影片預覽 */}
					<Swiper
						id="swiperPreview"
						loop={true}
						spaceBetween={10}
						slidesPerView={4}
						freeMode={true}
						watchSlidesProgress={true}
						onSwiper={setThumbsSwiper}
					>
					{photosOfDate.map((photo, pIdx) => (
						<SwiperSlide key={`phSwiperPreview-${pIdx}`}>
							{/* thumbnail: 檔案小；uc: 原檔 */}
							<img src={`https://drive.google.com/thumbnail?id=${photo}`} alt="" />
						</SwiperSlide>
					))}
					</Swiper>
				</div>
			</div>
		</main>
	);
}

export default Photos;
