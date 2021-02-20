import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddEntryForm from './AddEntryForm';
import { NewEntry} from "../types";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: NewEntry) => void;
  type:  "HealthCheck" | "OccupationalHealthcare" | "Hospital";
  error?: string;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error, type }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddEntryForm onSubmit={onSubmit} onCancel={onClose} type={type}/>
    </Modal.Content>
  </Modal>
);

export default AddEntryModal;