import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import '../css/Footer.css'

const Footer = () => {
    const navigate = useNavigate();
    function handleClick(path) {
        navigate(path);
    }
    
    const contactWindow = () => {
        console.log('senf')
    }

    return (
        <div className="container bg-light footer">
            <div className="row">
                <div className="col">
                    <section>
                        <h5>Информация</h5>
                        <ul className="nav flex-column">
                            <li className="nav-item"><a onClick={() => handleClick('/about.html')} className="nav-link">О компании</a></li>
                            <li className="nav-item"><a onClick={() => handleClick('/info-center.html')} className="nav-link">Инфо-центр</a></li>
                            <li className="nav-item"><a onClick={() => handleClick('/contacts.html')} className="nav-link">Контакты</a></li>
                        </ul>
                    </section>
                </div>
                <div className="col text-center">
                    <button className="btn btn-primary contact-button" onClick={() => contactWindow()}>
                        <FontAwesomeIcon icon={faPaperPlane} /> Свяжитесь с нами
                    </button>
                    <section className="footer-copyright">
                        <div>2024 © АО "ГРЭНСО"</div>
                        <div>Все права защищены.</div>
                    </section>
                </div>
                <div className="col text-right">
                    <section className="footer-contacts">
                        <h5>Контакты:</h5>
                        <a className="footer-contacts-phone" href={`tel:${import.meta.env.VITE_API_PHONE_NUMBER}`}>{import.meta.env.VITE_API_PHONE_NUMBER}</a>
                        <span className="footer-contacts-working-hours">Пн.-пт. с 09:00 до 18:00</span>
                        <a className="footer-contacts-email" href={`mailto:${import.meta.env.VITE_API_EMAIL_INFO}`}>{import.meta.env.VITE_API_EMAIL_INFO}</a>
                        <div className="footer-social-links">
                            <div className="footer-social-link footer-social-link-twitter"></div>
                            <div className="footer-social-link footer-social-link-vk"></div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Footer;
