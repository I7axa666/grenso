import React, { useMemo, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Aor, Day } from '../types';
import TableHead from './TableHead';
import AorHeader from './AorHeader';
import MainPage from '../MainPage/MainPage';
import RegulationObjRow from './RegulationObjRow'


interface ConsumptionMatrixProps {
    days: Day[];
    aors: Aor[];
}

const AvailabilityMatrix: React.FC<ConsumptionMatrixProps> = ({ days, aors }) => {
    const [modalData, setModalData] = useState<{
        data: any; 
        or_name?: string; 
        aor_name?: string; 
        or_reduction_volume?: number
        zone: number
    } | null>(null);

    const daysCount = useMemo(() => days.length, [days]);
    // console.log(aors[0].regulation_objects[0].zone)
    return (
        <div style={{ width: '100%', position: 'relative' }}>
            <Table bordered className="mb-0 table-group-wrapper" style={{ tableLayout: 'fixed', width: '100%' }}>
                <TableHead aors={aors} days={days}/>
                <tbody>
                    {aors.map(aor => (
                        <React.Fragment key={aor.id}>
                            <AorHeader aor={aor} daysCount={daysCount} days={days} events={aor.events}/>
                            {aor.regulation_objects.map(obj => (
                                <RegulationObjRow 
                                    key={obj.id} 
                                    obj={obj} 
                                    days={days} 
                                    aor_events={aor.events}
                                    onCellClick={(data) => {                                      
                                        setModalData({
                                        data,
                                        or_name: obj.name,
                                        aor_name: aor.name,
                                        or_reduction_volume: obj.context_in_intervals?.[0]?.reduction_volume,
                                        zone: obj.zone,
                                    
                                    })}}
                                />
                            ))}
                        </React.Fragment>
                    ))}
                </tbody>
            </Table>
            
            {/* Модальное окно теперь вне таблицы */}
            {modalData && (
                <MainPage 
                    data={modalData.data} 
                    onClose={() => setModalData(null)}
                    or_name={modalData.or_name}
                    aor_name={modalData.aor_name}
                    or_reduction_volume={modalData.or_reduction_volume}
                    zone={modalData.zone}
                />
            )}
        </div>
    );
};

export default React.memo(AvailabilityMatrix);
