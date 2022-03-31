import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../contexts/User";

const UserPage = () => {
  const { logout, user } = useContext(UserContext);

  const deleteUser = async () => {
    try {
      await axios.delete("http://localhost:3001/api/users?recursive=true");
      logout();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="deletePage">
      <button
        className="button__style delete__button--user"
        onClick={deleteUser}
      >
        Supprimer son compte
      </button>
      {user.isAdmin && <></>}
    </div>
  );
};

export default UserPage;

// backend:
// add isAdmin on the me request (bellow the username field)
// add delete users/<id> route with admin permission

// front
// create admin components
