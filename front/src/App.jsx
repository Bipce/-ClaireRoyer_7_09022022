import TopicsPage from "./pages/TopicsPage";
import { Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TopicPage from "./pages/TopicPage";

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
      </Switch>
    </Router>
  );
};

export default App;
