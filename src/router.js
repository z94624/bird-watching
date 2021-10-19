import {
	BrowserRouter as Router,
	Switch,
	Route
} from 'react-router-dom';

import Layout from './Layout';

import Home from './views/Home';
import EBird from './views/EBird';
import YouTube from './views/YouTube';
import Photos from './views/Photos';
import Records from './views/Records';
import About from './views/About';

const RootRouter = () => {
	// 頁面滾動至某元素
	const scrollToElement = target => {
		target.scrollIntoView({ behavior: 'smooth' }); // 平滑地滾動到可見
	}

	return (
		<Router>
			<Layout> {/* 所有頁面的模板 */}
				<Switch> {/* 匹配路徑載入對應分頁元件 */}
					<Route exact path="/bird-watching" component={Home} />
					<Route exact path="/bird-watching/ebird" component={() => 
						<EBird scrollToElement={scrollToElement} />
					} />
					<Route exact path="/bird-watching/youtube" component={() => 
						<YouTube scrollToElement={scrollToElement} />
					} />
					<Route exact path="/bird-watching/photos" component={Photos} />
					<Route exact path="/bird-watching/records" component={Records} />
					<Route exact path="/bird-watching/about" component={About} />
				</Switch>
			</Layout>
		</Router>
	);
}

export default RootRouter;
