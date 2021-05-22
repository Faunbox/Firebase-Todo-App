import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useData } from "../context/DataContext";

export default function SearchTodos() {
  const { todos, searchTask } = useData();

  return (
    <Form className="text-center my-3 w-100">
      <Form.Group className="d-flex align-items-center justify-content-center flex-column">
        <Form.Label>Wyszukaj zadanie</Form.Label>
        <Form.Control
          type="text"
          placeholder="Wyszukaj zadanie"
          className="text-center w-50"
          onChange={(e) => {
            searchTask(todos, e.target.value);
          }}
        />
      </Form.Group>
    </Form>
  );
}
