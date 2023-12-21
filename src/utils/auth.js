export function getAccessToken() {
    const accessToken = localStorage.getItem("accessToken");
    return accessToken ? accessToken : null;
  }
  
  export function getUserId() {
    const userId = localStorage.getItem("userId");
    return userId ? parseInt(userId,10) : null;
  }