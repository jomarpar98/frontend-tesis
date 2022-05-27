import { createMenuItem, createNavbarItem } from "../Utils/createNavbarItem";

import AssignmentIcon from '@mui/icons-material/Assignment';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import BarChartIcon from '@mui/icons-material/BarChart';
export const navbarItems = [
  createNavbarItem("Planeación", null, <AssignmentIcon />,
  ),
  createNavbarItem("Ejecución", null, <AlarmOnIcon />,
  ),
  createNavbarItem("Análisis", null, <BarChartIcon />,
  ),
]