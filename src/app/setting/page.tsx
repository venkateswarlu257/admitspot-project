"use client"
import {Field,Form,Formik} from 'formik'
import Link from 'next/link';
import NavBar from '../navbar/page';
import DecodeJwtToken from '../utils/DecodeJwtToken';

import './index.css'
import ProtectedRoute from '../ProtectedRoute';

const Setting = () => {
      const decoded = DecodeJwtToken()

      const initialValues = {
        username:`${decoded?.username}`,
        email:`${decoded?.email}`,
      }

    const onSubmit = async(values:any) => {
        const url = 'http://localhost:3000/api/auth/userupdate'
        const options = {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        }
        const response = await fetch(url, options)
        const data = await response.json()
        alert(data.message)
    }

    return(
        <ProtectedRoute>
        <center>
            <NavBar/>
            <hr/>
            <div>
                <h1>Account Details</h1>
                <Formik initialValues={initialValues} onSubmit={onSubmit}>
                    <Form className="sign-up-form">
                        <p>ACCOUNT ID {decoded?.id}</p>
                        <label className="input-label" htmlFor="username">
                            USERNAME
                        </label>
                        <Field 
                            type="text"
                            id="username"
                            name="username"
                            className="input-filed border-[#000000] border-[1px]"
                        />
                        <label className="input-label" htmlFor="email">
                            ACCOUNT EMAIL
                        </label>
                        <Field 
                            type="text"
                            id="email"
                            name="email"
                            className="input-filed border-[#000000] border-[1px]"
                        />
                        <p>PASSWORD <Link href='/resetpassword' >Change Password</Link></p>
                        <button type="submit" className="button">Save Changes</button>
                    </Form>
                </Formik>
            </div>
        </center>
        </ProtectedRoute>
    )
}

export default Setting