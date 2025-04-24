import React from 'react';
import './style.css'
import DetailConsumption from './DetailConsumption';

interface MainPageProps {
    data: any; // Замените на ваш тип данных
    onClose: () => void;
    or_name?: string,
    aor_name?: string,
    or_reduction_volume?: number,
    zone: number
}

const MainPage: React.FC<MainPageProps> = ({ data, onClose, or_name, aor_name, or_reduction_volume, zone }) => {
    return (
        <div className="mainPageContainer1">
            <div className="mainPage">
                <button onClick={onClose} className="closeButton">×</button>
                <DetailConsumption 
                    data={data} 
                    or_name={or_name} 
                    aor_name={aor_name} 
                    or_reduction_volume={or_reduction_volume} 
                    zone={zone}
                />
            </div>
        </div>
    );
};

export default MainPage;