import React, { useState, useEffect } from 'react';
import { Container, Box, Grid, CssBaseline, Button, Card, styled, Paper, Typography, TextField } from '@mui/material';
import Axios from 'axios';
import { Navigate } from "react-router-dom";
import './Home.css';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    fontWeight: 'bold'
}));

function Home() {
    return(
        
            <div className='HomePage'>           
            <video src = "/videos/video.mp4" autoPlay loop muted sx = {{height : '100%', width : '100%'}}/>
            <h1>SOENXCLUSIVE COVID 19 TRACKING APP</h1>

                      
                {/* <Button sx = {{color: 'white'}}>
                    LOGIN
                </Button>
                <Button sx = {{color: 'white'}}>
                    SIGNUP
                </Button> */}
            
            </div>
    );

}
export default Home;