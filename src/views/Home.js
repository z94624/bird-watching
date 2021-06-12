import { NavLink } from 'react-router-dom';

import './Home.css';

const Home = () => {
    return (
        <main className="main-home d-flex align-items-center justify-content-center">
            <NavLink to="/bird-watching/youtube" className="btn btn-lg fw-bold btn-outline-light">進入羽林</NavLink>
        </main>
    );
}

export default Home;
