/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { ErrorMessage,Field, Formik,Form  } from 'formik'
import { VscEyeClosed } from "react-icons/vsc";
import { VscEye } from "react-icons/vsc";
import Link from 'next/link';
import { useState } from 'react';
import * as Yup from 'yup';

import { useRouter } from 'next/navigation';

import './index.css'

const SignUpForm = () => {
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
    const initialValues = {
        username:"",
        email:"",
        password:""
    }
    const router = useRouter()

    const onSubmit = async (values:any) => {
        const url = 'http://localhost:3000/api/auth/signup'
        const options = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        }
        const response = await fetch(url, options)
        const data = await response.json()
        console.log(data)
        console.log({response})
        if(response.ok === true){
          router.push(`/code?username=${encodeURIComponent(values.username)}&email=${encodeURIComponent(values.email)}&password=${encodeURIComponent(values.password)}&otp=${encodeURIComponent(data?.otp)}`);
        }
    }

    const validationSchema = Yup.object({
        username: Yup.string()
        .required('*Username is required'),

        email: Yup.string()
          .email('*Invalid email address')
          // .matches(
          //   /^[a-zA-Z0-9_]+@gmail\.com$/,
          //   '*Email must only contain letters, numbers before  @gmail.com'
          // )
          // .matches(
          //   /^[a-zA-Z0-9_]{2,}@gmail\.com$/,
          //   '*Email must have at least 2 characters before @gmail.com',
          // )
          .required('*Email is required'),
        password: Yup.string()
          .min(6, '*Password must be at least 6 characters long')
          .required('*Password is required'),
        confirmpassword: Yup.string()
          .oneOf([Yup.ref('password')], '*Passwords must match')
          .required('*Confirm Password is required'),
      });

    return(
        <>
        <nav>
            
        </nav>
        <div className="sign-up-container">
        <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={onSubmit} >
            <Form  className="sign-up-form">
            <h1 className='head'>Create your account</h1>
            <p>Please enter in your credentials to signup</p>
                <label className="input-label" htmlFor="username">
                    USERNAME
                </label>
                <Field
                    type="text"
                    id="username"
                    name="username"
                    placeholder="username"
                    className="input-filed border-[#000000] border-[1px]"
                />
                <ErrorMessage component="div" className="error-message" name="username"/>

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

                <label className="input-label" htmlFor="confirmpassword">
                    CONFIRM PASSWORD
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

                <button type="submit" className="button">Sign Up</button>
                <div className='membership'>
                    <p>Already have an account?<Link href="/login">Login</Link></p>
                </div>
            </Form>
        </Formik>
        </div>
        </>
    )
}

export default SignUpForm