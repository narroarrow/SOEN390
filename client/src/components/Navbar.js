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
    MenuItem
} from '@mui/material';
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

    useEffect(() => {
        instantiateNavBar();
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
                        {pages.map((page) => (
                            page === 'Logout' ? <Button key={page} onClick={logout}
                                                        sx={{my: 2, color: 'white', display: 'block'}}>
                                    {page}
                                </Button> :

                                <Button key={page} onClick={handleCloseNavMenu}
                                        sx={{my: 2, color: 'white', display: 'block'}} href={`/${page}`}>
                                    {page}
                                </Button>
                        ))}
                    </Box>
                    <Box sx={{flexGrow: 0}}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                {localStorage.getItem('role') && <Avatar alt="Remy Sharp"
                                                                         src="https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg"/>
                                }             </IconButton>
                        </Tooltip>
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
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

ResponsiveAppBar.contextType = Common;

export default ResponsiveAppBar;