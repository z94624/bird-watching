import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import './ToolBox.css';

import { ReactComponent as ResetZoom } from './../images/resetZoom.svg';
/*
 * 全螢幕按鈕
 * fullscreenHandler: 'react-full-screen'
 */
export const FullScreenButton = ({fullscreenHandler, absolutePosition=true}) => {
	return (
		<OverlayTrigger
			key="top"
			placement="top"
			overlay={<Tooltip>全螢幕</Tooltip>}
		>
			<button type="button" className={`fullscreenBtn ${absolutePosition?'toolbox-t0r0':'toolbox'} btn-light rounded`} onClick={fullscreenHandler.enter}>
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-fullscreen" viewBox="0 0 16 16">
					<path d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z"/>
				</svg>
			</button>
		</OverlayTrigger>
	);
}
// 重設縮放
const handleResetZoom = ref => {
	ref.current.resetZoom();
}
/*
 * 恢復縮放按鈕
 * handleResetZoom: 'chartjs-plugin-zoom'
 */
export const ResetZoomButton = ({refObj, absolutePosition=true}) => {
	return (
		<OverlayTrigger
			key="top"
			placement="top"
			overlay={<Tooltip>恢復縮放</Tooltip>}
		>
			<button type="button" className={`resetZoomBtn ${absolutePosition?'toolbox-t0r0':'toolbox'} btn-light rounded`} onClick={() => handleResetZoom(refObj)}>
				<ResetZoom width="16" height="16" />
			</button>
		</OverlayTrigger>
	);
}
