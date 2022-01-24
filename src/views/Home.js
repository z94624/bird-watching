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
    const cookieRE = new RegExp(todayCookie.name, 'g');
    const cookieExists = document.cookie.match(cookieRE);
    if (!cookieExists) { // 若今日 Cookie 不存在
        // 判斷與前次紀錄同不同天
        let newDate = false;
        runTransaction(todayCookie.refDate, (date) => {
            newDate = date != new Date().getDate();
        });

        cookies.map((cookie, cIdx) => {
            createUserCookie(cookie); // 建立 Cookie
            runTransaction(cookie.ref, (hits) => { // 計數資料庫
                if (hits && (cIdx == 1 || !newDate)) { // 存在資料庫 && (只要是累計 || 今日且同天)
                    return (hits + 1);
                } else { // 尚未建立資料庫 || 今日但新天
                    return 1;
                }
            });
        });
    }
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
            <div id="hitCounter" className="d-inline-flex flex-wrap">
            {cookies.map((cookie, cIdx) => (
                <div key={`homeRetroHitCounter-${cIdx}`} className="px-1">
                    <label htmlFor={cookie.id} className="form-label text-muted">{cookie.nameChi}：</label>
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
