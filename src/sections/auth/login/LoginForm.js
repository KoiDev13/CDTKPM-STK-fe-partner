import { useState } from 'react';

// @mui
import { Stack, IconButton, InputAdornment, TextField, Checkbox, Link } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import service from '../../../services/partner.service'
import noti from '../../../utils/noti';

// ----------------------------------------------------------------------



export default function LoginForm() {
  

  const [userName, setUserName] = useState("");
  
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleUserName = (event) => {        
    setUserName(event.target.value)
  }
  const handlePassword = (event) => {        
    setPassword(event.target.value)
  }
  const handleClick = () => {
    if (userName && password) {
      service.login(userName, password).then(
        response => {
          if(response.data.success && response.data.data) {
            alert(response.data.message);
            localStorage.setItem("user", JSON.stringify(response.data.data.account));
            localStorage.setItem("token", JSON.stringify(response.data.data.token)) 
            window.location.assign('/');
          }
          console.log(response.data);
          
        }, error =>{
          alert(error.response.data.message);
          
        }
      )
    } else {
      alert(noti.MISSING_DATA)
    }
    
    
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField 
        name="userName" 
        label="User Name" 
        value={userName} 
        required
        onChange={(event) => { handleUserName(event) }}
        />

        <TextField
          name="password"
          label="Password"
          required
          value={password}
          type={showPassword ? 'text' : 'password'}
          onChange={(event) => { handlePassword(event) }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack  direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox hidden name="remember" label="Remember me" /> 
        
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Login
      </LoadingButton>
      <Stack  direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Link href='/register'> Register
        </Link>
      </Stack>
    </>
  );
}
