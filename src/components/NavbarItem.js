import { StyledNavbarItem } from "../styles/Navbar.style";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import React, { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import NavMenuItem from "./NavMenuItem";

const NavbarItem = ({ label, menuItems, rolUsuario, setSelection }) => {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <StyledNavbarItem>
      <div className="nav-item" onClick={handleClick}>
        <span className="nombre-item">{label}</span>
        {/*<ArrowDropDownIcon />*/}
      </div>
      {/*<Menu*/}
      {/*  id="basic-menu"*/}
      {/*  anchorEl={anchorEl}*/}
      {/*  open={open}*/}
      {/*  onClose={handleClose}*/}
      {/*  MenuListProps={{*/}
      {/*    'aria-labelledby': 'basic-button',*/}
      {/*  }}*/}
      {/*>*/}
      {/*  {menuItems.map(item => (!item.roles || item.roles.includes(rolUsuario)) ?  (*/}
      {/*    <NavMenuItem*/}
      {/*      key={item.label}*/}
      {/*      label={item.label}*/}
      {/*      pathname={item.pathname}*/}
      {/*      handleClose={handleClose}*/}
      {/*      setSelection={setSelection}*/}
      {/*    />*/}
      {/*  ) : null)}*/}
      {/*</Menu>*/}
    </StyledNavbarItem>
  );
}

export default NavbarItem;