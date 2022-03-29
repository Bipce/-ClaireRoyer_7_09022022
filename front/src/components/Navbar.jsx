import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../contexts/User";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useContext(UserContext);
  const history = useHistory();

  return (
    <nav className="navbar" style={{ height: !user && "7vh" }}>
      <Link to="/">
        <h1 className="navbar__title">Groupomania</h1>
      </Link>
      <div className="navbar__icon-pseudo">
        <Link to="/user">
          <span className="material-icons" style={{ display: !user && "none" }}>
            person
          </span>
        </Link>
        {user && (
          <>
            {user.username}
            <span
              className="material-icons logout__icon"
              onClick={() => {
                logout();
                history.push("/");
              }}
            >
              logout
            </span>
          </>
        )}

        {!user && (
          <div className="register__login">
            <Link to="/register" className="register button__style">
              S'enregister
            </Link>
            <Link className="login button__style" to="/">
              Se connecter
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
