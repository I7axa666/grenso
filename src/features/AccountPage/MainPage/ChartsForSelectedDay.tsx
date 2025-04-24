import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DetailConsumptionProps } from "./DetailConsumption";

const ChartsForSelectedDay: React.FC<DetailConsumptionProps> = ({data, }) => {
    const selctedDate = data['or_consumption']['consumption_day']['date'].split('-');
    // Подготовка данных для графика почасового потребления
    const prepareHourlyData = () => {
        if (!data.or_consumption) return [];
        
        const hourlyData = [];
        for (let hour = 1; hour <= 24; hour++) {
            hourlyData.push({
                hour: `${hour}`,
                consumption: data.or_consumption[`hour_${hour}`],
                gbn: data.or_gbn[`gbn_value_${hour}`]
            });
        }
        return hourlyData;
    };

    const reductionMethod = Object.keys(data.adjustment_gbn_zgn).filter(
        key => key.includes('ГБН') || key.includes('МБН') || key.includes('ЗГН')
    );

    const hourlyData = prepareHourlyData();

    return (
        <div className="col-md-6">
            <h5>Почасовое потребление ({ selctedDate[2]}.{selctedDate[1]}.{selctedDate[0]})</h5>
            <div style={{ height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={hourlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="hour" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line 
                            type="monotone" 
                            dataKey="consumption" 
                            name="Факт" 
                            stroke="#8884d8" 
                            activeDot={{ r: 8 }} 
                        />
                        <Line 
                            type="monotone" 
                            dataKey="gbn" 
                            name={reductionMethod[0]} 
                            stroke="#82ca9d" 
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
};

export default ChartsForSelectedDay;
