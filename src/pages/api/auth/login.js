
import { validateUser } from '../../../services/userServices';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const result = await validateUser(req.body);
        res.send(result)
    }
   else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}