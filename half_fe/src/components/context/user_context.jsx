// UserContext.js
import { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext({});

// eslint-disable-next-line react-refresh/only-export-components
export {UserContext};


export const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState({role:'',auth:false});

  useEffect(()=>{
    console.log(user);
  }, [user])
  
  const setUserFunction = (user) =>{

  }

  const loginContext = (role) => {
    setUser((user)=> ({
     role:role,
      auth:true,
    }));
    localStorage.setItem("token",res.token);
  };

  const logout = () => {
    setUser((user)=>({
      role:'',
      auth:false,
    }));
  };  
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser, loginContext, logout }}>
      {children}
    </UserContext.Provider>
  );
};

