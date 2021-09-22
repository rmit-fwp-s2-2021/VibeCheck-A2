import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import MyProfile from "./pages/MyProfile";
import Forum from "./pages/Forum";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import { getUser, removeUser } from "./data/repository";
import Register from "./pages/Register";
import EditProfile from "./pages/EditPofile";


function App() {
  const [user, setUser] = useState(getUser());

  const loginUser = (user) => {
    setUser(user);
  };

  const logoutUser = () => {
    removeUser();
    setUser(null);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Router>
        <Navbar user={user} logoutUser={logoutUser} />
        <main role="main">
          <div className="container my-3">
            <Switch>
              <Route path="/login">
                <Login loginUser={loginUser} />
              </Route>
              <Route path="/register">
                <Register loginUser={loginUser} />
              </Route>
              <Route path="/profile">
                <MyProfile user={user} logoutUser={logoutUser}/>
              </Route>
              <Route path="/forum">
                <Forum user={user} />
              </Route>
              <Route path="/editProfile">
                <EditProfile user={user} />
              </Route>
              <Route path="/">
                <Home user={user} />
              </Route>
            </Switch>
          </div>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
