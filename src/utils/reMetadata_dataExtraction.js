import birdRecordsInfo from './birdsInGoogleDrive/birdRecordsInfo.json';
/*
 * 依照鳥種收集鳥音
 * bird: 欲查看之鳥種
 */
export const collectRecordsByBird = bird => {
	let info = birdRecordsInfo.find(ele => ele['bird'] === bird);
	return info['records'];
}
