import { State } from "./state";
import { Patient, DiagnoseEntry } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "SET_PATIENT_INFO";
      payload: Patient;
      
    }
  | {
      type: "SET_DIAGNOSES";
      payload: DiagnoseEntry[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    };

export const setPatientList =(patients: Patient[]): Action => {
  return{
    type:"SET_PATIENT_LIST",
    payload: patients
  };
};

export const setPatientInfo = (patient: Patient): Action => {
  return{
      type: "SET_PATIENT_INFO",
      payload: patient 
    };
};

export const addPatient = (patient: Patient): Action => {
  return{
      type: "ADD_PATIENT",
      payload: patient 
    };
};

export const setDiagnoses = (diadnoses: DiagnoseEntry[]): Action => {
  return{
    type:"SET_DIAGNOSES",
    payload: diadnoses
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "SET_PATIENT_INFO":
      return {
        ...state,
        patientInfo: action.payload
      };
    case "SET_DIAGNOSES":
      return {
        ...state,
        diagnoses: action.payload
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    default:
      return state;
  }
};
