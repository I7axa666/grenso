// Общие типы
export type DateString = string; // "2025-01-01"
export type CodeString = string;

// Интерфейсы для дней и событий
export interface Day {
date: DateString;
types?: string[];
}

export interface Events {
id: number;
reduction: boolean;
reduction_start_hour: number;
event_day: Day;
}

// Интерфейсы для потребления и регулирования
export interface Consumption {
id: number;
consumption_day: Day;
is_status_1: boolean;
hour_1: number | null;
hour_2: number | null;
hour_3: number | null;
hour_4: number | null;
hour_5: number | null;
hour_6: number | null;
hour_7: number | null;
hour_8: number | null;
hour_9: number | null;
hour_10: number | null;
hour_11: number | null;
hour_12: number | null;
hour_13: number | null;
hour_14: number | null;
hour_15: number | null;
hour_16: number | null;
hour_17: number | null;
hour_18: number | null;
hour_19: number | null;
hour_20: number | null;
hour_21: number | null;
hour_22: number | null;
hour_23: number | null;
hour_24: number | null;
day_types: string[];
}

export interface Adjustment {
    adjustment: number;
    ГБН_1_1?: Record<string, number>;
    ГБН_1_2?: Record<string, number>;
    ГБН_1_3?: Record<string, number>;
    МБН?: Record<string, number>;
    ЗГН?: Record<string, number>;
}


export interface ContextInInterval {
id: number;
adjustment_type: number;
calculation_method: number;
reduction_duration: number;
reduction_volume: number;
consumptions_by_date: Record<string, Record<string, number>>;
adjustment_gbn_zgn: Adjustment;
}

export interface RegulationObject {
id: number;
code: CodeString;
name: string;
zone: number;
consumer_inn: string;
consumptions: Consumption[];
context_in_intervals: ContextInInterval[];
or_availability: Availability[];
events: Events[];
}

// Интерфейсы для доступности и интервалов
export interface Availability {
id: number;
calendar_day: Day;
availability: boolean;
}

export interface Interval {
id: number;
start_date: DateString;
volume: number;
}

// Интерфейсы для AOR и OR данных
export interface Aor {
id: number;
code: CodeString;
name: string;
zone: number;
regulation_objects: RegulationObject[];
aor_availability: Availability[];
events: Events[];
interval: Interval[];
}

export interface OrData {
or_consumption: Consumption;
or_gbn: OrGbn;
adjustment_gbn_zgn: Adjustment;
rmse_data: RmseData;
consumptions_by_date: Record<string, Record<string, number>>;
}

// Интерфейсы для RMSE и OR GBN данных
export interface RmseData {
control_object_or: number;
control_object_aor: number | null;
target_date: number;
calculated_dates: DateString[];
doubled_rmse_no_tweak: number;
rrmse_no_tweak: number;
doubled_rmse_with_tweak: number;
rrmse_with_tweak: number;
doubled_rmse_with_tweak_yesterday: number;
rrmse_with_tweak_yesterday: number;
}

export interface OrGbn {
control_object_or: number;
control_object_aor: number | null;
target_date: number;
calculated_dates: DateString[];
is_calculated: boolean;
gbn_values: Record<number, number>; // Используем Record для хранения значений
rmse_data: RmseData;
}

// Основной интерфейс ответа API
export interface ApiResponse {
days: Day[];
aors: Aor[];
}

export interface Or {
id: number;
code: CodeString;
name: string;
zone: number;
}
