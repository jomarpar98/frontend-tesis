import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ROLES from '../constants/Roles.constant';
import { StyledUserPhoto } from '../styles/Navbar.style';

const UserPhoto = (props) => {
  const {user, onClick} = props;

  return !user ? null : (
    <StyledUserPhoto onClick={onClick}>
      <div className="name-and-role"><p className="name">{user.nombre}</p><p className="role">{ROLES[user.idRol]}</p></div>
      <ArrowDropDownIcon />
    </StyledUserPhoto>
  );
}

export default UserPhoto;