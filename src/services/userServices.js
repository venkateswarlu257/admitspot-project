import argon2 from "argon2"
import db from '../config/db';
import nodemailer from 'nodemailer'
import {generateToken} from '../utils/jwtUtils'

const resetCodes = {};

const createUser =  async (userData) => {
    const selectUserQuery = `SELECT * FROM mytesdb.user WHERE email = '${userData.email}'`;
    const dbUser = await db.query(selectUserQuery);
    if (dbUser !== undefined) {

      const resetCode = Math.random().toString(36).substring(2, 8).toUpperCase();
      resetCodes[userData.email] = resetCode;

      const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: "venkateswarluchintala1443@gmail.com",
          pass: "xgsermfcgeyevndw",
        },
      });

      const mailOptions = {
        from: {
            name: 'Admit Spot',
            address: 'venkateswarluchintala1443@gmail.com'
        },
        to: [`${userData.email}`],
        subject: "Password Reset Request ✔",
        text: `Your password reset code is ${resetCode}. It will expire in 1 hour.`,
        html: `<center><p>Your password reset code is ${resetCode}. It will expire in 1 hour.</p><h1>${resetCode}</h1></center>`,
      }
      transporter.sendMail(mailOptions)
      return {otp: resetCode};
    } else {
    return {message:"User already exists",status:400};
    }
}

const codeVerification = async (userData) => {
  if(userData?.code === userData?.otp){
    const hashedPassword = await argon2.hash(userData.password);
    const createUserQuery = `
            INSERT INTO 
            user (username, email, password) 
            VALUES 
            (
                '${userData.username}', 
                '${userData.email}',
                '${hashedPassword}'
            )`;
    const dbResponse = await db.query(createUserQuery);
    const newUserId = dbResponse.lastID;
    return {message:`Created new user with ${newUserId}`,status:200};
  }else{
    return{message:"Invalid otp, Enter Correct Code"}
  }
}

const emailLink = async (userData) => {
  const selectUserQuery = `SELECT * FROM mytesdb.user WHERE email = '${userData.email}'`;
    const dbUser = await db.query(selectUserQuery);
    if (dbUser[0] !== undefined) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: "venkateswarluchintala1443@gmail.com",
          pass: "xgsermfcgeyevndw",
        },
      });

      const mailOptions = {
        from: {
            name: 'Admit Spot',
            address: 'venkateswarluchintala1443@gmail.com'
        },
        to: [`${userData.email}`],
        subject: "Password Reset Request ✔",
        text: `Your password reset code is ${'http://localhost:3000/resetpassword'}. It will expire in 1 hour.`,
        html: `<center><p>Your password reset password link is ${'http://localhost:3000/resetpassword'}.</p><button>${'http://localhost:3000/resetpassword'}</button></center>`,
      }
      transporter.sendMail(mailOptions)
    } else {
    return {message:"User already exists",status:400};
    }
}

const updatePassword = async (userData) => {
  console.log(userData.email)
  if(userData.email && userData.password){
    const hashedPassword = await argon2.hash(userData.password);
    const selectUserQuery = `UPDATE user SET password = '${hashedPassword}' WHERE email = '${userData.email}'`;
    await db.query(selectUserQuery)
    return { message: 'Password updated successfully' }
  }else{
    return {message:"Error"}
  }
}

const updateUser = async (userData) => {
  try {
    const contactQuery = `
      UPDATE user 
      SET 
        username = ?, 
        email = ? 
      WHERE 
        id = ?`;
      
    const values = [
      userData.username,
      userData.email,
      userData.id,
    ];
    
    await db.query(contactQuery, values);
    return { message: "User details updated successfully" };
  } catch (error) {
    console.error("Error updating user details:", error);
    throw error;
  }
};


const validateUser = async (userData) => {
    const selectUserQuery = `SELECT * FROM user WHERE email = '${userData.email}'`;
    const dbUser = await db.query(selectUserQuery);
    if (dbUser === undefined) {
        return {message:'Invalid User',status:400}
    } else {
      const isPasswordMatched = await argon2.verify(dbUser[0][0].password, userData.password);
      if (isPasswordMatched === true) {
        const jwtToken =  generateToken(dbUser[0][0])
        return{jwtToken,message:"Login Successfully",status: 200}
      } else {
        return {message: 'Invalid Password',status:200}
      }
    }
  }

export {createUser,codeVerification,emailLink,updatePassword,validateUser,updateUser}