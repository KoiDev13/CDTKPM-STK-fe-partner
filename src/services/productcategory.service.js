import axios from "axios";

import headerService from "./header.service";


  const ProductCategoryAvalible = () => (
    axios.get(`${process.env.REACT_APP_API_URL}/ProductCategory/Avalible`, { 
      headers: headerService.accessToken()
  })
  );
  const GetProductCategoryById = (productCategoryId) => (
    axios.get(`${process.env.REACT_APP_API_URL}/ProductCategory/${productCategoryId}`, { 
      headers: headerService.accessToken()
  })
  );
  
  

  export default {   
    ProductCategoryAvalible,
    GetProductCategoryById,
    
  }