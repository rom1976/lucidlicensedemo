
import { useState } from "react";
import { Card,Button,InputGroup,FormControl} from "react-bootstrap";
import Dashboard from "./Dashboard";
import axios from "axios";

const Login = (props) => {
    
    const [loggedIn, setLoggedIn] = useState(false);
    const [userID, setUserID] = useState('');
    const [password,setPassword] =useState('');
    const [userData,setUserData] = useState({});

   


useEffect(() => {
  if (userData.LUCIDApiToken) setLoggedIn(true);
 
}, [ userData]);




const LoginHandler =(dashprops)=>{
   // setLoggedIn(true);
   axios
   .post(
     "https://dev.lucidits.com/LUCIDLicenseManagement/V1/LUCIDUserLogin",
     {},
     {
       auth: {
         username: userID,
         password: password,
       },
     }
   )
   .then((response) => {
     console.log(response.data);
     setUserData(response.data);
    // if (userData.errorCode === 1) throw userData.message;
     //console.log(userData);
    // setOrg(response.data.defaultPropertyName);
     setMessage("Login Success");
//sessionStorage.setItem("key", userData.lucidapiToken);
    // console.log(sessionStorage.getItem("key"));
   });
  // .catch((error) => {
    // setMessage(userData.message);
   //});    
   
   
   
   
   
   props.LoginStatus(true);

}  

const dashBoardHandler = () =>{
    setLoggedIn(false);
    props.LoginStatus(false);

}

    if(loggedIn) 
        return (
               <>
                <Dashboard LogOut = {dashBoardHandler}/>
                </>
                )

    return(
        <>
           <div className="container">
         
               <div className="row pt-5">
               <h1> Lucid Demo </h1>
                   <div className="col-md-4"></div>
                   <div className="col-md-4">
                      
                      <Card className= "login">
                      <Card.Body>
                        <Card.Title>Login</Card.Title>
                        <InputGroup size="sm" className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-sm"
                         onChange={(e)=>setUserID(e.target.value)}
                        >User ID</InputGroup.Text>
                        <FormControl aria-label="User ID" aria-describedby="inputGroup-sizing-sm" />
                        </InputGroup>
                        <InputGroup size="sm" className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-sm"
                          onChange={(e)=>setPassword(e.target.value)}
                        >Password</InputGroup.Text>
                        <FormControl aria-label="password" aria-describedby="inputGroup-sizing-sm" />
                        </InputGroup>
                        <Button variant="primary" onClick={LoginHandler}>Login </Button>
                      </Card.Body>
                      </Card>
                   </div>
                   <div className="col-md-4"></div>

               </div>
          
           
           </div>
        </>
    )
}

export default Login;