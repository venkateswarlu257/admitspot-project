/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useEffect, useState } from 'react'
import { MdDelete } from "react-icons/md";
import DecodeJwtToken from '../utils/DecodeJwtToken'
import Slider from '../slider'
import NavBar from '../navbar/page'

import './index.css'
import ProtectedRoute from '../ProtectedRoute';

const AllContacts = () => {
    const [contacts,setContacts] = useState<[]>([])

    const deletecontact = async (id:any) => {
        const url = `http://localhost:3000/api/auth/contact?id=${id}`
        const options = {
            method: 'DELETE'
        }
        const response = await fetch(url, options)
        const data = await response.json()
        setContacts((prev:any) => prev.filter((user:any) => user.id !== id))
        alert(data.message)
        console.log(data)
    }

    const getData = async () => {
        const decode = DecodeJwtToken()
        try{
            const url = `http://localhost:3000/api/auth/contact?createdby=${decode?.id}`
            const options = {
                method: 'GET'
            }
        const response = await fetch(url, options)
        const data = await response.json()
        setContacts(data)
        }catch(error){
            console.log('Error fetching data:', error)
        }
    }

    useEffect(() => {
          getData();
    },[])

    return(
        <ProtectedRoute>
        <div>
            <NavBar/>
            <div className='flex'>
                <Slider/>
                <div className='sign-up-container w-[80%]'>
                    <table className='table w-[100%]'>
                        <tr>
                            <th>NAME</th>
                            <th>MAIL</th>
                            <th>NUMBER</th>
                            <th>ADDRESS</th>
                        </tr>
                        {contacts.map((eachItem:any)=>(
                            <tr key={eachItem.id}>
                                <td>{eachItem.name}</td>
                                <td>{eachItem.email}</td>
                                <td>{eachItem.phonenumber}</td>
                                <td>{eachItem.address}</td>
                                <td onClick={()=>deletecontact(eachItem.id)}><MdDelete /></td>
                            </tr>
                        ))}
                    </table>
                </div>
            </div>
        </div>
        </ProtectedRoute>
    )
}

export default AllContacts

