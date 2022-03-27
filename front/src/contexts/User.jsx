import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [check, setCheck] = useState();
  const [user, setUser] = useState(null);

  const tokenKey = "token";
  const tokenHeaderKey = "Authorization";

  const login = (token, user) => {
    user.token = token;
    setUser(user);
    localStorage.setItem(tokenKey, token);
    axios.defaults.headers.common[tokenHeaderKey] = `Bearer ${token}`;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(tokenKey);
    axios.defaults.headers.common[tokenHeaderKey] = null;
  };

  useEffect(() => {
    const token = localStorage.getItem(tokenKey);

    (async () => {
      if (token) {
        try {
          const response = await axios.get(
            "http://localhost:3001/api/users/me",
            {
              headers: {
                [tokenHeaderKey]: `Bearer ${token}`,
              },
            }
          );
          login(token, response.data);
        } catch (error) {
          if (error) logout();
        }
      }
      setCheck(true);
    })();
  }, []);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {check && children}
    </UserContext.Provider>
  );
};
