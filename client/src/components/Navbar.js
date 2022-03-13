import * as React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import {
    Container,
    Box,
    Button,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    Avatar,
    Tooltip,
    MenuItem,
    Badge,
} from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import axios from "axios";
import {useEffect} from "react";
import Cookies from 'js-cookie';
import Axios from "axios";
import Common from "../pages/Common";
import Login from "../pages/Login";

let pages = [];
let settings = ['Profile', 'Account', 'Dashboard', 'Logout'];


const ResponsiveAppBar = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [user, setUser] = React.useState(null);
    const [pagesTest, setPagesTest] = React.useState([]);
    var [count, setCount] = React.useState(); //number of notifications set as count

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
    // instantiate navbar differently depending on correct role
    function instantiateNavBar() {
        {


            setPagesTest(pages);


            if (localStorage.getItem('role') == null) {
                pages.push('Login');
                pages.push('Signup')
            }
            if (localStorage.getItem('role') == 'Patient') {
                pages.push('PatientProfile');
                pages.push('PatientAppointment');
                
            }
            if (localStorage.getItem('role') == 'Admin') {
                pages.push('AdminDashboard');
                pages.push('DoctorPatientProfile');
            }
            if (localStorage.getItem('role') == 'Doctor') {
                pages.push('DoctorDashboard');
                pages.push('DoctorPatientProfile');
            }
            if (localStorage.getItem('role') != null) {
                pages.push('Logout');
            }


        }
    }

    function logout() {
        Axios.post('http://localhost:8080/Logout', {}, {withCredentials: true}).then(() => {
            localStorage.clear();


            return new Promise(((resolve, reject) => {
                axios.get(
                    "http://localhost:8080/checkAuth", {withCredentials: true}).catch(err => {
                    window.location.reload();

                })
            }))


        });
    }
  //to display notifications tab if there are any notifications
  console.log("here is count: " + count);
  if (count!=0 && count>0){
    settings = ['Profile', 'Account', 'Dashboard', 'Logout', 'Notifications'];
  }
  else{
    count=0;
  }

  //function to get the number of notifications to be used
  function getNotificationsCount(){
    Axios.post("http://localhost:8080/getAllNotificationCount").then((response)=>{     
      setCount(response.data[0].notificationCount);
      console.log("Notification Count:");
      console.log(response.data);  
    });  
  }
    // these  functions are called when navbar is rendered
    useEffect(() => {
        instantiateNavBar();
        getNotificationsCount();
    }, [])


    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography variant="h6" noWrap component="div" sx={{mr: 2, display: {xs: 'none', md: 'flex'}}}>
                        COVID-19 App
                    </Typography>

                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                        <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar"
                                    aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit">
                            <MenuIcon/>
                        </IconButton>
                        <Menu id="menu-appbar" anchorEl={anchorElNav}
                              anchorOrigin={{vertical: 'bottom', horizontal: 'left',}}
                              keepMounted
                              transformOrigin={{vertical: 'top', horizontal: 'left',}}
                              open={Boolean(anchorElNav)}
                              onClose={handleCloseNavMenu}
                              sx={{display: {xs: 'block', md: 'none'},}}>
                            {pagesTest.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>

                    </Box>
                    <Typography variant="h6" noWrap component="div"
                                sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                        COVID-19 App
                    </Typography>

                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        {/* displays proper page based on if th epage is Logout */}
                        {pages.map((page) => (
                            page === 'Logout' ? 
                                <Button key={page} onClick={logout} sx={{my: 2, color: 'white', display: 'block'}}>
                                    {page}
                                </Button> :
                                <Button key={page} onClick={handleCloseNavMenu}
                                        sx={{my: 2, color: 'white', display: 'block'}} href={`/${page}`}>
                                    {page}
                                </Button>
                        ))}
                    </Box>
                    {localStorage.getItem('role') &&
                    <Box sx={{flexGrow: 0}}>
                    <Badge color="secondary" badgeContent={count}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                            {localStorage.getItem("role")=='Patient' && 
                             <Avatar alt="Remy Sharp"src="https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg"/> }  
                             {localStorage.getItem("role")=='Doctor' &&
                             <Avatar alt="Remy Sharp"src="https://thumbnail.imgbin.com/20/13/16/imgbin-profession-job-computer-icons-user-profile-avatar-doctor-cartoon-0UHE4i8tiPvnj2bjTRnTZ2nnf_t.jpg"/> }
                             {localStorage.getItem("role")=='Admin' && 
                             <Avatar alt="Remy Sharp"src="https://www.clipartmax.com/png/middle/344-3449008_vector-avatars-circle-avatar.png"/> }  
                             
                                       
                            </IconButton>
                        </Tooltip>
                        </Badge>
                        <Menu sx={{mt: '45px'}} id="menu-appbar" anchorEl={anchorElUser}
                              anchorOrigin={{vertical: 'top', horizontal: 'right',}} keepMounted
                              transformOrigin={{vertical: 'top', horizontal: 'right',}}
                              open={Boolean(anchorElUser)}
                              onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={setting === 'Logout' ? logout : handleCloseUserMenu}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box> }
                </Toolbar>
            </Container>
        </AppBar>
    );
};

ResponsiveAppBar.contextType = Common;

export default ResponsiveAppBar;