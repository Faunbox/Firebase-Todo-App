import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useAuth } from "../context/AuthContex";
import { useData } from "../context/DataContext";

export default function EditModal({ todo, open, setOpen }) {
  const { currentUser } = useAuth();
  const [edit, setEdit] = useState("");
  const { editTask } = useData();

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
            editTask(currentUser.uid, todo.id, edit);
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
