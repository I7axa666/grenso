import '../css/HomePage.css';

// Image imports (replace these paths with the actual images)
import cityscapeImage from '/img/city.webp';
import costReductionIcon from '/img/bearish.png';
import carbonReductionIcon from '/img/financial-growth.png';
import energySavingIcon from '/img/company--v1.png';

const HomePage = () => {
return (
    <div className="homepage">
     {/* Hero Section */}
     {/* <section className="hero-section position-relative text-center text-white">
        <img src={cityscapeImage} alt="Cityscape Background" className="hero-background" />
        <div className="hero-content position-absolute">
         <h1 className="hero-title">Расширение возможностей потребителей в управлении спросом на электроэнергию</h1>
         <p className="hero-subtitle">Присоединяйтесь к нашей сети и сокращайте расходы на электроэнергию, внося свой вклад в устойчивое будущее.</p>
        </div>
     </section> */}

     <div className="container">
        {/* About Section */}
        <section className="about-section text-center py-5">
         <h2>Кто мы?</h2>
         <p className="about-description">
            <b>АО "ГРЭНСО" –</b> агрегатор энергетических решений. Являемся субъектом оптового рынка электрической энергии. Входим в структуру Концерна Росэнергоатом.
         </p>
        </section>

        {/* Key Benefits Section */}
        <section className="benefits-section text-center py-5 bg-light">
         <h2 className="mb-5">Какие плюсы?</h2>
         <div className="row justify-content-center">
            <div className="col-md-3 benefit">
             <img src={costReductionIcon} alt="Cost Reduction" className="benefit-icon" />
             <h3>Почему важно снижать потребление</h3>
             <p>Снижение потребления в пиковые часы нагрузки позволяет не использовать дорогую и менее эффективную генерацию, тем самым снижая цены на электроэнергию и выбросы СО₂ в атмосферу</p>
            </div>
            <div className="col-md-3 benefit">
             <img src={carbonReductionIcon} alt="Carbon Emissions Reduction" className="benefit-icon" />
             <h3>Максимизация доходов клиента</h3>
             <p>В 2023 году наша команда помогла заработать нашим партнерам более 200 млн. руб</p>
            </div>
            <div className="col-md-3 benefit">
             <img src={energySavingIcon} alt="Energy Savings" className="benefit-icon" />
             <h3>Снижение рисков во время сотрудничества</h3>
             <p>Наши специалисты предложат оптимальный вариант вашего участия в управлении спросом на электроэнергию</p>
            </div>
         </div>
        </section>

        {/* How It Works Section */}
        <section className="how-it-works-section text-center py-5">
         <h2>Как это работает?</h2>
         <p>Наш подход к управлению спросом состоит из трех простых шагов:</p>
         <ol className="how-it-works-steps list-unstyled">
            <li>1. Сбор необходимой информации</li>
            <li>2. Проведение расчетов максимальновозможного финсансового результата</li>
            <li>3. Оформление всех документов для начала предоставления услуг</li>
         </ol>
        </section>

        {/* Contact CTA Section */}
        <section className="contact-section text-center py-5 bg-white text-secondary">
         <p>Хотите сократить расходы на электроэнергию? Свяжитесь с нами, чтобы узнать, как мы можем вам помочь.</p>
         <h2>Свяжитесь с нами</h2>
        </section>
     </div>
    </div>
);
};

export default HomePage;
