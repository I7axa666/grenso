import React from 'react';
import '../css/MainPage.css';

import cityscapeImage from '/img/city.webp';

// function MainPage() {
//     return (
//         <div className="page-content">
//             <main className="container main-content">
//                 <div className="row">
//                     <div className="col">
//                         <div className="banner">
//                             <img src={`${import.meta.env.VITE_API_BASE_PATH}/img/banner.jpg`} className="img-fluid" alt="К разгрузке готовы?" />
//                         </div>
//                         <h2 className="banner-header">К разгрузке готовы?</h2>
//                     </div>
//                 </div>
//             </main>
//         </div>
//     );
// }

function MainPage() {
    return (
<>
        <section className="hero-section position-relative text-center text-white">
        <img src={cityscapeImage} alt="Cityscape Background" className="hero-background" />
        <div className="hero-content position-absolute">
            <h1 className="hero-title">Расширение возможностей потребителей в управлении спросом на электроэнергию</h1>
            <p className="hero-subtitle">Присоединяйтесь к нашей сети и сокращайте расходы на электроэнергию, внося свой вклад в устойчивое будущее.</p>
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
