import React from 'react';
import {HealthCheckEntry} from '../types';
import {Container, Icon, Card} from 'semantic-ui-react';
import HealthRatingBar from './HealthRatingBar';

const HealthCheck: React.FC<{entry: HealthCheckEntry}> = ({entry}) => {
    return(
        <Container >
            <Card fluid color='green'>
            <h2>{entry.date}<Icon name='calendar check outline'/></h2>
            <p>{entry.description}</p>
            <HealthRatingBar rating={entry.healthCheckRating} showText={true}/>
            </Card>
        </Container>
    );
};
export default HealthCheck;