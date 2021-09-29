import { Fragment } from 'react';

import Header from './components/Header';

const Layout = ({children}) => {
	return (
		<Fragment>
			<div className="h-100 bg-dark text-center">
            	<div className="cover-container d-flex h-100 p-0 flex-column">
					<Header className="fixed-top" /> {/* 每個分頁都要有途徑轉換至其他分頁 */}
					{children} {/* 每個分頁的頁面 */}
				</div>
        	</div>
		</Fragment>
	);
}

export default Layout;
