import axios from "axios";
import { getCookie } from "tiny-cookie";
import { SERVER_HOST_DEV } from "../../constants/api";
import { ACCESS_TOKEN_KEY } from "../../constants/token";


//
export const getAllApprover = () => {
  return axios.get(`${SERVER_HOST_DEV}/approvers`, 
    {},
    {
      headers: {
        'x-access-token': getCookie(ACCESS_TOKEN_KEY)
      }
    }
  );
}

export const getAllInformTo = () => {
  return axios.get(`${SERVER_HOST_DEV}/informTo`,
    {},
    {
      headers: {
        'x-access-token': getCookie(ACCESS_TOKEN_KEY)
      }
    }
  );
}