import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { db } from "./firebase";
import { useAuth } from "../context/AuthContex";
import { useData } from "../context/DataContext";
import styled from "styled-components";

const StyledForm = styled(Form)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  width: 100%;
  background-color: none;
  border-radius: 0;
  -webkit-appearance: none;
`;

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
    <StyledForm type="submit" onSubmit={handleSubmit}>
      <Form.Group className="d-flex flex-column align-items-center justify-content-center w-100">
        <Form.Label>Co trzeba zrobić?</Form.Label>
        <Form.Control
          type="text"
          placeholder="Wpisz nowe zadanie"
          className="text-center w-75"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <Button disabled={todo.length < 3} className="my-3" type="submit">
          Dodaj zadanie
        </Button>
      </Form.Group>
    </StyledForm>
  );
}
