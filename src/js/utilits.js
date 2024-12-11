const findMinMaxValues = (data) => {
    let minValue = Infinity; // Начальное значение для поиска минимума
    let maxValue = -Infinity; // Начальное значение для поиска максимума
 
    data.forEach(item => {
      Object.values(item).forEach(array => {
       array.forEach(obj => {
          Object.values(obj).forEach(value => {
           if (typeof value === 'number') { // Проверяем, является ли значение числом
              if (value < minValue) {
               minValue = value;
              }
              if (value > maxValue) {
               maxValue = value;
              }
           }
          });
       });
      });
});
    
return { minValue, maxValue };
};


const getAllColumnKeys = (data) => {
const columnKeys = new Set();
data.forEach(item => {
      Object.values(item).forEach(array => {
      array.forEach(obj => {
         Object.keys(obj).forEach(key => {
         columnKeys.add(key);
         });
      });
      });
});
return Array.from(columnKeys);
};

const getCellColor = (value, min, max) => {
   if (typeof value !== 'number') return 'transparent'; // Пропускаем нечисловые значения

   // Цвет для значения 0
   if (value === 0) return 'rgb(225, 255, 255)'; // Светло-бежевый

   const ratio = (value - min) / (max - min);

   if (value < 0) {
       // Градация от светло-бежевого до красного для отрицательных значений
       const red = Math.round(245 + (1 - ratio) * (255 - 245));
       const green = Math.round(225 - ratio * 245);
       const blue = Math.round(220 - ratio * 220);
       return `rgb(${red}, ${green}, ${blue})`;
   } else {
       // Градация от светло-бежевого до зеленого для положительных значений
       const red = Math.round(245 - ratio * 245);
       const green = Math.round(225 + ratio * (255 - 245));
       const blue = Math.round(220 - ratio * 220);
       return `rgb(${red}, ${green}, ${blue})`;
   }
};

export { findMinMaxValues, getAllColumnKeys, getCellColor };