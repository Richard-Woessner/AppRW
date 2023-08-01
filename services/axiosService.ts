import axiosStatic from 'axios';
import storage from '../storage/storage';
import config from '../config';


export const axios = axiosStatic.create({
  baseURL: config.gamesApiUrl,
});

const getToken = async () => 'ryywi3voeljttxcq243iybirpt9ndp';//storage.getData('token');

(async function () {
  const authToken = await getToken();
  axios.defaults.headers.common.ClientId = config.clientId;

  console.log(authToken);
  
  if (authToken === null) {
    console.log(1);
    const { data } = await axios.post(`https://id.twitch.tv/oauth2/token?client_id=${config.clientId}&client_secret=${config.clientSecret}&grant_type=client_credentials`);
    console.log(data);
    
    axios.defaults.headers.common.Authorization = null;


    

  } else {
    axios.defaults.headers.common.Authorization = `Bearer ${authToken}`;
  }
})();

axios.interceptors.request.use(async (requestConfig) => {
  if (requestConfig.url?.startsWith('/')) {
    try {
      const authToken = await getToken();
      requestConfig.headers['ClientId'] = config.clientId;
      requestConfig.headers['Authorization'] = `Bearer ${authToken}`;
    } catch (e) {
      // TODO
    }
  }
  return requestConfig;
});

axios.interceptors.response.use(async (response) => {
  return response;
});

export class AxiosService {
  private static staticAxios = axios;

  protected get axios() {
    return AxiosService.staticAxios;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected constructor() {}
}
