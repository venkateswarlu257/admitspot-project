
import { useState, useEffect } from 'react';
import DecodeJwtToken from '../DecodeJwtToken/index'

interface DataItem {
  id: number;
  name: string;
  email: string;
  phonenumber: number;
  address: string;
}

const UserFetchData = () => {
  const [data, setData] = useState<DataItem[]>([]);

  const fetchData = async () => {
      const decoded = DecodeJwtToken();
      
      const response = await fetch(`http://localhost:3000/api/auth/contact?createdby=${decoded?.id}`);
      const result = await response.json();
      setData(result);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data };
};

export default UserFetchData;
