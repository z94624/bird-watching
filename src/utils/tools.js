/*
 * 物件依照 value 排序
 * obj: value 為可排序值
 * 輸出：排序後物件
 */
export const sortObjectByValue = (obj, descendingOrder=true) => {
    if (descendingOrder) {
        return Object.fromEntries(Object.entries(obj).sort((a, b) => b[1] - a[1]));
    } else {
        return Object.fromEntries(Object.entries(obj).sort((a, b) => a[1] - b[1]));
    }
}
/*
 * 陣列元素分組
 * arr: 一階陣列
 * size: 每組元素個數
 * 輸出：二階陣列
 */
export const arrayToChunks = (arr, size) => {
	var chunkedArray = [];
	while (arr.length) {
		chunkedArray.push(arr.splice(0, size));
	}
	return chunkedArray;
}
/*
 * 取得所有 JsonObject 的某項資訊
 * key:  JsonObject 資訊欄位
 * duplicate: 重不重複
 * chunk: 配合 BS Grid System 進行資料分組
 * (chunk=false) 輸出：[a, b, c, ...]
 * (chunk=true) 輸出：[[a, b, c], [...], ...]
 */
export const getItemsByKey = (data, key, duplicate=false, chunk=false) => {
    // 收集所有資料
    let items = data.reduce((arr, ele) => 
        arr.concat([ele[key]])
    , []);
    // 取不重複
    if (!duplicate) {
        items = [...(new Set(items))];
    }
    // 資料分組
    if (chunk) {
        items = arrayToChunks(items, 6);
    }
    return items;
}
/*
 * 隨機顏色
 * alpha: 透明度
 */
export const getRandomColor = (alpha=1) => {
    return "rgba(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + alpha + ")";
 };