import React, {createContext, useEffect, useState} from "react";

export const PruebaUsabilidadContext = createContext({});

export const PruebaUsabilidadProvider= (props)=>{
  const [pruebaUsabilidad, setPruebaUsabilidad] = useState(JSON.parse(localStorage.getItem("prueba")) || {}/*{idUsuario: 1, email: "mail", nombre: "name", apPaterno:'papa', apMaterno:'mama', idRol:1}*/);

  const setPruebaAndLocal = (user) => {
    localStorage.setItem("prueba", JSON.stringify(pruebaUsabilidad));
    setPruebaUsabilidad(user);
  }

  useEffect(()=>{
    localStorage.setItem("prueba", JSON.stringify(pruebaUsabilidad))
  },[pruebaUsabilidad])

  return(
    <PruebaUsabilidadContext.Provider value={{pruebaUsabilidad,setPruebaUsabilidad:setPruebaAndLocal}}>
      {
        props.children
      }
    </PruebaUsabilidadContext.Provider>
  )

}