import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Footer from './components/Footer';
import Navbar from "./components/Navbar";
import Users from "./pages/Users";

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Router>
        <Navbar />
        <main role="main">
          <div className="container my-3">
            <Switch>
              <Route path="/users" >
                <Users />
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
