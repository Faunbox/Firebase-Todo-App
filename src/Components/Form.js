import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Containter from "react-bootstrap/Container";
import { db } from "./firebase";
import { useAuth } from "../context/AuthContex";

export default function TaskForm() {
  const [todo, setTodo] = useState("");
  const { currentUser } = useAuth();

  function addTaskToDb(task) {
    return { id: Date.now(), name: task, complete: false };
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (todo.length >= 3) {
      const task = addTaskToDb(todo);
      db.collection(`${currentUser.uid}`).add(task);
      setTodo("");
    } else alert("Zadanie ma poniżej 3 znaków!");
  }

  return (
    <Containter className="d-flex align-items-center justify-content-center">
      <Form
        type="submit"
        onSubmit={handleSubmit}
        className="text-center m-5 w-100"
      >
        <Form.Group>
          <Form.Label>Co trzeba zrobić?</Form.Label>
          <Form.Control
            type="text"
            placeholder="Wpisz nowe zadanie"
            className="text-center w-100"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
        </Form.Group>
        <Button type="submit">Dodaj zadanie</Button>
      </Form>
    </Containter>
  );
}
