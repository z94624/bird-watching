import birdPhotosInfo from './birdPhotosInfo/GoogleDriveAPI/birdPhotosInfo.json';
/*
 * 依照日期收集照片
 * date: 欲查看之日期
 */
export const collectPhotosByDate = date => {
	let info = birdPhotosInfo.find(ele => ele['date'] === date);
	return info['images'];
}