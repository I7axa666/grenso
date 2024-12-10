import { useState, useEffect } from 'react';
import { fetchData } from '../../js/apiService';
import './InfoCenter.css';

const N_K_Tabs = () => {
const [data, setData] = useState(null);
const [error, setError] = useState(null);

const loadData = async () => {
    setData(null)
    try {
     const result = await fetchData("n_k");
     setData(result);
     setError(null);
    } catch (err) {
     console.error('Error in loadData:', err);
     setError(err.message);
    }
};

useEffect(() => {
    loadData();
}, []);

const result = data?.result;

return (
    <div className="table-container">
     <button onClick={loadData} className="refresh-button">
        Обновить данные
     </button>
     {error && <div className="error">{error}</div>}
     {!data ? (
      
      <div class="spinner-grow text-primary" role="status">
         <span class="visually-hidden">Loading...</span>
      </div>

     ) : (
        <>
         <div className="summary">
            <p>На {new Date(result?.target_date).toLocaleDateString()}</p>
            <p>Лучшие параметры: N = {result?.best_N?.toLocaleString()} и K = {result?.best_K?.toLocaleString()}</p>
            

            <p>Средний эффект за {result?.best_N} дней:{" "}
             {result?.average_for_N?.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
             })}
            </p>

            <p> Порог:{" "}
             {(result?.average_for_N * result?.best_K)?.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
             })}
            </p>
         </div>

         <table className="scrollable-table">
            <thead>
             <tr>
                <th>Дата</th>
                <th>ЦЗСП</th>
                <th>Параметр N</th>
                <th>Параметр K</th>
                <th>Средний эффект <br></br> за предшествующие рабочие дни, руб</th>
                <th>Эффект от ЦЗСП, руб</th>
             </tr>
            </thead>
            <tbody>
             {result?.days.map((day, idx) => (
                <tr key={idx}>
                 <td>{new Date(day.target_date).toLocaleDateString()}</td>
                 <td>{day.dr_type}</td>
                 <td>{day.prev_workday_count?.toLocaleString()}</td>
                 <td>{day.k_dr_effect_avg?.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                 })}</td>
                 <td>{day.dr_effect_avg?.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                 })}</td>
                 <td>{day.dr_effect_total?.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                 })}</td>
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