import React, {useState, useEffect, useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import {Context} from '../store/appContext.js'
import StareFace from '../../img/stare.png'


const customMargins = {
    "margin-top": "15vh",
    padding: "35px",
    border: "solid 1px",
    "border-radius": "3%"
}

const imgStyle = {
    height:"50%",
    width: "50%",
    "border-radius": "50%"
}


export const User = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate()
    const [userInfo, setUserInfo] = useState({
            first_name: "",
            last_name: "",
          });

    useEffect(() => {
        const response = async () => {
            let information = await actions.getUserInfo()
           console.log(response)
            setUserInfo(prevUser => (
            {
                ...prevUser,
            first_name: information.first_name,
            last_name: information.last_name
        }))
        }
        localStorage.access_token == "" ? navigate('/login'): false
        response()
        
    }
    , [])

    const logginOut = () =>{
        localStorage.access_token = ""
        navigate("/login")

    }

    return (<>
        <div className='container-fluid w-25 border-secondary' style={customMargins}>
                    <div className= "col d-flex justify-content-center">
                        <img src={StareFace} className="img-thumbnail" alt="..." style={imgStyle}></img>
                    </div>
                    <div className="row">
                        <label for="full_Name" className="form-label fw-bold text-light text-center">Welcome, {localStorage.username}</label>
                    </div>
                    
                    <div className="row">
                        <label for="full_Name" className="form-label fw-bold text-light text-center">First Name: {userInfo.first_name}</label>
                    </div>

                    <div className="row">
                        <label for="full_Name" className="form-label fw-bold text-light text-center">Last Name: {userInfo.last_name}</label>
                    </div>

                    <button className='w-100 bg-primary' style={{border: "none", height: "40px","border-radius": "5px"}} onClick={logginOut}>
                    <div className='text-light fw-bold'>Log Out</div></button>
            </div>
            
        </> 
        )
}