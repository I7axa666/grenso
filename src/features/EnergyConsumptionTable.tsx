import React from 'react';
import { Table } from 'react-bootstrap';
import { TableCell, Day } from '../types';
import { ApiResponse } from './AccountPage/types';
import './style.css';   

interface Props {
  data: ApiResponse;
}

const EnergyConsumptionTable: React.FC<Props> = ({ data }) => {
  // Формируем заголовки таблицы (даты)
  const headers = data.days.map(day => ({
    date: day.date.split('-')[2], // "01"
    isHoliday: day.types.includes('holliday_weekends')
  }));

  // Функция для определения цвета ячейки
  const getCellColor = (cell: TableCell) => {
    if (cell.isStatus1) return 'bg-danger'; // Красный для is_status_1
    if (cell.isHoliday) return 'bg-light'; // Серый для праздников
    if (cell.dayTypes.includes('replace')) return 'bg-warning'; // Оранжевый
    if (cell.dayTypes.includes('event')) return 'bg-success'; // Зеленый
    return 'bg-white'; // Белый по умолчанию
  };

  return (
    <div className="diagonal-infographics">
      <div className="table-responsive" style={{ maxHeight: '80vh', overflow: 'auto' }}>
        <Table bordered className="mb-0">
          <thead>
            <tr>
              <th style={{ minWidth: '200px' }}>Объекты</th>
              {headers.map((header, idx) => (
                <th key={idx} className="text-center" style={{ minWidth: '50px' }}>
                  {header.date}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.aors.map(aor => (
              <React.Fragment key={aor.id}>
                {/* Строка с названием AOR */}
                <tr className="fw-bold">
                  <td>{aor.name} ({aor.code})</td>
                  {headers.map((_, idx) => <td key={idx}></td>)}
                </tr>
                
                {/* Вложенные строки с regulation objects */}
                {aor.regulation_objects.map(obj => (
                  <tr key={obj.id}>
                    <td className="ps-4">{obj.name}</td>
                    {obj.consumptions.map((consumption, idx) => (
                      <td 
                        key={idx}
                        className={`${getCellColor({
                          date: consumption.consumption_day.date.split('-')[2],
                          isHoliday: consumption.consumption_day.types?.includes('holliday_weekends'),
                          dayTypes: consumption.day_types,
                          isStatus1: consumption.is_status_1,
                          hasEvent: consumption.day_types.includes('event')
                        })} position-relative`}
                        style={{ height: '40px', width: '40px' }}
                      >
                        {/* Кружок для reduction */}
                        {consumption.day_types.includes('event') && (
                          <div 
                            className={`rounded-circle position-absolute top-50 start-50 translate-middle`}
                            style={{
                              width: '15px',
                              height: '15px',
                              backgroundColor: obj.events?.find(e => 
                                e.event_day.date === consumption.consumption_day.date
                              )?.reduction ? 'green' : 'red'
                            }}
                          />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default EnergyConsumptionTable;