import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { db } from "./firebase";
import { useAuth } from "../context/AuthContex";
import { useData } from "../context/DataContext";

export default function TaskForm() {
  const [todo, setTodo] = useState("");
  const { currentUser } = useAuth();
  const { addTaskToDb } = useData();

  function handleSubmit(e) {
    e.preventDefault();

    const task = addTaskToDb(todo);
    db.collection(`${currentUser.uid}`).add(task);
    setTodo("");
  }

  return (
    <Form type="submit" onSubmit={handleSubmit} className="text-center w-100">
      <Form.Group className="d-flex align-items-center justify-content-center flex-column">
        <Form.Label>Co trzeba zrobić?</Form.Label>
        <Form.Control
          type="text"
          placeholder="Wpisz nowe zadanie"
          className="text-center"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <Button disabled={todo.length < 3} className="my-3" type="submit">
          Dodaj zadanie
        </Button>
      </Form.Group>
    </Form>
  );
}
