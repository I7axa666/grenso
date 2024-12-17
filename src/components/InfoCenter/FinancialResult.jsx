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

    const [errors, setErrors] = useState({});
    const [tableData, setTableData] = useState([]);
    const [error, setError] = useState(null);
    const [includeCost, setIncludeCost] = useState(false); // State for checkbox

    const validateField = (name, value) => {
        let newErrors = { ...errors };
        const { total_days, availability_days, unavailability_days, total_discharge, successful_discharge, total_events } = {
            ...formData,
            [name]: value,
        };

        switch (name) {
            case "total_days":
                if (value <= 0) {
                    newErrors[name] = "Всего дней в месяце меньше 1";
                } else {
                    delete newErrors[name];
                }
                break;
            case "availability_days":
                if (value > total_days) {
                    newErrors[name] = "Количество накопленных готовностей больше Дней в месяце";
                } else {
                    delete newErrors[name];
                }
                break;
            case "unavailability_days":
                if (value > total_days) {
                    newErrors[name] = "Количество НЕготовностей больше Дней в месяце";
                } else {
                    delete newErrors[name];
                }
                break;
            case "successful_discharge":
                if (value > total_discharge) {
                    newErrors[name] = "Число успешных событий больше направленных команд";
                } else {
                    delete newErrors[name];
                }
                break;
            case "total_discharge":
                if (value > total_events) {
                    newErrors[name] = "Число команд больше всех событий";
                } else if (value < successful_discharge) {
                    newErrors[name] = "Число команд меньше числа успешных событий";
                } else {
                    delete newErrors[name];
                }
                break;
            default:
                break;
        }

        // Cross-field validation
        if (parseFloat(availability_days) + parseFloat(unavailability_days) > total_days) {
            newErrors.availability_days = "Готовности + Неготовности превышают дни в месяце";
        } else {
            delete newErrors.availability_days;
        }

        setErrors(newErrors);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        validateField(name, value);
        setTableData([]);
    };

    const isFormValid = () => {
        return (
            Object.values(formData).every((value) => value !== "" && value >= 0) &&
            Object.keys(errors).length === 0
        );
    };

    const handleSubmit = async () => {
        if (!isFormValid()) return;

        try {
            const numericFormData = Object.fromEntries(
                Object.entries(formData).map(([key, value]) => [key, parseFloat(value) || 0])
            );

            const response = await fetchData("matrix", numericFormData);

            if (!response.result) {
                throw new Error(`Error: ${response.statusText}`);
            }

            setTableData(response.result);
        } catch (error) {
            console.error("Error submitting data:", error);
            setError('Не удалось загрузить данные. Перезагрузите страницу.');
        }
    };

    const renderTable = () => {
        if (!Array.isArray(tableData) || !tableData.length) return null;
        const columnKeys = getAllColumnKeys(tableData);
        const allValues = tableData.flat ? tableData.flat() : [];
        const { minValue, maxValue } = findMinMaxValues(allValues);

        return (
            <table className="gradient-table">
                <thead>
                    <tr>
                        <th>Дни готовности/ Разгрузки</th>
                        {columnKeys.map((colKey, index) => (
                            <th key={index} className="column-header">
                                {colKey}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((row, rowIndex) =>
                        Object.entries(row).map(([rowKey, values]) => (
                            <tr key={rowIndex}>
                                <td className="row-header">{rowKey}</td>
                                {columnKeys.map((colKey, colIndex) => {
                                    const originalValue = values.find((obj) => obj[colKey] !== undefined)?.[colKey];

                                    const cost_KO = formData.contractual_volume * import.meta.env.VITE_API_COST_KO_SERVICES;
                                    const adjustedValue = includeCost && originalValue !== "-" ? originalValue - cost_KO : originalValue;
                                    // const displayValue = adjustedValue === undefined ? "-" : adjustedValue;
                                    const displayValue = adjustedValue?.toLocaleString('fr-FR', {
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0,
                                        })
                                        || "-";
                                    return (
                                        <td
                                            key={colIndex}
                                            style={{
                                                backgroundColor: getCellColor(
                                                    adjustedValue,
                                                    minValue,
                                                    maxValue
                                                ),
                                            }}
                                        >
                                            {displayValue}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))
                    )}
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
                    { label: "Количество накопленных неготовностей", name: "unavailability_days", min: 0, max: 25, type: "number" },
                ].map(({ label, name, options, type, ...props }) => (
                    <div key={name} className="input-group mb-3 col-md-6">
                        <label className="form-label">
                            {errors[name] ? <span className="text-danger">{errors[name]}</span> : label}
                        </label>
                        {options ? (
                            <select
                                className="form-select"
                                name={name}
                                value={formData[name]}
                                onChange={handleChange}
                            >
                                {options.map((option) => (
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
                <div className="input-group mb-3 col-md-6">
                    <label className="form-label">
                        <input
                            type="checkbox"
                            className="form-check-input me-2"
                            checked={includeCost}
                            onChange={(e) => setIncludeCost(e.target.checked)}
                        />
                        Учитывать стоимость услуг КО
                    </label>
                </div>
            </div>
            <button
                onClick={handleSubmit}
                className="btn btn-primary mt-3"
                disabled={!isFormValid()}
            >
                Получить расчет
            </button>
            {error && <div className="error">{error}</div>}
            <div className="table-container mt-4">{renderTable()}</div>
        </div>
    );
};

export default FinancialResult;
