import { Fragment } from 'react';

import Header from './components/Header';
import Footer from './components/Footer';

const Layout = props => {
	return (
		<Fragment>
			<div className="h-100 bg-dark text-center">
            	<div className="cover-container d-flex h-100 p-0 flex-column">
					<Header />
					{props.children}
					<Footer />
				</div>
        	</div>
		</Fragment>
	);
}

export default Layout;
