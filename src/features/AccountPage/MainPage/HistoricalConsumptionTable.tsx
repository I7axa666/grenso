import React, { useEffect, useRef, useState } from 'react';
import { Table } from 'react-bootstrap';
import { getCollapsedHours, calculateMinMax, getGradientColor } from './utils';
import './style.css';

interface HistoricalConsumptionTableProps {
    data: Record<string, Record<string, number>>;
    zone?: number;
}

const HistoricalConsumptionTable: React.FC<HistoricalConsumptionTableProps> = ({ data, zone }) => {
    const [expanded, setExpanded] = useState(false);
    
    const tableData = Object.entries(data).map(([date, hours]) => {
        const total = Object.values(hours).reduce((sum, value) => sum + value, 0);
        return { date, hours, total };
    });

    tableData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth()+1).toString().padStart(2, '0')}.${date.getFullYear()}`;
    };

    const collapsedHours = getCollapsedHours(zone);
    const shouldCollapse = !expanded && collapsedHours;

    const shouldHideHour = (hour: number) => {
        if (!shouldCollapse) return false;
        return (hour >= collapsedHours!.start[0] && hour <= collapsedHours!.start[1]) ||
             (hour >= collapsedHours!.end[0] && hour <= collapsedHours!.end[1]);
    };

    const { min, max } = calculateMinMax(data);


    const renderHourHeaders = () => {
        const headers = [];
        for (let i = 1; i <= 24; i++) {
            if (shouldHideHour(i)) {
                if (i === collapsedHours!.start[0] || i === collapsedHours!.end[0]) {
                    const range = i === collapsedHours!.start[0]
                        ? `${collapsedHours!.start[0]}-${collapsedHours!.start[1]}`
                        : `${collapsedHours!.end[0]}-${collapsedHours!.end[1]}`;
                    
                    const colSpan = i === collapsedHours!.start[0]
                        ? collapsedHours!.start[1] - collapsedHours!.start[0] + 1
                        : collapsedHours!.end[1] - collapsedHours!.end[0] + 1;
                    
                    headers.push(
                        <th
                            key={`collapsed-${i}`}
                            colSpan={colSpan}
                            className="text-center"
                            style={{ cursor: 'pointer' }}
                            onClick={() => setExpanded(true)}
                        >
                            {range} {!expanded && '...'}
                        </th>
                    );
                    i += colSpan - 1; // Пропустить остальные часы в диапазоне
                }
            } else {
                headers.push(
                    <th key={i} style={{ width: '50px' }} className="text-center">
                        {i}
                    </th>
                );
            }
        }
        return headers;
    };

    const renderHourCells = (hours: Record<string, number>) => {
        const cells = [];
        for (let i = 1; i <= 24; i++) {
            const isInZone = (zone === 1 && (i > 7 && i < 22)) ||
                             (zone === 2 && (i > 4 && i < 18));

            if (shouldHideHour(i)) {
                if (i === collapsedHours!.start[0] || i === collapsedHours!.end[0]) {
                    const colSpan = i === collapsedHours!.start[0]
                        ? collapsedHours!.start[1] - collapsedHours!.start[0] + 1
                        : collapsedHours!.end[1] - collapsedHours!.end[0] + 1;
                    
                    cells.push(
                        <td
                            key={`collapsed-${i}`}
                            colSpan={colSpan}
                            className="text-center"
                            style={{ cursor: 'pointer', background: '#f8f9fa' }}
                            onClick={() => setExpanded(true)}
                        >
                            {!expanded && '...'}
                        </td>
                    );
                    i += colSpan - 1; // Пропустить остальные часы в диапазоне
                }
            } else {
                const value = hours[`hour_${i}`];
                const color = isInZone ? getGradientColor(value, min, max) : 'transparent';
                cells.push(
                    <td key={i} className="text-end" style={{ backgroundColor: color }}>
                        {value.toLocaleString()}
                    </td>
                );
            }
        }
        return cells;
    };

    const calculateZoneConsumption = (hours: Record<string, number>) => {
        let sum = 0;
        for (let i = 1; i <= 24; i++) {
            const isInZone = (zone === 1 && (i > 7 && i < 22)) ||
                             (zone === 2 && (i > 4 && i < 18));
            if (isInZone) {
                sum += hours[`hour_${i}`];
            }
        }
        return sum;
    };

    const calculateZoneConsumptionMinMax = () => {
        const zoneConsumptions = tableData.map(row => calculateZoneConsumption(row.hours));
        return {
            min: Math.min(...zoneConsumptions),
            max: Math.max(...zoneConsumptions),
        };
    };

    const { min: zoneMin, max: zoneMax } = calculateZoneConsumptionMinMax();

    const calculatePercentageConsumption = (index: number) => {
        if (index < 10) return null; // Если меньше 10 дней, возвращаем null

        const lastTenDays = tableData.slice(index - 10, index);
        const lastTenDaysConsumption = lastTenDays.map(row => calculateZoneConsumption(row.hours));
        const averageConsumption = lastTenDaysConsumption.reduce((sum, value) => sum + value, 0) / 10;

        const currentConsumption = calculateZoneConsumption(tableData[index].hours);
        return (currentConsumption / averageConsumption) * 100;
    };

    const calculatePercentageMinMax = () => {
        const percentages = tableData.map((_, index) => calculatePercentageConsumption(index)).filter(p => p !== null) as number[];
        return {
            min: Math.min(...percentages),
            max: Math.max(...percentages),
        };
    };

    const { min: percentageMin, max: percentageMax } = calculatePercentageMinMax();


    return (
        <div className="col-12" style={{ overflowX: 'auto' }}>
            <Table striped bordered hover className="table">
                <thead>
                    <tr>
                        <th style={{ width: '50px' }}>№</th>
                        <th style={{ width: '100px' }}>Дата</th>
                        {renderHourHeaders()}
                        <th style={{ width: '100px' }} className="text-end">Суточн.<br/>потр.</th>
                        <th style={{ width: '100px' }} className="text-end">Сумм.потр.<br/>в часы СО</th>
                        <th style={{ width: '105px' }} className="text-end">% потр.<br/>в часы СО</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((row, index) => {
                        const zoneConsumption = calculateZoneConsumption(row.hours);
                        const zoneColor = getGradientColor(zoneConsumption, zoneMin, zoneMax);
                        const percentageConsumption = calculatePercentageConsumption(index);
                        const percentageColor = percentageConsumption !== null
                            ? getGradientColor(percentageConsumption, percentageMin, percentageMax)
                            : 'transparent';
                        return (
                            <tr key={index}>
                                <td>{index >= 10 ? index - 9 : ''}</td>
                                <td>{formatDate(row.date)}</td>
                                {renderHourCells(row.hours)}
                                <td className="text-end fw-bold">{row.total.toLocaleString()}</td>
                                <td className="text-end fw-bold" style={{ backgroundColor: zoneColor }}>
                                    {zoneConsumption.toLocaleString()}
                                </td>
                                <td className="text-end fw-bold"  style={{ backgroundColor: percentageColor }}>
                                    {percentageConsumption !== null ? `${percentageConsumption.toFixed(0)}%` : ''}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            
            {collapsedHours && (
                <div className="text-end mt-2">
                    <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => setExpanded(!expanded)}
                    >
                        {expanded ? 'Свернуть часы' : 'Развернуть все часы'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default HistoricalConsumptionTable;
