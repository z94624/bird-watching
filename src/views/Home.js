import { useRef } from 'react';
import { NavLink } from 'react-router-dom';

import { database } from './../config/firebase';
import { ref, onValue, runTransaction } from "firebase/database";
import RetroHitCounter from 'react-retro-hit-counter';

import Footer from './../components/Footer';
import './Home.css';
/*
 * 檢查 Cookie
 * cookie: Cookie 資訊
 * hit: 不管存不存在，
 */
const checkUserCookie = (cookie, hit) => {
    const regEx = new RegExp(cookie.name, "g");
    const cookieExists = document.cookie.match(regEx);
    if (cookieExists == null) { // 若 Cookie 不存在
        createUserCookie(cookie);
        runTransaction(cookie.firebaseRef, hit => hit + 1);
    } else if (hit) { // 若 Cookie 已存在
        runTransaction(cookie.firebaseRef, hit => hit + 1);
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
    const todayHitsFirebaseRef = ref(database, '/TodayHits');
    const totalHitsFirebaseRef = ref(database, '/TotalHits');
    // Cookie 資訊
    const todayHitsCookie = {name: "TodayHits", last: new Date().getDate() + 1, firebaseRef: todayHitsFirebaseRef};
    const totalHitsCookie = {name: "TotalHits", last: new Date(2147483647 * 1000).getDate(), firebaseRef: totalHitsFirebaseRef};
    checkUserCookie(todayHitsCookie, false);
    checkUserCookie(totalHitsCookie, true);
    // 計數器
    const todayHitsComponentRef = useRef(0);
    const totalHitsComponentRef = useRef(0);
    onValue(todayHitsFirebaseRef, snapshot => {
        todayHitsComponentRef.current = snapshot.val();
    });
    onValue(totalHitsFirebaseRef, snapshot => {
        totalHitsComponentRef.current = snapshot.val();
    });
    const retroHitCounters = [
        {name: "today", nameChi: "當日", ref: todayHitsComponentRef},
        {name: "total", nameChi: "累計", ref: totalHitsComponentRef}
    ];

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
            {retroHitCounters.map((rhc, rIdx) => (
                <div key={`homeHitsComponent-${rIdx}`} className="px-1">
                    <label htmlFor={`${rhc.name}HitsComponent`} className="form-label text-muted">{rhc.nameChi}人次：</label>
                    <RetroHitCounter
                        id={`${rhc.name}HitsComponent`}
                        ref={rhc.ref}
                        hits={rhc.ref.current}
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
