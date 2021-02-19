import React from 'react';
import {HospitalEntry} from '../types';
import {Container, Icon, Card} from 'semantic-ui-react';

const Hospital: React.FC<{entry: HospitalEntry}> = ({entry}) => {
    return(
        <Container>
            <Card fluid color='red'>
            <h2>{entry.date}<Icon name='doctor'/></h2>
            <p>{entry.description}</p>
            <p>Patient was discharged {entry.discharge.date}</p>
            <p>{entry.discharge.criteria}</p>
            </Card>
        </Container>
    );
};
export default Hospital;