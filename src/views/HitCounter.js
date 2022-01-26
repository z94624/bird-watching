import { database } from './../config/firebase';
import { ref, onValue, runTransaction } from "firebase/database";
import RetroHitCounter from 'react-retro-hit-counter';

import { infiniteExpiryDate } from './../utils/tools';
import './HitCounter.css';
/*
 * 檢查 Cookie
 * cookies: Cookie 資訊
 */
const checkUserCookie = (cookies) => {
    const [todayCookie, totalCookie] = cookies;
    const dateCookie = {name: "LastDate", expire: infiniteExpiryDate.toUTCString()};
    // 判斷與前次紀錄同不同天
    let dateRE = new RegExp(dateCookie.name, 'g');
    let dateExists = document.cookie.match(dateRE);
    let dateNow = new Date().getDate(); // 今天幾日
    let newDateForCookie = true;
    if (!dateExists) { // Cookie 不存在
        createUserCookie(dateCookie, dateNow);
        newDateForCookie = true;
    } else { // Cookie 存在
        let dateLast = document.cookie
            .split('; ')
            .find(row => row.startsWith(dateCookie.name + '='))
            .split('=')[1]; // 上次登入日
        newDateForCookie = dateNow != dateLast;
        createUserCookie(dateCookie, dateNow);
    }
    // 判斷今日為新天且次數歸零
    let newDateForFirebase = false;
    runTransaction(ref(database, '/LastDate'), (date) => {
        newDateForFirebase = dateNow != date;
        return dateNow;
    });
    // 更新人次
    cookies.map((cookie, cIdx) => {
        let reqexp = new RegExp(cookie.name, 'g');
        let exists = document.cookie.match(reqexp);
        if (!exists) { // Cookie 不存在
            createUserCookie(cookie, "True"); // 建立 Cookie
            runTransaction(cookie.ref, (hits) => {
                if (hits && (cIdx == 0 && newDateForFirebase)) { // 已有資料庫 && (今日 且 新天)
                    return 1;
                } else if (hits && (cIdx == 1 || newDateForCookie)) { // 已有資料庫 && (只要是累計 || 今天為新天)
                    return (hits + 1);
                } else if (!hits) { // 尚未建立資料庫
                    return 1;
                }
            });
        } else if (newDateForCookie) { // Cookie 存在 && 今天為新天
            runTransaction(cookie.ref, (hits) => hits + 1);
        }
    });
}
// 建立 Cookie
const createUserCookie = (cookie, value) => {
    document.cookie = cookie.name + "=" + value + "; expires=" + cookie.expire + "; path=/";
}

const HitCounter = () => {
	/*
     * Hit Counter: https://w3collective.com/hit-counter-javascript-firebase/
     */
    // Cookie 資訊
    const today = new Date();
    const cookies = [
        {name: "TodayHits", expire: new Date(today.getFullYear(), today.getMonth(), today.getDate()+1, 0, 0, 0).toUTCString(), ref: ref(database, '/TodayHits'), id: "todayHitCounter", nameChi: "今日人次"},
        {name: "TotalHits", expire: infiniteExpiryDate.toUTCString(), ref: ref(database, '/TotalHits'), id: "totalHitCounter", nameChi: "累計人次"}
    ];
    checkUserCookie(cookies);
    // 新計數
    const newHits = cookies.reduce((obj, cookie) => {
        onValue(cookie.ref, (snapshot) => {
            obj = {...obj, [cookie.name]: snapshot.val()}
        });
        return obj;
    }, {TodayHits: 1, TotalHits: 1});

    return (
    	<div id="hitCounter" className="d-inline-flex flex-wrap pt-1 ps-1">
        {cookies.map((cookie, cIdx) => (
            <div key={`homeRetroHitCounter-${cIdx}`} className="me-1">
                <label htmlFor={cookie.id} className="form-label text-white">{cookie.nameChi}：</label>
                <RetroHitCounter
                    id={cookie.id}
                    hits={newHits[cookie.name]}
                    minLength={4}
                    size={25}
                    padding={0}
                    segmentActiveColor="#FE9AFF"
                    segmentInactiveColor="#331F33"
                    withBorder={false}
                />
            </div>
        ))}
        </div>
	);
}

export default HitCounter;
