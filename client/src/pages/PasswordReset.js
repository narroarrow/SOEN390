import * as React from 'react';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import { Container, Typography, Box, TextField, CssBaseline, Button, Avatar } from '@mui/material';
import { useState } from 'react';
import { Component } from "react";
import validator from 'validator';
import Axios from "axios";


class PasswordReset extends Component {

    constructor(props) {
        super(props)

        // Set initial states
        this.state = { msg: '', password: '' , confirmPassword : ''}

        // Binding keywords keyword
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        //Validating the password
        if (validator.isStrongPassword(this.state.password) && this.state.password === this.state.confirmPassword) {
            this.setState({ msg: 'Your Password has been reset.' })

        } else {
            this.setState({ msg: 'Enter valid password or passwords do not match.' })
        }

    }

    render() {

        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                    <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                        <LockOpenTwoToneIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Reset Password
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                        {/* User providing the password*/}
                        <TextField margin="normal" required fullWidth id="password" label="New Password" name="password" type="password" value={this.state.password} onChange={(ev) => this.setState({ password: ev.target.value })}
                        />
                        
                         <TextField margin="normal" required fullWidth id="confirmPassword" label="Confirm New Password" name="confirmPassword" type="password" value={this.state.confirmPassword} onChange={(ev) => this.setState({ confirmPassword: ev.target.value })}
                        />
                        <Button type="submit" fullWidth variant="contained" onClick={() => this.handleClick()} sx={{ mt: 3, mb: 2 }}>
                            Reset Password
                        </Button>
                        {/* Displays confirmation message based status send from server */}
                        {this.state.msg}
                    </Box>
                </Box>
            </Container>
        );
    }

}

export default PasswordReset;
