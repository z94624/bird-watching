import birdRecordsInfo from './birdsInGoogleDrive/birdRecordsInfo.json';
/*
 * 依照鳥種收集鳥音
 * bird: 欲查看之鳥種
 */
export const collectRecordsByBird = bird => {
	let info = birdRecordsInfo.find(ele => ele['bird'] === bird);
	return info['records'];
}
/*
 * 產生 React Table 的資料
 * records: 原始資料格式
 */
export const recordsToReactTableData = records => {
    return records.reduce((arr, record) => { // 每一筆錄音
        const id = record['id']; // Google File ID
        const name = record['name']; // 音檔檔名
        let names = name.split('_');
        let date = names[0]; // 錄音日期時間
        let location = names[1]; // 錄音地點
        arr.push({
            date: date,
            location: location,
            record: (
                <audio key={id} src={`https://docs.google.com/uc?export=download&id=${id}`} controls controlsList="noplaybackrate"></audio>
            )
        });
        return arr;
    }, []);
}
