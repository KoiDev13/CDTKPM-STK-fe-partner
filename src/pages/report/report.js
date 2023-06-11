
import React,{ useState, useEffect } from 'react';

import { Helmet } from 'react-helmet-async';
import { Grid, Container } from '@mui/material';

import AppWidgetSummaryOne from '../../sections/@dashboard/app/AppWidgetSummaryOne';
import AppWidgetSummaryTwo from '../../sections/@dashboard/app/AppWidgetSummaryTwo';
import AppWidgetSummaryThree from '../../sections/@dashboard/app/AppWidgetSummaryThree';
import dashboardService from '../../services/dashboard.service';
import headerService from '../../services/header.service';
import partnerService from '../../services/partner.service';


export default function Report() { 

  const [success, setSuccess] = useState(false)

  const [campaign, setCampaign] = useState({})
  const [productItem, setProductItem] = useState({

  });

  const [numberOfPVoucher, setNumberOfPVoucher] = useState({})
  const [totalNumberOfPlayer, setTotalNumberOfPlayer] = useState({})
  const [totalNumberOfPlay, setTotalNumberOfPlay] = useState({})

  const [status, setStatus] = useState([]);
  const [itemCategory, setItemCategory] = useState([]);
  useEffect(() =>{
    if(!headerService.GetUser() || headerService.refreshToken() === ""){
      window.location.assign('/login')
    }
       
    dashboardService.TotalNumberOfPlay().then(
      response => {
        if(response.data && response.data.success) {
          const temp = response.data.data
          setTotalNumberOfPlay({
            name: "TotalNumberOfPlay",
            value: temp.totalNumberOfPlay
          })
          
        }
      }, error =>{
        if(error.response && error.response.status === 401) {
          const token = headerService.refreshToken();
          partnerService.refreshToken(token).then(
            response=>{
              if(response.data && response.data.success === true) {
                console.log(response.data)
                localStorage.setItem("token", JSON.stringify(response.data.data));
                setSuccess(!success)
              }
            }
          )
          
        }
        
      }
    )
    dashboardService.TotalNumberOfPlayer().then(
      response => {
        if(response.data && response.data.success) {
          const temp = response.data.data
          setTotalNumberOfPlayer({
            name: 'TotalNumberOfPlayer',
            value: temp.numberOfPlayer
          })
        }
      }
    )
    dashboardService.TotalNumberOfVoucher().then(
      response => {
        if(response.data && response.data.success) {
          const temp = response.data.data
          setNumberOfPVoucher({
            name: "TotalNumberOfVoucher",
            value: temp.numberOfPVoucher
          })
          
        }
      }
    )
    dashboardService.CampaignCount().then(
      response => {
        if(response.data && response.data.success) {
          const temp = response.data.data
          setCampaign({
            name: "CampaignCount",
            value: temp.nCampaign
          })
        }
      }
    )
    dashboardService.CampaignCountByStatus().then(
      response => {
        if(response.data && response.data.success) {
          const temp = response.data.data

          setStatus(temp.campaignCount)
          
        }
      }
    )
    
    dashboardService.ProductItemCount().then(
      response => {
        if(response.data && response.data.success) {
          const temp = response.data.data
          setProductItem({
            name:"Total Item",
            value: temp.nItem
          })
          
        }
      }
    )
    dashboardService.ItemCountByCategory().then(
      response => {
        if(response.data && response.data.success) {
          const temp = response.data.data
          setItemCategory(temp.nItemByCategory)
        }
      }
    )
    

    
    
  },[success])

  return (
    <>
      <Helmet>
        <title> Reports  </title>
      </Helmet>
      <Container maxWidth="xl">

        <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummaryThree title={totalNumberOfPlay}    color="info"/>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummaryThree title={totalNumberOfPlayer}    color="info"/>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummaryThree title={numberOfPVoucher}    color="info"/>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummaryThree title={campaign}    color="info"/>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummaryThree title={productItem}    color="info"/>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummaryOne title="Campaign Status" isActive={status}    color="info"/>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummaryTwo title="Product Items" isActive={itemCategory}    color="info"/>
          </Grid>
        </Grid>
      </Container>
      
      
    </>
  );
}
