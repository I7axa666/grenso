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

  const { result } = data;

  return (
    <div className="table-container">
      <button onClick={loadData} className="refresh-button">
        Refresh Data
      </button>
      {error && <div className="error">{error}</div>}

      <div className="summary">
        <p>Max Effect: {result?.max_effect}</p>
        <p>Best N: {result?.best_N}</p>
        <p>Best K: {result?.best_K}</p>
        <p>Average for N: {result?.average_for_N}</p>
        <p>Target Date: {new Date(result?.target_date).toLocaleDateString()}</p>
      </div>

      <table className="scrollable-table">
        <thead>
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
          {result?.days.map((day, idx) => (
            <tr key={idx}>
              <td>{new Date(day.target_date).toLocaleDateString()}</td>
              <td>{day.dr_type}</td>
              <td>{day.prev_workday_count}</td>
              <td>{day.k_dr_effect_avg}</td>
              <td>{day.dr_effect_avg}</td>
              <td>{day.dr_effect_total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default N_K_Tabs;
