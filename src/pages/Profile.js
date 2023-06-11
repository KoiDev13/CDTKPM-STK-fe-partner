import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

// @mui
import {   IconButton, InputAdornment, Stack, TextField, Link, Paper,styled,Grid  } from '@mui/material';

import Box from '@mui/material/Box';
import {Form, Button, Modal, Container} from 'react-bootstrap'
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { LoadingButton } from '@mui/lab';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

// components
import partnerService from '../services/partner.service';
import headerService from '../services/header.service';
import Iconify from '../components/iconify';
import getService from '../services/getEnum.service'
import Label from '../components/label';
import { checkPassword } from '../utils/check';
import { convertStringToDate } from '../utils/formatTime';
import noti from '../utils/noti';


export default function Profile() {
  
  const [address, setAddress] = useState({
    wardId:"",
    street:""
  })  
  const [openResetPassword, setOpenResetPassword] = useState(false);
  const [name, setName] = useState("");
  const [genders, setGenders] = useState([]);
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateBirthDate] = useState({
    year: 2000,
    month:1,
    day:1
  });
  
  const [open, setOpen] =  useState(false)
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [provines, setProvines] = useState([]);
  const [provineId, setProvineId] = useState("");
  const [districts, setDistricts] = useState([]);
  const [districtId, setDistrictId] = useState("");
  const [wards, setWards] = useState([]);
  const [confirmPassword, setConfirmPassword] = useState("");

  const [dateOfBirthText, setDateOfBirthText] = useState("")
  const [success, setSuccess] = useState(false)
  const [partnerTypes, setPartnerTypes] = useState([]);
  const [partnerType, setPartnerType] = useState("");
 
  const [companyName, setCompanyName] = useState("")
  const [businessCode, setBusinessCode] = useState("")
  const [showCompany, setShowCompany] = useState(false);
  const [provinesCompany, setProvinesCompany] = useState([]);
  const [provineCompanyId, setProvineCompanyId] = useState("");
  const [districtCompanyId, setDistrictCompanyId] = useState("");
  const [districtsCompany, setDistrictsCompany] = useState([]);
  const [wardsCompany, setWardsCompany] = useState([]);
  const [wardId, setWardId] = useState("");
  const [street, setStreet] = useState("");
  const [showResetNewPassword, setShowResetNewPassword] = useState(false)
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [openOtp, setOpenOtp] = useState(false);
  const [newResetPassword, setNewResetPassword] = useState("")
  const handleChangeCompanyWardId = (event) => {        
    setWardId(event.target.value)
    setStreet("")
  }
  const handleChangeCompanyStreet = (event) => {        
    setStreet(event.target.value)
  }
  const handleChangeDistrictCompanyId = (event) => {  
    getService.getAddressWardDistrictId(event.target.value).then(
      response =>{
        if(response.status === 200 && response.data.data) {          
          setWardsCompany(response.data.data.wards);          
        }        
      }
    )
        
    setDistrictCompanyId(event.target.value)
    setWardId("")
    setStreet("")
  }

  const handleChangeProvineCompanyId = (event) => {   
    getService.getAddressDistrictProvineId(event.target.value).then(
      response =>{
        if(response.status === 200 && response.data.data) {
          setDistrictsCompany(response.data.data.districts);
        } 
      }
    )
    setDistrictCompanyId("");
    setWardId("")
    setStreet("")
         
    setProvineCompanyId(event.target.value)
  }
  const handleChangeType = (event) => {    
    setPartnerType(event.target.value)
    if(event.target.value === "Company") {
      setShowCompany(true)
    } else {
      setShowCompany(false)
    }
  }
  const handleChangeEmail = (event) => { 
    setEmail(event.target.value)     
 }
 const handleChangeResetNewPassword = (event) => { 
  setNewResetPassword(event.target.value)     
}

const handleChangeOtp = (event) => { 
  setOtp(event.target.value)     
}
  

  const handleChangeCompanyName = (event) => { 
    setCompanyName(event.target.value)     
 }
 const handleChangeBusinessCode = (event) => {     
   setBusinessCode(event.target.value)     
 }
  
  const handleClickCancel = () => {
    setOpen(false)   
    setOpenOtp(false);
    setOpenResetPassword(false)
    clearScreen();
  }

  const handleChangeName = (event) => {        
    setName(event.target.value)
  } 
  
  const handleChangeBirthDate = (event) => {  
    setDateOfBirthText(event.target.value)
    const date = event.target.value.toString().split('-');
    
    setDateBirthDate({
      year: parseInt(date[0], 10),
      month: parseInt(date[1], 10),
      day: date[2]
    })
  }

  const handleClose = () => {
    setOpen(false)    
  }
 
  const handleWardId = (event) => { 
     
    setAddress(prevState => ({ ...prevState,
      wardId:event.target.value,
      street: ""
    }))
      
  }
  const handleClickSubmitOtp = () => {
    partnerService.VerifyResetPassword(email,otp).then(
      response => {
        if(response.data && response.data.success === true) {
          
          alert(noti.UPDATE_PASSWORD)
          setOpenOtp(false)
          
        } 
      }, error => {
        alert(noti.WRONG_OTP);
        setSuccess(!success)
      }
    )
  }
  const handleClickSubmitResetPassword = () => {
    if (email && newResetPassword ) {
      if (checkPassword(newResetPassword) === true) {
        partnerService.ResetPassword(email, newResetPassword).then(
          response => {
            if (response.data && response.data.success === true) {
              console.log(response.data)
              setOpenResetPassword(false);
              setOpenOtp(true)
            }
          }, error => {
            console.log(error)
          }
        )
      } else {
        alert(noti.ALERT_PASSWORD)
      }
      
    } else {
      alert(noti.MISSING_DATA);
    }
    
  }
  const handleChangeStreet = (event) => {        
    
    setAddress(prevState => ({ ...prevState,
      street:event.target.value}))
  }
  
  const handleChangeNewPassword = (event) => {        
    setNewPassword(event.target.value)
  }
  const handleChangeOldPassword = (event) => {        
    setOldPassword(event.target.value)
  }
  const handleConfirmPassword = (event) => {        
    setConfirmPassword(event.target.value)
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
    setDistrictId("");
    setAddress({
      wardId: "",
      street: ""
    })
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
    setAddress({
      wardId: "",
      street: ""
    })
  }
  
  const handleChangeGender = (event) => {        
    setGender(event.target.value)
  }
  const clearScreen = () => {
    setNewPassword("");
    setOldPassword("");
    setConfirmPassword("");
    setEmail("");
    setNewResetPassword("");
    setOldPassword("");
  }
  
  const handleClickUpdate = () => {
    console.log(name, gender, dateOfBirth, address )

    if(name && dateOfBirthText && gender && provineId && districtId && address.wardId && address.street ) {
      if(partnerType === "Company") {
        const company = {
          name: companyName,
          businessCode,
          address: {
            wardId,
            street
          }
        }
        partnerService.UpdatePartner(name, gender, dateOfBirth, address, partnerType, company).then(
          response => {
            if(response.data && response.data.success === true) {
              alert(noti.EDIT_SUCCESS);
            }
          }, error => {
            setSuccess(!success)
          }
        )
      } else {
        partnerService.UpdatePartner(name, gender, dateOfBirth, address, partnerType).then(
          response => {
            if(response.data && response.data.success === true) {
              alert(noti.EDIT_SUCCESS);

            }
          }, error => {
            setSuccess(!success)
          }
        )
      }
      
    } else {
      alert(noti.MISSING_DATA)
    }
  }

  const handleClickResetPassword = () =>{
    setOpenResetPassword(true);
  }

  const handleClickChangePass = () => {
    setOpen(true)
  }
  const handleClickSubmit = () => {
    console.log(oldPassword , newPassword , confirmPassword)
    if(oldPassword && newPassword && confirmPassword) {
      if(confirmPassword === newPassword ) {
        if(checkPassword(newPassword) === true && newPassword.length >= 8) {
          partnerService.changePassword(oldPassword, newPassword).then(
            response => {
              if(response.data && response.data.success === true) {
                alert(noti.EDIT_SUCCESS)
                setOpen(false)
                setOldPassword("");
                setNewPassword("")
                setConfirmPassword("")
              }
            }, error => {
              setSuccess(!success)
            }
          )
        } else {
          alert(noti.ALERT_PASSWORD)
        }
        
      } else {
        alert(noti.SAMP_PASSWORD)
      }
    } else {
      alert(noti.MISSING_DATA)
    }
  }  
  useEffect (()=>{    
    if(!headerService.GetUser() || headerService.refreshToken() === ""){
      window.location.assign('/login')
    } else {
      getService.getValuesGender().then(
        response =>{
          if(response.data && response.status === 200) {
            const arrayGender  = response.data.data.genderValue;        
              
            setGenders(arrayGender)
          }
          
        }, error => {
          console.log(error)
        }
      )
    
      getService.getAddressProvines().then(
        response =>{
          if(response.data && response.status === 200){
            setProvines(response.data.data.provines);   
            setProvinesCompany(response.data.data.provines);       
          }
        }
      )
      partnerService.PartnerInfo().then(
        response => {
          if (response.data && response.data.success === true) {
            const temp = response.data.data.account
            console.log(temp)
            setName(temp.name)          
            setGender(temp.gender)
            setDateBirthDate(temp.dateOfBirth)
            setDateOfBirthText(convertStringToDate(temp.dateOfBirth))          
            setProvineId(temp.address.ward.province.id )
            setPartnerType(temp.partnerType)
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
            if (temp.partnerType === "Company") {
              setShowCompany(true)
              setCompanyName(temp.company.name)
              setBusinessCode(temp.company.businessCode)
              setProvineCompanyId(temp.company.address.ward.province.id)
              getService.getAddressDistrictProvineId(temp.company.address.ward.province.id).then(
                response =>{
                  if(response.status === 200 && response.data.data) {
                    setDistrictsCompany(response.data.data.districts);
                    setDistrictCompanyId(temp.company.address.ward.district.id)
                    getService.getAddressWardDistrictId(temp.company.address.ward.district.id).then(
                      response =>{
                        if(response.status === 200 && response.data.data) {                      
                          setWardsCompany(response.data.data.wards);
                          setWardId(temp.company.address.ward.id);
                          setStreet(temp.company.address.street)                        
                        }        
                      }
                    )
                  } 
                }
              )
            }
            
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
      getService.getValuesPartnerType().then(
        response =>{
          if(response.status === 200 && response.data.data) {          
            setPartnerTypes(response.data.data.partnerTypValue);
          }        
        }
      )   
    } 

  },[success])

  return (
    <>
    <Helmet>
        <title> Profile  </title>
      </Helmet>
      

      <Box 
        
        sx={{ width: '50%' }}>
          <Button onClick={handleClickResetPassword} className='float-end'>
            ResetPassword
          </Button>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>     
  
          <Grid item xs={7}>  
          <Label>FullName</Label>
            <TextField 
            name="name" 
            fullWidth
            value={name} 
            required
            onChange={(event) => { handleChangeName(event) }}
            />      
          </Grid>
          <Grid item xs={5}>
          <Label>DateOfBirth</Label>
          <TextField 
            fullWidth
            type="date"       
            value={dateOfBirthText} 
            required
            onChange={(event) => { handleChangeBirthDate(event) }}
            />  
          </Grid>
          <Grid item xs={4}>
          <Label>Gender</Label>
          <TextField
                      fullWidth
                      select
                      value={gender}
                      id="country"        
                      onChange= {handleChangeGender}
                    >
                      {genders  && Array.isArray(genders) && genders.map((option) => (
                  <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              )
              )}
                      </TextField>       
          </Grid>
          <Grid item xs={8}>
          <Label>Provine</Label>
          <TextField
                      fullWidth
                      select
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
                      fullWidth
                      select
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
          <Grid item xs={6}>
          <Label>Ward</Label>
          <TextField
                      fullWidth
                      select
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
            fullWidth
            name="street" 
            value={address.street} 
            required
            onChange={(event) => { handleChangeStreet(event) }}
            />
          </Grid>  
          <Grid item xs={4}>
          <Label>Partner Type</Label>
            <TextField
                      fullWidth
                      select
                      value={partnerType}
                      id="country"    
                      onChange= {handleChangeType}
                    >
                      {partnerTypes && Array.isArray(partnerTypes)  && partnerTypes.map((option) => (
                  <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              )
              )}
              </TextField>
          </Grid>

          {showCompany === true && 
          <>
          <Grid item xs={6}>
          <Label>Company Name</Label>
            <TextField 
            fullWidth
            name="companyname" 
            
            value={companyName} 
            type="text"
            required
            onChange={(event) => { handleChangeCompanyName(event) }}
            />
          </Grid>

          <Grid item xs={6}>
          <Label>BusinessCode</Label>
            <TextField 
            name="BusinessCode" 
            fullWidth
            value={businessCode} 
            required
            onChange={(event) => { handleChangeBusinessCode(event) }}
            />      
          </Grid>
          <Grid item xs={6}>
          <Label>Provine</Label>
          <TextField
                      fullWidth
                      select
                      value={provineCompanyId}
                      id="country"       
                      onChange= {handleChangeProvineCompanyId}
                    >
                      {provinesCompany  && provinesCompany.map((option) => (
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
                      fullWidth
                      select
                      value={districtCompanyId}
                      id="country"         
                      onChange= {handleChangeDistrictCompanyId}
                    >
                      {districtsCompany  && districtsCompany.map((option) => (
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
                      value={wardId}
                      id="country"       
                      onChange= {handleChangeCompanyWardId}
                    >
                      {wardsCompany  && wardsCompany.map((option) => (
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
            fullWidth
            name="street" 
            value={street} 
            required
            onChange={(event) => { handleChangeCompanyStreet(event) }}
            />
          </Grid>
          </>
          }    

          <Grid item xs={6} className="">
          <LoadingButton  size="large" type="submit" variant="contained" onClick={handleClickUpdate}>
            Update
          </LoadingButton>
          </Grid>   
          <Grid item xs={6} className="">
          <LoadingButton className='float-center' size="large" type="submit" variant="contained" onClick={handleClickChangePass}>
            Change Password
          </LoadingButton>
          </Grid> 

        </Grid>  
      </Box>
    
    
  
    
        

  <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Change Password </DialogTitle>
        <DialogContent>
        <Grid container spacing={2}>
        <Grid item xs={12}>
        <Label>Old Password</Label>
      <TextField
      
        fullWidth
          name="password"          
          required
          value={oldPassword}
          type={showOldPassword ? 'text' : 'password'}
          onChange={(event) => { handleChangeOldPassword(event) }}   
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowOldPassword(!showOldPassword)} edge="end">
                  <Iconify icon={showOldPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}        
        />        
    </Grid>
        <Grid item xs={12}>
        <Label>New Password</Label>
      <TextField
      
        fullWidth
          name="password"
          
          required
          value={newPassword}
          type={showNewPassword ? 'text' : 'password'}
          onChange={(event) => { handleChangeNewPassword(event) }}   
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowNewPassword(!showNewPassword)} edge="end">
                  <Iconify icon={showNewPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}       
        />        
    </Grid>
    <Grid item xs={12}>
    <Label>Confirm Password</Label>
      <TextField
      fullWidth
          name="ConfirmPassword"
          required
          value={confirmPassword}
          type={showConfirmPassword ? 'text' : 'password'}
          onChange={(event) => { handleConfirmPassword(event) }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                  <Iconify icon={showConfirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
    </Grid>
        </Grid>
        
        </DialogContent>
        <DialogActions>
          <Button className='btn btn-secondary' onClick={handleClickCancel}>Cancel</Button>
          <Button onClick={handleClickSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openResetPassword} onClose={handleClose}>
        <DialogTitle>Reset Password </DialogTitle>
        <DialogContent>
        <Grid container spacing={2}>
        <Grid item xs={12}>
        <Label>Email</Label>
      <TextField
      
        fullWidth
          name="email"          
          required
          value={email}
          type="text"
          onChange={(event) => { handleChangeEmail(event) }}   
                
        />        
    </Grid>
        <Grid item xs={12}>
        <Label>New Password</Label>
      <TextField
      
        fullWidth
          name="password"          
          required
          value={newResetPassword}
          type={showResetNewPassword ? 'text' : 'password'}
          onChange={(event) => { handleChangeResetNewPassword(event) }}   
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowResetNewPassword(!showResetNewPassword)} edge="end">
                  <Iconify icon={showResetNewPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}       
        />        
    </Grid>    
        </Grid>
        
        </DialogContent>
        <DialogActions>
          <Button className='btn btn-secondary' onClick={handleClickCancel}>Cancel</Button>
          <Button onClick={handleClickSubmitResetPassword}>Submit</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openOtp} onClose={handleClose}>
        <DialogTitle>Otp </DialogTitle>
        <DialogContent>
        <Grid container spacing={2}>
        
        
      <Grid item xs={12}>
      <Label>Otp</Label>
        <TextField
        fullWidth
            name="otp"
            required
            value={otp}
            type="text"
            onChange={(event) => { handleChangeOtp(event) }}          
          />
      </Grid> 
        </Grid>
        
        </DialogContent>
        <DialogActions>
          <Button className='btn btn-secondary' onClick={handleClickCancel}>Cancel</Button>
          <Button onClick={handleClickSubmitOtp}>Submit</Button>
        </DialogActions>
      </Dialog>
      
    </>
  );
}
