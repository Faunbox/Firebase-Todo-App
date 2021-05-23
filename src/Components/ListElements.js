import React from "react";

import Task from "./Task";

import styled from "styled-components";
import { useData } from "../context/DataContext";

const TasksWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  justify-content: center;
  flex-direction: column;
  height: auto;
`;

function ListElements() {
  const { todos, filtered } = useData();

  return (
    <TasksWrapper>
      {filtered
        ? filtered.map((task) => <Task key={task.id} todo={task} />)
        : todos.map((task) => <Task key={task.id} todo={task} />)}
    </TasksWrapper>
  );
}

export default ListElements;
