import { NavLink } from 'react-router-dom';

import Footer from './../components/Footer';
import HitCounter from './HitCounter';
import './Home.css';

const Home = () => {
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
            <HitCounter />
        </main>
    );
}

export default Home;
