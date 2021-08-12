import eBirdMetadataData_smoBEE from './ebird-metadata_smoBEE.json';
/*
 * 依照欲合併欄位合併賞鳥資料
 * keysToMerge: 依據欄位
 * keysToCollect: 合併欄位
 * keysToRemain: 保留欄位
 */
export const dataMergedByKeys = (keysToMerge, keysToCollect, keysToRemain) => {
	let mergedData = eBirdMetadataData_smoBEE.reduce((arr, ele) => { // EXCEL 的每列資料
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
		} else { // 若不存在即新增
			let newEle = {};
			let allKeys = [...keysToMerge, ...keysToCollect, ...keysToRemain];
			for (let allKey of allKeys) { // 只保留需要的欄位
				newEle[allKey] = ele[allKey];
			}
			arr.push(newEle);
		}
		return arr;
	}, []);
	return mergedData;
}