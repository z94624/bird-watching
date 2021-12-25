import AboutHome from './About_Home';
import AboutMe from './About_Me';
import AboutExperiance from './About_Experiance';
import './About.css';

const About = () => {
	return (
		<main className="h-100 container-fluid">
			{/* 介紹首頁 */}
			<AboutHome />
			{/* 自我介紹 */}
			<AboutMe />
			{/* 自我簡歷 */}
			<AboutExperiance />
		</main>
	);
}

export default About;
