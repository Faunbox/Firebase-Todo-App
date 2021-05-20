import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { db } from "./firebase";
import { useAuth } from "../context/AuthContex";

export default function EditModal({ todo, open, setOpen }) {
  const { currentUser } = useAuth();
  const [edit, setEdit] = useState("");

  async function editTask(id) {
    db.collection(`${currentUser.uid}`).doc(id).update({ name: edit });
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
              onChange={(e) => setEdit(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleClose}>
          Zamknij
        </Button>
        <Button
          disabled={edit.length < 3}
          variant="primary"
          onClick={() => editTask(todo.id)}
        >
          Zapisz
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
