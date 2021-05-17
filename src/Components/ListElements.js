import React from "react";

import Task from "./Task";

import styled from "styled-components";

const TasksWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 2rem auto;
  justify-content: center;
  flex-direction: column;
  height: auto;
`;

function ListElements({ tasks }) {
  return (
    <TasksWrapper>
      {tasks.map((task) => (
        <Task key={task.id} todo={task} />
      ))}
    </TasksWrapper>
  );
}

export default ListElements;
