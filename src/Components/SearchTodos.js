import React from "react";
import Form from "react-bootstrap/Form";
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

export default function SearchTodos() {
  const { todos, searchTask } = useData();

  return (
    <StyledForm>
      <Form.Group className="d-flex align-items-center justify-content-center flex-column w-100">
        <Form.Label>Wyszukaj zadanie</Form.Label>
        <Form.Control
          type="text"
          placeholder="Wyszukaj zadanie"
          className="text-center w-75"
          onChange={(e) => {
            searchTask(todos, e.target.value);
          }}
        />
      </Form.Group>
    </StyledForm>
  );
}
