import React from 'react';
import '../css/MainPage.css';

function MainPage() {
    return (
        <div className="page-content">
            <main className="container main-content">
                <div className="row">
                    <div className="col">
                        <div className="banner">
                            <img src={`${import.meta.env.VITE_API_BASE_PATH}/img/banner.jpg`} className="img-fluid" alt="К разгрузке готовы!" />
                        </div>
                        <h2 className="banner-header">К разгрузке готовы!</h2>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default MainPage;
