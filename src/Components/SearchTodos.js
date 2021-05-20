import React, { useState } from "react";
import Form from "react-bootstrap/Form";
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

export default function SearchTodos({ tasks }) {
  const [search, setSearch] = useState("");

  let filtered = tasks.filter((todo) =>
    todo.name.toLowerCase().includes(`${search.toLowerCase()}`)
  );

  return (
    <TasksWrapper>
      <Form className="text-center m-5 w-100">
        <Form.Group>
          <Form.Label>Wyszukaj zadanie</Form.Label>
          <Form.Control
            type="text"
            placeholder="Wyszukaj zadanie"
            className="text-center"
            onChange={(e) => {
              setSearch(e.target.value);
              console.log(filtered);
            }}
          />
        </Form.Group>
      </Form>
    </TasksWrapper>
  );
}
