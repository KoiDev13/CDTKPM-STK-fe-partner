import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
// @mui
import {
  Card,  
  Table,
  Stack,
  Paper,  
  Button,  
  TableRow,  
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination, 
  TextField,
  MenuItem,  
    
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';


import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// components
import Label from '../../components/label';
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';

import getService from '../../services/getEnum.service'
   

import storeService from '../../services/store.service';

// sections
import { UserListHead, UserListToolbar } from '../../sections/@dashboard/user';
// mock

import { convertStringToTime } from '../../utils/formatTime';
import headerService from '../../services/header.service';
import partnerService from '../../services/partner.service';
import imageService from '../../services/image.service';
import noti from '../../utils/noti';
// ----------------------------------------------------------------------


const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'description', label: 'Description', alignRight: false },
  { id: 'address', label: 'Address', alignRight: false },
  { id: 'openTime', label: 'OpenTime', alignRight: false },
  { id: 'closeTime', label: 'CloseTime', alignRight: false },
  { id: 'isEnable', label: 'Enable', alignRight: false },
  { id: 'isApproved', label: 'Approved', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
    
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  } 
  return stabilizedThis.map((el) => el[0]);
}

const statusEnable = ["Enable             ", "Disable          "]

export default function Store() {  

  const [bannerUrl, setBannerUrl] = useState("");
  const [urlImage, setUrlImage] = useState("");
  const [stores, setStores] = useState([])
  const [openTime, setOpenTime] = useState({
    hour: 0,
    minute: 1
  })
  const [closeTime, setCloseTime] = useState({
    hour: 0,
    minute: 1
  })

  const [success, setSuccess] = useState(false);
  const [openTimeText, setOpenTimeText] = useState("")
  const [closeTimeText, setCloseTimeText] = useState("")
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');
  const [name, setName] = useState("");

  const [description, setDescription] = useState("");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [address, setAddress] = useState({
    wardId:"",
    street:""
  })
  const [provines, setProvines] = useState([]);
  const [provineId, setProvineId] = useState("");
  const [districts, setDistricts] = useState([]);
  const [districtId, setDistrictId] = useState("");
  const [wards, setWards] = useState([]);
  const [storeId, setStoreId] = useState("");

  const [isEnable, setIsEnable] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [openEnable, setOpenEnable] = useState(false);

  const handleChangeName = (event) => {
    setName(event.target.value) 
  }

  
  const handlechangeDescription = (event) => {
    setDescription(event.target.value) 
  }
  
  const handleClose = () => {
    setOpen(false)    
  }
  const handleWardId = (event) => {         
    setAddress(prevState => ({ ...prevState,
      wardId:event.target.value}))
  }
  const handleChangeStreet = (event) => {        
    
    setAddress(prevState => ({ ...prevState,
      street:event.target.value}))
  }

  const handleChangeImageURL = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file)
    imageService.ImageUpload(formData).then(
      response =>{
        if (response.data && response.data.success === true) {
          const temp = response.data.data.imagePath
          setBannerUrl(temp)
          setUrlImage(`${process.env.REACT_APP_API_URL}${temp}`)
        }
         
      }, error => {
        console.log(error)
      }
    )  
  }
  const handleChangeProvineId = (event) => { 
     
    getService.getAddressDistrictProvineId(event.target.value).then(
      response =>{
        if(response.status === 200 && response.data.data) {
          setDistricts(response.data.data.districts);
        } 
      }
    )
    setProvineId(event.target.value)
  }

  const handleChangeDistrictId = (event) => {  
    getService.getAddressWardDistrictId(event.target.value).then(
      response =>{
        if(response.status === 200 && response.data.data) {
          
          setWards(response.data.data.wards);
        }        
      }
    )
    setDistrictId(event.target.value)
  }
 
  const handleClickEdit = (id ) => {
    storeService.StoreDetail().then(
      response =>{
        if(response.data && response.data.success === true) {
          const temp = response.data.data.store
          console.log(temp)
          setBannerUrl(temp.bannerUrl);
          setUrlImage(`${process.env.REACT_APP_API_URL}${temp.bannerUrl}`)
          setOpen(true)
          setStoreId(temp.id)
          setName(temp.name)

          const tempOpenTime = convertStringToTime(temp.openTime);
          const tempCloseTime = convertStringToTime(temp.closeTime)
          setOpenTimeText(tempOpenTime)
          setCloseTimeText(tempCloseTime)
          setOpenTime(temp.openTime)
          setCloseTime(temp.closeTime)
          setDescription(temp.description)
          setProvineId(temp.address.ward.province.id )
          getService.getAddressDistrictProvineId(temp.address.ward.province.id).then(
            response =>{
              if(response.status === 200 && response.data.data) {
                setDistricts(response.data.data.districts);
                setDistrictId(temp.address.ward.district.id)
                getService.getAddressWardDistrictId(temp.address.ward.district.id).then(
                  response =>{
                    if(response.status === 200 && response.data.data) {
                      
                      setWards(response.data.data.wards);
                      setAddress({
                        wardId:temp.address.ward.id,
                        street: temp.address.street
                      })
                    }        
                  }
                )
              } 
            }
          )
        }
      }, error => {
        alert(noti.ERROR)
        setSuccess(!success)
      }
    )    
  };
  const handleClickDelete = (id) => {
    alert(`delete ${id}`)
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

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
    setSelected([]);
  };

  const handleClickNew = () => {
    setOpen(true);
    
  }
  const handleClickCancel = () => {
    setOpen(false);
    setOpenEnable(false)
  }
  const clearScreen = () => {
    setName("");
    setDescription("")
    setOpenTime({
      hour: 0,
      minute:0
    })
    setCloseTime({
      hour: 0,
      minute: 0
    })
    setAddress("");
    setOpenTimeText("");
    setCloseTimeText("");
    setIsEnable("");
  }

  const handleChangeStatusEnable = (event) =>{
    setIsEnable(event.target.value)
  }

  const handleClickEditEnable = (id) =>{    
    setStoreId(id);
    setOpenEnable(true)
  }

  const handleClickSubmitEnable = () => {
    if(isEnable) {
      if(isEnable === statusEnable[0]) {
        storeService.StoreEnableStoreId().then(
          response => {
            if(response.data  && response.data.success === true) {
              alert(noti.ENABLE_SUCCESS);
              setOpenEnable(false)
              setSuccess(!success)
              clearScreen()
            }
          }, error =>{
            setSuccess(!success);
          }
        )
        
      } 
      else if(isEnable === statusEnable[1]) {
        storeService.StoreDisableStoreId().then(
          response => {
            if(response.data  && response.data.success === true) {
              alert(noti.DISABLE_SUCCESS);
              setOpenEnable(false)
              setSuccess(!success)
              clearScreen();
            }
            
          }, error => {
            setSuccess(!success);
          }
        )        
      }
    } else {
      alert(noti.CONFIRM_CHOOSE_STATUS);
    }
  }

  const handleClickSubmit = () => {    
    console.log(name,description,address,openTime,closeTime)
    if(name && description && provineId && districtId  && address && openTimeText && closeTimeText) {
      if(openTime <= closeTime) {
        if(storeId === "") {
          storeService.StoreRegister(name,description,address,openTime,closeTime, bannerUrl).then(
            response => {
              console.log(response)
              if(response.data &&  response.data.success) {
                alert(noti.CREATE_SUCCESS)   
                setOpen(false);  
                setSuccess(!success)
                clearScreen();          
              }
              
            }, error => {
              setSuccess(!success)
            }
          )
        } else {
          storeService.PutStore(name, description, address, openTime, closeTime, bannerUrl).then(
            response => {
              console.log(response)
              if(response.data &&  response.data.success) {
                alert(noti.EDIT_SUCCESS)   
                setOpen(false);  
                setSuccess(!success)     
                clearScreen();    
              }
              
            }, error => {
              setSuccess(!success)
            }
          )
        }
        
      } else {
        alert(noti.CHECK_HOUR)
      }
    } else {
      alert(noti.MISSING_DATA)
    }      
  }
  const handleChangeOpenTime = (event) => {    
    
    const timeText = event.target.value.split(':')
    
    setOpenTimeText(event.target.value)
    setOpenTime(prevState => ({ ...prevState,
      hour: parseInt(timeText[0], 10),
      minute: parseInt(timeText[1], 10)
    }))
    
  }
  const handleChangeCloseTime = (event) => {

    const timeText = event.target.value.split(':')
    
    setCloseTimeText(event.target.value)
    setCloseTime(prevState => ({ ...prevState,
      hour:parseInt(timeText[0],10),
      minute:parseInt(timeText[1], 10)
    }))
  } 

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - stores.length) : 0;

  const filteredUsers = applySortFilter(stores, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;
  useEffect(() =>{
    if(!headerService.GetUser() || headerService.refreshToken() === ""){
      window.location.assign('/login')
    }
    getService.getAddressProvines().then(
      response =>{
        if(response.data && response.data.success && response.data.data){
          setProvines(response.data.data.provines);          
        }
      }
    )
    storeService.StoreDetail().then(
      response => {
        console.log(response.data)
        if(response.data && response.data.success ){     
          const array = [];
          array.push(response.data.data.store);
          setStores(array) 
        }
      }, error => {
        if(error.response && error.response.status === 401) {
          console.log(error.response)
          const token = headerService.refreshToken();
          partnerService.refreshToken(token).then(
            response => {
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
    
  },[success])

  return (
    <>
      <Helmet>
        <title> Store  </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Store
          </Typography>
          {(success === false) && 
          <Button onClick={handleClickNew} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            New Store
          </Button>
          }
        </Stack>

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName}  />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={1}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, name, description, address, openTime, closeTime,isApproved , isEnable } = row;
                    const selectedUser = selected.indexOf(name) !== -1;

                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                         
                         <TableCell align="left">{name}</TableCell>
                        <TableCell align="left">{description}</TableCell>

                        <TableCell align="left"> {address.street} {address.ward.fullName}  {address.ward.district.fullName}</TableCell>
                        <TableCell align="left">{openTime.hour }: {openTime.minute}</TableCell>
                        <TableCell align="left">{closeTime.hour}: {closeTime.minute}</TableCell>
                        
                        <TableCell align="left">
                        {(isEnable === true ) ? 
                          (<Button className='btn btn-primary' onClick={() => handleClickEditEnable(id)}>Enable</Button>):                           
                          (<Button className='btn btn-warning' onClick={() => handleClickEditEnable(id)}>Disable</Button>)}
                        </TableCell> 

                        <TableCell align="left">
                          {isApproved ? <Label color="success">{sentenceCase('Yes')}</Label>: 
                          <Label color="warning">{sentenceCase('No')}</Label>}
                        </TableCell>                        

                        <TableCell align="right">                        
                          <IconButton size="large" color="inherit" onClick={()=>handleClickEdit(id)}>
                          <Iconify icon={'eva:edit-fill'}  sx={{ mr: 2 }} />                          
                          </IconButton>
                          <IconButton size="large" color="inherit" onClick={()=>handleClickDelete(id)}>
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

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={1}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>

      </Container>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Store</DialogTitle>
        <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
          <Label>Store Name</Label>
            <TextField 
              name="name" 
              fullWidth
              value={name} 
              required
              onChange={(event) => { handleChangeName(event) }}
              />
          </Grid>
          <Grid item xs={12}>
          <Label>Description</Label>
            <TextField 
              name="description" 
              value={description} 
              fullWidth
              required
              onChange={(event) => { handlechangeDescription(event) }}
              />
          </Grid>
          <Grid item xs={6}>
          <Label>Provine</Label>
          <TextField
                  fullWidth
                  select
                  variant="outlined"
                  value={provineId}
                  id="country"          
                  onChange= {handleChangeProvineId}
                >
                  {provines  && provines.map((option) => (
             <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          )
          )}
          </TextField>
          </Grid>
          <Grid item xs={6}>
          <Label>District</Label>
          <TextField                
                  select
                  fullWidth
                  variant="outlined"
                  value={districtId}
                  id="country" 
                  onChange= {handleChangeDistrictId}
                >
                  {districts  && districts.map((option) => (
             <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          )
          )}
            </TextField>
          </Grid>
          <Grid item xs={4}>
          <Label>Ward</Label>
          <TextField
                  fullWidth
                  select
                  variant="outlined"
                  value={address.wardId}
                  id="country"      
                  onChange= {handleWardId}
                >
                  {wards  && wards.map((option) => (
             <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          )
          )}
            </TextField>  
          </Grid>
          <Grid item xs={8}>
          <Label>Street</Label>
            <TextField 
            name="street" 
            fullWidth
            value={address.street} 
            required
            onChange={(event) => { handleChangeStreet(event) }}
            />
          </Grid>
          <Grid item xs={6}>
          <Label>Open Time</Label>
          <TextField 
            name="openTime" 
            type="time"
            fullWidth
            value={openTimeText} 
            required
            onChange={(event) => { handleChangeOpenTime(event) }}
            />
          </Grid>
          <Grid item xs={6}> 
          <Label>Close Time</Label>
          <TextField 
            name="closeTime" 
            type="time"
            fullWidth
            value={closeTimeText} 
            required
            onChange={(event) => { handleChangeCloseTime(event) }}
            />
          </Grid>
          <Grid xs={12}>
          <Label>Image</Label>
          <form encType='multipart/form-data'>
            <input type="file" onChange={(event) => { handleChangeImageURL(event) }}/>          
            
          </form>
          <br/>
          {(urlImage !== "") && <img src={urlImage} alt="Trulli" width="550" height="333"/>}
          </Grid>
        </Grid> 
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickCancel}>Cancel</Button>
          <Button onClick={handleClickSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openEnable} onClose={handleClose}>
        <DialogTitle>Edit Enable</DialogTitle>
        <DialogContent> 
        <DialogContentText>
            Please choose Enable or Disable.
          </DialogContentText>
          <Grid container spacing={2}>
          <Grid item xs={12}>
          <Label>Status</Label>
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
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickCancel}>Cancel</Button>
          <Button onClick={handleClickSubmitEnable}>Submit</Button>
        </DialogActions>
      </Dialog>
      
    </>
  );
}
