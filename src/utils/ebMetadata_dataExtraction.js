import eBirdMetadataData_smoBEE from './ebird-metadata_smoBEE.json';
import eBirdMetadataData_LinFenWen from './ebird-metadata_lin-fen-wen.json';
/*
 * 讀取 ebirder 資料
 * avatarIndex: ebirder 編號
 */
const loadEBirdMetadataOfEBirder = avatarIndex => {
	switch (avatarIndex) {
		case 0:
			return eBirdMetadataData_smoBEE;
		case 1:
			return eBirdMetadataData_LinFenWen;
		default:
			return eBirdMetadataData_smoBEE;
	}
}
/*
 * 依照欲合併欄位合併賞鳥資料
 * keysToMerge: 依據欄位
 * keysToCollect: 合併欄位
 * keysToRemain: 保留欄位
 */
export const dataMergedByKeys = (avatarIndex, keysToMerge, keysToCollect, keysToRemain, sort, descendingOrder=true) => {
	// 所有欄位
	let allKeys = [...keysToMerge, ...keysToCollect, ...keysToRemain];
	// 使用 ebirder 資料
	let eBirdMetadataData = loadEBirdMetadataOfEBirder(avatarIndex);
	let mergedData = eBirdMetadataData.reduce((arr, ele) => { // EXCEL 的每列資料
		let exist = arr.findIndex(okEle => { // 是否有相同依據欄位資料
			let match = true;
			for (let keyToMerge of keysToMerge) { // 每個依據欄位都要相同
				if (JSON.stringify(ele[keyToMerge]) !== JSON.stringify(okEle[keyToMerge])) {
					match = false;
					break;
				}
			}
			return match;
		});

		if (exist !== -1) { // 若存在即合併
			let matchedEle = arr[exist];
			for (let keyToCollect of keysToCollect) { // 每個合併欄位
				matchedEle[keyToCollect] = [...matchedEle[keyToCollect], ...ele[keyToCollect]];
			}
			if (sort && allKeys.includes("Date")) { // 為了依日期時間排序
				matchedEle["datetime"] = [`${ele["Date"]} ${ele["Time"]}`];
				matchedEle["milliTime"] = [new Date(`${ele["Date"]} ${ele["Time"]}`).getTime()];
			}
		} else { // 若不存在即新增
			let newEle = {};
			for (let allKey of allKeys) { // 只保留需要的欄位
				newEle[allKey] = ele[allKey];
			}
			if (sort && allKeys.includes("Date")) { // 為了依日期時間排序
				newEle["datetime"] = [`${ele["Date"]} ${ele["Time"]}`];
				newEle["milliTime"] = [new Date(`${ele["Date"]} ${ele["Time"]}`).getTime()];
			}
			arr.push(newEle);
		}
		return arr;
	}, []);
	// 若要依日期時間排序
	if (sort) {
		if (descendingOrder) { // 降冪
			mergedData.sort((a, b) => a["milliTime"][0] < b["milliTime"][0] ? 1 : -1);
		} else { // 升冪
			mergedData.sort((a, b) => a["milliTime"][0] > b["milliTime"][0] ? 1 : -1);
		}
	}
	return mergedData;
}