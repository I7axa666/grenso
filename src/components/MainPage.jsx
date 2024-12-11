import '../css/MainPage.css';
import cityscapeImage from '/img/city.webp';

function MainPage() {
    return (
<>
        <section className="hero-section position-relative text-center text-white">
        <img src={cityscapeImage} alt="Cityscape Background" className="hero-background" />
        <div className="hero-content position-absolute">
            <h1 className="hero-title">Расширение возможностей потребителей в управлении спросом на электроэнергию</h1>
            <p className="hero-subtitle">Присоединяйтесь к нам и сокращайте расходы на электроэнергию, внося свой вклад в устойчивое будущее.</p>
        </div>
    </section>
        <div className="page-content">
            
            <main className="container main-content">

                <div className="row">
                    <div className="col">
                        
                        <h2 className="banner-header">К разгрузке готовы?</h2>
                    </div>
                </div>
            </main>
        </div>

        </>
    );
}

export default MainPage;
