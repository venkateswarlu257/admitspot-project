// "use client"
// import NavBar from "../navbar/page"
// import Cookies from 'js-cookie';
// import {jwtDecode} from "jwt-decode";
// const Homes = () => {
//     const token = Cookies.get('jwt_values');
//     if (token && typeof token === 'string') {
//         const decoded = jwtDecode(JSON.stringify(token));
//         console.log(decoded)
//     }
//     return(
//         <div>
//             <NavBar/>
//             <center><h1>Welcome to the AdmitSpot</h1></center>
//         </div>
//     )
// }

// export default Homes


"use client";

import NavBar from "../navbar/page";
import ProtectedRoute from '../ProtectedRoute/index'
import CreateContact from "../createcontact";
import Slider from "../slider";

const Homes = () => {
    return (
        <ProtectedRoute>
            <div>
                <NavBar />
                <div className="flex">
                    <Slider/>
                    <CreateContact/>
                </div>
            </div>
        </ProtectedRoute>
    );
}

export default Homes;
