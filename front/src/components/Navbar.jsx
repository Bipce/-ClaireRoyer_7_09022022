import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../contexts/User";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useContext(UserContext);
  const history = useHistory();

  if (!user) {
    history.push("/register");
  }
  return (
    <nav className="navbar">
      <h1 className="navbar__title">Groupomania</h1>
      <div className="navbar__icon-pseudo">
        <span className="material-icons">person</span>
        <p
          className="navbar__username"
          onClick={() => {
            logout();
            history.push("/");
          }}
        >
          {user && user.username}
        </p>
      </div>
    </nav>
  );
};

export default Navbar;
