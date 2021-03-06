import { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';

import './Header.css';

import LogoIcon from './../images/logo.png';
// 各分頁的名稱與路徑
const navList = [
    // 呈現 eBird 輸出的 MetaData
	{to: "/bird-watching/ebird", text: "eBird", children: []},
    // 展示 smoBEE Universe 的"賞鳥紀錄"播放清單所有影片
	{to: "/bird-watching/youtube", text: "YouTube", children: []},
    // Google Drive 中的鳥照
	{to: "/bird-watching/photos", text: "Photos", children: []},
    // Google Drive 中的鳥音
	{to: "/bird-watching/records", text: "Records", children: []},
    // 辨識
    {to: "/bird-watching/identity", text: "Identity", children: []},
    // 關於我
    {to: "/bird-watching/about/", text: "About", children: [
        // 紫嘯鶇
        {to: "/bird-watching/about/smoBEE", text: "紫嘯鶇"},
        // 五色鳥
        {to: "/bird-watching/about/LFW", text: "五色鳥"}
    ]}
];

const Header = () => {
	// 分頁列表選單的開合狀態
	const [navCollapsed, setNavCollapsed] = useState(true);
    // 偵測分頁轉換
    const browseHistory = useHistory(); // 轉換路徑歷史
    useEffect(() => {
        // 若打開分頁列切換頁面後，立即收合分頁列
        return browseHistory.listen(location => {
            setNavCollapsed(true);
        });
    }, [browseHistory]);

	return (
		<header>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <div className="container-fluid">
                    {/* 網頁品牌 */}
                    <NavLink className="navbar-brand" to="/bird-watching">
                        <img src={LogoIcon} alt="島羽" width="30" height="auto" /> {/* 品牌圖示 */}
                        <span className="ms-1">楓楓與小芬的島羽</span> {/* 品牌名稱 */}
                    </NavLink>
                    {/* 分頁列表的展開按鈕 */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarTabs"
                        aria-controls="navbarTabs"
                        aria-expanded={navCollapsed ? false : true}
                        aria-label="Toggle navigation"
                        onClick={() => setNavCollapsed(!navCollapsed)}
                        //onMouseEnter={() => setNavCollapsed(false)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                        </svg>
                    </button>
                    {/* 分頁列表 */}
                    <div
                        className={`navbar-collapse${navCollapsed ? ' collapse' : '  collapse show'}`}
                        id="navbarTabs"
                        //onMouseLeave={() => setNavCollapsed(true)}
                    >
                        <ul className="navbar-nav">
                        	{navList.map(({to, text, children}, nIdx) => {
                                if (children.length === 0) { // 無子選單
                                    return (
                                        <li key={"navItem-"+nIdx} className="nav-item">
                                            <NavLink
                                                exact
                                                className="nav-link"
                                                activeClassName="navLinkActive"
                                                to={to} // 分頁路徑
                                            >
                                                {text} {/* 分頁名稱 */}
                                            </NavLink>
                                        </li>
                                    );
                                } else { // 有子選單則變為下拉式
                                    return (
                                        <li key={"navItem-"+nIdx} className="navItem">
                                            <NavLink
                                                strict
                                                className="navLink navLinkDisabled"
                                                activeClassName="navLinkActive"
                                                to={to} // 分頁路徑
                                            >
                                                {text} {/* 分頁名稱 */}
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                                                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                                                </svg>
                                            </NavLink>
                                            {/* 子選單 */}
                                            <ul className="dropdownMenu">
                                                {children.map(({to, text}, cIdx) => (
                                                    <li key={"dropdownItem-"+cIdx} className="dropdownItem">
                                                        <NavLink
                                                            exact
                                                            className="dropdownLink"
                                                            activeClassName="navLinkActive"
                                                            to={to}
                                                        >
                                                            {text}
                                                        </NavLink>
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                    );
                                }
                            })}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
	);
}

export default Header;
