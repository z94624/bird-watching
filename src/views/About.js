import AboutHome from './About_Home';
import AboutMe from './About_Me';
import './About.css';

const About = () => {
	return (
		<main className="h-100 container-fluid">
			{/* 介紹首頁 */}
			<AboutHome />
			{/* 自我介紹 */}
			<AboutMe />
		</main>
	);
}

export default About;
