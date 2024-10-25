"use client"
import Popup from "reactjs-popup";
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useState,useEffect } from 'react';
import { CgProfile } from "react-icons/cg";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoSettingsSharp } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { useRouter } from 'next/navigation';
import DecodeJwtToken from '../utils/DecodeJwtToken'

import './index.css'

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
     setIsOpen(!isOpen);
    };

    const router = useRouter()

    const onClickLogout = () => {
        Cookies.remove('jwt_token')
        router.push('/login')
      }

      interface CustomJwtPayload {
        id:string,
        username:string
    }
    const [name,setName] = useState<CustomJwtPayload | null>(null);
    useEffect(()=>{
        const decode = DecodeJwtToken()
        if(decode){
            setName(decode)
        }else{
            setName(null)
        }  
    },[])

    return(
        <div className="flex justify-between p-[20px] bg-[#ccc]">
            <h1 className="pl-[30px] "><Link href='/home'>AdmitSpot</Link></h1>
            <Popup trigger={<button className='btn' onClick={handleToggle}><CgProfile className='icon' /> {name?.username} <RiArrowDropDownLine className='icon'/></button>} position="bottom left">
                <ul className='profile-list'>
                <Link href='/setting'><li className="list"><IoSettingsSharp className='icon' />Setting</li></Link>
                    <li className='list' onClick={onClickLogout}><MdLogout className='icon' />Logout</li>
                </ul>
            </Popup> 
        </div>
    )
}

export default NavBar