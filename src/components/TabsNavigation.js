import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { UserContext } from "../context/UserContext";
import { navbarItems } from "../constants/NavbarItems.constant";
import { useState, useEffect, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {StyledNavbar2} from "../styles/Navbar.style";
import Tabs from "@mui/material/Tabs";

const TabsNavigation = ({selection}) => {

  const { user, setUser } = useContext(UserContext);
  const history = useHistory()
  const location = useLocation()
  const [value, setValue] = useState(0);
  const [tabsValues, setTabsValues] = useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    history.push(tabsValues.menuItems[newValue].pathname);
  };

  useEffect(() => {
    if(selection !== ""){
      let arr = navbarItems.filter(x => x.label === selection)[0]
      arr.menuItems = arr.menuItems.filter(x => x.roles ? x.roles.includes(user.idRol) : true )
      setTabsValues(arr)
      for(let i = 0; i < arr.menuItems.length; i++){
        if(location.pathname === arr.menuItems[i].pathname)
          setValue(i)
      }
    }
  }, [selection])

  useEffect(() => {
    if(selection !== ""){
      let arr = navbarItems.filter(x => x.label === selection)[0]
      arr.menuItems = arr.menuItems.filter(x => x.roles ? x.roles.includes(user.idRol) : true )
      setTabsValues(arr)
      for(let i = 0; i < arr.menuItems.length; i++){
        if(location.pathname === arr.menuItems[i].pathname)
          setValue(i)
      }
    }
  }, [location.pathname])

  return location.pathname==="/login" ? null : (
    <StyledNavbar2>
      <Box sx={{ minWidth: 250 }}>
        {tabsValues && <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          textColor="primary"
          indicatorColor="primary"
        >
          {tabsValues.menuItems.map(item => (!item.roles || item.roles.includes(user && user.idRol)) &&
            <Tab label={item.label} />
          )}
        </Tabs>}
      </Box>
    </StyledNavbar2>
  );
}

export default TabsNavigation;