import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [check, setCheck] = useState();
  const [user, setUser] = useState();

  const tokenKey = "token";
  const tokenHeaderKey = "Authorization";

  const login = (token, user) => {
    user.token = token;
    setUser(user);
    localStorage.setItem(tokenKey, token);
    axios.defaults.headers.common[tokenHeaderKey] = `Bearer ${token}`;
  };

  const logout = () => {};

  useEffect(() => {
    const token = localStorage.getItem(tokenKey);

    if (token) {
      (async () => {
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
        } catch (error) {}
        setCheck(true);
      })();
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {check && children}
    </UserContext.Provider>
  );
};
