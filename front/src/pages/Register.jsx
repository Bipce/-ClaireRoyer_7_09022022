import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../contexts/User";
import useForm from "../hooks/useForm";
import "./Register.css";
import "../styles/form.css";

const Register = () => {
  const initialState = { email: "", password: "", username: "" };
  const [state, handleChange] = useForm(initialState);
  const { login } = useContext(UserContext);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/signup",
        state
      );
      console.log(response);
      login(response.data.token, response.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h1 className="registerTitle">Créer un compte</h1>

      <label htmlFor="username">Nom d'utilisateur</label>
      <input
        type="text"
        id="username"
        value={state.username}
        onChange={handleChange}
        required
      />

      <label htmlFor="email">Adresse email</label>
      <input
        type="email"
        id="email"
        value={state.email}
        onChange={handleChange}
        required
      />

      <label htmlFor="password">Créer votre mot de passe</label>
      <input
        type="password"
        id="password"
        minLength="8"
        maxLength="15"
        value={state.password}
        onChange={handleChange}
        required
      />

      <button type="submit" className="button__style register__button">
        S'enregistrer
      </button>
    </form>
  );
};

export default Register;
