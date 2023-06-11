import axios from "axios";
import headerService from "./header.service";



const CampaignCount = () => (
    axios.get(`${process.env.REACT_APP_API_URL}/Dashboard/Partner/CampaignCount`,  { 
     headers: headerService.accessToken()
  })
)

const CampaignCountByStatus = () => (
    axios.get(`${process.env.REACT_APP_API_URL}/Dashboard/Partner/CampaignCountByStatus`,  { 
     headers: headerService.accessToken()
  })
)
const TotalNumberOfPlay = () => (
    axios.get(`${process.env.REACT_APP_API_URL}/Dashboard/Partner/TotalNumberOfPlay`,  { 
     headers: headerService.accessToken()
  })
)
const TotalNumberOfPlayer = () => (
    axios.get(`${process.env.REACT_APP_API_URL}/Dashboard/Partner/TotalNumberOfPlayer`,  { 
     headers: headerService.accessToken()
  })
)
const TotalNumberOfVoucher = () => (
    axios.get(`${process.env.REACT_APP_API_URL}/Dashboard/Partner/TotalNumberOfVoucher`,  { 
     headers: headerService.accessToken()
  })
)
const ProductItemCount = () => (
    axios.get(`${process.env.REACT_APP_API_URL}/Dashboard/Partner/ProductItemCount`,  { 
     headers: headerService.accessToken()
  })
)

const ItemCountByCategory = () => (
    axios.get(`${process.env.REACT_APP_API_URL}/Dashboard/Partner/ItemCountByCategory`,  { 
     headers: headerService.accessToken()
  })
)

const dashboardService = {
    TotalNumberOfPlay,
    TotalNumberOfPlayer,
    TotalNumberOfVoucher,
    CampaignCount,
    CampaignCountByStatus,
    ProductItemCount, 
    ItemCountByCategory
}
export default dashboardService;
  
  