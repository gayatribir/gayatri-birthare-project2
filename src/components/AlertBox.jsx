import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AppContext } from '../context';

export default function AlertBox({show: defaultShow}) {
  const [show, setShow] = useState(defaultShow);
  const handleClose = () => setShow(false);

  const {dispatch} = useContext(AppContext);

  const handleResetGame = ()=>{
    dispatch({type: "RESET"});
  }
 

  return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Yayy!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Congratulations! Would like to try again?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Maybe, next time!
          </Button>
          <Button variant="primary" onClick={handleResetGame}>
            YES!!
          </Button>
        </Modal.Footer>
      </Modal>
  );
}
