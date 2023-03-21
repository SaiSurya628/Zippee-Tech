import { useState } from "react";
import {  useNavigate,Link } from "react-router-dom";
import {BiUser} from "react-icons/bi";
import axios from "axios";
import Cookies from "js-cookie";
import "./index.css";

const LoginPage=()=>{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email,setEmail]=useState("");
    
    const [error, setError] = useState(false);
    const history = useNavigate();

    const userFunction = (event) => {
        setUsername(event.target.value);
      };
    
      const passwordFunction = (event) => {
        setPassword(event.target.value);
      };

      const emailFunction=(event)=>{
        setEmail(event.target.value);
      }
      const submitFunction = async (event) => {
        event.preventDefault();
        try {
          const response = await axios.post("http://localhost:5000/login", {
            username,
            password,
            email
          });
          const { jwtToken } = response.data;
        
          Cookies.set("jwtToken",jwtToken);
        console.log(jwtToken);
          localStorage.setItem("userdetails",username)
        
            history("/home");
        }catch (error) {
          setError(true);
          
        }
      };

    return(
         <div>
        <div className="main">
         <form onSubmit={submitFunction}>
         <div className="design">  
          <BiUser className="icon"/></div>
          <h1 className="head">Welcome!</h1>
          <p>Let's connect to your workspace. <br/>
          please enter your details to continue.</p>
          <br />
          <input id="username" type="text" className="input" placeholder="Username" onChange={userFunction} value={username} />
          <br />
         
          <br />
          <input id="password" type="password" className="input" placeholder="Password" onChange={passwordFunction} value={password} />
          <br />
        
          <input id="text" type="text" className="input" placeholder="Email" onChange={emailFunction} value={email} />
          <br />
          <div>
          <button type="submit">Loin In</button>
          <Link to="/signup">
          <button type="submit">Sign up</button>
          </Link>
          </div>

          {error ? <p className="para">username and password incorrect have u signup?</p> :null}
            </form>   
        </div>
            
            </div>
     


    )
}

export default LoginPage;