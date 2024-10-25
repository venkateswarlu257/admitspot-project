/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { Field, Formik,Form  } from 'formik'
import NavBar from "../navbar/page"
import Slider from "../slider"
import UserFetchData from "../utils/UserFetchData"
import { useState,useMemo } from "react"
import './index.css'
import ProtectedRoute from '../ProtectedRoute'


const UpdateContact = () => {
    const [selectedId, setSelectedId] = useState<any>(null)
    const [uD,setUD] = useState<any>(null)
    const {data} = UserFetchData()

    const initialValues = useMemo(() => ({
        id: uD?.id || "",
        name:uD?.name || "",
        email: uD?.email || "",
        phonenumber: uD?.phonenumber || "",
        address: uD?.address || ""
    }), [uD]);

    const getuser = async() => {
        if(selectedId){
            const response = await fetch(`http://localhost:3000/api/auth/onecontact?id=${selectedId}`)
            const data = await response.json()
            setUD(data[0])
        }else{
            console.log("err")
        }
    }

    const handleSelectChange = (event:any) => {
        const selectedValue = event.target.value;
        setSelectedId(selectedValue); 
    };
    const get = () => {
        getuser();
    }

    const onSubmit = async(values:any) => {
        const url = 'http://localhost:3000/api/auth/contact'
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
        <div>
            <NavBar/>
        <div className="flex ">
        <Slider/>
            <div className="container flex flex-col items-center">
                <div>
                {data.length > 0 ?(
                    <ul key="id">
                        <select onChange={handleSelectChange} value={selectedId}>
                            <option value="">Select</option>
                            {data && data.map(eachUser => (
                                <option value={eachUser.id} key={eachUser.id}><li>{eachUser.email} - {eachUser.name}</li></option>
                            ))}
                        </select>
                    </ul>
                    ):(<p>No contacts found.</p>)
                }
                </div>
                <button className='border-2 border-[#ccc]' onClick={get}>Get Details</button>
                {uD &&
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
                }
            </div>
        </div>
        </div>
        </ProtectedRoute>
    )
}

export default UpdateContact
