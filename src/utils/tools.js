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
 * 隨機顏色
 * alpha: 透明度
 */
export const getRandomColor = (alpha=1) => {
    return "rgba(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + alpha + ")";
 };