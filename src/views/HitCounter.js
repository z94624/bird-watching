import { database } from './../config/firebase';
import { ref, onValue, runTransaction } from "firebase/database";
import RetroHitCounter from 'react-retro-hit-counter';

import { infiniteExpiryDate } from './../utils/tools';
import './HitCounter.css';
/*
 * 更新資料庫人次
 * dateCookie: 日期 Cookie 資訊
 * hitCookies: 人次 Cookie 資訊
 */
const updateHitCounter = (dateNow, dateCookie, hitCookies, newDateForFirebase) => {
    // 當天新紀錄
    let newDateForCookie = checkNewDateForCookie(dateCookie, dateNow);
    // 更新人次
    hitCookies.forEach((cookie, cIdx) => {
        let i = 0;
        let hitRE = new RegExp(cookie.name, 'g');
        let hitExists = document.cookie.match(hitRE);
        if (!hitExists) { // Cookie 不存在
            setTimeout(() => { // 避免存在性衝突
                createUserCookie(cookie, "True"); // 建立 Cookie
            }, 1000);
            runTransaction(cookie.ref, (hits) => {
                if (hits && (cIdx === 0 && newDateForFirebase)) { // 已建資料 && (今日人次 && 當天頭香)
                    i += 1;
                    if (i === 1) { // 只允許跑一次
                        return 1;
                    } else {
                        return hits;
                    }
                } else if (hits && (cIdx === 1 || newDateForCookie)) { // 已建資料 && (只要是累計人次 || 當天新紀錄)
                    i += 1;
                    if (i === 1) { // 只允許跑一次
                        return (hits + 1);
                    } else {
                        return hits;
                    }
                } else if (!hits) { // 未建資料
                    i += 1;
                    if (i === 1) { // 只允許跑一次
                        return 1;
                    } else {
                        return hits;
                    }
                }
            });
        } else if (newDateForCookie) { // Cookie 存在 && 當天新紀錄
            runTransaction(cookie.ref, (hits) => {
                i += 1;
                if (i === 1) { // 只允許跑一次
                    return (hits + 1);
                } else {
                    return hits;
                }
            });
        }
    });
}
// 判斷當天首次記錄，避免多次登入
const checkNewDateForCookie = (dateCookie, dateNow) => {
    let newDateForCookie = true;
    let dateRE = new RegExp(dateCookie.name, 'g');
    let dateExists = document.cookie.match(dateRE);
    if (!dateExists) { // Cookie 不存在
        createUserCookie(dateCookie, dateNow);
        newDateForCookie = true;
    } else { // Cookie 存在
        let dateLast = parseInt(document.cookie
            .split('; ')
            .find(row => row.startsWith(dateCookie.name + '='))
            .split('=')[1]); // 上次登入日
        newDateForCookie = dateNow !== dateLast;
        setTimeout(() => { // 避免存在性衝突
            createUserCookie(dateCookie, dateNow);
        }, 1000);
    }
    return newDateForCookie;
}
// 判斷當天首位拜訪者，今日人次歸零
const checkNewDateForFirebase = (dateNow, dateCookie, hitCookies) => {
    //createUserCookie(dateCookie, 20);
    let i = 0;
    let newDateForFirebase = false;
    runTransaction(dateCookie.ref, (date) => {
        if (date) { // 有取得資料
            i += 1;
            if (i === 1) { // 更新前取得資料
                newDateForFirebase = dateNow !== date;
                updateHitCounter(dateNow, dateCookie, hitCookies, newDateForFirebase);
            }
        }
        return dateNow;
    });
}
// 建立 Cookie
const createUserCookie = (cookie, value) => {
    document.cookie = cookie.name + "=" + value + "; expires=" + cookie.expire + "; path=/";
}

const HitCounter = () => {
    const today = new Date(); // 今天
    const yearNow = today.getFullYear(); // 今天幾年
    const monthNow = today.getMonth(); // 今天幾月
    const dateNow = today.getDate(); // 今天幾日
	/*
     * Hit Counter: https://w3collective.com/hit-counter-javascript-firebase/
     */
    // Cookie 資訊
    const dateCookie = {name: "LastDate", expire: infiniteExpiryDate.toUTCString(), ref: ref(database, '/LastDate')};
    const hitCookies = [
        {name: "TodayHits", expire: new Date(yearNow, monthNow, dateNow+1, 0, 0, 0).toUTCString(), ref: ref(database, '/TodayHits'), id: "todayHitCounter", nameChi: "今日人次"},
        {name: "TotalHits", expire: infiniteExpiryDate.toUTCString(), ref: ref(database, '/TotalHits'), id: "totalHitCounter", nameChi: "累計人次"}
    ];
    checkNewDateForFirebase(dateNow, dateCookie, hitCookies); // 更新人次
    // 最新人次
    const newHits = hitCookies.reduce((obj, cookie) => {
        onValue(cookie.ref, (snapshot) => {
            obj = {...obj, [cookie.name]: snapshot.val()}
        });
        return obj;
    }, {TodayHits: 1, TotalHits: 1});

    return (
    	<div id="hitCounterContainer" className="d-inline-flex flex-wrap pt-1 ps-1">
        {hitCookies.map((cookie, cIdx) => (
            <div key={`hitRetroHitCounter-${cIdx}`} className="me-1">
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
