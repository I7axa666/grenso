import { Events } from '../types';

const getCollapsedHours = (zone?: number) => {
    if (zone === 1) return { start: [1, 7], end: [22, 24] };
    if (zone === 2) return { start: [1, 4], end: [18, 24] };
    return null;
};

const calculateMinMax = (data: Record<string, Record<string, number>>) => {
    const allValues = Object.values(data).flatMap(Object.values);
    return {
        min: Math.min(...allValues),
        max: Math.max(...allValues),
    };
};

const getGradientColor = (value: number, min: number, max: number) => {
    const ratio = (value - min) / (max - min);
    const red = Math.floor(255 * (1 - ratio) + 100 * ratio); // От светло-красного к светло-зеленому
    const green = Math.floor(144 * (1 - ratio) + 238 * ratio);
    const blue = Math.floor(144 * (1 - ratio) + 144 * ratio);
    return `rgb(${red}, ${green}, ${blue})`;
};


export { getCollapsedHours,  calculateMinMax, getGradientColor};
