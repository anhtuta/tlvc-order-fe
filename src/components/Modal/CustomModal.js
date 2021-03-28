import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types';

const CustomModal = (props) => {
  const { className, affirmText, cancelText } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>{props.children}</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            {affirmText}
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            {cancelText}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

CustomModal.propTypes = {
  data: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired,
  onFetchData: PropTypes.func
};
export default CustomModal;
