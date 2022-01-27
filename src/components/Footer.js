import * as React from 'react';

import {Container, Box, CssBaseline,Link, Typography} from '@mui/material';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {'Copyright © '}
      <Link color="inherit" href='#'>
        Github
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function StickyFooter() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', textAlign: 'center'}}>
      <CssBaseline />
      
      <Box component="footer" sx={{ py: 3, px: 2, mt: 'auto',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body1">
            COVID-19 Application :)
          </Typography>
          <Copyright />
        </Container>
      </Box>
    </Box>
  );
}