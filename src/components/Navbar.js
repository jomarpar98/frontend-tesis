import { menuStyle, StyledNavbar } from "../styles/Navbar.style";
import NavbarItem from "./NavbarItem";
import UserPhoto from "./UserPhoto";
import ButtonTesis from "./ButtonTesis";
import { navbarItems } from "../constants/NavbarItems.constant";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { useHistory, useLocation } from "react-router-dom";
import { Divider, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { useGoogleLogout } from "react-google-login";
import GOOGLE_CLIENT_ID from "../constants/GoogleClientId.constant";
import axios from 'axios'
import LogoutIcon from '@mui/icons-material/Logout';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {PruebaUsabilidadContext} from "../context/PruebaContext";

const Navbar = ({setSelection}) => {

  const { user, setUser } = useContext(UserContext);
  const {pruebaUsabilidad} = useContext(PruebaUsabilidadContext)
  const history = useHistory()
  const location = useLocation()
  const theme = useTheme();
  const hidden = useMediaQuery(theme.breakpoints.up('lg'));

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    let flag = false;
    for(let i = 0; i < navbarItems.length; i++){
      let items = navbarItems[i].menuItems
      for(let j = 0; j < items.length; j++){
        if(location.pathname === items[j].pathname){
          setSelection(navbarItems[i].label)
          flag=true;
          break;
        }
      }
      if(flag)
        break;
    }
  }, [])

  const onLogoutSuccess = () => {
    axios.defaults.headers.common['Authorization'] = null
    setUser({});
    history.push('/login')
    // localStorage.clear();
  }
  const onLogoutFailure = (response) => {
    // console.log(response)
    alert('Failed to log out')
  }
  const {signOut} = useGoogleLogout({
    clientId: GOOGLE_CLIENT_ID,
    onLogoutSuccess,
    onLogoutFailure,
  })

  return location.pathname==="/login" ? null : (
    <StyledNavbar>
      {hidden &&
      <div className="nav-items" style={{margin:'auto'}}>
        {location.pathname !== '/pruebasUsabilidad' && user.idRol === 1 && pruebaUsabilidad.Miembros[0].esInvestigador && navbarItems.map((item) => (!item.roles || (user.idRol && item.roles.includes(user.idRol))) && (
          <div style={{alignSelf:'center'}} onClick={()=>{item.label === "Ejecución" ? history.push("/comenzar-prueba") : item.label === "Análisis" ? history.push("/analisis-prueba-usabilidad") : history.push("/visualizar-prueba-usabilidad")}}>
          <NavbarItem
            key={item.label}
            label={item.label}
            menuItems={item.menuItems}
            rolUsuario={user && user.idRol}
            setSelection={setSelection}
          />
          </div>
        ))}
      </div>
      }
      {!!user && !!user.accessToken ?
        <>
          <UserPhoto user={user} onClick={handleClick}/>
        </>
        : <ButtonTesis variant="text" style={{color:'white',margin:'16px'}} label="Iniciar Sesión" onClick={()=>history.push('/login')}/>
      }
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 65,
          horizontal: 'right',
        }}
        // keepMounted
        elevation={0}
        open={open}
        onClose={handleClose}
        sx={menuStyle}
      >
        <MenuItem onClick={()=>{handleClose();signOut()}}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText>Cerrar Sesión</ListItemText>
        </MenuItem>
      </Menu>
    </StyledNavbar>
  );
}

export default Navbar;