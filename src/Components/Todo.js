import React, { useEffect, useState } from "react";

import { db } from "./firebase";
import { useAuth } from "../context/AuthContex";

import Form from "./Form";
import ListElements from "./ListElements";

export default function Todo() {
  const [todos, setTodos] = useState([]);
  const { currentUser } = useAuth();

  async function getTodoList() {
    await db
      .collection(`${currentUser.uid}`)
      .get()
      .then((querySnapshot) => {
        setTodos(
          ...todos,
          querySnapshot.docs.map((doc) => {
            return doc.data();
          })
        );
      });
  }

  useEffect(() => {
    getTodoList();
  }, []);

  return (
    <>
      <Form updateTodos={getTodoList} />
      <ListElements tasks={todos} updateTodos={getTodoList} />
    </>
  );
}
