import React, { useEffect, useState } from "react";

import { db } from "./firebase";
import { useAuth } from "../context/AuthContex";

import Form from "./Form";
import ListElements from "./ListElements";

export default function Todo() {
  const [todos, setTodos] = useState([]);
  const { currentUser } = useAuth();

  async function getTodoList() {
    await db.collection(`${currentUser.uid}`).onSnapshot((querySnapshot) => {
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
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Form />
      <ListElements tasks={todos} />
    </>
  );
}
