import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import EditUser from "./pages/EditUser";
import Users from "./pages/Users";
import MessageContext from "./contexts/MessageContext";
import Posts from "./pages/Posts";
import Dashboard from "./pages/Dashboard";

function App() {
  const [message, setMessage] = useState(null);
  // Set message to null automatically after a period of time.
  useEffect(() => {
    if (message === null) return;

    const id = setTimeout(() => setMessage(null), 5000);

    // When message changes clear the queued timeout function.
    return () => clearTimeout(id);
  }, [message]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <MessageContext.Provider value={{ message, setMessage }}>
        <Router>
          <Navbar />
          <main role="main">
            <div className="container my-3">
              <Switch>
                <Route path="/users">
                  <Users />
                </Route>
                <Route path="/posts">
                  <Posts />
                </Route>
                <Route path="/edit/:username">
                  <EditUser />
                </Route>
                <Route path="/">
                  <Dashboard />
                </Route>
              </Switch>
            </div>
          </main>
          <Footer />
        </Router>
      </MessageContext.Provider>
    </div>
  );
}

export default App;
