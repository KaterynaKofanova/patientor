import React from 'react';
import {Entry} from '../types';
import Hospital from './Hospital';
import HealthCheck from './HealthCheck';
import Occupational from './Occupational';

const PatientEntry: React.FC<{entry: Entry}> = ({entry}) => {
    const assertNever = (value: never): never => {
        throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
    };
    switch(entry.type){
        case "Hospital":
            return <Hospital entry={entry}/>;
        case "HealthCheck":
            return <HealthCheck entry={entry}/>;
        case "OccupationalHealthcare":
            return <Occupational entry={entry}/>;
        default:
            return assertNever(entry);
    }

};
export default PatientEntry;