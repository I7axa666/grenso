import React, { useMemo } from 'react';
import { Aor, Day, Events } from '../types';
import DayCell from './DayCell';

const AorHeader: React.FC<{ aor: Aor; daysCount: number; days: Day[]; events: Events[] }> = React.memo(({ aor, daysCount, days, events }) => {
    // Подсчет количества доступных дней
    const availableDaysCount = useMemo(() => {
        return aor.aor_availability?.filter(a_a => a_a.availability === true).length || 0;
    }, [aor.aor_availability]);

    const workingDaysCount = useMemo(
            () => days.filter(d => d.types && !d.types.includes('holliday_weekends')).length,
            [days]
        );

    return (
        <tr style={{ background: '#f8f9fa' }}>
            <td className="ps-4 fw-bold aor-group">
                {aor.name}
                {/* ({aor.code}) */}
            </td>
            {days.map(day => {
                const availability = aor.aor_availability.find(a_a => a_a.calendar_day.date === day.date);
                const aor_event = events.find(ev => String(ev.event_day.date) === day.date);
                return <DayCell 
                key={day.date} 
                day={day} 
                availability={availability}
                aor_event={aor_event}
                aor_id={aor.id}
                />;
            })}
            <td className="text-center fw-bold">
                {availableDaysCount} / {workingDaysCount}
            </td>
        </tr>
    );
});

export default React.memo(AorHeader)