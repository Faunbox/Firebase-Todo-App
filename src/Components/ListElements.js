import React, { useEffect } from "react";

import Task from "./Task";

import Containter from "react-bootstrap/Container";

function ListElements({ tasks, updateTodos }) {
  return (
    <Containter className="d-flex align-items-center justify-content-center flex-column my-4">
      {tasks.map((task) => (
        <Task key={task.id} todo={task} />
      ))}
    </Containter>
  );
}

export default ListElements;
