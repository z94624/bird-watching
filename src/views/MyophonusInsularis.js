import MyophonusInsularisHome from './MyophonusInsularis_Home';
import MyophonusInsularisMe from './MyophonusInsularis_Me';
import MyophonusInsularisExperiance from './MyophonusInsularis_Experiance';
import MyophonusInsularisGreat from './MyophonusInsularis_Great';
import MyophonusInsularisEmail from './MyophonusInsularis_Email';
import './MyophonusInsularis.css';

const MyophonusInsularis = () => {
	return (
		<main className="h-100">
			{/* 介紹首頁 */}
			<MyophonusInsularisHome />
			{/* 自我介紹 */}
			<MyophonusInsularisMe />
			{/* 自我簡歷 */}
			<MyophonusInsularisExperiance />
			{/* 名人名言 */}
			<MyophonusInsularisGreat />
			{/* 聯絡我 */}
			<MyophonusInsularisEmail />
		</main>
	);
}

export default MyophonusInsularis;
