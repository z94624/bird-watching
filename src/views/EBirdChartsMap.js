// FIX: https://stackoverflow.com/questions/67552020/how-to-fix-error-failed-to-compile-node-modules-react-leaflet-core-esm-pat
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
// 地圖圖釘
import markerImg from '../images/leaflet/marker-icon.png';
import markerShadowImg from '../images/leaflet/marker-shadow.png';
// 地圖圖釘圖片轉換成 Leaflet 格式
const markerIcon = new L.Icon({
	iconUrl: markerImg, // 圖釘
	shadowUrl: markerShadowImg, // 陰影
	iconSize:     [30, 45], // size of the icon
    shadowSize:   [45, 45], // size of the shadow
    iconAnchor:   [15, 45], // point of the icon which will correspond to marker's location
    shadowAnchor: [15, 45],  // the same for the shadow
    popupAnchor:  [1, -34] // point from which the popup should open relative to the iconAnchor
});

const EBirdChartsMap = () => {
	// 圖釘座標
	const coordinate = [25.023204, 121.505271];

	return (
		<div id="mapTab" aria-labelledby="map">
			{/* 地圖容器 */}
			<div id="birdMap">
				<MapContainer
					center={[23.975650, 120.973882]} // 台灣地理中心
					zoom={7} // 放大倍率
					style={{width: '100%', height: '100%'}} // 必設，預設高度 0
				>
					{/* Used to load and display tile layers on the map. */}
					<TileLayer
						attribution='&copy; <a href="https://ebird.org/profile/MTg1MTc2NQ">黃健峯</a>/<a href="https://ebird.org/profile/MTQ1NjU5OQ/TW">林芬雯</a> contributor' // 版權
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						detectRetina={true}
					/>
					{/* 圖釘 */}
					<Marker
						position={coordinate} // 座標
						icon={markerIcon} // 圖示
						title="青年公園" // Tooltip
						alt="🐥" // 圖示替代文字
						opacity={0.9} // 圖釘透明度
						riseOnHover={true} // 浮出至最前
					>
						{/* 彈出說明 */}
						<Popup
							minWidth={200} // 固定寬度
							maxHeight={300} // 最大高度，超過則 Scrollable
							closeButton={false} // 打叉叉關閉
						>
							{/* 地點 */}
							<p className="fs-5 fw-bold text-decoration-underline my-0">台北--田寮洋濕地</p>
							{/* 時間 */}
							<p className="fs-6 my-1">2021/2/6 12:52:00 PM</p>
							{/* 鳥種 */}
							<div className="form-floating">
								<textarea id="S80683016" className="form-control" placeHolder="無鳥種" style={{height: "135px"}} disabled>{`寒林/凍原豆雁(4)\n琵嘴鴨(2)`}</textarea>
								<label for="S80683016">鳥種</label>
							</div>
						</Popup>
					</Marker>
				</MapContainer>
			</div>
		</div>
	);
}

export default EBirdChartsMap;
