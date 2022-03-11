import * as React from 'react';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import {
    Container,
    Typography,
    Box,
    Grid,
    Link,
    Checkbox,
    FormControlLabel,
    TextField,
    CssBaseline,
    Button,
    Avatar
} from '@mui/material';
import Axios from 'axios';
import {useState, Component} from "react";
import {Navigate, useNavigate} from "react-router-dom";

import Common from "./Common";
import axios from "axios";


//handling the login form

class Login extends Component {

    static contextType = Common;

    constructor(props, context) {
        super(props, context);

        this.state = {
            email: "",
            password: "",
            wrongCredentials: "",
            unvalidated: ""
        };


    }



    onLogin() {
        this.setState({unvalidated: ''})
        this.setState({wrongCredentials: ''})
        Axios.post('http://localhost:8080/Login', {
            email: this.state.email,
            password: this.state.password
        }, {withCredentials: true}).then(() => {

            return new Promise(((resolve, reject) => {
               this.context.checkAuth().then(res => {
                        resolve(res.data);
                        window.location.reload();
                    }

                ).catch(err => {

                   console.log(err)
                    reject(null);


                })
            }))

        }).catch((err => {
            if (err.response.status === 405){
                this.setState({unvalidated: 'Please wait for validation!'})
            } else {
                this.setState({wrongCredentials: 'You have entered the wrong credentials!'})

            }
        }))
        ;
    }

    render() {

        return (
<>
            {
                localStorage.getItem("role") && <Navigate to={"/"} refresh={true}/>
            }
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
                    <Avatar sx={{m: 1, bgcolor: 'primary.main'}}>
                        <LockOpenTwoToneIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box  sx={{mt: 1}}>
                        <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email"
                                   autoComplete="email" value={this.state.email}
                                   onChange={(ev) => this.setState({email: ev.target.value})} autoFocus/>
                        <TextField margin="normal" required fullWidth name="password" label="Password"
                                   type="password" value={this.state.password}
                                   onChange={(ev) => this.setState({password: ev.target.value})}
                                   id="password" autoComplete="current-password"/>
                        <FormControlLabel control={<Checkbox value="remember" color="primary"/>}
                                          label="Remember me"/>
                        <Button type="submit" fullWidth variant="contained" onClick={() => this.onLogin()}
                                sx={{mt: 3, mb: 2}}>
                            Sign In
                        </Button>
                        {this.state.wrongCredentials && this.state.wrongCredentials}
                        {this.state.unvalidated && this.state.unvalidated}
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
</>
        );
    }
}

Login.contextType = Common;
;

export default Login;