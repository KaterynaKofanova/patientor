import React from 'react';
import {OccupationalHealthcareEntry} from '../types';
import {Container, Icon, Card} from 'semantic-ui-react';

const Occupational: React.FC<{entry: OccupationalHealthcareEntry}> = ({entry}) => {
    return(
        <Container>
            <Card fluid color='blue'>
            <h2>{entry.date}<Icon name='suitcase'/>{entry.employerName}</h2>
            <p>{entry.description}</p>
            {entry.sickLeave ? <p>Sick leave from {entry.sickLeave.startDate} to {entry.sickLeave.endDate}</p> : null}
            </Card>
        </Container>
    );
};
export default Occupational;