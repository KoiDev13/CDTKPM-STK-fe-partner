import axios from "axios";
import headerService from "./header.service";

const GameAll = () => (
    axios.get(`${process.env.REACT_APP_API_URL}/Game/Available`, { 
      headers: headerService.accessToken()
  })
  );
  const GetGameById = (gameId) => (
    axios.get(`${process.env.REACT_APP_API_URL}/Game/${gameId}`, { 
      headers: headerService.accessToken()
  })
  );

export default {
    GameAll,
    GetGameById
}