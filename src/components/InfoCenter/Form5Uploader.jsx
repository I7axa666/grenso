import { useState } from "react";
import axios from "axios";
import "./Form5Uploader.css";
import { validateAndConvertXlsxToJson } from '../../js/xlsxToJson';
import apiPaths from '../../js/apiPaths';

const Form5Uploader = () => {
  const [file, setFile] = useState(null);
  const [numericParameter, setNumericParameter] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const URL = import.meta.env.VITE_API_PATH;
  
  const handleFileChange = async (e) => {
      const selectedFile = e.target.files[0];
      if (selectedFile && selectedFile.type !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
       setError("Только .xlsx файлы.");
       setFile(null);
       setIsValid(false);
      } else {
       setError("");
       setFile(selectedFile);
       try {
          const days = await validateAndConvertXlsxToJson(selectedFile);
          setIsValid(true);
          setError("");
       } catch (validationError) {
          setError(validationError);
          setIsValid(false);
       }
      }
  };
  
  const handleUpload = async () => {
      if (!file || !isValid) {
       setError("Пожалуйста, приложите корректно заполненный файл .xlsx ");
       return;
      }
  
      setError("");
      setLoading(true);
  
      try {
       const days = await validateAndConvertXlsxToJson(file);
       const jsonData = {
          time_zone: numericParameter.toString(),
          days,
       };

       const response = await axios.post(`${URL}${apiPaths.form_5}`, jsonData, {
          headers: {
           "Content-Type": "application/json",
          },
          responseType: 'blob', // Указываем, что ожидаем получить бинарные данные
       });
       // Создаем URL для скачивания файла
       const url = window.URL.createObjectURL(new Blob([response.data]));
       const link = document.createElement('a');
       link.href = url;
       link.setAttribute('download', 'form_5_rmse.xlsx'); // Указываем имя файла
       document.body.appendChild(link);
       link.click();
       link.remove();
      } catch (error) {
       setError("Ошибка загрузки, попробуйте позже.");
      } finally {
      setLoading(false);
      }
  };
  
  const toggleImageVisibility = () => {
      setShowImage(!showImage);
  };

  const downloadFile = async () => {
      try {
         const response = await axios.get(`${URL}${apiPaths.form_5}`, {
         responseType: 'blob', // Указываем, что ожидаем получить бинарные данные
         });
      
         const url = window.URL.createObjectURL(new Blob([response.data]));
         const link = document.createElement('a');
         link.href = url;
         link.setAttribute('download', '51070.xlsx'); // Укажите имя файла
         document.body.appendChild(link);
         link.click();
         link.remove();
      } catch (error) {
         console.error('Ошибка при загрузке файла:', error);
      }
   };
  
  return (
      <div className="form5-uploader">
       <h2>Расчет RMSE и создание Формы 5</h2>
       <div className="instructions">
          <h3>Инструкции по загрузке файла</h3>
          <p>Файл должен быть в формате <strong>.xlsx</strong> и содержать не менее 672 строк (данные минимум за 28 к.д.).</p>
          <p>В расчет будут взяты посление 45 календарных дней.</p>
          <p>Обязательные колонки:</p>
          <ul>
           <li><strong>Столбец A</strong> - Дата - в формате ДД.ММ.ГГГГ</li>
           <li><strong>Столбец В</strong> - Час суток - числовое значение от 1 до 24</li>
           <li><strong>Столбец С</strong> - Почасовое потребление - числовое значение</li>
          </ul>
          <p
           onClick={toggleImageVisibility}
           style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}
          >
           Пример структуры файла
          </p>
          {showImage && (
           <img
              src={`${import.meta.env.VITE_API_BASE_PATH}/img/51070_screen.PNG`}
              alt="Пример файла"
              className="instruction-image"
           />
          )}
          <p>После загрузки файл будет отправлен на обработку, и вы сможете скачать готовый результат.</p>
          
          <a
           href="#"
           className="template-download"
           onClick={downloadFile}
          >
           Скачать пример заполненного файла
          </a>
       </div>
  
       <div className="upload-section">
          <label htmlFor="file-upload" className="file-label mb-3">
           Выберите файл .xlsx для отправки на обработку:
          </label>
          <input id="file-upload" type="file" className="form-control" onChange={handleFileChange} />
          {error && <p className="error">{error}</p>}
  
          <label htmlFor="numeric-parameter">Выберите <strong>Ценовую зону:</strong></label>
          <select
           id="numeric-parameter"
           value={numericParameter}
           onChange={(e) => setNumericParameter(Number(e.target.value))}
          >
           <option value={1}>1</option>
           <option value={2}>2</option>
          </select>
  
          <button onClick={handleUpload} disabled={loading || !isValid}>
           {loading ? "Загрузка..." : "Запустить расчет"}
          </button>
  
          {loading && 
            <div className="spinner-grow text-primary" role="status">
               {/* <span className="visually-hidden">Loading...</span> */}
            </div>
         }
       </div>
      </div>
);
};
  
export default Form5Uploader;