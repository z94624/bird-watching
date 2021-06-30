import React, { useState } from 'react';
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
		React.createElement("iframe", {
			className: classNames.iframe,
			src: (!videoLid ?
				"https://www.youtube.com/embed/" + videoId + "?rel=0&showinfo=0&autoplay=1" :
				"https://www.youtube.com/embed?listType=playlist&list=" + videoLid + "&rel=0&showinfo=0&autoplay=1"
			),
			frameBorder: "0",
			allowFullScreen: true
		});
}

export default YoutubeVideo;
