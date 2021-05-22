import React, { Suspense } from "react";
import PrivateRoute from "./Components/PrivateRoute";
import { AuthProvider } from "./context/AuthContex";
import { DataProvider } from "./context/DataContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// eslint-disable-next-line
import firebase from "./Components/firebase";

import Todo from "./Components/Todo";
import Navigate from "./Components/Navigate";

const SignUp = React.lazy(() => import("./Components/Signup"));
const LogIn = React.lazy(() => import("./Components/LogIn"));
const ForgotPassword = React.lazy(() => import("./Components/ForgotPassword"));

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <DataProvider>
            <Navigate />
            <Switch>
              <Suspense fallback={<div>Wczytywanie...</div>}>
                <PrivateRoute exact path="/" component={Todo} />
                <Route path="/rejestracja" component={SignUp} />
                <Route path="/logowanie" component={LogIn} />
                <Route path="/reset-hasla" component={ForgotPassword} />
              </Suspense>
            </Switch>
          </DataProvider>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
