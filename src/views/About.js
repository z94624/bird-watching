import AboutHome from './About_Home';
import AboutMe from './About_Me';
import AboutExperiance from './About_Experiance';
import AboutGreat from './About_Great';
import AboutEmail from './About_Email';
import './About.css';

const About = () => {
	return (
		<main className="h-100">
			{/* 介紹首頁 */}
			<AboutHome />
			{/* 自我介紹 */}
			<AboutMe />
			{/* 自我簡歷 */}
			<AboutExperiance />
			{/* 名人名言 */}
			<AboutGreat />
			{/* 聯絡我 */}
			<AboutEmail />
		</main>
	);
}

export default About;
