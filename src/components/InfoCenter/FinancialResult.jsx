import { useState } from "react";
import { fetchData } from "../../js/apiService";
import { findMinMaxValues, getAllColumnKeys, getCellColor } from "../../js/utilits";
import "./InfoCenter.css";

const FinancialResult = () => {
    const [formData, setFormData] = useState({
        price: parseFloat(import.meta.env.VITE_API_CURRENT_PRICE || "437000"),
        contractual_volume: 1,
        reduction_hours: 4,
        total_events: 5,
        total_days: 21,
        successful_discharge: 0,
        total_discharge: 5,
        availability_days: 0,
        unavailability_days: 0,
    });

    const [tableData, setTableData] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            const numericFormData = Object.fromEntries(
                Object.entries(formData).map(([key, value]) => [key, parseFloat(value) || 0])
            );

            const response = await fetchData("matrix", numericFormData);
                        
            if (!response.result) {
                throw new Error(`Error: ${response.statusText}`);
            }
            
            // const jsonResponse = await response.json();
            // console.log(response.result)
            setTableData(response.result);
          } catch (error) {
            console.error("Error submitting data:", error);
        }
    };

    const renderTable = () => {
        if (!Array.isArray(tableData) || !tableData.length) return null;
        const columnKeys = getAllColumnKeys(tableData);
        // console.log(columnKeys);
        const allValues = tableData.flat ? tableData.flat() : [];
        const { minValue, maxValue } = findMinMaxValues(allValues)

        return (
            <table className="gradient-table">
                <thead>
                    <tr>
                        <th className="row-header">Дни готовности/ Разгрузки</th>
                        {columnKeys.map((colKey, index) => (
                        <th key={index} className="column-header">{colKey}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {tableData.map((row, rowIndex) => (
                        Object.entries(row).map(([rowKey, values]) => (
                        <tr key={rowIndex}>
                            <td className="row-header">{rowKey}</td>
                            {columnKeys.map((colKey, colIndex) => {
                            const cellValue = values.find(obj => obj[colKey] !== undefined)?.[colKey];
                            const displayValue = cellValue === undefined ? '-' : cellValue.toLocaleString(undefined, {
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                            });
                            return (
                                <td
                                key={colIndex}
                                style={{ backgroundColor: getCellColor(cellValue, minValue, maxValue) }}
                                >
                                {displayValue}
                                </td>
                            );
                            })}
                        </tr>
                        ))
                    ))}
                    </tbody>
            </table>
        );
    };

    return (
        <div className="financial-result container">
            <div className="inputs row">
                {[
                { label: "Цена, руб. за МВт", name: "price", min: 0, type: "number" },
                { label: "Договорной объем снижения, МВт", name: "contractual_volume", min: 0.1, max: 9000, type: "number" },
                { label: "Длительность снижения, ч.", name: "reduction_hours", options: [1, 2, 3, 4] },
                { label: "Всего событий в месяц", name: "total_events", options: [1, 2, 3, 4, 5] },
                { label: "Всего дней в месяце", name: "total_days", options: [23, 22, 21, 20, 19, 18, 17, 16, 15, 14] },
                { label: "Число успешных событий", name: "successful_discharge", options: [0, 1, 2, 3, 4, 5] },
                { label: "Число направленных команд", name: "total_discharge", options: [0, 1, 2, 3, 4, 5] },
                { label: "Количество накопленных готовностей", name: "availability_days", min: 0, max: 25, type: "number" },
                { label: "Количество накопленных не готовностей", name: "unavailability_days", min: 0, max: 25, type: "number" },
                ].map(({ label, name, options, type, ...props }) => (
                <div key={name} className="input-group mb-3 col-md-6">
                    <label className="form-label">{label}</label>
                    {options ? (
                    <select
                        className="form-select"
                        name={name}
                        value={formData[name]}
                        onChange={handleChange}
                    >
                        {options.map(option => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                        ))}
                    </select>
                    ) : (
                    <input
                        type={type}
                        className="form-control"
                        name={name}
                        value={formData[name]}
                        onChange={handleChange}
                        {...props}
                    />
                    )}
                </div>
                ))}
            </div>
            <button onClick={handleSubmit} className="btn btn-primary mt-3">Получить расчет</button>
            <div className="table-container mt-4">{renderTable()}</div>
            </div>
    );
};

export default FinancialResult;

