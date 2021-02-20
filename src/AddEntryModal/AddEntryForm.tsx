import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form} from "formik";

import { TextField, NumberField, DiagnosisSelection} from "../AddPatientModal/FormField";
import { NewEntry} from "../types";
import {useStateValue} from '../state/state';

interface Props {
    onSubmit: (values: NewEntry) => void;
    onCancel: () => void;
    type: "HealthCheck" | "OccupationalHealthcare" | "Hospital";
}

const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel, type }) => {
    const [{ diagnoses }] = useStateValue();
    switch(type){
        case "HealthCheck":
            return(<Formik initialValues={{
                description: '',
                date: '',
                specialist: '',
                diagnosisCodes: [],
                type: "HealthCheck",
                healthCheckRating: 0
              }}
              onSubmit={onSubmit}
              validate={values => {
                const requiredError = "Field is required";
                const errors: { [field: string]: string } = {};
                if (!values.description) {
                        errors.description = requiredError;
                }
                if (!values.date) {
                    errors.date = requiredError;
                }
                if (!values.specialist) {
                    errors.specialist = requiredError;
                }
                return errors;
              }}
              >
            {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
                return(
                    <Form className="form ui">
                        <Field
                            label="Type"
                            placeholder="Type"
                            name="type"
                            component={TextField}
                        />
                        <Field
                            label="Date"
                            placeholder="Date"
                            name="date"
                            component={TextField}
                        />
                        <Field
                            label="Description"
                            placeholder="Description"
                            name="description"
                            component={TextField}
                        />
                        <Field
                            label="Specialist"
                            placeholder="Specialist"
                            name="specialist"
                            component={TextField}
                        />
                        <Field
                            label="healthCheckRating"
                            name="healthCheckRating"
                            component={NumberField}
                            min={0}
                            max={3}
                            />
                        <DiagnosisSelection
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            diagnoses={Object.values(diagnoses)}
                        />
                        <Grid>
                            <Grid.Column floated="left" width={5}>
                                <Button type="button" onClick={onCancel} color="red">
                                    Cancel
                                </Button>
                            </Grid.Column>
                            <Grid.Column floated="right" width={5}>
                                <Button
                                    type="submit"
                                    floated="right"
                                    color="green"
                                    disabled={!dirty || !isValid}
                                >
                                Add
                                </Button>
                            </Grid.Column>
                        </Grid>
                    </Form>
                );
            }}
        
            </Formik>
            );
        case "OccupationalHealthcare":
            return(<Formik initialValues={{
                description: '',
                date: '',
                specialist: '',
                diagnosisCodes: [],
                type: "OccupationalHealthcare",
                employerName:'',
                sickLeave:{
                    startDate:'',
                    endDate: ''
                }
              }}
              onSubmit={onSubmit}
              validate={values => {
                const requiredError = "Field is required";
                const errors: { [field: string]: string } = {};
                if (!values.description) {
                        errors.description = requiredError;
                }
                if (!values.date) {
                    errors.date = requiredError;
                }
                if (!values.specialist) {
                    errors.specialist = requiredError;
                }
                if(values.type==='OccupationalHealthcare' && !values.employerName){
                    errors.employerName = requiredError;
                }
                return errors;
              }}
              >
            {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
                return(
                    <Form className="form ui">
                        <Field
                            label="Type"
                            placeholder="Type"
                            name="type"
                            component={TextField}
                        />
                        <Field
                            label="Date"
                            placeholder="Date"
                            name="date"
                            component={TextField}
                        />
                        <Field
                            label="Description"
                            placeholder="Description"
                            name="description"
                            component={TextField}
                        />
                        <Field
                            label="Specialist"
                            placeholder="Specialist"
                            name="specialist"
                            component={TextField}
                        />
                        <Field
                            label="Employer Name"
                            placeholder="Employer Name"
                            name="employerName"
                            component={TextField}
                        />
                        <Field
                            label="Start Date of Sick Leave"
                            placeholder="Start Date of Sick Leave"
                            name="sickLeave.startDate"
                            component={TextField}
                        />
                        <Field
                            label="End Date of Sick Leave"
                            placeholder="End Date of Sick Leave"
                            name="sickLeave.endDate"
                            component={TextField}
                        />
                        <DiagnosisSelection
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            diagnoses={Object.values(diagnoses)}
                        />
                        <Grid>
                            <Grid.Column floated="left" width={5}>
                                <Button type="button" onClick={onCancel} color="red">
                                    Cancel
                                </Button>
                            </Grid.Column>
                            <Grid.Column floated="right" width={5}>
                                <Button
                                    type="submit"
                                    floated="right"
                                    color="green"
                                    disabled={!dirty || !isValid}
                                >
                                Add
                                </Button>
                            </Grid.Column>
                        </Grid>
                    </Form>
                );
            }}
        
            </Formik>
            );
        case "Hospital":
            return(<Formik initialValues={{
                description: '',
                date: '',
                specialist: '',
                diagnosisCodes: [],
                type: "Hospital",
                discharge:{
                    date: '',
                    criteria: ''
                }
              }}
              onSubmit={onSubmit}
              validate={values => {
                const requiredError = "Field is required";
                const errors: { [field: string ]: string } = {};
                if (!values.description) {
                        errors.description = requiredError;
                }
                if (!values.date) {
                    errors.date = requiredError;
                }
                if (!values.specialist) {
                    errors.specialist = requiredError;
                }
                return errors;
              }}
              >
            {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
                return(
                    <Form className="form ui">
                        <Field
                            label="Type"
                            placeholder="Type"
                            name="type"
                            component={TextField}
                        />
                        <Field
                            label="Date"
                            placeholder="Date"
                            name="date"
                            component={TextField}
                        />
                        <Field
                            label="Description"
                            placeholder="Description"
                            name="description"
                            component={TextField}
                        />
                        <Field
                            label="Specialist"
                            placeholder="Specialist"
                            name="specialist"
                            component={TextField}
                        />
                        <Field
                            label="Discharge Date"
                            placeholder="Discharge Date"
                            name="discharge.date"
                            component={TextField}
                        />
                        <Field
                            label="Discharge Criteria"
                            placeholder="Discharge Criteria"
                            name="discharge.criteria"
                            component={TextField}
                        />
                        <DiagnosisSelection
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            diagnoses={Object.values(diagnoses)}
                        />
                        <Grid>
                            <Grid.Column floated="left" width={5}>
                                <Button type="button" onClick={onCancel} color="red">
                                    Cancel
                                </Button>
                            </Grid.Column>
                            <Grid.Column floated="right" width={5}>
                                <Button
                                    type="submit"
                                    floated="right"
                                    color="green"
                                    disabled={!dirty || !isValid}
                                >
                                Add
                                </Button>
                            </Grid.Column>
                        </Grid>
                    </Form>
                );
            }}
        
            </Formik>
            );
    }
    

};

export default AddEntryForm;