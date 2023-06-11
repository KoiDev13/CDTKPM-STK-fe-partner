const accessToken = () => {
  const user = JSON.parse(localStorage.getItem('token'));
  
  if (user &&  user.accessToken)  {
    return {
      Authorization: `Bearer ${user.accessToken}`      
    } 
  }
  return {

  }
}
const accessTokenImage = () => {
  const user = JSON.parse(localStorage.getItem('token'));
  
  if (user &&  user.accessToken)  {
    return {
      Authorization: `Bearer ${user.accessToken}`,
      "Content-Type": "multipart/form-data"     
    } 
  }
  return {

  }
}

const refreshToken = () => {
  
  const user = JSON.parse(localStorage.getItem('token'));
  if (user && user.refreshToken)  {
    return user.refreshToken
  }
  return ""
}

const userName = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  if(user && user.userName){
    return user.userName
  }  
  return ""  
}

const getUserId = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if(user  && user.id) {
    return user.id;
  }
  return ""  
}

const GetUser = () => (
  JSON.parse(localStorage.getItem('user'))
)

const headerService = {
  accessToken,
  refreshToken,
  userName,
  GetUser, 
  getUserId,
  accessTokenImage
}
export default headerService;