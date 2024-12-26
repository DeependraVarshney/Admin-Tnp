import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { 
  Dashboard, 
  Business, 
  Description, 
  Settings 
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export const Sidebar = ({ open, onClose }) => {
  const navigate = useNavigate();

  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
    { text: 'Company Profile', icon: <Business />, path: '/company/profile' },
    { text: 'JNF Management', icon: <Description />, path: '/jnf' },
    { text: 'Settings', icon: <Settings />, path: '/settings' },
  ];

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <List>
        {menuItems.map((item) => (
          <ListItem 
            button 
            key={item.text}
            onClick={() => navigate(item.path)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </Drawer>
  );
};