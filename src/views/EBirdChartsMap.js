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
					center={[23.975650, 120.973882]} // 中心位置
					zoom={7} // 放大倍率
					scrollWheelZoom={true} // 滑鼠滾輪縮放
					style={{width: '100%', height: '100%'}} // 必設，預設高度 0
				>
					<TileLayer
						attribution='&copy; <a href="https://ebird.org/profile/MTg1MTc2NQ">黃健峯</a> contributor' // 版權
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
					{/* 圖釘 */}
					<Marker
						position={coordinate} // 座標
						icon={markerIcon} // 圖示
					>
						{/* 彈出說明 */}
						<Popup>青年公園</Popup>
					</Marker>
				</MapContainer>
			</div>
		</div>
	);
}

export default EBirdChartsMap;
