const validateField = (name, value, formData, errors) => {
    let newErrors = { ...errors };
    const { total_days, availability_days, unavailability_days, total_discharge, successful_discharge, total_events } = {
        ...formData,
        [name]: value,
    };

    switch (name) {
        case "availability_days":
            if (Number(value) > Number(total_days)) {
                newErrors[name] = "Количество накопленных готовностей больше Дней в месяце";
            } else {
                delete newErrors[name];
            }
            break;
        case "unavailability_days":
            if (Number(value) > Number(total_days)) {
                newErrors[name] = "Количество НЕготовностей больше Дней в месяце";
            } else {
                delete newErrors[name];
            }
            break;
        case "successful_discharge":
            if (Number(value) > Number(total_discharge)) {
                newErrors[name] = "Число успешных событий больше направленных команд";
            } else {
                delete newErrors[name];
                // Проверяем и удаляем ошибки, связанные с total_discharge
                if (Number(total_discharge) >= Number(value)) {
                    delete newErrors["total_discharge"];
                }
            }
            break;
        case "total_discharge":
            if (Number(value) > Number(total_events)) {
                newErrors[name] = "Число команд больше всех событий";
            } else if (Number(value) < Number(successful_discharge)) {
                newErrors[name] = "Число команд меньше числа успешных событий";
            } else {
                delete newErrors[name];
                // Проверяем и удаляем ошибки, связанные с successful_discharge
                if (Number(successful_discharge) <= Number(value)) {
                    delete newErrors["successful_discharge"];
                }
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

    return newErrors;
};

export default validateField;