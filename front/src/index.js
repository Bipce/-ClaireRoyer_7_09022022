import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import TopicPage from "./pages/TopicPage";
import MessagePage from "./pages/MessagePage";
// import Test from "./pages/Test";
import "./styles/index.css";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/">
          <Navbar />
        </Route>
        <Route path="/topic">
          <TopicPage />
        </Route>
        <Route path="/message">
          <MessagePage />
        </Route>
        {/* <Route path="/test/:questionNumber">
          <Test />
        </Route> */}
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
