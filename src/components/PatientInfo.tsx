import React from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import {DiagnoseEntry, Patient, NewEntry} from '../types';
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import {setPatientInfo} from '../state/reducer';
import {Icon, Button} from 'semantic-ui-react';
import PatientEntry from './PatientEntry';
import AddEntryModal from '../AddEntryModal';

const PatientInfo: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [{patientInfo, diagnoses}, dispatch ] = useStateValue();
    React.useEffect(()=>{
        const fetchPatientInfo = async ()=> {
            try {
                const {data: newPatientInfo} = await axios.get<Patient>(
                    `${apiBaseUrl}/patients/${id}`
                );
                dispatch(setPatientInfo(newPatientInfo));
            } catch (e) {
                console.error(e);
            }
        };
        if(!patientInfo || patientInfo.id !== id){
            fetchPatientInfo();
        }
    },[id, patientInfo, dispatch]);

    const matchDiagnoses = (code: string, diagnoses: DiagnoseEntry[]): string | undefined => {
       return diagnoses.find(dc => dc.code === code) ? diagnoses.find(dc => dc.code === code)?.name : '';
    };

    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();
    const [type, setType] = React.useState<"HealthCheck" | "OccupationalHealthcare" | "Hospital">("Hospital");

    const openModal = (type: "HealthCheck" | "OccupationalHealthcare" | "Hospital"): void => {
        setType(type);
        setModalOpen(true);
    };

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const submitNewEntry = async (values: NewEntry) => {
        try {
          const { data: updatedPatient} = await axios.post<Patient>(
            `${apiBaseUrl}/patients/${id}/entries`,
            values
          );
          dispatch(setPatientInfo(updatedPatient));
          closeModal();
        } catch (e) {
          console.error(e.response.data);
          setError(e.response.data);
        }
    };
    
    if(patientInfo){
        const iconName = patientInfo.gender === 'female' ? 'venus'
            : patientInfo.gender === 'male' ? 'mars'
            : 'neuter';
        return (
        <div>
            <h1>{patientInfo.name}<Icon name={iconName}/></h1>
            <p>ssn: {patientInfo.ssn}</p>
            <p>occupation: {patientInfo.occupation}</p>
            <h4>entries</h4>
            {patientInfo.entries ? patientInfo.entries.map(e => <div key={e.id}><PatientEntry entry={e} /><ul>{e.diagnosisCodes?.map(dc => <li key={dc}>{dc} {matchDiagnoses(dc, diagnoses) }</li>)}</ul></div>) : null }
            <AddEntryModal
                modalOpen={modalOpen}
                onSubmit={submitNewEntry}
                error={error}
                onClose={closeModal}
                type={type}
            />
            <Button onClick={() => openModal("Hospital")}>Add New Hospital Entry</Button>
            <Button onClick={() => openModal("HealthCheck")}>Add New Health Check Entry</Button>
            <Button onClick={() => openModal("OccupationalHealthcare")}>Add New Occupational Healthcare Entry</Button>
                </div>
            );}
    return (
        <div>The patient with specified id does not excist</div>
    );
};

export default PatientInfo;