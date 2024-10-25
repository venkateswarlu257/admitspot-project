import { updatePassword } from '../../../services/userServices';

export default async function handler(req, res) {
    if (req.method === 'PUT') {
        const result = await updatePassword(req.body);
        res.send(result)
    }
   else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}