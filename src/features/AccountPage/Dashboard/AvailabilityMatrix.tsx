import React, { useMemo, useState, useCallback } from 'react';
import { Table } from 'react-bootstrap';
import { Aor, RegulationObject, OrData } from '../types';
import TableHead from './TableHead';
import AorHeader from './AorHeader';
import MainPage from '../MainPage/MainPage';
import RegulationObjRow from './RegulationObjRow'
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setSelectedAor, setSelectedDay, setModalData } from '../../../store/slices/dashboardSlice';


const AvailabilityMatrix: React.FC = () => {
    const { days, aors } = useAppSelector((state) => state.dashboard.data || { days: [], aors: [] })

    const daysCount = useMemo(() => days.length, [days]);
    const modalData = useAppSelector((state) => state.dashboard.modalData);

    return (
        <div style={{ width: '100%', position: 'relative' }}>
            <Table bordered className="mb-0 table-group-wrapper" style={{ tableLayout: 'fixed', width: '100%' }}>
                <TableHead aors={aors} days={days} />
                <tbody>
                    {aors.map(aor => (
                        <React.Fragment key={aor.id}>
                            <AorHeader aor={aor} daysCount={daysCount} days={days} events={aor.events} />
                            {aor.regulation_objects.map(obj => (
                                <RegulationObjRow
                                    key={obj.id}
                                    obj={obj}
                                    aor={aor}
                                    aor_events={aor.events}
                                />
                            ))}
                        </React.Fragment>
                   ))}
                </tbody>
            </Table>
            {modalData && (<MainPage />)}
        </div>
    );
};

export default React.memo(AvailabilityMatrix);
