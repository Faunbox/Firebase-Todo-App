import React, { useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { db } from "./firebase";
import { useAuth } from "../context/AuthContex";

export default function EditModal({ todo, open, setOpen }) {
  const { currentUser } = useAuth();
  const editRef = useRef(null);

  async function editTask(id) {
    db.collection(`${currentUser.uid}`)
      .doc(id)
      .update({ name: editRef.current.value });
    handleClose();
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <Modal show={open} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{todo.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            editTask(todo.id);
          }}
        >
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Nowa treść zadania"
              ref={editRef}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={() => editTask(todo.id)}>
          Save changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
