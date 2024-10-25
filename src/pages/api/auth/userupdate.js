import { updateUser } from '../../../services/userServices';

export default async function handler(req, res) {
    if (req.method === 'PUT') {
        const result = await updateUser(req.body);
        res.send(result)
    }
}