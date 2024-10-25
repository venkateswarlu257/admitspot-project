import { createContact, getContacts,updateContact, deleteContact } from "../../../services/contactServices";
// import db from '../../../config/db';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const result = await createContact(req.body);
        res.send(result)
    }
    else if(req.method === 'GET'){
      const query = req.query;
      const result = await getContacts(query)
      res.send(result)
    }
    else if (req.method === 'PUT'){
      const result = await updateContact(req.body)
      res.send(result)
    }
    else if(req.method === 'DELETE'){
      const queryParams = req.query;
      const result = await deleteContact(queryParams)
      res.send(result)
    }
   else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
