import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import MonthYearSelector from './MonthYearSelector';
import SpinnerComp from '../../SpinnerComp';
import ErrorAlert from '../../ErrorAlert';
import AvailabilityMatrix from '../Dashboard/AvailabilityMatrix';
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { fetchDashboardData, setMonth, setYear } from '../../../store//slices/dashboardSlice'



const DashboardTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data, loading, error, month, year } = useAppSelector(
    (state) => state.dashboard
  );

  useEffect(() => {
    dispatch(fetchDashboardData({ month, year }));
  }, [month, year, dispatch]);

  const handleMonthChange = (newMonth: number) => {
    dispatch(setMonth(newMonth));
  };

  const handleYearChange = (newYear: number) => {
    dispatch(setYear(newYear));
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
        <AvailabilityMatrix />
)}
    </Container>
  );
};

export default DashboardTable;