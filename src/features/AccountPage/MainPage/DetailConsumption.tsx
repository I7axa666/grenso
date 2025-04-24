import React from 'react';
import RmseTable from './RmseTable';
import ChartsForSelectedDay from './ChartsForSelectedDay';
import HistoricalConsumptionTable from './HistoricalConsumptionTable';

export interface DetailConsumptionProps {
    data: {
        or_consumption: {
            [key: string]: {
                [key: string]: string
            }
        };
        or_gbn: any;
        rmse_data: any;
        consumptions_by_date: {
            [key: string]: {
                [key: string]: number
            }
        };
        adjustment_gbn_zgn: any;
    };
    or_name?: string;
    aor_name?: string;
    or_reduction_volume?: number;
    zone?: number;
}

const DetailConsumption: React.FC<DetailConsumptionProps> = ({ data, or_name, aor_name, or_reduction_volume, zone }) => {
    const reductionMethod = Object.keys(data.adjustment_gbn_zgn).filter(
        key => key.includes('ГБН') || key.includes('МБН') || key.includes('ЗГН')
    );
    const consumptions_by_date = data.consumptions_by_date;

    return (
        <>
            <h4 className="text-center mb-4">{or_name}  ({reductionMethod[0]})</h4>               
            <div className="row mb-0">
                <RmseTable data={data} or_reduction_volume={or_reduction_volume}/>
                <ChartsForSelectedDay data={data} />
            </div>

            <div className="row" style={{ marginTop: '-20rem' }}>
                <HistoricalConsumptionTable data={consumptions_by_date} zone={zone}/>
            </div>
        </>
    )
};

export default DetailConsumption