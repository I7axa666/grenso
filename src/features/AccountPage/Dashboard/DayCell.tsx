import React, {useState} from 'react';
import { Day, Consumption, Availability, Events } from '../types'
import apiClient from '../../../api/client';
import StatusIndicator from './StatusIndicator';
import './style.css'

interface DayCellProps {
    day: Day;
    consumption?: Consumption | null;
    availability?: Availability;
    aor_event?: Events;
    aor_id?: number;
    or_id?: number;
    or_name?: string;
    aor_name?: string;
}

const DayCell: React.FC<DayCellProps & { onCellClick: (data: any) => void }> = React.memo(({ 
    day, consumption, availability, aor_event, or_id, onCellClick, aor_id
}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleClick = async () => {
        if (!aor_id && !or_id) return;
        
        try {
            setLoading(true);
            setError(null);
            
            const date = new Date(day.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const dayNum = date.getDate();
            
            let endpoint = '/initial_data/';
            const params = new URLSearchParams({
                year: year.toString(),
                month: month.toString(),
                day: dayNum.toString(),
                or_id: or_id ? or_id.toString() : '',
                aor_id: aor_id ? aor_id.toString() : '',
            });

            if (aor_id) {
                params.append('aor_id', aor_id.toString(), );
            } else if (or_id) {
                params.append('or_id', or_id.toString());
            }

            const response = await apiClient.get(`${endpoint}?${params.toString()}`);
            onCellClick(response.data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
            console.error('Failed to fetch data:', err);
        } finally {
            setLoading(false);
        }
    };
    
    if (day.types?.includes('holliday_weekends')) {
        return (
            <td 
                className="p-1 align-middle text-center"
                aria-label="Выходной день"
                tabIndex={0}
            >
                -
            </td>
        );
    }

    // Определяем классы для заливки (availability)
    const getBackgroundClass = () => {
        if (availability === undefined) return 'bg-light'; // Нет данных - серый
        return availability.availability ? 'bg-light-success' : 'bg-warning'; // true - зеленый, false - оранжевый
    };

    // Определяем стиль рамки (consumption)
    const getBorderStyle = (): React.CSSProperties => {
        if (!consumption) return { position: 'relative' };
        
        return {
            position: 'relative',
            border: `3px 
                ${consumption.is_status_1 ? 'dashed' : 'solid'} 
                ${consumption.hour_24 == null ? '#dc3545' : '#000'}`,
            boxSizing: 'border-box' as 'border-box'
        };
    };

    // Формируем ARIA-лейбл для доступности
    const getAriaLabel = () => {
        const labels = [];
        if (availability) {
            labels.push(`Доступность: ${availability.availability ? 'есть' : 'нет'}`);
        }
        if (consumption) {
            labels.push(`Потребление: статус ${consumption.is_status_1 ? '1' : '2'}`);
            labels.push(`${consumption.hour_24 ? 'Данные о потреблении в наличии' : 'Данные о потреблении отсутствуют'}`);
        }
        if (aor_event) {
            labels.push(`Событие: ${aor_event.reduction ? 'снижение' : 'нет снижения'}`);
        }
        return labels.join(', ') || 'Нет данных';
    };

    return (
        <td 
            className="p-1 align-middle"
            aria-label={getAriaLabel()}
            tabIndex={0}
            style={{ cursor: 'pointer' }}
            onClick={handleClick}
        >
            <div 
                className={`day-cell ${getBackgroundClass()}`}
                style={{
                    position: 'relative',
                    width: '24px',
                    height: '24px',
                    margin: '0 auto',
                    ...getBorderStyle()
                }}
            >
                {aor_event && <StatusIndicator reduction={aor_event.reduction} />}
                {loading && (
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(255,255,255,0.7)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <div className="spinner-border spinner-border-sm" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                )}
            </div>
        </td>
    );
});

// Функция для сравнения пропсов (оптимизация React.memo)
const areEqual = (prevProps: DayCellProps, nextProps: DayCellProps) => {
    return (
        prevProps.day.date === nextProps.day.date &&
        prevProps.consumption?.is_status_1 === nextProps.consumption?.is_status_1 &&
        prevProps.availability?.availability === nextProps.availability?.availability &&
        prevProps.aor_event?.reduction === nextProps.aor_event?.reduction &&
        prevProps.aor_id === nextProps.aor_id &&
        prevProps.or_id === nextProps.or_id
    );
};

// Экспортируем компонент с мемоизацией и кастомным сравнением
export default React.memo(DayCell, areEqual);
