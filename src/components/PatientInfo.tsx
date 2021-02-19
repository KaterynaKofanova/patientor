import React from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import {Patient} from '../types';
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import {setPatientInfo} from '../state/reducer';
import {Icon} from 'semantic-ui-react';

const PatientInfo: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [{patientInfo}, dispatch ] = useStateValue();
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
            {patientInfo.entries ? patientInfo.entries.map(e => <div key={e.description}><p>{e.date} {e.description}</p><ul>{e.diagnosisCodes?.map(dc => <li key={dc}>{dc}</li>)}</ul></div>) : null}
        </div>
    );}
    return (
        <div>The patient with specified id does not excist</div>
    );
};

export default PatientInfo;