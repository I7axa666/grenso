import React, { useState } from 'react';
import { fetchData } from '../../js/apiService';
import './InfoCenter.css';

const FinancialResult = () => {
  // const [formData, setFormData] = useState({
  //   price: 437000,
  //   eventsPerMonth: 1,
  //   totalDays: 10,
  //   completedEvents: 0,
  //   sentCommands: 0,
  //   readiness: 0,
  // });
  // const [tableData, setTableData] = useState([]);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: Number(value) });
  // };

  // const handleSubmit = async () => {
  //   const response = await fetchData(formData);
  //   setTableData(response.tableData);
  // };

  // const getCellColor = (value, min, max) => {
  //   const ratio = (value - min) / (max - min);
  //   const red = Math.round(255 - ratio * 255);
  //   const green = Math.round(ratio * 255);
  //   return `rgb(${red}, ${green}, 0)`;
  // };

  // const renderTable = () => {
  //   if (!tableData.length) return null;

  //   const allValues = tableData.flat();
  //   const min = Math.min(...allValues);
  //   const max = Math.max(...allValues);

  //   return (
  //     <table className="gradient-table">
  //       <tbody>
  //         {tableData.map((row, rowIndex) => (
  //           <tr key={rowIndex}>
  //             {row.map((value, colIndex) => (
  //               <td
  //                 key={colIndex}
  //                 style={{ backgroundColor: getCellColor(value, min, max) }}
  //               >
  //                 {value}
  //               </td>
  //             ))}
  //           </tr>
  //         ))}
  //       </tbody>
  //     </table>
  //   );
  // };

  return (
    <div className="financial-result">
      {/* <div className="inputs">
        {[
          { label: 'Price', name: 'price', min: 0 },
          { label: 'Number of Events per Month', name: 'eventsPerMonth', min: 1, max: 5 },
          { label: 'Total Days of the Month', name: 'totalDays', min: 10, max: 25 },
          { label: 'Number of Successfully Completed Events', name: 'completedEvents', min: 0, max: 5 },
          { label: 'Number of Sent Commands', name: 'sentCommands', min: 0, max: 5 },
          { label: 'Number of Accumulated Readiness', name: 'readiness', min: 0, max: 20 },
        ].map(({ label, name, ...props }) => (
          <div key={name} className="input-group">
            <label>{label}</label>
            <input
              type="number"
              name={name}
              value={formData[name]}
              onChange={handleChange}
              {...props}
            />
          </div>
        ))}
      </div>
      <button onClick={handleSubmit}>Send</button>
      <div className="table-container">{renderTable()}</div> */}
    </div>
  );
};

export default FinancialResult;
