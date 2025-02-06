import { createContext, useReducer, useContext } from 'react';
import { UPDATE_FORM_DATA, SET_ERRORS, SET_TABLE_DATA, SET_ERROR, TOGGLE_INCLUDE_COST } from './actions';

const initialState = {
    formData: {
        price: parseFloat(import.meta.env.VITE_API_CURRENT_PRICE || "437000"),
        contractual_volume: 1,
        reduction_hours: 4,
        total_events: 5,
        total_days: 21,
        successful_discharge: 0,
        total_discharge: 0,
        availability_days: 0,
        unavailability_days: 0,
        unavailability_in_command: 0,
    },
    errors: {},
    tableData: [],
    error: null,
    includeCost: false,
};

function formReducer(state, action) {
    switch (action.type) {
        case UPDATE_FORM_DATA:
         return {
            ...state,
            formData: { ...state.formData, ...action.payload },
         };
        case SET_ERRORS:
         return {
            ...state,
            errors: action.payload,
         };
        case SET_TABLE_DATA:
         return {
            ...state,
            tableData: action.payload,
         };
        case SET_ERROR:
         return {
            ...state,
            error: action.payload,
         };
        case TOGGLE_INCLUDE_COST:
         return {
            ...state,
            includeCost: !state.includeCost,
         };
        default:
         return state;
    }
}

const FormContext = createContext();

export const FormProvider = ({ children }) => {
    const [state, dispatch] = useReducer(formReducer, initialState);
    
    return (
        <FormContext.Provider value={{ state, dispatch }}>
         {children}
        </FormContext.Provider>
    );
};

export const useFormContext = () => useContext(FormContext);

