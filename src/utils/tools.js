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