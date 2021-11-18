import { useMemo } from 'react';
// FIX: https://stackoverflow.com/questions/67552020/how-to-fix-error-failed-to-compile-node-modules-react-leaflet-core-esm-pat
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';

import { dataMergedByKeys } from './../utils/ebMetadata_dataExtraction';
import useGeoLocation from './../hooks/useGeoLocation';
import { FullScreenButton } from './../components/ToolBox';
import './css/birdLoader.css';
// 地圖圖釘
import markerImg from './../images/marker-icon.png';
//import markerShadowImg from './../images/leaflet/marker-shadow.png';
// eBirder 圖示
import ebirderImg from './../images/ebirder.png';
// 地圖圖釘圖片轉換成 Leaflet 格式
const markerIcon = new L.Icon({
	iconUrl: markerImg, // 圖釘
	//shadowUrl: markerShadowImg, // 陰影
	iconSize:     [36, 45], // size of the icon
    //shadowSize:   [45, 45], // size of the shadow
    iconAnchor:   [18, 45], // point of the icon which will correspond to marker's location
    //shadowAnchor: [15, 45],  // the same for the shadow
    popupAnchor:  [1, -34] // point from which the popup should open relative to the iconAnchor
});
// 使用者在地圖上顯示
const ebirderIcon = new L.Icon({
	iconUrl: ebirderImg,
	iconSize:     [68, 50],
    iconAnchor:   [34, 50]
});

const EBirdChartsMap = ({ avatarIndex }) => {
	// 全螢幕處理器
	const fullscreenHandler = useFullScreenHandle();
	// 使用者座標
	const location = useGeoLocation();
	const loaded = location.loaded;
	const ebirderLocation = [location.coordinates.lat, location.coordinates.lng];
	// 圖釘需要的資料
	let markerData = useMemo(() => dataMergedByKeys(avatarIndex, ["Submission_ID"], ["Common_Name", "Count"], ["Location", "Date", "Time", "Latitude", "Longitude"], false), [avatarIndex]);

	return (
		<div id="mapTab" aria-labelledby="map">
			{/* 全螢幕按鈕 */}
			<FullScreenButton fullscreenHandler={fullscreenHandler} absolutePosition={true} />
			{/* 地圖容器 */}
			<div id="birdMap">
			{loaded ?
				<FullScreen handle={fullscreenHandler}>
					<MapContainer
						center={ebirderLocation} // 地圖預設中心
						zoom={10} // 放大倍率
						style={{width: '100%', height: '100%'}} // 必設，預設高度 0
					>
						{/* Used to load and display tile layers on the map. */}
						<TileLayer
							attribution='&copy; <a href="https://ebird.org/profile/MTg1MTc2NQ">黃健峯</a>/<a href="https://ebird.org/profile/MTQ1NjU5OQ/TW">林芬雯</a> contributor' // 版權
							url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
							detectRetina={true}
						/>
							{/* 標示使用者座標 */}
							<Marker
								position={ebirderLocation}
								icon={ebirderIcon}
								title="我"
								alt="🐥"
								opacity={1}
								riseOnHover={true}
							></Marker>
						{/*
						  * 圖釘群組：相鄰或重複的壓縮而不重疊
						  * 少(綠)/中(黃)/多(紅)：10 ~ 100
						  */}
						<MarkerClusterGroup
							key={avatarIndex} // The cluster to be completely rerendered = clear all old markers.
							spiderLegPolylineOptions={{
								weight: 1.5,
								color: '#ab0047',
								opacity: 0.7
							}}
						>
						{/* 圖釘 */}
						{markerData.map(({Submission_ID, Location, Date, Time, Common_Name, Count, Latitude, Longitude}, mIdx) => {
							let location = Location[0];
							let locationShort = location.split("(")[0];
							let datetime = `${Date[0]} ${Time[0]}`;
							let position = [Latitude[0], Longitude[0]];
							let birds = Common_Name.map((name, nIdx) => [name, Count[nIdx]]).join(`\n`);
							return (
								<Marker
									key={`ebMarker-${mIdx}`}
									position={position} // 座標
									icon={markerIcon} // 圖示
									title={locationShort} // Tooltip
									alt="🐥" // 圖示替代文字
									opacity={0.9} // 圖釘透明度
									riseOnHover={true} // 浮出至最前
								>
									{/* 彈出說明 */}
									<Popup
										maxWidth={200} // 固定寬度
										maxHeight={300} // 最大高度，超過則 Scrollable
										closeButton={false} // 打叉叉關閉
									>
										{/* 地點 */}
										<p className="fs-5 fw-bold text-decoration-underline my-0">{location}</p>
										{/* 時間 */}
										<p className="fs-6 my-1">{datetime}</p>
										{/* 鳥種 */}
										<div className="form-floating">
											<textarea id={Submission_ID} className="form-control" placeholder="無鳥種" value={birds} style={{height: "135px"}} disabled></textarea>
											<label htmlFor={Submission_ID}>鳥種</label>
										</div>
									</Popup>
								</Marker>
							);
						})}
						</MarkerClusterGroup>
					</MapContainer>
				</FullScreen>
			:
				<div className="text-white d-flex flex-column justify-content-center align-items-center h-100 fs-1">
					<div className="bird-loader">
						<div className="bird-head"></div>
						<div className="bird-face"></div>
						<div className="bird-eye"></div>
						<div className="bird-cheek"></div>
						<div className="bird-upper-mouth"></div>
						<div className="bird-lower-mouth"></div>
					</div>
					<span>等待定位中...</span>
				</div>
			}
			</div>
		</div>
	);
}

export default EBirdChartsMap;
