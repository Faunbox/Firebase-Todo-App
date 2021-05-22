import React from "react";

import Form from "./Form";
import ListElements from "./ListElements";
import SearchTodos from "./SearchTodos";

export default function Todo() {
  return (
    <>
      <Form />
      <SearchTodos />
      <ListElements />
    </>
  );
}
