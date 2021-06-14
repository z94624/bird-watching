import youTubeVideosData from './youtube-videos.json';

export const getItems = (key) => {
	let items = youTubeVideosData.reduce((arr, ele) => 
		arr.concat([ele[key]])
	, []);
	return new Set(items);
}

export const itemsToRainbowOptions = (items) => {
	let allOption = { value: "*全部", label: "*全部" };
	return [...items].reduce((arr, ele) => 
		arr.concat([{ value: ele, label: ele }])
	, [allOption]);
}
