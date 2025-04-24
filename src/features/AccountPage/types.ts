export interface ApiResponse {
  days: {
    code: string
    date: string;
    types: string[];
  }[];
  aors: Aor[];
}

export interface Day {
    date: string; // "2025-01-01"
    types?: string[]; // ["holliday_weekends"]
  }
  
  export interface Consumption {
    id: number;
    consumption_day: Day;
    is_status_1: boolean;
    hour_24: number | null;  
    day_types: string[];
  }

export interface ContextInInterval{
    id: number;
    adjustment_type: number;
    calculation_method: number;
    reduction_duration: number;
    reduction_volume: number;
    
}

export interface RegulationObject {
    id: number;
    code: string;
    name: string;
    zone: number;
    consumer_inn: string;
    consumptions: Consumption[];
    context_in_intervals: ContextInInterval[];
    or_availability: Availability[];
}

export interface Availability {
  id: number;
  calendar_day: Day;
  availability: boolean;
}

export interface Events {
  id: number;
  reduction: boolean;
  reduction_start_hour: number
  event_day: Day;
}

export interface Interval {
  id: number;
  start_date: string;
  volume: number;
}

export interface Aor {
    id: number;
    code: string;
    name: string;
    zone: number;
    regulation_objects: RegulationObject[];
    aor_availability: Availability[];
    events: Events[];
    interval: Interval[];
}
