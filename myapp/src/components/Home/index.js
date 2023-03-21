import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import {Navigate} from "react-router-dom"

const HomePage=()=>{

    const history= useNavigate();
    const userdetails=localStorage.getItem("userdetails");
    const logputFunction=()=>{
        history("/login");
        Cookies.remove("jwtToken");
        
    }
    const jwtToken=Cookies.get("jwtToken");
    if (jwtToken===undefined){
      return  <Navigate to="/login" />
    }
    
    return(
        <div className="main">
        <div >
        <h1>hi {userdetails}</h1>  

        <button className="button" onClick={logputFunction}>Logout</button>
        
        </div>
        </div>
    )

}

export default HomePage