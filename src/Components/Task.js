import React from "react";

export default function Task({ todo }) {
  return (
    <p className="my-2" key={todo.id}>
      {todo.name}
    </p>
  );
}
