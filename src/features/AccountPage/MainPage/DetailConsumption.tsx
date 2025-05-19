import React from 'react';
import RmseTable from './RmseTable';
import ChartsForSelectedDay from './ChartsForSelectedDay';
import HistoricalConsumptionTable from './HistoricalConsumptionTable';
import { useAppSelector } from '../../../store/hooks';


const DetailConsumption: React.FC = () => {
    const modalData = useAppSelector((state) => state.dashboard.modalData);
    if (!modalData) {
        return null; // Или можно вернуть что-то другое, если modalData отсутствует
    }
    const { data, or_name, aor_name, or_reduction_volume, zone, events } = modalData;
    
    const reductionMethod = Object.keys(data.adjustment_gbn_zgn).filter(
        key => key.includes('ГБН') || key.includes('МБН') || key.includes('ЗГН')
    );
    const consumptions_by_date = data.consumptions_by_date;
    
    return (
        <>
            <h4 className="text-center mb-4">{or_name}  ({reductionMethod[0]})</h4>               
            <div className="row" style={{ 
                    height: '30vh', // 30% от высоты viewport
                    minHeight: '250px',
                    maxHeight: '350px',
                    // overflow: 'hidden'
                }}>
                <RmseTable data={data} or_reduction_volume={or_reduction_volume}/>
                <ChartsForSelectedDay  />
            </div>

            <div className="row" >
                <HistoricalConsumptionTable data={consumptions_by_date} zone={zone}/>
            </div>
        </>
    )
};

export default DetailConsumption