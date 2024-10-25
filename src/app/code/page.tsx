/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { Field, Formik,Form  } from 'formik'
import { useSearchParams, useRouter } from 'next/navigation';
import './index.css'

const Code = () => {
    const router = useRouter()
    const searchParams = useSearchParams();
    const username = searchParams?.get('username');
    const email = searchParams?.get('email');
    const password = searchParams?.get('password');
    const otp       =   searchParams?.get('otp')

    const initialValues = {
        code:'',
        username:username,
        email:email,
        password:password,
        otp: otp
    }
    const onSubmit = async (values:any) => {
        const url = 'http://localhost:3000/api/auth/code'
        const options = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        }
        const response = await fetch(url, options)
        const data = await response.json()
        // alert(data.message)
        console.log(response)
        console.log(data)
        if(response.ok === true){
            alert(data.message)
            if(data?.message !== 'Invalid otp, Enter Correct Code') {
                router.push('/login')
            }
            console.log(response)
            // router.push('/login')
        }
    }
    return(
        <div className="sign-up-container">
            <Formik  initialValues={initialValues} onSubmit={onSubmit} >
            <Form  className="sign-up-form">
            <h1 className='head'>Enter Your Code send to {email} email address</h1>
            <p>The code will Expire in 5 min</p>
                <Field
                    type="text"
                    name="code"
                    className="input-filed border-[#000000] border-[1px]"
                />
                <button type="submit" className="button">Sign Up</button>
            </Form>
        </Formik>
        </div>
    )
}

export default Code