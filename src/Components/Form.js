import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function TaskForm() {
  function handleSubmit(e) {
    e.preventDefault();
    console.log("działa");
  }

  return (
    <Form type="submit" onSubmit={handleSubmit} className="text-center m-5">
      <Form.Group>
        <Form.Label>Co trzeba zrobić?</Form.Label>
        <Form.Control type="text" placeholder="Wpisz nowe zadanie" />
      </Form.Group>
      <Button type="submit">Dodaj zadanie</Button>
    </Form>
  );
}
