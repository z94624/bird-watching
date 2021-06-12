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

const RootRouter = () => {
	return (
		<Router>
			<Layout>
				<Switch>
					<Route exact path="/bird-watching" component={Home} />
					<Route exact path="/bird-watching/ebird" component={EBird} />
					<Route exact path="/bird-watching/youtube" component={YouTube} />
					<Route exact path="/bird-watching/photos" component={Photos} />
					<Route exact path="/bird-watching/records" component={Records} />
				</Switch>
			</Layout>
		</Router>
	);
}

export default RootRouter;
