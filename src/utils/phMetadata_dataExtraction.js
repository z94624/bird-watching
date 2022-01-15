import birdPhotosInfo from './birdPhotosInfo.json';
/*
 * 依照日期收集照片
 * date: 欲查看之日期
 */
export const collectPhotosByDate = date => {
	return birdPhotosInfo.reduce((arr, ele) => {
		if (ele["date"] === date) {
			arr.push(ele["id"]);
		}
		return arr;
	}, []);
}