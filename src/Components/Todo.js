import React from "react";

import Form from "./Form";
import ListElements from "./ListElements";
import SearchTodos from "./SearchTodos";
import styled from "styled-components";

const TasksWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  margin: 10px auto;
  justify-content: center;
  flex-direction: column;
  height: auto;
`;

export default function Todo() {
  return (
    <>
      <TasksWrapper>
        <Form />
        <SearchTodos />
      </TasksWrapper>
      <ListElements />
    </>
  );
}
