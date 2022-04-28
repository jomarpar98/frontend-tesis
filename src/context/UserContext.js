import React, {createContext, useState} from "react";

export const UserContext = createContext({});

export const UserProvider= (props)=>{
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || {}/*{idUsuario: 1, email: "mail", nombre: "name", apPaterno:'papa', apMaterno:'mama', idRol:1}*/);

  const setUserAndLocal = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  }

  return(
    <UserContext.Provider value={{user,setUser:setUserAndLocal}}>
      {
        props.children
      }
    </UserContext.Provider>
  )

}