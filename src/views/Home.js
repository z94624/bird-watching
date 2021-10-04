import { NavLink } from 'react-router-dom';

import Footer from './../components/Footer';
import './Home.css';

const Home = () => {
    return (
        <main>
            <div className="main-home d-flex align-items-center justify-content-center">
                <NavLink to="/bird-watching/youtube" className="btn btn-lg fw-bold btn-outline-light">進入羽宙</NavLink>
            </div>

            <Footer />
        </main>
    );
}

export default Home;
