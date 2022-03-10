import { Fragment, useRef } from 'react';

import Draggable from 'react-draggable';

import Header from './components/Header';

import './Layout.css';

import cockatielCrest from './images/cockatielCrest.png';

const Layout = ({children}) => {
	const nodeRef = useRef(null); // react-draggable: If running in React Strict mode, ReactDOM.findDOMNode() is deprecated.

	return (
		<Fragment>
			<div className="h-100 bg-dark text-center">
            	<div className="cover-container d-flex h-100 p-0 flex-column">
					<Header className="fixed-top" /> {/* 每個分頁都要有途徑轉換至其他分頁 */}
					{children} {/* 每個分頁的頁面 */}

					<Draggable
						bounds="parent"
						defaultPosition={{x: 0, y: 200}}
						nodeRef={nodeRef}
					>
						<div id="backgroundPlaylist" ref={nodeRef}> {/* 背景音樂 */}
							<div id="bpImg"><img src={cockatielCrest} alt="" /></div>
							<iframe src="https://www.youtube.com/embed/videoseries?list=PLTks92J980S2_HbgX6drngE3T41uiCgyc&autoplay=1&disablekb=1&loop=1&modestbranding=1" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
						</div>
					</Draggable>
				</div>
        	</div>
		</Fragment>
	);
}

export default Layout;
