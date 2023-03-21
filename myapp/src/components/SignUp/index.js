import { useState } from "react";
import {BiUser} from "react-icons/bi";
import axios from "axios";

import "./index.css"

const SignUp=()=>{
        const [username, setUsername] = useState("");
        const [password, setPassword] = useState("");
        const [email,setEmail]=useState("");
        const [errorMessage,setMessage]=useState("");
        const [error, setError] = useState(false);

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
              const response = await axios.post("http://localhost:5000/signup", {
                username,
                password,
                email,
              });
              setMessage(response.data)

            } catch (error) {
              setError(true);
              console.log(error)
              
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
              please enter your details to signup.</p>
              <br />
              <input id="username" type="text" className="input" placeholder="Username" onChange={userFunction} value={username} />
              <br />
             
              <br />
              <input id="password" type="password" className="input" placeholder="Password" onChange={passwordFunction} value={password} />
              <br />
            
              <input id="text" type="text" className="input" placeholder="Email" onChange={emailFunction} value={email} />
              <br />
              <div>
              <button type="submit">Create Account</button>
              
              </div>
    
              {error ? <p className="para">{errorMessage}</p> :<p>{errorMessage}</p>}
                </form>   
            </div>
                
                </div>
         
    
    
        )
    }
    

export default SignUp