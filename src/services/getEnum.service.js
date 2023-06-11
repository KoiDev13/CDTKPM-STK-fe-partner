import axios from "axios";

const getValuesGameRule =  () => 
    axios.get(`${process.env.REACT_APP_API_URL}/Values/GameRule`)

const getValuesGender =  () => 
    axios.get(`${process.env.REACT_APP_API_URL}/Values/Gender`)

const getValuesPartnerType = () =>
     axios.get(`${process.env.REACT_APP_API_URL}/Values/PartnerType`)


const getValuesUserType = () =>
     axios.get(`${process.env.REACT_APP_API_URL}/Values/UserType`)


const getAddressDistrictProvineId = (ProvineId ="01") =>
     axios.get(`${process.env.REACT_APP_API_URL}/Address/District/ProvineId?ProvineId=${ProvineId}`)

const getAddressProvines = () =>
     axios.get(`${process.env.REACT_APP_API_URL}/Address/Provines`)

const getAddressWardDistrictId = (DistrictId="001") =>
     axios.get(`${process.env.REACT_APP_API_URL}/Address/Ward/DistrictId?DistrictId=${DistrictId}`)


export default {
    getValuesGender,
    getValuesPartnerType,
    getValuesUserType,
    getAddressDistrictProvineId,
    getAddressProvines,
    getAddressWardDistrictId,
    getValuesGameRule
}