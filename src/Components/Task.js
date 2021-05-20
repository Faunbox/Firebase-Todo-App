import React, { useState } from "react";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import EditModal from "./EditModal";
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
  const [open, setOpen] = useState(false);

  async function deleteTask(id) {
    db.collection(`${currentUser.uid}`)
      .doc(id)
      .delete()
      .catch((error) => console.log(error));
  }

  function handleOpen() {
    setOpen(true);
    console.log(todo);
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
          onClick={() => deleteTask(todo.id)}
        >
          Usuń
        </Button>
      </TasksWrapper>
      <EditModal todo={todo} open={open} setOpen={setOpen} />
    </>
  );
}
