import axios from "axios";

import headerService from "./header.service";

const VoucherAllByStore = (storeId = headerService.getUserId()) => (
    axios.get(`${process.env.REACT_APP_API_URL}/Voucher/VoucherSeries/All/${storeId}`, { 
      headers: headerService.accessToken()
  })
  );

  const GetVoucherById = (voucherSeriesId) => (
    axios.get(`${process.env.REACT_APP_API_URL}/Voucher/VoucherSeries/${voucherSeriesId}`, { 
      headers: headerService.accessToken()
  })
  );
  
  const DeleteVoucherById = (voucherSeriesId) => (
    axios.delete(`${process.env.REACT_APP_API_URL}/Voucher/VoucherSeries/${voucherSeriesId}`
    ,{ 
      headers: headerService.accessToken()
  })
  );
  

  const PutVoucherById = (name, description, voucherSeriesId ) => (
    axios.put(`${process.env.REACT_APP_API_URL}/Voucher/VoucherSeries/${voucherSeriesId}`,{
      name, description
    }, { 
      headers: headerService.accessToken()
  })
  );

  
  const PostVoucher = (name, description) => (
    axios.post(`${process.env.REACT_APP_API_URL}/Voucher/VoucherSeries/Create`,{
      name, description
    }, { 
      headers: headerService.accessToken()
  })
  );

  const voucherService = {
    PostVoucher,
    VoucherAllByStore,   
    GetVoucherById,
    PutVoucherById,
    DeleteVoucherById
  }

  export default voucherService