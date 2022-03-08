import { Fragment } from 'react';

import Header from './components/Header';

import './Layout.css';

import birdsSinging from './images/birdsSinging.png';

const Layout = ({children}) => {
	return (
		<Fragment>
			<div className="h-100 bg-dark text-center">
            	<div className="cover-container d-flex h-100 p-0 flex-column">
					<Header className="fixed-top" /> {/* 每個分頁都要有途徑轉換至其他分頁 */}
					{children} {/* 每個分頁的頁面 */}
					<div id="backgroundPlaylist"> {/* 背景音樂 */}
						<div id="bpImg"><img src={birdsSinging} alt="" /></div>
						<iframe src="https://www.youtube.com/embed/videoseries?list=PLTks92J980S2_HbgX6drngE3T41uiCgyc&autoplay=1&disablekb=1&loop=1&modestbranding=1" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
					</div>
				</div>
        	</div>
		</Fragment>
	);
}

export default Layout;
