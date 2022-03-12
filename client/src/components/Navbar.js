import * as React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import {Container, Box, Button, AppBar, Toolbar, IconButton, Typography, Menu, Avatar, Tooltip, MenuItem, count, Badge} from '@mui/material';
import Axios from 'axios';
import {useState, useEffect} from 'react';

const pages = ['Login', 'Signup', 'AdminDashboard', 'DoctorPatientProfile', 'DoctorDashboard', 'PatientProfile'];
var settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  var [count, setCount] = React.useState();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  console.log("here is count: " + count);
  if (count!=0 && count>0){
    settings = ['Profile', 'Account', 'Dashboard', 'Logout', 'Notifications'];
  }
  else{
    count=0;
  }

  function getNotificationsCount(){
    Axios.post("http://localhost:8080/getAllNotificationCount").then((response)=>{     
      setCount(response.data[0].notificationCount);
      console.log("Notification Count:");
      console.log(response.data);  
    });  
  }
  

  let stopeffect = 1;

  useEffect(() => { //when the doctor dashboard page is rendered, these functions are executed
    getNotificationsCount();
    },[stopeffect]);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography variant="h6" noWrap component="div" sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }} >
            COVID-19 App
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu id="menu-appbar" anchorEl={anchorElNav}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left',}}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'left',}}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{display: { xs: 'block', md: 'none' },}}>
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
            
          </Box>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            COVID-19 App
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button key={page} onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }} href = {`/${page}`}>
                {page}
              </Button>
            ))}
          </Box>

          
          <Box sx={{ flexGrow: 0 }}>
          <Badge color="secondary" badgeContent={count}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                <Avatar alt="Remy Sharp" src="https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg" />
              </IconButton>
            </Tooltip>
            </Badge>
            <Menu sx={{ mt: '45px' }} id="menu-appbar" anchorEl={anchorElUser} anchorOrigin={{ vertical: 'top', horizontal: 'right',}} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right',}}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>

                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;