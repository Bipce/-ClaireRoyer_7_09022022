import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="navbar__title">Groupomania</h1>
      <div className="navbar__icon-pseudo">
        <span className="material-icons">person</span>
        <p className="navbar__username">Username</p>
      </div>
    </nav>
  );
};

export default Navbar;
