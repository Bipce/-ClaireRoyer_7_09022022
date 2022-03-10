import Navbar from "../components/Navbar";
import Topic from "../components/Topic";
import Message from "../components/Message";
import { Link } from "react-router-dom";

const TopicPage = () => {
  return (
    <>
      <Link to="/">
        <Navbar />
      </Link>
      <Topic />
      <Link to="message">
        <Message />
      </Link>
    </>
  );
};

export default TopicPage;
