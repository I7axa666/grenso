import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine, ReferenceArea } from 'recharts';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { getCollapsedHours } from './utils';
import { Adjustment } from '../types'

type HourKey = `hour_${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24}`;


const ChartsForSelectedDay: React.FC = () => {
    const selectedDay = useAppSelector(state => state.dashboard.selectedDay)
    const data =  useAppSelector(state => state.dashboard.modalData)
    const day = selectedDay?.date
    const zone = useAppSelector(state => state.dashboard.modalData?.zone)
    const collapsedHours = getCollapsedHours(zone)
    const gbnData = data?.data.adjustment_gbn_zgn as Adjustment;
    const reductionMethod = (Object.keys(gbnData) as Array<keyof Adjustment>).find(
        key => typeof key === 'string' && 
          (key.includes('ГБН') || key.includes('МБН') || key.includes('ЗГН'))
    );

    const context = data?.or_context && data?.or_context[0]
    const events = data?.events
    const reductionVolume = data?.or_reduction_volume
    const reductionDuration = context?.reduction_duration
    
    // Найти событие, соответствующее выбранной дате
    const selectedEvent = events?.find(event => event.event_day.date === day);

     // Функция для форматирования даты
    const formatDay = (day: string) => {
        const [year, month, dayOfMonth] = day.split('-');
        return `${dayOfMonth}.${month}.${year}`;
    };

    // Функция для преобразования day в строку
    const getFormattedDay = (day: string | Date | null) => {
        if (!day) return 'Нет фактического подребления';
        if (typeof day === 'string') return day;
        return day.toISOString().split('T')[0];
    };

    // Подготовка данных для графика почасового потребления
    const prepareHourlyData = (gbnData: Adjustment, reductionMethod?: keyof Adjustment) => {
        if (!data?.data.or_consumption || !reductionMethod || !gbnData[reductionMethod]) return [];

        const hourlyData = [];
        const gbnValues = gbnData[reductionMethod] as Record<number, number>;

        // Генерация данных для каждого часа (0-24)
        for (let hour = 0; hour <= 23; hour++) {
            const hourKey: HourKey = `hour_${hour + 1}` as HourKey; // 0 → hour_1, 1 → hour_2, ..., 23 → hour_24
            const consumption = data.data.or_consumption[hourKey]; // Берём значение для hour_X+1
            const gbn = (gbnValues[hour + 1] || 0).toFixed(0); // Аналогично для gbn

            let limit100: number | null = null;
            let limit75: number | null = null;

            if (selectedEvent && reductionVolume && reductionDuration) {
                const startHour = selectedEvent.reduction_start_hour - 1;
                const endHour = startHour + reductionDuration;

                if (hour >= startHour && hour <= endHour) {
                    limit100 = parseFloat(gbn || '0') - reductionVolume * 1000;
                    limit75 = parseFloat(gbn || '0') - reductionVolume * 1000 * 0.75;

                    if (hour === endHour) {
                        limit100 = null;
                        limit75 = null;
                    }
                }
            }

            hourlyData.push({
            hour: `${hour}`,
            xPosition: hour, // Для позиционирования на оси X
            consumption,
            gbn,
            limit100,
            limit75, 
            });
        }

        return hourlyData;
    };

    const isNumber = (value: any): value is number => {
        return typeof value === 'number' && !isNaN(value);
    };

    const hourlyData = prepareHourlyData(gbnData, reductionMethod);

    return (
        <div className="col">
            <h5>Почасовое потребление ({formatDay(getFormattedDay(day ?? null))})</h5>
            <div style={{ height: '300px' }}>
                <ResponsiveContainer width="100%" height="90%">
                    <LineChart data={hourlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                            dataKey="xPosition" 
                            domain={[0, 24]}
                            tickFormatter={(value) => `${value}`} 
                            ticks={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]}
                        />
                        <YAxis />
                        <Tooltip
                            formatter={(value, name) => {
                            if (name === 'limit100' || name === 'limit75') {
                                return [value, name === 'limit100' ? '100% предел' : '75% предел'];
                            }
                            return [value, name];
                            }}
                            labelFormatter={(hour) => {
                            const nextHour = hour === 23 ? 24 : hour + 1;
                            return `${hour}:00–${nextHour}:00`; // Пример: "11:00–12:00" для hour_12
                            }}
                        />
                        <Legend />

                        {/* Вертикальные линии между часами (цвет как у горизонтальных) */}
                        {Array.from({ length: 24 }, (_, i) => i + 1).map((hour) => (
                            <ReferenceLine
                            key={hour}
                            x={hour - 0.5} // Линия между часами (например, 11.5 для перехода 11→12)
                            stroke="#8884d8" // Цвет как у основной линии
                            strokeOpacity={0.5}
                            strokeWidth={1}
                            />
                        ))}

                        {collapsedHours && (
                            <ReferenceArea
                                x1={collapsedHours.start[1]}
                                x2={collapsedHours.end[0] - 1}
                                strokeOpacity={0}
                                fill="#e0e0e0"
                                fillOpacity={0.3}
                            />
                        )}

                        {/* Основные линии графика */}
                        <Line
                            type="stepAfter" // Горизонтальная линия до конца интервала
                            dataKey="consumption"
                            name="Факт"
                            stroke="#8884d8"
                            strokeWidth={3}
                            dot={false} // Точки на часах (кроме x=24)
                        />
                        
                        {reductionMethod && (
                            <Line
                            type="stepAfter"
                            dataKey="gbn"
                            name={reductionMethod}
                            strokeWidth={2.5}
                            stroke="#82ca9d"
                            dot={false}
                            />
                        )}

                        
                        {selectedEvent && reductionDuration && (
                            <Line
                                type="stepAfter"
                                dataKey="limit100"
                                name="100% предел"
                                stroke="#000000"
                                strokeWidth={2}
                                dot={true}                          
                                connectNulls={false}
                                isAnimationActive={false}
                            />
                        )}
                        
                        {selectedEvent && reductionDuration && (
                            <Line
                                type="stepAfter"
                                dataKey="limit75"
                                name="75% предел"
                                stroke="#d62728"
                                strokeWidth={2}
                                dot={true}
                                connectNulls={false}
                                isAnimationActive={false}
                            />
                            
                        )}
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ChartsForSelectedDay;
