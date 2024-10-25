/* eslint-disable @typescript-eslint/no-unused-vars */
import jwt from 'jsonwebtoken';
// import { use } from 'react';
const generateToken = (user) => {
    let payload = {
        username: user.username,
        id: user.id,
        email: user.email
    }
    return jwt.sign(payload,"MY_SECRET_TOKEN")
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, "MY_SECRET_TOKEN");
    } catch (err) {
        return null;
    }
};

const generateCode = () => {
    const resetCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    return resetCode
}

export { generateToken, verifyToken, generateCode };
