/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import {ErrorMessage, Field,Form,Formik} from 'formik'
import Link from 'next/link';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';
import { VscEyeClosed } from "react-icons/vsc";
import { VscEye } from "react-icons/vsc";
import './index.css'

const LoginForm = () => {
  const [errMessage,setErrMessage] = useState(null)
  const [text,setText] = useState(false)

  const changeToText = () => {
    setText(true)
  }
  const changeToPassword = () => {
    setText(false)
  }

  const router = useRouter()

  const onSubmitSuccess = (jwtToken:string) => {
    Cookies.set('jwt_token', jwtToken, {expires: 1})
    router.push('/home')
  }
 
  const initialValues = {
    email:'',
    password: ''
  }

const onSubmit = async (values:any) => {
  const url = 'http://localhost:3000/api/auth/login'
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  }
  const response = await fetch(url, options)
  const data = await response.json()
  if (response.ok === true){
    onSubmitSuccess(data.jwtToken)
    alert(data.message)
  }else{
    setErrMessage(data.message)
  }
}

const validationSchema = Yup.object({
  email: Yup.string()
    .email('*Invalid email address')
    .matches(
      /^[a-zA-Z0-9_]+@gmail\.com$/,
      '*Email must only contain letters, numbers before  @gmail.com'
    )
    .matches(
      /^[a-zA-Z0-9_]{2,}@gmail\.com$/,
      '*Email must have at least 2 characters before @gmail.com',
    )
    .required('*Email is required'),
  password: Yup.string()
    .min(6, '*Password must be at least 6 characters long')
    .required('*Password is required'),
});
    
    return(
        <>
        <nav>
            <h1>AdmitSpot</h1>
        </nav>
        <div className="sign-up-container">
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            <Form className="sign-up-form">
            <h1 className='head'>Login to your account</h1>
            <p>Please enter in your credentials to login</p>
                <label className="input-label" htmlFor="email">
                EMAIL
                </label>
                <Field 
                type="text"
                id="email"
                name="email"
                placeholder="Email"
                className="input-filed border-[#000000] border-[1px]"
                />
                <ErrorMessage component="div" className="error-message" name="email"/>

                <label className="input-label" htmlFor="password">
                    PASSWORD
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
                <Link className='text-[10px] text-[blue] ' href='/resetform'>Forget Password ?</Link>
                <button type="submit" className="button">Login</button>
                {errMessage && <div className="error-message">{`*${errMessage}`}</div>}
                <div className='membership'>
                <p>Not a member?<Link href="/signup">SignUp Now</Link></p>
                </div>
            </Form>
        </Formik>
        </div>
        </>
    )
}

export default LoginForm