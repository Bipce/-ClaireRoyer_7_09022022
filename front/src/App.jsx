import TopicsPage from "./pages/TopicsPage";
import { Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TopicPage from "./pages/TopicPage";
import Message from "./components/Message";
import Login from "./components/Login";
import { useContext } from "react";
import { UserContext } from "./contexts/User";

const App = () => {
  const user = useContext(UserContext);

  let routes;

  if (user) {
    routes = (
      <Switch>
        <Route exact path="/">
          <TopicsPage />
        </Route>
        <Route path="/topic/:id">
          <TopicPage />
        </Route>
        <Route>
          <Message path="/topic:id/messages" />
        </Route>
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route exact path="/" component={Login} />
      </Switch>
    );
  }

  return (
    <Router>
      <Link to="/">
        <Navbar />
      </Link>
      {routes}
    </Router>
  );
};

export default App;
