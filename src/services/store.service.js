import axios from "axios";

import headerService from "./header.service";


const StoreDetail = () => (
    axios.get(`${process.env.REACT_APP_API_URL}/Partner/Store/Detail`, { 
      headers: headerService.accessToken()
  })
  );
  
  const StoreRegister = (name, description, address, openTime, closeTime,  bannerUrl, isEnable = true ) => (
    
    axios.post(`${process.env.REACT_APP_API_URL}/Partner/Store/Register`,{
        name, description, address, openTime, closeTime, isEnable, bannerUrl
   }, { 
    headers: headerService.accessToken() 
    })
);
const PutStore = (name, description, address, openTime, closeTime,  bannerUrl, isEnable = true) => (
    
    axios.put(`${process.env.REACT_APP_API_URL}/Partner/Store/Update`,{
        name, description, address, openTime, closeTime, isEnable, bannerUrl
   }, { 
    headers: headerService.accessToken() 
    })
);
const StoreEnableStoreId = () => (
    axios.put(`${process.env.REACT_APP_API_URL}/Partner/Store/Enable`, {
  
    },{ 
      headers: headerService.accessToken()
  })
  );
  
  const StoreDisableStoreId = () => (
    axios.put(`${process.env.REACT_APP_API_URL}/Partner/Store/Disable`, {
      
    }, { 
      headers: headerService.accessToken()
  })
  );
  
  

  export default {
    StoreDetail,
    StoreRegister,
    StoreEnableStoreId,
    StoreDisableStoreId,
    PutStore
  }