import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { db } from "./firebase";
import { useAuth } from "../context/AuthContex";
import styled from "styled-components";

const TasksWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  margin: 0 auto;
  justify-content: center;
  flex-direction: column;
  height: auto;
`;

export default function TaskForm() {
  const [todo, setTodo] = useState("");
  const { currentUser } = useAuth();
  const date = new Date();

  function addTaskToDb(task) {
    return { id: date.toString(), name: task, complete: false };
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
    <TasksWrapper>
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
          <Button className="my-3" type="submit">
            Dodaj zadanie
          </Button>
        </Form.Group>
      </Form>
    </TasksWrapper>
  );
}
