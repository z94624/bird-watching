import { useState, useEffect } from 'react';

const useGeoLocation = () => {
	// 使用者座標資訊
	const [location, setLocation] = useState({
		loaded: false, // 處理狀態
		coordinates: {lat: "", lng: ""} // 座標
	});
	// 成功
	const onSuccess = position => {
		setLocation({ // 促使 EBirdChartsMap.js 轉譯第二次
			loaded: true,
			coordinates: {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			}
		});
	}
	// 失敗
	const onError = error => {
		setLocation({
			loaded: true,
			error
		});
	}
	// 等待 EBirdChartsMap.js 轉譯第一次後再執行
	useEffect(() => {
		// 偵測允不允許存取位置
		if (!("geolocation" in navigator)) {
			onError({
				code: 0,
				message: "Geolocation not supported"
			});
		}
		// 允許的話，嘗試取得位置
		navigator.geolocation.getCurrentPosition(onSuccess, onError);
	}, []);

	return location;
}

export default useGeoLocation;
