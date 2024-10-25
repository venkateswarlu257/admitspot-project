import { createUser } from '../../../services/userServices';
import db from '../../../config/db';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const result = await createUser(req.body);
        res.send(result)
    }
    else if(req.method === 'GET'){
      try {
          const [rows] = await db.query('SELECT * FROM user');
          res.status(200).json(rows);
        } catch (error) {
          res.status(500).json({ message: 'Error fetching users', error });
        }
    }
   else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
