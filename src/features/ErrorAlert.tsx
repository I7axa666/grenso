import { Alert } from 'react-bootstrap';

interface ErrorAlertProps {
  error: string | null;
  className?: string;
  title?: string;
  onClose?: () => void;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ 
  error, 
  className = 'my-5', 
  title = 'Ошибка загрузки данных',
  onClose 
}) => {
  if (!error) return null;

  return (
    <Alert 
      variant="danger" 
      className={className}
      dismissible={!!onClose}
      onClose={onClose}
    >
      <Alert.Heading>{title}</Alert.Heading>
      <p>Попробуйте обновить страницу</p>
    </Alert>
  );
};

export default ErrorAlert;