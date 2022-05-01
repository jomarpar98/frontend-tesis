import { MenuItem } from "@mui/material";
import { useHistory } from "react-router-dom";
import { navbarItems } from "../constants/NavbarItems.constant";

const NavMenuItem = ({ label, pathname, handleClose, setSelection }) => {

  const history = useHistory();

  const handleClick = () => {
    let flag = false;
    for(let i = 0; i < navbarItems.length; i++){
      let items = navbarItems[i].menuItems
      for(let j = 0; j < items.length; j++){
        if(pathname === items[j].pathname){
          setSelection(navbarItems[i].label)
          flag=true;
          break;
        }
      }
      if(flag)
        break;
    }
    history.push(pathname);
    handleClose();
  }

  return (
    <MenuItem onClick={handleClick}>
      {label}
    </MenuItem>
  );
}

export default NavMenuItem;