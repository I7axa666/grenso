import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import '../css/Header.css';

function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const [activePath, setActivePath] = useState(location.pathname);

    useEffect(() => {
        setActivePath(location.pathname);
    }, [location.pathname]);

    function handleClick(path) {
        setActivePath(path);
        navigate(path);
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
            <div className="container">
                <Link to="/" className="navbar-brand">
                    <img className="img-logo" src={`${import.meta.env.VITE_API_BASE_PATH}/img/grenso-logo.png`} alt="Grenso"/>    
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent"
                    aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarContent">
                    <ul className="navbar-nav ms-auto">
                        <li className={`nav-item ms-auto ${activePath === '/' ? 'active' : ''}`}>
                            <Link className="nav-link" to="/" onClick={() => handleClick('/')}>Главная</Link>
                        </li>
                        <li className={`nav-item ms-auto ${activePath === '/about.html' ? 'active' : ''}`}>
                            <Link className="nav-link" to="/about.html" onClick={() => handleClick('/about.html')}>О компании</Link>
                        </li>
                        <li className={`nav-item ms-auto ${activePath === '/contacts.html' ? 'active' : ''}`}>
                            <Link className="nav-link" to="/contacts.html" onClick={() => handleClick('/contacts.html')}>Наша команда</Link>
                        </li>
                        <li className={`nav-item ms-auto ${activePath === '/info-center.html' ? 'active' : ''}`}>
                            <Link className="nav-link" to="/info-center.html" onClick={() => handleClick('/info-center.html')}>Инфо-центр</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;
