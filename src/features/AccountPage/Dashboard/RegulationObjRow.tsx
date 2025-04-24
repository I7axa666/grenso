import React, { useMemo } from 'react';
import { Aor, Day, Events } from '../types';
import DayCell from './DayCell';

const RegulationObjRow: React.FC<{
    obj: Aor['regulation_objects'][0];
    days: Day[];
    aor_events: Events[];
    onCellClick: (data: any) => void;

}> = React.memo(({ obj, days, aor_events, onCellClick }) => {
    const workingDaysCount = useMemo(
        () => days.filter(d => d.types && !d.types.includes('holliday_weekends')).length,
        [days]
    );
        // Подсчет количества доступных дней
    const availableDaysCount = useMemo(() => {
        return obj.or_availability?.filter(o_a => o_a.availability === true).length || 0;
    }, [obj.or_availability]);

    return (
        <tr>
            <td className="ps-4">{obj.name}</td>
            {days.map(day => (
                <DayCell 
                    key={day.date} 
                    day={day} 
                    consumption={obj.consumptions.find(c => c.consumption_day.date === day.date)}
                    availability={obj.or_availability.find(o_a => o_a.calendar_day.date === day.date)}
                    aor_event={aor_events.find(ev => String(ev.event_day.date) === day.date)}
                    or_id={obj.id}
                    or_name={obj.name}
                    onCellClick={onCellClick}
                />
            ))}
            <td className="text-center">
                {availableDaysCount}/{workingDaysCount}
            </td>
        </tr>
    );
});

export default RegulationObjRow