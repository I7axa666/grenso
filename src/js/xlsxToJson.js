import ExcelJS from 'exceljs';
import { excelDateToJSDate } from './utilits';

export const validateAndConvertXlsxToJson = (file) => {
return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
     const buffer = e.target.result;
     const workbook = new ExcelJS.Workbook();

     try {
        await workbook.xlsx.load(buffer);
        const worksheet = workbook.worksheets[0];

        const jsonData = [];
        worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
         const rowValues = row.values.slice(1); // Убираем первый элемент, так как row.values начинается с индекса 1
         jsonData.push(rowValues);
        });

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
         
         const formattedDate = excelDateToJSDate(date).toISOString().split('T')[0];

         if (!days[formattedDate]) {
            days[formattedDate] = [];
         }
         
         days[formattedDate].push({ [interval]: parseFloat(consumption) });
        }
        
        resolve(days);
     } catch (error) {
        reject("Ошибка обработки файла.");
     }
    };

    reader.onerror = () => {
     reject("Ошибка чтения файла.");
    };

    reader.readAsArrayBuffer(file);
});
};