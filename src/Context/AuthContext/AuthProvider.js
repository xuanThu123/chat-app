import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";
import AuthContext from "./AuthContext";
import { auth } from "../../firebase/config";

function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((result) => {
      if (result) {
        const { displayName, email, photoURL, uid } = result;
        setUser({ displayName, email, photoURL, uid });
        setLoading(false);
        navigate("/");
        return;
      }
      setLoading(false);
      navigate("/login");
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <AuthContext.Provider value={user}>
      {loading ? <Spin /> : children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
