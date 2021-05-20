import React, { useEffect, useState } from "react";

import { db } from "./firebase";
import { useAuth } from "../context/AuthContex";

import Form from "./Form";
import ListElements from "./ListElements";
import SearchTodos from "./SearchTodos";

export default function Todo() {
  const [todos, setTodos] = useState([]);
  const { currentUser } = useAuth();

  async function getTodoList() {
    await db
      .collection(`${currentUser.uid}`)
      .orderBy("time", "desc")
      .onSnapshot((querySnapshot) => {
        setTodos(
          ...todos,
          querySnapshot.docs.map((doc) => {
            return {
              id: doc.id,
              name: doc.data().name,
              time: doc.data().time,
              complete: doc.data().complete,
            };
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
      <SearchTodos tasks={todos} />
      <ListElements tasks={todos} />
    </>
  );
}
