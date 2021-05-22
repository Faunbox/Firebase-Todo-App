import React, { useState } from "react";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import EditModal from "./EditModal";
import { useAuth } from "../context/AuthContex";
import { useData } from "../context/DataContext";

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
  const [open, setOpen] = useState(false);
  const { currentUser } = useAuth();
  const { deleteTask } = useData();

  function handleOpen() {
    setOpen(true);
  }
  return (
    <>
      <TasksWrapper>
        <p className="my-auto" key={todo.id}>
          {todo.name}
        </p>
        <Button variant="secondary" className="mx-2" onClick={handleOpen}>
          Edytuj
        </Button>
        <Button
          variant="danger"
          className="mx-2"
          onClick={() => deleteTask(currentUser.uid, todo.id)}
        >
          Usuń
        </Button>
      </TasksWrapper>
      <EditModal todo={todo} open={open} setOpen={setOpen} />
    </>
  );
}
