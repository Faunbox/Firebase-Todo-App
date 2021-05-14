import React, { Suspense } from "react";
import { GlobalStyles } from "./global/GlobalStyles";
import PrivateRoute from "./Components/PrivateRoute";
import { AuthProvider } from "./context/AuthContex";
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
        <GlobalStyles />
        <AuthProvider>
          <Navigate />
          <Switch>
            <Suspense fallback={<div>Wczytywanie...</div>}>
              <PrivateRoute exact path="/" component={Todo} />
              <Route path="/rejestracja" component={SignUp} />
              <Route path="/logowanie" component={LogIn} />
              <Route path="/reset-hasla" component={ForgotPassword} />
            </Suspense>
          </Switch>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
