import { Helmet } from 'react-helmet-async';

import { useEffect } from 'react';
// @mui

import {  Container, Typography } from '@mui/material';
// components
import headerService from '../services/header.service';
// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  useEffect(()=>{
    if(!headerService.GetUser() || headerService.refreshToken() === ""){
      window.location.assign('/login')
    }
  })

  return (
    <>
      <Helmet>
        <title> Dashboard  </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>
        
      </Container>
    </>
  );
}
