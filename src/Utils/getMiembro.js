import {useContext} from "react";
import {UserContext} from "../context/UserContext";

const getMiembro = () => {
  const {user} = useContext(UserContext)
  const {pruebaUsabilidad} = useContext(UserContext)
  let miembro
}