/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { ErrorMessage,Field, Formik,Form  } from 'formik'
import { VscEyeClosed } from "react-icons/vsc";
import { VscEye } from "react-icons/vsc";
import Cookies from 'js-cookie';
import { useState } from 'react';
import * as Yup from 'yup';
import {  useRouter } from 'next/navigation';
import './index.css'
import DecodeJwtToken from '../utils/DecodeJwtToken';

const ResetPassword = () => {
  const decoded = DecodeJwtToken()
    const router = useRouter()
    const [text,setText] = useState(false)
  const [conf,setConf] = useState(false)
  
  const changeToText = () => {
    setText(true)
  }
  const changeToPassword = () => {
    setText(false)
  }

  const changeToTextConf = () => {
    setConf(true)
  }
  const changeToPasswordConf = () => {
    setConf(false)
  }

  // const gmail = Cookies.get('gmail')
    const initialValues = {
      email:Cookies.get('gmail') || decoded?.email ,
      password:''
    }

    const onSubmit = async (values:any) => {
        const url = 'http://localhost:3000/api/auth/resetpassword'
        const options = {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        }
        const response = await fetch(url, options)
        const data = await response.json()
        console.log(response)
        console.log(data)
        if(response.ok === true){
            alert(data.message)
            console.log(response)
            router.push('/login')
        }
    }

    const validationSchema = Yup.object({
        password: Yup.string()
          .min(6, '*Password must be at least 6 characters long')
          .required('*New Password is required'),
        confirmpassword: Yup.string()
          .oneOf([Yup.ref('password')], '*New Passwords must match')
          .required('*Confirm Password is required'),
      });


    return(
        <div className="sign-up-container">
            <Formik validationSchema={validationSchema}  initialValues={initialValues} onSubmit={onSubmit} >
            <Form  className="sign-up-form">
            <p>Reset Your Password</p>
            <label className="input-label" htmlFor="password">
                    NEW PASSWORD
                </label>
                <div className='icon-card'>
                <Field 
                    type={text === false ? "password":"text"}
                    id="password"
                    name="password"
                    placeholder="Password"
                    className="input-filed input"
                />
                {text === false ? <VscEyeClosed onClick={changeToText} className='icon' />:<VscEye onClick={changeToPassword} className='icon' />}
                </div>
                <ErrorMessage component="div" className="error-message" name="password" />

                <label className="input-label" htmlFor="confirmpassword">
                    CONFIRM NEW PASSWORD
                </label>
                <div className='icon-card'>
                <Field 
                    type={conf === false ? "password":"text"}
                    id="password"
                    name="confirmpassword"
                    placeholder="confirmpassword"
                    className="input-filed input"
                />
                {conf === false ? <VscEyeClosed onClick={changeToTextConf} className='icon' />:<VscEye onClick={changeToPasswordConf} className='icon' />}
                </div>
                <ErrorMessage component="div" className="error-message" name="confirmpassword" />
                <button type="submit" className="button">Submit</button>
            </Form>
        </Formik>
        </div>
    )
}

export default ResetPassword