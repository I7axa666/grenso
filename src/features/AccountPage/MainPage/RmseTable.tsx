import { OrData } from "../types";

interface DetailConsumptionProps {
    data: OrData
    or_reduction_volume?: number
}

const RmseTable: React.FC <DetailConsumptionProps> = ({ data, or_reduction_volume }) =>  {
    if (data.rmse_data.rrmse_no_tweak === null) {
         return (
            <div className="col">
                <h5>Результаты расчетов применимости ГБН</h5>
                <div className="card p-3">
                    
                    <a>Не хватает данных для расчета RRMSE</a>
                    
                </div>
                <p>Величина подстройки: {data.adjustment_gbn_zgn.adjustment}</p>
            </div>
         )
        }

    const rrmseValues = [
        parseFloat(data.rmse_data.rrmse_no_tweak.toFixed(3)),
        parseFloat(data.rmse_data.rrmse_with_tweak.toFixed(3)),
        parseFloat(data.rmse_data.rrmse_with_tweak_yesterday.toFixed(3))
    ]

    const minRrmseValue = Math.min(...rrmseValues);
    const red_volume = (or_reduction_volume ?? 0) * 1000

    const getCellStyle = (value: number) => ({
        fontWeight: value === minRrmseValue ? 'bold' : 'normal',
        backgroundColor: value > 0.2 ? '#e09299' : 'inherit',
    });

    return (
        <div className="col">
            <h5>Результаты расчетов применимости ГБН {red_volume} кВт</h5>
            <div className="card p-3">
                <table className="table table-sm">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col" className="text-center align-middle">Без подстройки</th>
                            <th scope="col" className="text-center align-middle">С подстройкой</th>
                            <th scope="col" className="text-center align-middle">С подстройкой <br/>по вчерашнему раб.дню</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">2xRMSE</th>
                            <td className="text-center" style=
                                {{backgroundColor: 
                                    data.rmse_data.doubled_rmse_no_tweak > red_volume 
                                    ? '#e09299' 
                                    : 'inherit'
                                }}>
                                    {data.rmse_data.doubled_rmse_no_tweak.toFixed(2)}

                            </td>
                            <td className="text-center" style=
                                {{backgroundColor: 
                                    data.rmse_data.doubled_rmse_with_tweak > red_volume 
                                    ? '#e09299' 
                                    : 'inherit'
                                }}>
                                {data.rmse_data.doubled_rmse_with_tweak.toFixed(2)}

                            </td>
                            <td className="text-center" style=
                                {{backgroundColor: 
                                    data.rmse_data.doubled_rmse_with_tweak_yesterday > red_volume 
                                    ? '#e09299' 
                                    : 'inherit'
                                }}>
                                {data.rmse_data.doubled_rmse_with_tweak_yesterday.toFixed(2)}

                            </td>
                        </tr>
                        <tr>
                            <th scope="row">RRMSE</th>
                            <td className="text-center" style=
                                {getCellStyle(data.rmse_data.rrmse_no_tweak)}>
                                    {(data.rmse_data.rrmse_no_tweak).toFixed(3)}
                            </td>
                            <td className="text-center"style=
                                {getCellStyle(data.rmse_data.rrmse_with_tweak)}>
                                    {(data.rmse_data.rrmse_with_tweak).toFixed(3)}
                            </td>
                            <td className="text-center" style=
                                {getCellStyle(data.rmse_data.rrmse_with_tweak)}>
                                    {(data.rmse_data.rrmse_with_tweak_yesterday).toFixed(3)}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>Величина подстройки: {data.adjustment_gbn_zgn.adjustment}</p>
            {/* <h5 className="mt-4">Подстройка</h5>
            <div className="card p-3">
                <p>Величина подстройки: {data.adjustment_gbn_zgn.adjustment}</p>
            </div> */}
        </div>
    );
};

export default RmseTable