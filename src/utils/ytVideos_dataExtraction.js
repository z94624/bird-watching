import youTubeVideosData from './youtube-videos.json';
import YoutubeVideo from './../components/YoutubeVideo';

export const getItems = (key, duplicate=false) => {
	let items = youTubeVideosData.reduce((arr, ele) => 
		arr.concat([ele[key]])
	, []);
	return (duplicate ? items : [...(new Set(items))]);
}

export const itemsToRainbowOptions = (items) => {
	let allOption = { value: "*全部", label: "*全部" };
	return items.reduce((arr, ele) => 
		arr.concat([{ value: ele, label: ele }])
	, [allOption]);
}

export const vidsToVideoCards = (vids, dates, locations, birds) => { // 暫時 birds/dates，可改其他做 header
	return (
		<div id="ytVideosContainer">
			{vids.map((vid, idx) => (
				<div key={"ytVideo-"+idx} className="w-25 p-2 d-inline-block">
					<div className="card">
						<div className="card-header">
							{dates[idx] + "/" + locations[idx] + "/" + birds[idx]}
						</div>
						<div className="card-body p-0">
							{/*<div className="lazyLoad" data-id={vid}>
								<div className="ll-play-btn" role="button"></div>
								<img className="w-100" role="button" src={"https://img.youtube.com/vi/"+vid+"/maxresdefault.jpg"} alt={vid} />
							</div>*/}
							<YoutubeVideo videoId={vid} videoLid="" />
						</div>
					</div>
				</div>
			))}
		</div>
	);
}

/*export const linkToYouTube = () => {
	// 影片數量
	var videos = document.querySelectorAll('.lazyLoad');
	for (let i = 0; i < videos.length; i++) {
		let video = videos[i];
		let video_ID = video.dataset.id;
		let video_LID = video.dataset.lid;
		// 建立 Iframe
		video.addEventListener('click', function() {
			var iframe = document.createElement('iframe');

			iframe.setAttribute("class", "w-100");
			if (video_LID === undefined) { // 單部影片
				iframe.setAttribute("src", "https://www.youtube.com/embed/" + video_ID + "?rel=0&showinfo=0&autoplay=1");
			} else { // 播放清單
				iframe.setAttribute("src", "https://www.youtube.com/embed?listType=playlist&list=" + video_LID + "&rel=0&showinfo=0&autoplay=1");
			}
			iframe.setAttribute("frameborder", "0");
			iframe.setAttribute("allowfullscreen", "");
			// 移除影片縮圖
			while (this.firstChild) {
				this.removeChild(this.lastChild); // 從最後移除比較快
			}
			// 換成 Iframe
			this.appendChild(iframe);
		});
	}
}*/
