import { useState, useEffect } from 'react';
import { fetchData } from '../../js/apiService';
import './InfoCenter.css';

const N_K_Tabs = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const loadData = async () => {
    try {
      const result = await fetchData();
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

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="table-container">
      <table className="scrollable-table">
        <button onClick={loadData}>Обновить данные</button>
        {error && <div className="error">{error}</div>}
        <thead>
          <div className="summary">
             <p>Max Effect: {data.result.max_effect}</p>
             <p>Best N: {data.result.best_N}</p>
             <p>Best K: {data.result.best_K}</p>
             <p>Average for N: {data.result.average_for_N}</p>
             <p>Target Date: {new Date(data.result.target_date).toLocaleDateString()}</p>
          </div>
          <tr>
            <th>Date</th>
            <th>Occurrence of the Event</th>
            <th>Parameter N</th>
            <th>Parameter K</th>
            <th>Average Economic Effect</th>
            <th>Maximum Economic Effect</th>
          </tr>
        </thead>
        <tbody>
          {data.result.days.map((day, idx) => (
            <tr key={idx}>
              <td>{new Date(day.target_date).toLocaleDateString()}</td>
              <td>{row.dr_type}</td>
              <td>{row.prev_workday_count}</td>
              <td>{row.k_dr_effect_avg}</td>
              <td>{row.dr_effect_avg}</td>
              <td>{row.dr_effect_total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default N_K_Tabs;
