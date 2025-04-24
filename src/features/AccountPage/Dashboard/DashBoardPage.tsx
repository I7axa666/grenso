import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import apiClient from '../../../api/client';
import MonthYearSelector from './MonthYearSelector';
import SpinnerComp from '../../SpinnerComp';
import ErrorAlert from '../../ErrorAlert';
import AvailabilityMatrix from '../Dashboard/AvailabilityMatrix';
import { ApiResponse } from '../types'


const DashboardTable: React.FC = () => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const [year, setYear] = useState<number>(new Date().getFullYear());

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.get<ApiResponse>(
        `/initial_data/?year=${year}&month=${month}`
      );
      setData(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      console.error('Failed to fetch data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [month, year]);

  const handleMonthChange = (newMonth: number) => {
    setMonth(newMonth);
  };

  const handleYearChange = (newYear: number) => {
    setYear(newYear);
  };

  return (
    <Container className="py-4" style={{ width: '100%', overflowX: 'auto' }}>
      <h1 className="mb-4 text-center">Дашборд готовности</h1>
      
      <MonthYearSelector 
        month={month}
        year={year}
        onMonthChange={handleMonthChange}
        onYearChange={handleYearChange}
      />

      {loading && (
        <SpinnerComp />
      )}

      <ErrorAlert error={error}/>

      {data && (
        <AvailabilityMatrix 
          days={data.days}
          aors={data.aors}
        />
)}
    </Container>
  );
};

export default DashboardTable;