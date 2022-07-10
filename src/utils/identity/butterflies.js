// 所有蝴蝶
import { hesperiidae } from './butterfly/hesperiidae.js'; // 弄蝶科
import { papilionidae } from './butterfly/papilionidae.js'; // 鳳蝶科
import { pieridae } from './butterfly/pieridae.js'; // 粉蝶科
import { lycaenidae } from './butterfly/lycaenidae.js'; // 灰蝶科
import { nymphalidae } from './butterfly/nymphalidae.js'; // 蛺蝶科

export const butterflyInfos = [
	...hesperiidae, ...papilionidae, ...pieridae, ...lycaenidae, ...nymphalidae
];
