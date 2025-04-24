import { Card, Table } from 'react-bootstrap';
import { useAppSelector } from '../store/hooks';
import { EnergyData } from '../types';

const ConsumptionMatrix: React.FC = () => {
  const { data, loading, error } = useAppSelector(state => state.energy);
  
  if (loading) return <div className="text-center my-5">Загрузка данных...</div>;
  if (error) return <div className="alert alert-danger">Ошибка: {error}</div>;
  if (!data) return <div className="alert alert-info">Выберите месяц для отображения данных</div>;

  return (
    <Card className="mb-4">
      <Card.Header as="h5">Матрица потребления</Card.Header>
      <Card.Body>
        <div className="table-responsive">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Час</th>
                {data.days.map(day => (
                  <th key={day}>День {day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.hours.map(hour => (
                <tr key={hour}>
                  <td>{hour}:00</td>
                  {data.days.map(day => (
                    <td key={`${day}-${hour}`}>
                      {data.consumption[day][hour] ?? '-'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ConsumptionMatrix;