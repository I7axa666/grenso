import React from 'react';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { setSelectedAor, setSelectedDay, clearModalData, setSelectedOr } from '../../../store/slices/dashboardSlice';
import DetailConsumption from './DetailConsumption';
import './style.css';


const MainPage: React.FC = () => {
    const dispatch = useAppDispatch();

    // Для закрытия модального окна
    const handleCloseModal = () => {
        dispatch(setSelectedAor(null));
        dispatch(setSelectedOr(null));
        dispatch(setSelectedDay(null));
        dispatch(clearModalData());
        dispatch(clearModalData());
    };
    
    return (
        <div className="mainPageContainer1">
            <div className="mainPage">
                <button onClick={handleCloseModal} className="closeButton">×</button>
                <DetailConsumption />
            </div>
        </div>
    );
};

export default MainPage;