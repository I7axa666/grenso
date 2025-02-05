import * as XLSX from 'xlsx';

export const validateAndConvertXlsxToJson = (file) => {
return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
     const data = new Uint8Array(e.target.result);
     const workbook = XLSX.read(data, { type: 'array' });

     const sheetName = workbook.SheetNames[0];
     const worksheet = workbook.Sheets[sheetName];
     const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
     const filteredData = jsonData.filter(row => row[0] !== undefined && row[0] !== null && row[0] !== '');
     // Валидация
     if (filteredData.length < 672) {
        return reject("Файл должен содержать не менее 672 строк.");
     }
     
     const [header, ...rows] = filteredData;
     if (header[0] !== 'дата' || header[1] !== 'интервал' || header[2] !== 'потребление') {
        return reject("Файл должен содержать столбцы: дата, интервал, потребление.");
     }

     const days = {};
     for (const row of rows) {
        const [date, interval, consumption] = row;
        if (!date || !interval) {
         return reject("Некорректные данные в файле.");
        }
        
        // Преобразование даты из формата Excel в формат yyyy-mm-dd
        const excelDate = new Date(Math.round((date - 25569) * 86400 * 1000));
        const formattedDate = excelDate.toISOString().split('T')[0];

        if (!days[formattedDate]) {
         days[formattedDate] = [];
        }
        days[formattedDate].push({ [interval]: parseFloat(consumption) });
     }

     resolve(days);
    };

    reader.onerror = () => {
     reject("Ошибка чтения файла.");
    };

    reader.readAsArrayBuffer(file);
});
};