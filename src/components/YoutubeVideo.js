import React, { useState } from 'react';

import YouTube from 'react-youtube';
// 影片卡片各元素的 Class
var classNames = {
	"playButton": "playBtn", // 模仿的播放按鈕
	"previewImage": "previewImg", // 預覽圖片
	"iframe": "ytIframe" // YouTube 影片容器
}

const YoutubeVideo = ({ videoId, videoLid }) => {
	// 載入真正的 YouTube 影片
	const [showVideo, setShowVideo] = useState(false);
	const handleShowVideoChange = () => {
		setShowVideo(true);
	}
	/*
	 * YouTube API 的設定選項
	 * https://developers.google.com/youtube/player_parameters
	 */
	const opts = {
		playerVars: {
			autoplay: 1, // 0, 1
			color: "red", // 觀看進度條顏色：red, white
			controls: 1, // 播放器控制顯示：0, 1
			list: "PL"+videoLid, // 播放清單 ID
			listType: "playlist" // 播放清單選單
		}
	}
	// 預設為圖片，點選後載入真正影片
	return !showVideo ?
		React.createElement("div", {
			className: classNames.previewImage,
			style: { // 圖片畫質：hqdefault, mqdefault, sddefault, default, maxresdefault
				backgroundImage: "url(https://img.youtube.com/vi/" + videoId + "/hqdefault.jpg)"
			},
			onClick: handleShowVideoChange
		}, React.createElement("div", {
			className: classNames.playButton
		})) :
		/*React.createElement("iframe", {
			className: classNames.iframe,
			src: (!videoLid ?
				"https://www.youtube.com/embed/" + videoId + "?rel=0&showinfo=0&autoplay=1" :
				"https://www.youtube.com/embed?listType=playlist&list=" + videoLid + "&rel=0&showinfo=0&autoplay=1"
			),
			frameBorder: "0",
			allowFullScreen: true
		});*/
		<YouTube
			videoId={videoId}
			className="ytVideo" // 為了限制高度
			opts={opts}
			onPlay={() => {}}
			onPause={() => {}}
			onEnd={() => {}}
			onStateChange={() => {}}
		/>
}

export default YoutubeVideo;
