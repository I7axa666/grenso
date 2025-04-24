import { Spinner } from 'react-bootstrap';

const SpinnerComp: React.FC = () => {
    return (
        <div className="text-center my-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-2">Загрузка данных...</p>
        </div>
    )
}

export default SpinnerComp