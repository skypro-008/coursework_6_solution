import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  let [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  let [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null
  );
  let [loading, setLoading] = useState(true);

  const history = useHistory();
  //login
  let loginUser = async (e) => {
    e.preventDefault();
    let response = await fetch("http://127.0.0.1:8000/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: e.target.email.value,
        password: e.target.password.value,
      }),
    });
    let data = await response.json();

    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      history.push("/");
      window.location.reload();
    } else {
      alert("Something went wrong!");
    }
  };
  //registration
  let register = async (e) => {
    e.preventDefault();
    let response = await fetch("http://127.0.0.1:8000/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: e.target.email.value,
        password: e.target.password.value,
        first_name: e.target.first_name.value,
        last_name: e.target.last_name.value,
        phone: e.target.phone.value,
      }),
    });

    if (response.status === 201) {
      history.push("/sign-in");
    } else {
      alert("Something went wrong!");
    }
  };
  //send the password
  const sendPassword = async (e) => {
    e.preventDefault();
    let response = await fetch("http://127.0.0.1:8000/users/reset_password/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
  });

    if (response.status === 201) {
      console.log("send")
    } else {
      alert("Something went wrong!");
    }
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    let response = await fetch("http://localhost:8000/users/reset_password_confirm/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: e.target.password.value,
    })
  });
    let data = await response.json();

    if (response.status === 201) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      history.push("/");
      window.location.reload();
    } else {
      alert("Something went wrong!");
    }
  };


  let contextData = {
    user: user,
    authTokens: authTokens,
    setAuthTokens: setAuthTokens,
    setUser: setUser,
    loginUser: loginUser,
    register: register,
    resetPassword:resetPassword,
    sendPassword:sendPassword
  };

  useEffect(() => {
    if (authTokens) {
      setUser(jwt_decode(authTokens.access));
    }
    setLoading(false);
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
