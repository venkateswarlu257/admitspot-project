import { reset } from "../../../services/reset-password";

export default async function handler(req, res) {
    const {email} = req.body
    if (req.method === 'POST') {
        const result = await reset(email);
        res.send(result)
    }
   else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}