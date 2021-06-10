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
					<Route exact path="/" component={Home} />
					<Route path="/ebird" component={EBird} />
					<Route path="/youtube" component={YouTube} />
					<Route path="/photos" component={Photos} />
					<Route path="/records" component={Records} />
				</Switch>
			</Layout>
		</Router>
	);
}

export default RootRouter;
