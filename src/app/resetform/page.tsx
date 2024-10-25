/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { ErrorMessage,Field, Formik,Form  } from 'formik'

// import {  useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import * as Yup from 'yup';
import './index.css'

const ResetForm = () => {
    // const router = useRouter()
    const initialValues = {
        email:"",
    }
    const onSubmit = async (values:any) => {
        const url = 'http://localhost:3000/api/auth/sendlink'
        const options = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        }
        const response = await fetch(url, options)
        console.log(response)
        if(response.ok === true){
            Cookies.set('gmail',values.email,{expires: 5/1440})
        }
    }
    const validationSchema = Yup.object({

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
      });

    return(
        <div className="sign-up-container">
            <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={onSubmit} >
            <Form  className="sign-up-form">
            <p>Enter Your email address to send Resetpassword link to your mail</p>
                <Field
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Email"
                    className="input-filed border-[#000000] border-[1px]"
                />
                <ErrorMessage component="div" className="error-message" name="username"/>

                <button type="submit" className="button">Submit</button>
            </Form>
        </Formik>
        </div>
    )
}

export default ResetForm