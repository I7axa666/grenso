import { useState, useEffect } from 'react';
import { fetchData } from '../../js/apiService';
import './InfoCenter.css';

const N_K_Tabs = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const loadData = async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await fetchData("n_k");
            const sortedDays = result.result.days.sort((a, b) => new Date(b.target_date) - new Date(a.target_date));
            result.result.days = sortedDays;
            setData(result);
        } catch (err) {
            console.error('Error in loadData:', err);
            setError('Failed to load data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const result = data?.result;

    return (
        <div className="table-container">
            <button 
                onClick={loadData} 
                className="refresh-button" 
                disabled={loading}
                aria-label="Refresh Data"
            >
                {loading ? 'Loading...' : 'Обновить данные'}
            </button>
            {error && <div className="error">{error}</div>}
            {!data ? (
                <div className="spinner-grow text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            ) : (
                <>
                    <div className="summary">
                        <p>На {new Date(result?.target_date).toLocaleDateString()} лучшие параметры: N = {result?.best_N?.toLocaleString() || 'N/A'} и K = {result?.best_K?.toLocaleString() || 'N/A'}</p>
                        <p>
                            Средний эффект за {result?.best_N || 0} дней:{" "}
                            {result?.average_for_N?.toLocaleString(undefined, {
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                            }) || 'N/A'} руб.
                        </p>
                        <p>
                            Порог:{" "}
                            {(result?.average_for_N * result?.best_K)?.toLocaleString(undefined, {
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                            }) || 'N/A'} руб.
                        </p>
                    </div>

                    <table className="scrollable-table" aria-label="N and K Parameters Table">
                        <caption>*Данные за 60 к.д. без выходных</caption>
                        <thead>
                            <tr>
                                <th scope="col">Дата</th>
                                <th scope="col">ЦЗСП</th>
                                <th scope="col">Параметр N</th>
                                <th scope="col">Параметр K</th>
                                <th scope="col">Средний эффект <br /> за предшествующие рабочие дни, руб</th>
                                <th scope="col">Эффект от ЦЗСП, руб</th>
                            </tr>
                        </thead>
                        <tbody>
                            {result?.days.map((day, idx) => (
                                <tr key={idx}>
                                    <td>{new Date(day.target_date).toLocaleDateString()}</td>
                                    <td>{day.dr_type}</td>
                                    <td>{day.prev_workday_count?.toLocaleString() || 'N/A'}</td>
                                    <td>{day.k_dr_effect_avg?.toLocaleString(undefined, {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    }) || 'N/A'}</td>
                                    <td>{day.dr_effect_avg?.toLocaleString(undefined, {
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0,
                                    }) || 'N/A'}</td>
                                    <td>{day.dr_effect_total?.toLocaleString(undefined, {
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0,
                                    }) || 'N/A'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};

export default N_K_Tabs;
