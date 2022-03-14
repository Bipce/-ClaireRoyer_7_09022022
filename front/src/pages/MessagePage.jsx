import Message from "../components/Message";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const MessagePage = () => {
  return (
    <div>
      <Link to="/">
        <Navbar />
      </Link>
      <Message />
      <Link to="/topic">
        <button className="button--return">Retour</button>
      </Link>
    </div>
  );
};

export default MessagePage;

// Message with ID.
