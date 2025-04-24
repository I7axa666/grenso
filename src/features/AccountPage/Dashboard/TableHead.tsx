import { useMemo, useEffect, useRef } from 'react'
import { Aor, Day } from '../types'
import { Tooltip } from 'bootstrap';

interface TableHeadProps{
    aors: Aor[]
    days: Day[];
}

const TableHead: React.FC<TableHeadProps> = ({ aors, days }) => {
    const tooltipRefs = useRef<(HTMLDivElement | null)[]>([]);

    // Функция для подсчета событий по дням
    const getEventCountsByDay = useMemo(() => {
        const counts: {[date: string]: {total: number, withReduction: number}} = {};
        
        days.forEach(day => {
            counts[day.date] = {total: 0, withReduction: 0};
        });

        aors.forEach(aor => {
            aor.events?.forEach(event => {
                if (event.event_day && counts[event.event_day.date]) {
                    counts[event.event_day.date].total++;
                    if (event.reduction) {
                        counts[event.event_day.date].withReduction++;
                    }
                }
            });
        });

        return counts;
    }, [aors, days]);

    // Инициализация тултипов
    useEffect(() => {
        const currentRefs = tooltipRefs.current.filter(Boolean) as HTMLDivElement[];
        const tooltips = currentRefs.map(el => new Tooltip(el, {
            trigger: 'hover',
            placement: 'top'
        }));
        
        return () => {
            tooltips.forEach(tooltip => tooltip.dispose());
        };
    }, [aors, days]);

    return (
        <thead style={{ position: 'sticky', top: 0, background: 'white', zIndex: 10 }}>
            <tr>
                <th style={{ width: '250px' }}>Список АОУ и ОР</th>
                {days.map((day, index) => {
                    const counts = getEventCountsByDay[day.date];
                    const hasEvents = counts?.total > 0;
                    const dayNumber = new Date(day.date).getDate();
                    
                    return (
                        <th 
                            key={day.date} 
                            className="text-center p-1 position-relative" 
                            style={{ 
                                width: '30px',
                                fontSize: '0.8rem',
                                fontWeight: day.types?.includes('event') ? '600' : 'normal',
                                color: day.types?.includes('holliday_weekends') ? 'red' : 'inherit',
                                backgroundColor: day.types?.includes('event') ? '#adb5bd' : 'inherit'
                            }}
                        >
                            {dayNumber}
                            {hasEvents && (
                                <div 
                                    ref={el => {tooltipRefs.current[index] = el}}
                                    className="position-absolute top-0 start-0 end-0 bottom-0 d-flex align-items-center justify-content-center"
                                    data-bs-toggle="tooltip" 
                                    data-bs-placement="top"
                                    data-bs-title={`Разгрузок: ${counts.withReduction}/${counts.total}`}
                                >

                                </div>
                            )}
                        </th>
                    );
                })}
                <th style={{ width: '100px', textAlign: 'center' }}>Nгот</th>
            </tr>
        </thead>
    );
};

export default TableHead;
