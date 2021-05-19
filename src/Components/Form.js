import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { db } from "./firebase";
import firebase from "firebase/app";
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
    return {
      id: date,
      name: task,
      complete: false,
      time: firebase.firestore.FieldValue.serverTimestamp(),
    };
  }

  function handleSubmit(e) {
    e.preventDefault();

    const task = addTaskToDb(todo);
    db.collection(`${currentUser.uid}`).add(task);
    setTodo("");
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
          <Button disabled={todo.length < 3} className="my-3" type="submit">
            Dodaj zadanie
          </Button>
        </Form.Group>
      </Form>
    </TasksWrapper>
  );
}
