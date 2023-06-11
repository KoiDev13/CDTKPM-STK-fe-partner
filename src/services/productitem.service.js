import axios from "axios";

import headerService from "./header.service";


  const ProductItemAllByStoreId = (storeId = headerService.getUserId()) => (
    axios.get(`${process.env.REACT_APP_API_URL}/ProductItem/All/${storeId}`, { 
      headers: headerService.accessToken()
  })
  );
  const ProductItemAvailable = () => (
    axios.get(`${process.env.REACT_APP_API_URL}/ProductItem/Available`, { 
      headers: headerService.accessToken()
  })
  );
  const ProductItemAvailableByStoreId = (storeId = headerService.getUserId()) => (
    axios.get(`${process.env.REACT_APP_API_URL}/ProductItem/Available/${storeId}`, { 
      headers: headerService.accessToken()
  })
  );
  const GetProductItemById = (productItemId) => (
    axios.get(`${process.env.REACT_APP_API_URL}/ProductItem/${productItemId}`, { 
      headers: headerService.accessToken()
  })
  );
  
  const DeleteProductItemById = (productItemId) => (
    axios.delete(`${process.env.REACT_APP_API_URL}/ProductItem/${productItemId}`, { 
      headers: headerService.accessToken()
  })
  );
  
  const PutDisableProductItemById = ( productItemId) => (
    axios.put(`${process.env.REACT_APP_API_URL}/ProductItem/Disable/${productItemId}`,{
      
    }, { 
      headers: headerService.accessToken()
  })
  );

  const PutEnableProductItemById = (productItemId) => (
    axios.put(`${process.env.REACT_APP_API_URL}/ProductItem/Enable/${productItemId}`,{
      
    }, { 
      headers: headerService.accessToken()
  })
  );

  const PutProductItemById = (name, description, productCategoryId, price, imageUrl,  productItemId, isEnable = true) => (
    axios.put(`${process.env.REACT_APP_API_URL}/ProductItem/${productItemId}`,{
      name, description, productCategoryId, price, imageUrl,  isEnable
    }, { 
      headers: headerService.accessToken()
  })
  );

  
  const PostProductItem = (name, description, productCategoryId, price, imageUrl="/Image/ProductItem",  isEnable = true) => (
    axios.post(`${process.env.REACT_APP_API_URL}/ProductItem/Create`,{
      name, description,  productCategoryId, price, imageUrl, isEnable
    }, { 
      headers: headerService.accessToken()
  })
  );

  export default {
    PostProductItem,
    
    ProductItemAvailable,
    GetProductItemById,
    PutProductItemById,
    PutDisableProductItemById,
    PutEnableProductItemById,
    DeleteProductItemById,
    ProductItemAvailableByStoreId,
    ProductItemAllByStoreId
  }