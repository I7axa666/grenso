import { Form } from 'react-bootstrap';
import { useAppDispatch } from '../store/hooks';
import { fetchEnergyDataStart } from '../store/slices/energySlice';

const MonthSelector: React.FC = () => {
  const dispatch = useAppDispatch();
  
  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(fetchEnergyDataStart(e.target.value));
  };

  return (
    <Form.Group controlId="monthSelect" className="mb-4">
      <Form.Label>Выберите месяц:</Form.Label>
      <Form.Control
        type="month"
        onChange={handleMonthChange}
        defaultValue={new Date().toISOString().slice(0, 7)}
      />
    </Form.Group>
  );
};

export default MonthSelector;