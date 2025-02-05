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
   if (typeof value !== 'number') return 'transparent'; // Skip non-numeric values

   // Color for value 0
   if (value === 0) return 'rgb(225, 255, 255)'; // Light beige

   const ratio = (value - min) / (max - min);

   if (value < 0) {
       // Gradation from dark red to light beige for negative values
       const invertedRatio = (value - max) / (min - max); // Adjust to invert the ratio for negatives
       const red = Math.round(245 + invertedRatio * (255 - 245)); // Dark red for smaller negatives
       const green = Math.round(500 * (1 - invertedRatio)); // Minimal green for dark red
       const blue = Math.round(500 * (1 - invertedRatio)); // Minimal blue for dark red
       return `rgb(${red}, ${green}, ${blue})`;
   } else {
       // Gradation from light beige to green for positive values
       const red = Math.round(300 - ratio * 245);
       const green = Math.round(290 + ratio * (255 - 245));
       const blue = Math.round(300 - ratio * 220);
       return `rgb(${red}, ${green}, ${blue})`;
   }
};

export { findMinMaxValues, getAllColumnKeys, getCellColor };

