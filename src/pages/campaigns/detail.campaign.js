import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
// @mui
import {
  Card,
  Box,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,  
  TableRow,  
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  InputLabel,
  Select,
  TextField,
  MenuItem,
  Modal 
} from '@mui/material';

import Grid from '@mui/material/Unstable_Grid2';


import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
// components
import Label from '../../components/label';
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';

import headerService from '../../services/header.service';
import partnerService from '../../services/partner.service';

import voucherService from '../../services/voucher.service';   
import gameService from '../../services/game.service';


// sections
import { UserListHead, UserListToolbar } from '../../sections/@dashboard/user';
import CampaignService from '../../services/campaign.service';
// mock
import { checkWinRate } from '../../utils/check';
import getEnumService from '../../services/getEnum.service';
import noti from '../../utils/noti';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'description', label: 'Description', alignRight: false },  
  { id: 'quantity', label: 'Quantity', alignRight: false },  
  { id: 'expiresOn', label: 'ExpiresOn', alignRight: false },  
  { id: '' },
];


// ----------------------------------------------------------------------


const statusEnable = ["Enable             ", "Disable          "]


export default function CampaignDetail(props) {  
  
  const [success, setSuccess] = useState(false);

  const [open, setOpen] = useState(false);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');
  
  const [name, setName] = useState("");

  const [description, setDescription] = useState("");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [vouchers, setVouchers] = useState([])

  const [descriptionVoucher, setDescriptionVoucher] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [voucherId, setVoucherId] = useState("");

  const [games, setGames] = useState([]);

  const [winRate, setWinRate] = useState("");

  const [startDateText, setStartDateText] = useState("");

  const [endDateText, setEndDateText] = useState("");

  const [expiresOnText, setExpiresOnText] = useState("");

  const [gameId, setGameId] = useState("");

  const [nameVoucher, setNameVoucher] = useState("");

  const [quantityText, setQuantityText] = useState(0)

  const [tempVoucher, setTempVoucher] = useState([]);

  const [isEnable, setIsEnable] = useState("");

  const [enable, setEnable ] = useState(false)

  const [gameRules, setGameRules] = useState([])
  
  const [gameRuleId, setGameRuleId] = useState("");

  const [numberOfLimit, setNumberOfLimit] = useState("")

  const [ishowNumberOfLimit, setIshowNumberOfLimit] = useState(false)

  const [voucherIdEdit, setVoucherIdEdit] = useState("")

  const handleChangeName = (event) => {
    setName(event.target.value) 
  }
  const handleChangeWinRate = (event) => {
    setWinRate(event.target.value) 
  }

  const handleChangeQuantity = (event) => {
    setQuantityText(event.target.value) 
  }

  const handlechangeStartDate = (event) => {

    setStartDateText(event.target.value) 
  }

  const handlechangeExpiresOn = (event) => {
    setExpiresOnText(event.target.value) 
  }

  const handlechangeEndDate = (event) => {
    setEndDateText(event.target.value) 
  }
  const handleChangeGameRule = (event) => {
    if(event.target.value === 'Limit') {
      setIshowNumberOfLimit(true);
    } else {
      setIshowNumberOfLimit(false)
      setNumberOfLimit("");
    }
    setGameRuleId(event.target.value)
  }
  const handleChangeNumberOfLimit = (event) => {
    setNumberOfLimit(event.target.value)
  }

  const handleChangeStatusEnable = (event) =>{
    setIsEnable(event.target.value)
    if (event.target.value === statusEnable[0]) {
      setEnable(true)
    } else {
      setEnable(false)
    }

  }

  const handleChangeGame = (event) => {
    setGameId(event.target.value) 
  }

  const handlechangeDescription = (event) => {
    setDescription(event.target.value) 
  }
  
  const handleClose = () => {
    setOpen(false)    
  }
  const handleClickEdit = (id) => {    
    const temp = tempVoucher.filter(e=> e.voucherSeriesId === id)
    
    console.log(temp[0])
    setOpen(true)
    setVoucherId(temp[0].voucherSeriesId);
    setVoucherIdEdit(temp[0].voucherSeriesId)    
    setNameVoucher(temp[0].name)
    setDescriptionVoucher(temp[0].description);
    setExpiresOnText(`${temp[0].expiresOn.year}-${temp[0].expiresOn.month}-${temp[0].expiresOn.day}`)
    
    setQuantityText(temp[0].quantity)
    
    
  };
  const handleClickDelete = (id) => {
    if(window.confirm(noti.CONFIRM_DELETE)) {
      const temp = tempVoucher.filter((e) => e.voucherSeriesId !== id)
      setTempVoucher(temp) 
    }
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

 const handleChangeVoucher = (event) => {
    setVoucherId(event.target.value)
    const temp = vouchers.filter(e=> e.id === event.target.value)
    
    setDescriptionVoucher(temp[0].description)
    setNameVoucher(temp[0].name)
    
 }

  const handleClickNew = () => {
    setOpen(true);
    
  }
  const handleClickCancel = () => {
    setOpen(false);
    clearScreen();
  }
  const clearScreen = () =>{
    setVoucherId("");
    setDescriptionVoucher("");
    setQuantityText("");
    setExpiresOnText("");
    setNameVoucher("");
  }
  const handleClickSaveCampaign = () => {
    if(name && description && startDateText && endDateText && gameId && tempVoucher.length >= 1 && winRate) {
        if(checkWinRate(winRate) === true) {
          if(startDateText < endDateText) {
            const tempStartDate = startDateText.split("-");
            const tempEndDate = endDateText.split("-");
            const startDate = {
                year: tempStartDate[0],
                month: tempStartDate[1],
                day: tempStartDate[2]
            }
            const endDate = {
                year: tempEndDate[0],
                month: tempEndDate[1],
                day: tempEndDate[2]
            }
            const campaignInfo = {
                name,
                description,
                startDate,
                endDate,
                gameId,
                isEnable: enable,
                winRate,
                gameRule: gameRuleId,
                numberOfLimit                
            }
            const campaignVoucherSeriesList = tempVoucher
            CampaignService.PostCampaign(campaignInfo, campaignVoucherSeriesList).then(
                response => {
                    if(response.data && response.data.success) {
                        alert(noti.CREATE_SUCCESS)
                        window.location.assign('/campaign')
                    }
                }, error => {
                    alert(noti.WRONG_DATA)
                    setSuccess(!success);
                }
            )
        } else {
            alert(noti.WRONG_DATE_FROM_TO)
        }
        } else {
          alert(noti.CHECK_WINRATE)
        }
        
    } else {
        alert(noti.MISSING_DATA)
    }
    
  }

  const handleClickSubmit = () => {
    
    if(voucherId && descriptionVoucher && expiresOnText && quantityText > 0) {
        if (voucherId === voucherIdEdit) {
          const tempvoucherEdit = tempVoucher.filter(option => option.voucherSeriesId !== voucherId) 
          console.log(tempvoucherEdit)
          const tempExpiresOn = expiresOnText.split("-");
          setTempVoucher([...tempvoucherEdit, {
            voucherSeriesId: voucherId,
            name: nameVoucher,
            description: descriptionVoucher,
            quantity: parseInt(quantityText,10),
            expiresOn: {
                year: tempExpiresOn[0],
                month: tempExpiresOn[1],
                day: tempExpiresOn[2]
            },
            
        }])
        setOpen(false)
        clearScreen();
        } else {
          const checkVoucherId = tempVoucher.filter(option => option.voucherSeriesId === voucherId).length
        if(checkVoucherId === 0) {
            const tempEditVoucher = tempVoucher.filter(option => option.voucherSeriesId !== voucherIdEdit)
            const tempExpiresOn = expiresOnText.split("-");
            setTempVoucher([...tempEditVoucher, {
                voucherSeriesId: voucherId,
                name: nameVoucher,
                description: descriptionVoucher,
                quantity: parseInt(quantityText,10),
                expiresOn: {
                    year: tempExpiresOn[0],
                    month: tempExpiresOn[1],
                    day: tempExpiresOn[2]
                },
                
            }])
            setOpen(false)
            clearScreen();
        } else {
            alert(noti.WRONG_VOUCHER)
            setSuccess(!success);
        }
        }    

    }   else {
      alert(noti.MISSING_DATA);
    } 
  }
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tempVoucher.length) : 0;
 
  useEffect(() =>{
    if(!headerService.GetUser() || headerService.refreshToken() === ""){
      window.location.assign('/login')
    }
    if(props.load === true) {
        voucherService.VoucherAllByStore().then(
            response =>{
              if(response.data  && response.data.success) {
                      
                setVouchers(response.data.data.voucherSeriesList)
                
              }
            }, error => {
              if(error.response && error.response.status === 401) {
                console.log(error.response)
                const token = headerService.refreshToken();
                partnerService.refreshToken(token).then(
                  response => {
                    console.log(response.data)
                    if(response.data && response.data.success === true) {                
                      localStorage.setItem("token", JSON.stringify(response.data.data));
                      setSuccess(!success)
                    }
                  }, error => {
                    console.log(error)
                  }
                )
              }
              
            }
        )
        getEnumService.getValuesGameRule().then(
          response => {
            if(response.data && response.data.success === true) {
              const tempGameRule= response.data.data.gameRuleValue
              setGameRules(tempGameRule)
            }
          }
        )
        gameService.GameAll().then(
            response => {
                if(response.data && response.data.success ) {
                    const temp = response.data.data.games;                    
                    setGames( temp)
                }
                
            }
        )
    }
    
    
  },[success])

  return (
    <>
      <Helmet>
        <title> CampaignDetail  </title>
      </Helmet>

      <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Campaign
          </Typography>
          <Button onClick={handleClickSaveCampaign} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            Save Campaign
          </Button>
        </Stack>      
        <Grid container spacing={2}>
            <Grid xs={6}>
                <Label>Name </Label>
                <TextField 
                name="name" 
                fullWidth
                value={name} 
                required
                onChange={(event) => { handleChangeName(event) }}
                />
            </Grid>
            
            <Grid xs={3}>
                <Label>StartDate </Label>
                <TextField 
                name="start" 
                type="date"
                value={startDateText} 
                fullWidth
                required
                onChange={(event) => { handlechangeStartDate(event) }}
                />
            </Grid>
            <Grid xs={3}>
                <Label>EndDate </Label>
                <TextField 
                name="end" 
                type="date"
                value={endDateText} 
                fullWidth
                required
                onChange={(event) => { handlechangeEndDate(event) }}
                />
            </Grid>
            <Grid xs={12}>
                <Label>Description </Label>
                <TextField 
                name="description" 
                multiline
                rows={2}
                value={description} 
                fullWidth
                required
                onChange={(event) => { handlechangeDescription(event) }}
                />
            </Grid>
            <Grid xs={3}>
            <Label>Game </Label>
            <TextField
                  fullWidth
                  select
                  variant="outlined"
                  value={gameId}
                  id="country"      
                  onChange= {handleChangeGame}
                >
                  {games  && games.map((option) => (
             <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          )
          )}
            </TextField>
            </Grid>
            <Grid xs={2}>
                <Label>WinRate </Label>
                <TextField 
                name="WinRate" 
                type="number"
                
                value={winRate} 
                fullWidth
                required
                onChange={(event) => { handleChangeWinRate(event) }}
                />
            </Grid>
            <Grid xs={2}>
            <Label>Enable </Label>
            <TextField
                  fullWidth
                  select
                  variant="outlined"
                  value={isEnable}
                  id="country"      
                  onChange= {handleChangeStatusEnable}
                >
                  {statusEnable  && statusEnable.map((option) => (
             <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          )
          )}
            </TextField>
            </Grid>
            <Grid xs={2}>
            <Label>GameRule </Label>
            <TextField
                  fullWidth
                  select
                  variant="outlined"
                  value={gameRuleId}
                  id="country"      
                  onChange= {handleChangeGameRule}
                >
                  {gameRules  && gameRules.map((option) => (
             <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          )
          )}
            </TextField>
            
            </Grid>
            {ishowNumberOfLimit && 
            <Grid xs={2}>
                <Label>NumberOfLimit </Label>
                <TextField 
                name="numberOfLimit" 
                type="number"
                
                value={numberOfLimit} 
                fullWidth
                required
                onChange={(event) => { handleChangeNumberOfLimit(event) }}
                />
            </Grid>
            }
        </Grid>
        <br/>
        <Grid>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
          Vouchers
          </Typography>
          <Button onClick={handleClickNew} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            Add Voucher
          </Button>
        </Stack>

        <Card>          

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tempVoucher.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}                  
                />
                <TableBody>
                  {tempVoucher.map((row) => {
                    const { voucherSeriesId, name, description, quantity, expiresOn } = row;
                    

                    return (
                      <TableRow hover key={voucherSeriesId} tabIndex={-1} role="checkbox" >
                        
                        
                        <TableCell align="left">{name}</TableCell>

                        <TableCell align="left">{description}</TableCell> 

                        <TableCell align="left">{quantity}</TableCell>  
                        
                        <TableCell align="left">{expiresOn.year}-{expiresOn.month}-{expiresOn.day} </TableCell>  


                        <TableCell align="right">                        
                        <IconButton size="large" color="inherit" onClick={()=>handleClickEdit(voucherSeriesId)}>
                          <Iconify icon={'eva:edit-fill'}  sx={{ mr: 2 }} />                          
                          </IconButton>
                          <IconButton size="large" color="inherit" onClick={()=>handleClickDelete(voucherSeriesId)}>
                          <Iconify  icon={'eva:trash-2-outline'} color="red" sx={{ mr: 2 }} />                        
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={tempVoucher.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
        </Grid>
        

      </Container>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Voucher</DialogTitle>
        <DialogContent>
        <br/>
        <Grid container spacing={2}>
          <Grid xs={12}>
          <Label>Voucher</Label>
          <TextField
                  fullWidth
                  select
                  variant="outlined"
                  value={voucherId}
                  id="country"      
                  onChange= {handleChangeVoucher}
                >
                  {vouchers  && vouchers.map((option) => (
             <MenuItem key={option.id} name={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          )
          )}
            </TextField>
          
          </Grid>
          <Grid xs={12}>
          <Label>Description</Label>
          <TextField 
            name="descriptionVoucher"  
            value={descriptionVoucher} 
            fullWidth
            disabled            
            />
          </Grid>
          <Grid xs={12}>
          <Label>ExpiresOn</Label>
                <TextField 
                name="start" 
                type="date"
                value={expiresOnText} 
                fullWidth
                required
                onChange={(event) => { handlechangeExpiresOn(event) }}
                />
            </Grid>
          <Grid xs={12}>
          <Label>Quantity</Label>
          <TextField 
            name="quantity" 
            type="number"
            value={quantityText} 
            fullWidth
            required
            onChange= {handleChangeQuantity}            
            />
          </Grid>
          
        </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickCancel}>Cancel</Button>
          <Button onClick={handleClickSubmit}>Add</Button>
        </DialogActions>
      </Dialog>
      
      
    </>
  );
}
