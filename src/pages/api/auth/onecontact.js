import { oneContact } from "../../../services/contactServices";
// import db from '../../../config/db';

export default async function handler(req, res) {
     if(req.method === 'GET'){
        const params = req.query;
        const result = await oneContact(params)
        res.send(result)
    }
   else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
