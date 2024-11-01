import '../css/HomePage.css';

// Image imports (replace these paths with the actual images)
import cityscapeImage from '/img/city.webp';
import costReductionIcon from '/img/sign.webp';
import carbonReductionIcon from '/img/city.webp';
import energySavingIcon from '/img/city.webp';

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
            Мы являемся агрегатором, специализирующимся на управлении спросом на электроэнергию, и помогаем потребителям с потреблением более 100 кВт активно участвовать в разгрузке.
            Наша технология автоматизации позволяет легко объединяться в группы по разгрузке, снижая затраты и выбросы.
         </p>
        </section>

        {/* Key Benefits Section */}
        <section className="benefits-section text-center py-5 bg-light">
         <h2 className="mb-5">Зачем все это?</h2>
         <div className="row justify-content-center">
            <div className="col-md-3 benefit">
             <img src={costReductionIcon} alt="Cost Reduction" className="benefit-icon" />
             <h3>Сократите расходы</h3>
             <p>Снижение затрат на электроэнергию до 15% для участвующих потребителей.</p>
            </div>
            <div className="col-md-3 benefit">
             <img src={carbonReductionIcon} alt="Carbon Emissions Reduction" className="benefit-icon" />
             <h3>Снижение выбросов углекислого газа</h3>
             <p>Вклад в экологизацию планеты за счет снижения общего углеродного следа.</p>
            </div>
            <div className="col-md-3 benefit">
             <img src={energySavingIcon} alt="Energy Savings" className="benefit-icon" />
             <h3>Энергоэффективность</h3>
             <p>Эффективное управление спросом на электроэнергию для достижения максимальной экономии энергии.</p>
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
