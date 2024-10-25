
import Link from 'next/link';

const Slider = () => {

    return(
        <div className='flex flex-col items-center w-[20%] h-[100vh] pt-[50px] border border-[#ccc] '>
            <Link href='/home'>Create contact</Link>
            <Link href='/allcontacts'> All Contacts</Link>
            <Link href='/updatecontact'> Update Contact</Link>
        </div>
    )
}

export default Slider