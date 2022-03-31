import './BackgroundVideo.css';

const BackgroundVideo = ({ src }) => {
	return (
		<>
			<video autoPlay muted loop>
				<source src={src} type="video/mp4" />
			</video>
		</>
	);
}

export default BackgroundVideo;
