const ACCESS_TOKEN = "access_token";
const REFRESH_TOKEN = 'refresh_token';
const EXPIRE_AT = 'expires_at';
//this service is use for manage token
export const getToken = () => {
    return window.localStorage.getItem(ACCESS_TOKEN);
};

export const saveToken = token => {
    window.localStorage.setItem(ACCESS_TOKEN, token);
    ApiService.init();
};

export const destroyToken = () => {
    window.localStorage.removeItem(ACCESS_TOKEN);
};

export default {getToken, saveToken, destroyToken};