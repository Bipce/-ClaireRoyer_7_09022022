import TopicsPage from "./pages/TopicsPage";
import { Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TopicPage from "./pages/TopicPage";
import Message from "./components/Message";

const App = () => {
  return (
    <Router>
      <Link to="/">
        <Navbar />
      </Link>
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
    </Router>
  );
};

export default App;
