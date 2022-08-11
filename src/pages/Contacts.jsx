import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Form from "../components/Form";

const Contact = () => {
  const [show, setShow] = useState(false);
  const [stateFromChild, setStateFromChild] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  console.log("stateFromChild =>", stateFromChild);

  return (
    <>
      <h3>this is the contact </h3>
      <Form />
      <h3>this is contact hi {stateFromChild.title} </h3>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Contact Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            handleClose={handleClose}
            ronsProps="Call it My form"
            aliciasProps={["music", "food"]}
            setStateFromChild={setStateFromChild}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};
