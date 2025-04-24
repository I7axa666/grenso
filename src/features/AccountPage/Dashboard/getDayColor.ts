import { Consumption } from '../types'

const getDayColor = (day: Consumption) => {
    if (day.is_status_1) return 'bg-danger'; // Красный для статуса 1
    if (day.day_types.includes('holliday_weekends')) return 'bg-light'; // Серый для выходных
    if (day.day_types.includes('replace')) return 'bg-warning'; // Оранжевый для замен
    if (day.day_types.includes('event')) return 'bg-success'; // Зеленый для событий
    return 'bg-white'; // Белый по умолчанию
};

export default getDayColor