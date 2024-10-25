'use client'
import {jwtDecode} from "jwt-decode";
import Cookies from 'js-cookie';

interface CustomJwtPayload {
  id: string;
  username:string;
  email: string;
}

 const DecodeJwtToken = (): CustomJwtPayload | null => {
  const jwtToken = JSON.stringify(Cookies.get('jwt_token'))
  if (jwtToken) {
    try {
      const data = jwtDecode<CustomJwtPayload>(JSON.stringify(Cookies.get('jwt_token')));
      return data
      // console.log(data.username)
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  }
  return null;
};

export default DecodeJwtToken