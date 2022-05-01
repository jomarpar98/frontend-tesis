export const createNavbarItem = (label, roles, icon, ...menuItems) => {
  return {label, roles, icon, menuItems};
}

export const createMenuItem = (label, roles, pathname) => {
  return {label, roles, pathname};
}