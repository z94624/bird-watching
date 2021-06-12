import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import LogoIcon from './../images/logo.png';

const navList = [
	{to: "/bird-watching/ebird", text: "eBird"},
	{to: "/bird-watching/youtube", text: "YouTube"},
	{to: "/bird-watching/photos", text: "Photos"},
	{to: "/bird-watching/records", text: "Records"}
];

const Header = () => {
	// <nav> 展開狀態
	const [isNavCollapsed, setIsNavCollapsed] = useState(true);
    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

	return (
		<header className="ps-3">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <NavLink className="navbar-brand float-md-start" to="/bird-watching">
                        <img src={LogoIcon} alt="島羽" width="50" height="auto" />
                        <span className="ms-2">楓楓與小芬的島羽</span>
                    </NavLink>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTabs" aria-controls="navbarTabs" aria-expanded={!isNavCollapsed ? true : false} aria-label="Toggle navigation" onClick={handleNavCollapse}>
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse ms-5`} id="navbarTabs">
                        <ul className="navbar-nav">
                        	{navList.map(({to, text}, idx) => (
                        		<li key={idx} className="nav-item">
                        			<NavLink
                        				exact
                        				className="nav-link"
                        				activeClassName="nav-link-active"
                        				to={to}
                        			>
                        				{text}
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
