import React, { useState } from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Campaign as CampaignIcon,
  Analytics as AnalyticsIcon,
  Speed as SpeedIcon,
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Business as BusinessIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/useAppDispatch';

const drawerWidth = 240;
const minimizedDrawerWidth = 65;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { user } = useAppSelector((state) => state.auth);

  // Define menu items based on user role
  const getMenuItems = () => {
    const baseMenuItems = [
      { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
      { text: 'Campaigns', icon: <CampaignIcon />, path: '/campaigns' },
      { text: 'Analytics', icon: <AnalyticsIcon />, path: '/analytics' },
      { text: 'Performance', icon: <SpeedIcon />, path: '/performance' },
    ];

    // Add Clients menu item only for admin users
    if (user?.role === 'admin') {
      return [
        ...baseMenuItems.slice(0, 1), // Dashboard
        { text: 'Clients', icon: <BusinessIcon />, path: '/clients' },
        ...baseMenuItems.slice(1), // Rest of the items
      ];
    }

    // For client users, modify the Campaigns path to include their clientId
    return baseMenuItems.map(item => {
      if (item.text === 'Campaigns' && user?.clientId) {
        return {
          ...item,
          path: `/campaigns/${user.clientId}`,
        };
      }
      return item;
    });
  };

  const menuItems = getMenuItems();

  const handleDrawerToggle = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setIsMinimized(!isMinimized);
    }
  };

  const drawer = (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 2,
          minHeight: 64,
        }}
      >
        {(isMobile || !isMinimized) && (
          <Typography variant="h6" noWrap>
            {user?.role === 'client' ? 'Client Portal' : 'Marketing Hub'}
          </Typography>
        )}
        {!isMobile && (
          <IconButton onClick={handleDrawerToggle}>
            {isMinimized ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        )}
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => {
              navigate(item.path);
              if (isMobile) setMobileOpen(false);
            }}
            sx={{
              minHeight: 48,
              justifyContent: isMinimized && !isMobile ? 'center' : 'initial',
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: isMinimized && !isMobile ? 0 : 2,
                justifyContent: 'center',
              }}
            >
              {item.icon}
            </ListItemIcon>
            {(isMobile || !isMinimized) && <ListItemText primary={item.text} />}
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${isMinimized ? minimizedDrawerWidth : drawerWidth}px)` },
          ml: { sm: `${isMinimized ? minimizedDrawerWidth : drawerWidth}px` },
          backgroundColor: 'white',
          color: 'primary.main',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Digital Campaign Manager
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{
          width: { sm: isMinimized ? minimizedDrawerWidth : drawerWidth },
          flexShrink: { sm: 0 },
        }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              backgroundColor: theme.palette.background.default,
              borderRight: '1px solid rgba(0, 0, 0, 0.12)',
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: isMinimized ? minimizedDrawerWidth : drawerWidth,
              backgroundColor: theme.palette.background.default,
              borderRight: '1px solid rgba(0, 0, 0, 0.12)',
              transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${isMinimized ? minimizedDrawerWidth : drawerWidth}px)` },
          marginLeft: { sm: `${isMinimized ? minimizedDrawerWidth : drawerWidth}px` },
          marginTop: '64px',
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout; 