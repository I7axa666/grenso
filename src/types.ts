export interface EnergyData {
  days: number[];
  hours: number[];
  consumption: {
    [day: number]: {
      [hour: number]: number;
    };
  };
}
  
export interface EnergyState {
  data: EnergyData | null;
  loading: boolean;
  error: string | null;
  selectedMonth: string;
}


export interface Day {
  date: string; // "2025-01-01"
  types: string[]; // ["holliday_weekends"]
}

export interface Consumption {
  id: number;
  consumption_day: Day;
  is_status_1: boolean;
  day_types: string[];
}

export interface Event {
  id: number;
  event_day: Day;
  reduction_start_hour: number;
  reduction: boolean;
  reduction_hour_result: {
    [hour: number]: number;
  }
}

export interface RegulationObject {
  id: number;
  name: string;
  consumptions: Consumption[];
  events: Event[];
}

// Типы для таблицы
export interface TableCell {
  date: string; // "01"
  isHoliday: boolean;
  dayTypes: string[];
  isStatus1: boolean;
  hasEvent: boolean;
  reduction?: boolean;
}

export interface TableRow {
  aorId: number;
  aorName: string;
  aorCode: string;
  regulationObjects: {
    id: number;
    name: string;
    cells: TableCell[];
  }[];
}
