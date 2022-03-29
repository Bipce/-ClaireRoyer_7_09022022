import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../contexts/User";

const UserPage = () => {
  const { logout } = useContext(UserContext);

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
    </div>
  );
};

export default UserPage;
