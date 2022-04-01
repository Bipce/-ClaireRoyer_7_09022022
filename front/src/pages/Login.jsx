import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../contexts/User";
import useForm from "../hooks/useForm";
import "./Login.css";
import "../styles/form.css";

const Login = () => {
  const initialState = { email: "", password: "" };
  const [state, handleChange] = useForm(initialState);
  const { login } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER}/api/auth/login`,
        state
      );
      login(response.data.token, response.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleLogin} className="login__form">
      <label htmlFor="email">Votre email</label>
      <input
        type="text"
        id="email"
        value={state.email}
        onChange={handleChange}
      />
      <label htmlFor="email">Votre mot de passe</label>
      <input
        type="password"
        id="password"
        value={state.password}
        onChange={handleChange}
      />
      <button type="submit" className="button__style login__button">
        Se connecter
      </button>
    </form>
  );
};

export default Login;
