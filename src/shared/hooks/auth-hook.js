import { useState, useEffect, useCallback, useRef } from "react";

export const useAuth = () => {
  const [userId, setUserid] = useState();
  const [token, setToken] = useState();
  const [email, setEmail] = useState();
  const [tokenExpDate, setTokenExpDate] = useState();
  const logoutTimer = useRef();

  const login = useCallback((uid, token, email, expirationDate) => {
    setUserid(uid);
    setToken(token);
    setEmail(email);

    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);

    setTokenExpDate(tokenExpirationDate);

    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token,
        email,
        expiration: tokenExpirationDate.toISOString()
      })
    );
  }, []);

  const logout = useCallback(() => {
    setUserid(null);
    setToken(null);
    setEmail(null);
    setTokenExpDate(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));

    if (
      userData &&
      userData.token &&
      new Date(userData.expiration) > new Date()
    ) {
      login(
        userData.id,
        userData.token,
        userData.email,
        new Date(userData.expiration)
      );
    }
  }, [login]);

  useEffect(() => {
    if (token && tokenExpDate) {
      const ramainingTime = tokenExpDate.getTime() - new Date().getTime();
      logoutTimer.current = setTimeout(logout, ramainingTime);
    } else {
      clearTimeout(logoutTimer.current);
    }
  }, [token, logout, tokenExpDate]);

  return {
    userId,
    email,
    token,
    login,
    logout
  };
};
