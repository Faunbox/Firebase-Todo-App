import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { db } from "../Components/firebase";
import firebase from "firebase/app";
import { useAuth } from "../context/AuthContex";

const DataContext = createContext();

export function useData() {
  return useContext(DataContext);
}

export function DataProvider({ children }) {
  const [todos, setTodos] = useState([]);
  const [filtered, setFiltered] = useState();
  const date = new Date();
  const { currentUser } = useAuth();

  const getTodoList = useCallback(
    (userUid) => {
      db.collection(`${userUid}`)
        .orderBy("time", "desc")
        .onSnapshot((querySnapshot) => {
          setTodos(
            ...todos,
            querySnapshot.docs.map((doc) => {
              return {
                id: doc.id,
                name: doc.data().name,
                time: doc.data().time,
                // complete: doc.data().complete,
              };
            })
          );
        });
    },
    [todos]
  );

  function addTaskToDb(task) {
    return {
      id: date,
      name: task,
      complete: false,
      time: firebase.firestore.FieldValue.serverTimestamp(),
    };
  }

  function deleteTask(userUid, id) {
    db.collection(`${userUid}`)
      .doc(id)
      .delete()
      .catch((error) => console.log(error));
  }

  function editTask(userUid, id, edit) {
    db.collection(`${userUid}`).doc(id).update({ name: edit });
    setFiltered(null);
  }

  function searchTask(tasks, search) {
    setFiltered(
      tasks.filter((todo) =>
        todo.name.toLowerCase().includes(`${search.toLowerCase()}`)
      )
    );
  }

  useEffect(() => {
    currentUser !== null && getTodoList(currentUser.uid);
    // eslint-disable-next-line
  }, [currentUser]);

  const value = {
    todos,
    getTodoList,
    addTaskToDb,
    deleteTask,
    editTask,
    searchTask,
    filtered,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
