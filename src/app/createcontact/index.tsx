/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { Field, Formik,Form  } from 'formik'
import DecodeJwtToken from '../utils/DecodeJwtToken'
import './index.css'

const CreateContact = () => {
    const decode = DecodeJwtToken()
    const initialValues = {
        createdby:decode?.id,
        name:"",
        email:"",
        phonenumber:"",
        timezone: new Date()
    }
    const onSubmit = async (values:any) => {
        const url = 'http://localhost:3000/api/auth/contact'
        const options = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        }
        const response = await fetch(url, options)
        const data = await response.json()
        if(response.ok === true){
            alert(data.message)   
        }else{
            alert("error")
        }
    }
    return(
        
        <div className="sign-up-container w-[80%]">
            <Formik initialValues={initialValues} onSubmit={onSubmit} >
                <Form  className="sign-up-form">
                <h1 className='head'>Create a new Contact</h1>
                    <label className="input-label" htmlFor="name">
                        NAME
                    </label>
                    <Field
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Name"
                        className="input-filed border-[#000000] border-[1px]"
                    />

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

                    <label className="input-label" htmlFor="phonenumber">
                        PHONE NUMBER
                    </label>
                    <Field 
                        type="number"
                        id="phonenumber"
                        name="phonenumber"
                        placeholder="Phone Number"
                        className="input-filed border-[#000000] border-[1px]"
                    />

                    <label className="input-label" htmlFor="address">
                        ADDRESS
                    </label>
                    <Field 
                        type="text"
                        id="address"
                        name="address"
                        placeholder="Address"
                        className="input-filed border-[#000000] border-[1px]"
                    />
                    <button type="submit" className="button">Save</button>
                </Form>
            </Formik>
        </div>
    )
}

export default CreateContact