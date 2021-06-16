import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import MainPage from "./MainPage";
import "../styles/index.css";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import * as auth from "../utils/auth";
import api from "../utils/api.js";

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [currentUserEmail, setCurrentUserEmail] = React.useState("");

  const history = useHistory();

  const handleLoggedIn = ({ email }) => {
    setLoggedIn(true);
    setCurrentUserEmail(email);
    history.replace("/");
  };

  const handleRegister = () => {
    history.replace("/sign-in");
  };

  React.useEffect(() => {
    const intialToken = localStorage.getItem("jwt");
    if (intialToken) {
      auth
        .checkToken(intialToken)
        .then((responce) => {
          setLoggedIn(true)
          setCurrentUserEmail(responce.data.email);
          history.replace('/')
        })
        .catch(() => {
          localStorage.removeItem("jwt");
          setLoggedIn(false);
          setCurrentUserEmail("");
        })
    }
  }, []);

  React.useEffect(() => {
    api
      .getMyInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <CurrentUserContext.Provider
      value={{ ...currentUser, email: currentUserEmail }}
    >
      <Switch>
          <ProtectedRoute
            path="/"
            exact
            loggedIn={loggedIn}
            component={MainPage}
            onCurrentUserDataChange={setCurrentUser}
          />
        <Route path="/sign-up">
          <Register onRegister={handleRegister} />
        </Route>
        <Route path="/sign-in">
          <Login onLoggedIn={handleLoggedIn} />
        </Route>
      </Switch>
    </CurrentUserContext.Provider>
  );
}

export default App;
