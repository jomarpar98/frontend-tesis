import styled from "styled-components";

export const StyledNavbar = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
  background-color: ${props => props.theme.palette.navColor};
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  z-index: 10;

  .logo-bienestar {
    height: 4.5rem;
  }

  .nav-items {
    display: flex;
    height: 100%;
  }
`;

export const StyledNavbar2 = styled.div`
  position: sticky;
  top: 5rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #27987E;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  z-index: 10;

  & .MuiTabs-root{
    color: white;
  };
  & .MuiTab-root{
    color: white;
  };
  & .MuiTabs-indicator{
    background-color: white;
    bottom: 10px;
  };
  & .MuiTab-root.Mui-selected{
    color: white;
  };
`;

export const StyledBottomNavigation = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  display: flex;
  margin-bottom: 0;
  justify-content: space-between;
  flex-direction: column;
  background-color: ${props => props.theme.palette.primary.main};
  user-select: none;
  z-index: 6;
  & .MuiBottomNavigation-root{
    background-color: ${props => props.theme.palette.primary.main};
  };
  & .MuiBottomNavigationAction-root{
    color: white;
  };
  & .Mui-selected{
    color: white;
    background-color: #27987E;
  };
  & .MuiBottomNavigationAction-root.Mui-selected{
    color: white;
  };

  @media only screen and (max-width: 400px) {
    & .css-i4bv87-MuiSvgIcon-root {
      height: 20px;
    }
    & .css-1wy0cso-MuiBottomNavigationAction-label{
      font-size: 10px;
    }
    & .css-1wy0cso-MuiBottomNavigationAction-label.Mui-selected{
      font-size: 12px;
    }
  }
`;

export const StyledNavbarItem = styled.div`
  color: ${props => props.theme.palette.white};
  transition: background-color .3s ease;

  &:hover {
    background-color: ${props => props.theme.palette.button};
    cursor: pointer;
  }

  .nav-item {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 1.5rem;
    height: 100%;
    
    .nombre-item {
      font-size: 1rem;
      font-weight: ${props => props.theme.weight.semibold};
    }

    svg {
      font-size: 2rem;
      margin-left: .25rem;
    }
  }

`;

export const StyledUserPhoto = styled.div`
  display: flex;
  align-items: center;
  color: ${props => props.theme.palette.white};

  &:hover {
    cursor: pointer;
  }

  .user-photo {
    height: 3rem;
    border-radius: 50%;
  }

  svg {
    font-size: 2rem;
    margin-left: .25rem;
  }

  .name-and-role {
    margin-left: 8px;

    .name {
      font-size: 14px;
      font-weight: 600;
    }

    .role {
      font-size: 12px;
    }
  }

`;

export const menuStyle = {
  zIndex:3000,
  filter:'drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.25))',
  '& .MuiPaper-root': {
    width:200,
    backgroundColor: 'navColor',
  },
  '& .MuiMenuItem-root': {
    color:'white',
    '& .MuiSvgIcon-root': {
      fontSize: 18,
      color: 'white',
    },
  },
  '& .MuiDivider-root': {
    background:'white',
    margin:'8px 16px',
  },
}