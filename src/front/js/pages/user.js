import React, {useState, useEffect, useContext} from "react";
import { Link } from "react-router-dom";
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
    const [data, setData] = useState({
        username: "",
        password: "",
      });


    //getting the user values
    const inpuntHandling = e => {
        e.preventDefault()
        const {name, value} = e.target;
        setData(prevInfo => (
            {
                ...prevInfo, [name]:value
            }));
        console.log(data);
    }


    const loginUserHandling = (e) => {
        e.preventDefault()
        actions.loginAccount(data.username, data.password)
    }

    return (
            <div className='container-fluid w-25 border-secondary' style={customMargins}>
                    <div className= "col d-flex justify-content-center">
                        <img src={StareFace} className="img-thumbnail" alt="..." style={imgStyle}></img>
                    </div>
                    <label for="full_Name" className="form-label fw-bold text-light">Welcome, {localStorage.username}</label>
                        
         
            </div>
        )
}