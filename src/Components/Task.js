import React, { useRef } from "react";
import Button from "react-bootstrap/Button";
import styled from "styled-components";
import { db } from "./firebase";
import { useAuth } from "../context/AuthContex";

const TasksWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 2rem auto;
  justify-content: center;
  flex-direction: row;
  height: auto;
  text-align: center;
`;

export default function Task({ todo }) {
  const { currentUser } = useAuth();
  const taskRef = useRef(null);

  async function deleteTask() {
    console.log("działa");
  }

  return (
    <>
      <TasksWrapper>
        <p className="my-auto" ref={taskRef} id={todo.id} key={todo.id}>
          {todo.name}
        </p>
        <Button variant="warning" className="mx-2" onClick={deleteTask}>
          Edytuj
        </Button>
        <Button variant="danger" className="mx-2" onClick={deleteTask}>
          Usuń
        </Button>
      </TasksWrapper>
    </>
  );
}
