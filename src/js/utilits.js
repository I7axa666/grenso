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

export { findMinMaxValues, getAllColumnKeys };