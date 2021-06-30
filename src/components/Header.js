import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import LogoIcon from './../images/logo.png';
// 各分頁的名稱與路徑
const navList = [
    // 呈現 eBird 輸出的 MetaData
	{to: "/bird-watching/ebird", text: "eBird"},
    // 展示 smoBEE Universe 的"賞鳥紀錄"播放清單所有影片
	{to: "/bird-watching/youtube", text: "YouTube"},
    // Google Drive 中的鳥照
	{to: "/bird-watching/photos", text: "Photos"},
    // Google Drive 中的鳥音
	{to: "/bird-watching/records", text: "Records"}
];

const Header = () => {
	// 分頁列表選單的開合狀態
	const [isNavCollapsed, setIsNavCollapsed] = useState(true);
    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

	return (
		<header className="ps-3">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    {/* 網頁品牌 */}
                    <NavLink className="navbar-brand float-md-start" to="/bird-watching">
                        <img src={LogoIcon} alt="島羽" width="50" height="auto" /> {/* 品牌圖示 */}
                        <span className="ms-2">楓楓與小芬的島羽</span> {/* 品牌名稱 */}
                    </NavLink>
                    {/* 分頁列表的展開按鈕 */}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTabs" aria-controls="navbarTabs" aria-expanded={!isNavCollapsed ? true : false} aria-label="Toggle navigation" onClick={handleNavCollapse}>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    {/* 分頁列表 */}
                    <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse ms-5`} id="navbarTabs">
                        <ul className="navbar-nav">
                        	{navList.map(({to, text}, idx) => (
                        		<li key={"navItem-"+idx} className="nav-item">
                        			<NavLink
                        				exact
                        				className="nav-link"
                        				activeClassName="nav-link-active"
                        				to={to} // 分頁路徑
                        			>
                        				{text} {/* 分頁名稱 */}
                        			</NavLink>
                        		</li>
                    		))}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
	);
}

export default Header;
