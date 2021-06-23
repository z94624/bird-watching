import React, { useState } from 'react';

var classNames = {
	"playButton": "playBtn",
	"previewImage": "previewImg",
	"iframe": "ytIframe"
}

const YoutubeVideo = ({ videoId, videoLid }) => {
	const [showVideo, setShowVideo] = useState(false);
	const handleShowVideoChange = () => {
		setShowVideo(true);
	}

	return !showVideo ?
		React.createElement("div", {
			className: classNames.previewImage,
			style: {
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
