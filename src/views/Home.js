import { NavLink } from 'react-router-dom';

import { database } from './../config/firebase';
import { ref, onValue, runTransaction } from "firebase/database";
import RetroHitCounter from 'react-retro-hit-counter';

import Footer from './../components/Footer';
import './Home.css';
/*
 * 檢查 Cookie
 * cookies: Cookie 資訊
 */
const checkUserCookie = (cookies) => {
    const [todayCookie, totalCookie] = cookies;
    // 判斷與前次紀錄同不同天
    let isNewDate = true;
    runTransaction(todayCookie.refDate, (date) => {
        let dateNow = new Date().getDate(); // 今天幾日
        isNewDate = dateNow != date;
        return dateNow;
    });
    // 延遲以取得正確的同不同天判斷
    setTimeout(() => {
        cookies.map((cookie, cIdx) => {
            let reqexp = new RegExp(cookie.name, 'g');
            let exists = document.cookie.match(reqexp);
            if (!exists) { // Cookie 不存在
                createUserCookie(cookie); // 建立 Cookie
                runTransaction(cookie.ref, (hits) => {
                    if (hits && (cIdx == 1 || isNewDate)) { // 已有資料庫 && (只要是累計 || 今天為新天)
                        return (hits + 1);
                    } else if (!hits) { // 尚未建立資料庫
                        return 1;
                    }
                });
            } else if (isNewDate) { // Cookie 存在 && 今天為新天
                runTransaction(cookie.ref, (hits) => hits + 1);
            }
        });
    }, 1000);
}
// 建立 Cookie
const createUserCookie = (cookie) => {
    document.cookie = cookie.name + "=True; expires=" + new Date().setDate(cookie.last) + "path=/";
}

const Home = () => {
    /*
     * Hit Counter: https://w3collective.com/hit-counter-javascript-firebase/
     */
    // Cookie 資訊
    const cookies = [
        {name: "TodayHits", expire: new Date().getDate() + 1, ref: ref(database, '/TodayHits'), refDate: ref(database, '/TodayDate'), id: "todayHitCounter", nameChi: "今日人次"},
        {name: "TotalHits", expire: new Date(2147483647 * 1000).getDate(), ref: ref(database, '/TotalHits'), id: "totalHitCounter", nameChi: "累計人次"}
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
        <main>
            {/* 封面容器 */}
            <div id="homeContainer">
                {/* 封面 */}
                <div id="homeCover"></div>
                {/* 入口 */}
                <div id="homeEntrance">
                    <NavLink to="/bird-watching/youtube" className="btn btn-lg fw-bold btn-outline-light">進入羽宙</NavLink>
                </div>
            </div>

            <Footer />
            {/* 計數器 */}
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
        </main>
    );
}

export default Home;
